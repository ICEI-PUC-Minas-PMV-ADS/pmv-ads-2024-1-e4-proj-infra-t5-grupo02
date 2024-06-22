using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using System;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Cors;
using ApiDocumentos.Models;

namespace ApiDocumentos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DocumentosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<PdfFileDto>> GetPdfFiles()
        {
            var pdfFiles = _context.Documentos
                .Select(p => new PdfFileDto
                {
                    Id = p.Id,
                    FileName = p.NomeArquivo
                })
                .ToList();

            return Ok(pdfFiles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> DownloadPdf(int id)
        {
            var pdfFile = await _context.Documentos.FindAsync(id);
            if (pdfFile == null)
            {
                return NotFound();
            }

            return File(pdfFile.Data, "application/pdf", pdfFile.NomeArquivo);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadPdf([FromForm] IFormFile file, [FromForm] string uploadTime, [FromForm] string userId)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);

            var pdfFile = new Documento
            {
                NomeArquivo = file.FileName,
                Data = memoryStream.ToArray(),
                DataUpload = DateTime.Parse(uploadTime),
                UserId = userId
            };

            _context.Documentos.Add(pdfFile);
            await _context.SaveChangesAsync();

            return Ok(new { Id = pdfFile.Id });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePdf(int id)
        {
            var pdfFile = await _context.Documentos.FindAsync(id);
            if (pdfFile == null)
            {
                return NotFound();
            }

            _context.Documentos.Remove(pdfFile);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
    public class PdfFileDto
    {
        public int Id { get; set; }
        public string FileName { get; set; }
    }
}
