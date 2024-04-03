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
        public async Task<ActionResult> Create(UsuarioDto model)
        {
             Usuario novoUsuario = new Usuario() { 
                Nome = model.Nome,
                Senha = BCrypt.Net.BCrypt.HashPassword(model.Senha),
                Email = model.Email,
                Perfil = model.Perfil

            };
            
            _context.Usuarios.Add(novoUsuario);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetById ", new {id = novoUsuario.Id},novoUsuario);
        }

        [HttpGet("id")]
        public async Task<ActionResult> GetById(int id)
        {
            var model = await _context.Usuarios.
                FirstOrDefaultAsync(c => c.Id == id);
            if (model == null) NotFound();
            return Ok(model);

        }

        [HttpPut("id")]
        public async Task<ActionResult> Update(int id, UsuarioDto model)
        {
            if (id != model.Id) return BadRequest();
            var modelDb = await _context.Usuarios.AsNoTracking().
                FirstOrDefaultAsync(c => c.Id == id);
            if (modelDb == null) return NotFound();

            modelDb.Nome = model.Nome;
            modelDb.Senha = BCrypt.Net.BCrypt.HashPassword(model.Senha);
            modelDb.Email = model.Email;
            modelDb.Perfil = model.Perfil;

            _context.Usuarios.Update(modelDb);
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
