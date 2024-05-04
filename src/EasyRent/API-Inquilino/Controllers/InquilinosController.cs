using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Inquilino.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace API_Inquilino.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InquilinosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InquilinosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        [Authorize(Roles = "Locador")]
        public async Task<ActionResult> GetAll()
        {
            var inquilinos = await _context.Inquilinos.ToListAsync();
            return Ok(inquilinos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Inquilino>> GetInquilinoById(int id)
        {
            var inquilino = await _context.Inquilinos.FindAsync(id);
            if (inquilino == null)
            {
                return NotFound();
            }
            return Ok(inquilino);
        }

        [HttpPost]
        [Authorize(Roles = "Locador")]
        public async Task<ActionResult<Inquilino>> Create(Inquilino inquilino)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Inquilinos.Add(inquilino);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetInquilinoById), new { id = inquilino.Id }, inquilino);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Locador")]
        public async Task<IActionResult> Update(int id, Inquilino inquilino)
        {
            if (id != inquilino.Id)
            {
                return BadRequest("ID incompatível.");
            }

            _context.Entry(inquilino).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InquilinoExists(id))
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
        [Authorize(Roles = "Locador")]
        public async Task<IActionResult> Delete(int id)
        {
            var inquilino = await _context.Inquilinos.FindAsync(id);
            if (inquilino == null)
            {
                return NotFound();
            }

            _context.Inquilinos.Remove(inquilino);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InquilinoExists(int id)
        {
            return _context.Inquilinos.Any(e => e.Id == id);
        }
    }
}