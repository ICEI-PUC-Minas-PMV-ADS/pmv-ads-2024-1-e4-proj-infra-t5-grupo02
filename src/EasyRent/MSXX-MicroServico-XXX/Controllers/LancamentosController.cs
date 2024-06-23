using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MS03.Models;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

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

        // GET: api/Lancamentos/all
        [HttpGet("all")]
        public async Task<ActionResult> GetAll(string userId)
        {
            var lancamentos = await _context.Lancamentos.ToListAsync()
                .Where(i => i.UserId == userId)
                .ToListAsync();
            return Ok(lancamentos);
        }

        // GET: api/Lancamentos/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Lancamento>> GetLancamentoById(int id)
        {
            var lancamento = await _context.Lancamentos.FindAsync(id);
            if (lancamento == null)
            {
                return NotFound();
            }

            // Verifica se o usuário é inquilino e se o lançamento pertence a ele
            //if (User.IsInRole("Inquilino") && lancamento.UsuarioId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value))
            //{
            //    return Unauthorized("Acesso não permitido.");
            //}

            return Ok(lancamento);
        }


        // POST: api/Lancamentos
        [HttpPost]
        public async Task<ActionResult<Lancamento>> Create(Lancamento model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Retorna detalhes de validação do modelo
            }

            _context.Lancamentos.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLancamentoById), new { id = model.Id }, model);

        }

        // PUT: api/Lancamentos/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Lancamento model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Modelo de dados inválido.");
            }

            if (id != model.Id)
            {
                return BadRequest("ID de requisição incompatível com o ID do modelo.");
            }

            if (!LancamentoExists(id))
            {
                return NotFound($"Nenhum lançamento encontrado com o ID {id}.");
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
                    return NotFound($"Conflito: Nenhum lançamento encontrado com o ID {id}.");
                }
                else
                {
                    throw;
                }
            }
            catch (DbUpdateException ex)
            {
                return BadRequest($"Erro ao atualizar o lançamento: {ex.Message}");
            }

            return NoContent();
        }

        // DELETE: api/Lancamentos/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var lancamento = await _context.Lancamentos.FindAsync(id);
            if (lancamento == null)
            {
                return NotFound($"Nenhum lançamento encontrado com o ID {id}.");
            }

            _context.Lancamentos.Remove(lancamento);
            await _context.SaveChangesAsync();

            return NoContent(); // Pode ser substituído por Ok("Lançamento deletado com sucesso.") para maior clareza.
        }

        private bool LancamentoExists(int id)
        {
            return _context.Lancamentos.Any(e => e.Id == id);
        }
    }
}
