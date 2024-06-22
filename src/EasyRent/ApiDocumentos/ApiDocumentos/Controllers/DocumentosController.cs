using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using System;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Cors;

namespace ApiDocumentos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentosController : ControllerBase
    {
        private readonly ILogger<DocumentosController> _logger;

        public DocumentosController(ILogger<DocumentosController> logger)
        {
            _logger = logger;
        }

        [EnableCors("MyCorsPolicy")]
        [HttpPost("Upload")]
        public async Task<IActionResult> UploadFile()
        {
            if (Request.Form.Files.Count == 0)
            {
                return Ok(new { message = "Arquivo não enviado. Nenhum arquivo foi selecionado." });
            }

            IFormFile file = Request.Form.Files[0];

            if (file.Length > 0)
            {
                var allowedExtensions = new[] { ".pdf", ".jpg", ".jpeg" };
                var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (!allowedExtensions.Contains(extension))
                {
                    return Ok(new { message = "Formato de arquivo não permitido." });
                }

                var filePath = Path.Combine("C:\\Users\\leodm\\OneDrive\\_DEV\\_PUC\\pmv-ads-2024-1-e4-proj-infra-t5-grupo02\\src\\EasyRent\\ApiDocumentos\\uploads", file.FileName);

                try
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    return Ok(new { message = "Arquivo enviado com sucesso!", path = filePath });
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Erro ao fazer upload do arquivo");
                    return Ok(new { message = "Arquivo enviado com sucesso, mas houve um problema ao processar os dados.", error = ex.Message });
                }
            }

            return Ok(new { message = "Arquivo não enviado. O arquivo está vazio." });
        }

        [EnableCors("MyCorsPolicy")]
        [HttpGet("List")]
        public IActionResult ListFiles()
        {
            try
            {
                var filePath = "C:\\Users\\leodm\\OneDrive\\_DEV\\_PUC\\pmv-ads-2024-1-e4-proj-infra-t5-grupo02\\src\\EasyRent\\ApiDocumentos\\uploads";
                if (!Directory.Exists(filePath))
                {
                    _logger.LogError($"O diretório especificado não existe: {filePath}");
                    return StatusCode(500, new { message = "Erro interno ao listar arquivos", error = "O diretório especificado não existe." });
                }

                var fileNames = Directory.GetFiles(filePath).Select(Path.GetFileName).ToList();

                return Ok(fileNames);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao listar arquivos");
                return StatusCode(500, new { message = "Erro interno ao listar arquivos", error = ex.Message });
            }
        }

        [EnableCors("MyCorsPolicy")]
        [HttpDelete("Delete")]
        public IActionResult DeleteFile([FromQuery] string fileName)
        {
            try
            {
                var filePath = Path.Combine("C:\\Users\\leodm\\OneDrive\\_DEV\\_PUC\\pmv-ads-2024-1-e4-proj-infra-t5-grupo02\\src\\EasyRent\\ApiDocumentos\\uploads", fileName);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                    return Ok(new { message = "Arquivo excluído com sucesso!" });
                }
                else
                {
                    return NotFound(new { message = "Arquivo não encontrado." });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao excluir arquivo");
                return StatusCode(500, new { message = "Erro interno ao excluir arquivo", error = ex.Message });
            }
        }

        [EnableCors("MyCorsPolicy")]
        [HttpGet("Download")]
        public IActionResult DownloadFile([FromQuery] string fileName)
        {
            _logger.LogInformation($"Tentativa de download do arquivo: {fileName}");
            try
            {
                var filePath = Path.Combine("C:\\Users\\leodm\\OneDrive\\_DEV\\_PUC\\pmv-ads-2024-1-e4-proj-infra-t5-grupo02\\src\\EasyRent\\ApiDocumentos\\uploads", fileName);
                _logger.LogInformation($"Caminho completo do arquivo: {filePath}");

                if (!System.IO.File.Exists(filePath))
                {
                    _logger.LogWarning($"Arquivo não encontrado: {filePath}");
                    return NotFound(new { message = "Arquivo não encontrado." });
                }

                var mimeType = GetMimeType(filePath);
                var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
                _logger.LogInformation($"Arquivo encontrado e pronto para download: {filePath}");
                return new FileStreamResult(fileStream, mimeType);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao baixar arquivo");
                return StatusCode(500, new { message = "Erro interno ao baixar arquivo", error = ex.Message });
            }
        }

        private string GetMimeType(string filePath)
        {
            var extension = Path.GetExtension(filePath).ToLowerInvariant();
            return extension switch
            {
                ".pdf" => "application/pdf",
                ".jpg" => "image/jpeg",
                ".jpeg" => "image/jpeg",
                _ => "application/octet-stream",
            };
        }
    }
}
