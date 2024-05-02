using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MS01_Imovel.Models;
using MS01_Imovel.Services;

namespace MS01_Imovel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImoveisController : ControllerBase
    {
        private readonly ImoveisService _imoveisService;

        public ImoveisController(ImoveisService imoveisService)
        {
            _imoveisService = imoveisService;
        }

        [HttpGet]
        public async Task<List<Imovel>> Get() =>
            await _imoveisService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Imovel>> Get(string id)
        {
            var book = await _imoveisService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Imovel novoImovel)
        {
            await _imoveisService.CreateAsync(novoImovel);

            return CreatedAtAction(nameof(Get), new { id = novoImovel.Id }, novoImovel);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Imovel atualizadoImovel)
        {
            var book = await _imoveisService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            atualizadoImovel.Id = book.Id;

            await _imoveisService.UpdateAsync(id, atualizadoImovel);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var book = await _imoveisService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            await _imoveisService.RemoveAsync(id);

            return NoContent();
        }
    }
}
