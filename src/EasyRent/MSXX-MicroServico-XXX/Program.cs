using Microsoft.EntityFrameworkCore;
using MS03.Models;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Adiciona os controladores e configura��es de serializa��o JSON
builder.Services.AddControllers()
    .AddJsonOptions(options => {
        // Adiciona suporte para converter enums para string ou n�mero na serializa��o JSON
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase, allowIntegerValues: true));
    });

// Configura o DbContext para usar SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configura CORS para permitir solicita��es de dom�nios espec�ficos
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy",
        policy => policy
        .WithOrigins("http://127.0.0.1:5500") // Permite solicita��es do seu frontend local
        .AllowAnyHeader()
        .AllowAnyMethod());
});

// Adiciona suporte para gera��o de documenta��o da API via Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware de tratamento de exce��o para garantir respostas JSON em caso de erros
app.UseExceptionHandler(appBuilder =>
{
    appBuilder.Run(async context =>
    {
        var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();
        if (exceptionHandlerFeature != null)
        {
            var ex = exceptionHandlerFeature.Error;
            context.Response.StatusCode = 500;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(new
            {
                StatusCode = context.Response.StatusCode,
                ErrorMessage = "Internal Server Error. Please try again later.",
                DetailedMessage = ex.Message // Consider removendo ou escondendo detalhes em produ��o
            }.ToString());
        }
    });
});

// Configura��es adicionais do pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("MyCorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
