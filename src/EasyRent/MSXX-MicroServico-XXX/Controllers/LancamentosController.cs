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

    }
}
