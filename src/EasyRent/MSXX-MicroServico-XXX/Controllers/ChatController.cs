using Microsoft.AspNetCore.Mvc;
using MS03.DTOS;
using MS03.Models;

namespace MS03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : Controller
    {
        private readonly AppDbContext _context;

        public ChatController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult GetMessages (int idInquilino, int idLocador, int idUsuarioLogado)
        {
           

            if (idInquilino != idUsuarioLogado && idLocador != idUsuarioLogado)
            {
                return BadRequest();


            }

          
            var chat = _context.Chats.Where(chat=>chat.InquilinoId == idInquilino && chat.LocadorId==idLocador).First();
            if (chat == null)
            {

                chat = CreateChat(idInquilino, idLocador);
            }
            var messages = _context.Messages.Where(message =>message.ChatId==chat.Id).ToList();
            return Ok(messages);
           
        }
        [HttpPost]
        public ActionResult PostMessage
            (
            [FromBody]
            PostMessageDTO postMessageDTO, int idUsuarioLogado 
            )

        {

            if (postMessageDTO == null)
            {

                return BadRequest();
            }
            
            if (postMessageDTO.IdInquilino != idUsuarioLogado && postMessageDTO.IdLocador != idUsuarioLogado)
            {

                return BadRequest();
            }
            var chat = _context.Chats.Where(chat => chat.InquilinoId == postMessageDTO.IdInquilino && chat.LocadorId == postMessageDTO.IdLocador).First();
            if (chat == null)
            {
                chat = CreateChat(postMessageDTO.IdInquilino, postMessageDTO.IdLocador);
            }

            var message = new Message()
            {
                ChatId = chat.Id,
                Content = postMessageDTO.Message,
                Writer = postMessageDTO.IsLocador ? "Locador" : "Inquilino"

            };
            _context.Messages.Add(message);
            return Ok();

        }
        private Chat CreateChat (int idInquilino, int idLocador)
        {
            var chat = new Chat()
            {
                InquilinoId = idInquilino,
                LocadorId = idLocador

            };
            _context.Chats.Add(chat);
            return _context.Chats.Where(chat => chat.InquilinoId == idInquilino && chat.LocadorId == idLocador).First();

        }
        
    }
}
