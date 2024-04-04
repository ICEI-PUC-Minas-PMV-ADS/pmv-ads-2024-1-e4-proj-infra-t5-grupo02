using System.ComponentModel.DataAnnotations;

namespace APILogin.Models
{
    public class AuthenticateDto
    {
        
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

    }
}
