using APILogin.Context;
using APILogin.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APILogin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var model = await _context.Usuarios.ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Usuario model)
        {
            
            _context.Usuarios.Add(model);
            await _context.SaveChangesAsync();
            return Ok(model);
        }

        [HttpGet("id")]
        public async Task<ActionResult> GetById(int id)
        {
            var model = await _context.Usuarios.FirstOrDefaultAsync(c => c.Id == id);
            if (model == null) NotFound();
            return Ok(model);

        }

        [HttpPut("id")]
        public async Task<ActionResult> GetById(int id, Usuario model)
        {
            if (id != model.Id) return BadRequest();
            var modelDb = await _context.Usuarios.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
            if (modelDb == null) NotFound();
            _context.Usuarios.Update(model);
            await _context.SaveChangesAsync();
            return NoContent();

        }
        [HttpDelete("id")]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _context.Usuarios.FindAsync(id);
            if (model == null) return NotFound();

            _context.Usuarios.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();

        }

    }
}
