using APILogin.Context;
using APILogin.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace APILogin.Controllers
{
    //[Authorize]
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
             Usuario novoUsuario = new() { 
                Nome = model.Nome,
                Senha = BCrypt.Net.BCrypt.HashPassword(model.Senha),
                Email = model.Email,
                Perfil = model.Perfil
            };
            
            _context.Usuarios.Add(novoUsuario);
            await _context.SaveChangesAsync();
            return Ok(novoUsuario);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var model = await _context.Usuarios.
                FirstOrDefaultAsync(c => c.Id == id);
            
            if (model == null) return NotFound();
            
            return Ok(model);

        }

        [HttpPut("{id}")]
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
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _context.Usuarios.FindAsync(id);
            if (model == null) return NotFound();

            _context.Usuarios.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();

        }
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult> Authenticate(AuthenticateDto model)
        {
            var usuarioDb = await _context.Usuarios.FirstOrDefaultAsync(m =>m.Email == model.Email);
            if (usuarioDb == null || !BCrypt.Net.BCrypt.Verify(model.Senha,usuarioDb.Senha)) 
                return Unauthorized();

            var jwt = GenerateJwtToken(usuarioDb);

            return Ok(new {jwtToken = jwt});

        }

        private string GenerateJwtToken(Usuario model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Ry74cBQva5dThwbwchR9jhbtRFnJxWSZ");
            var claims = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, model.Email.ToString()),
                new Claim(ClaimTypes.Role, model.Perfil.ToString())
            });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }



    }
}
