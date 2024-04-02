using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MS02_v01.Models;

namespace MS02_v01.Controllers
{
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

    }
}
