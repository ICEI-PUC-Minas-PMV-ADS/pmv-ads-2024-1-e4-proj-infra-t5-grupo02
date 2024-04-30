using MS01_Imovel.Models;
using MS01_Imovel.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<ImoveisDatabaseSettings>(
    builder.Configuration.GetSection("ImovelDatabase"));

builder.Services.AddSingleton<ImoveisService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy",
        policy => policy
        .WithOrigins("http://127.0.0.1:5501")
        .AllowAnyHeader()
        .AllowAnyMethod());
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
