using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using ApiDocumentos.Models;

using System;

namespace ApiDocumentos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DocumentosController : ControllerBase
    {
        private readonly ILogger<DocumentosController> _logger;
        private readonly AppDbContext _context;  // Adicione o contexto do banco de dados

        public DocumentosController(ILogger<DocumentosController> logger, AppDbContext context) // Injete o DbContext
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost("Upload")]
        public async Task<IActionResult> UploadFile()
        {
            if (Request.Form.Files.Count == 0)
                return BadRequest("Nenhum arquivo enviado.");

            IFormFile file = Request.Form.Files[0];

            if (file.Length > 0)
            {
                var allowedExtensions = new[] { ".pdf", ".jpg", ".jpeg" };
                var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (!allowedExtensions.Contains(extension))
                    return BadRequest("Formato de arquivo não permitido.");

                var filePath = Path.Combine("C:\\Users\\leodm\\OneDrive\\_DEV\\_PUC\\pmv-ads-2024-1-e4-proj-infra-t5-grupo02\\src\\EasyRent\\ApiDocumentos\\uploads", file.FileName);

                try
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    var documento = new Documento
                    {
                        Nome = file.FileName,
                        Caminho = filePath,
                        DataUpload = DateTime.Now
                    };
                    _context.Documentos.Add(documento);
                    await _context.SaveChangesAsync();

                    return Ok(new { message = "Arquivo enviado com sucesso!", path = filePath });
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Erro ao fazer upload do arquivo");
                    return StatusCode(500, "Erro interno ao fazer upload do arquivo");
                }
            }

            return BadRequest("Erro no envio do arquivo.");
        }
    }
}
