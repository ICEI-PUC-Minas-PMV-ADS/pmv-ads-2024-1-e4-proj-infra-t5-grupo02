using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MS03.Models
{
    [Table ("Chat")]
    public class Chat
    {
        [Key] 
        public int Id { get; set; }
        
        [Required]  
        public int InquilinoId { get; set; }

        [Required]
        public int LocadorId { get; set; }

        public Usuario Inquilino { get; set; }
        public Usuario Locador { get; set; }

        public ICollection <Message> Messages { get; set; }


    }
}
