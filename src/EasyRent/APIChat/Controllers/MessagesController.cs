using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIChat.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace APIChat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MessagesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}/{otherUserId}")]
        public async Task<ActionResult> GetMessages(string userId, string otherUserId)
        {
            var messages = await _context.Messages
                .Where(m => (m.SenderId == userId && m.ReceiverId == otherUserId) || (m.SenderId == otherUserId && m.ReceiverId == userId))
                .OrderBy(m => m.Timestamp)
                .ToListAsync();

            return Ok(messages);
        }

        [HttpPost]
        public async Task<ActionResult<Message>> SendMessage(Message message)
        {
            message.Timestamp = DateTime.UtcNow;
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMessages), new { userId = message.SenderId, otherUserId = message.ReceiverId }, message);
        }
    }
}
