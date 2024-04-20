using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MS03.Models;

namespace MS03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LancamentosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LancamentosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public async Task<ActionResult> GetAll()
        {
            var model = await _context.Lancamentos.ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Lancamento model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Isso retornará os detalhes do erro de validação
            }

            _context.Lancamentos.Add(model);
            await _context.SaveChangesAsync();
            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Lancamento model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }

            if (!LancamentoExists(id))
            {
                return NotFound();
            }

            _context.Entry(model).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LancamentoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var lancamento = await _context.Lancamentos.FindAsync(id);
            if (lancamento == null)
            {
                return NotFound();
            }

            _context.Lancamentos.Remove(lancamento);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LancamentoExists(int id)
        {
            return _context.Lancamentos.Any(e => e.Id == id);
        }
    }
}
