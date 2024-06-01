using System.ComponentModel.DataAnnotations;

namespace MS03.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Writer { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public int ChatId { get; set; }

        public Chat Chat { get; set; }

    }
}
