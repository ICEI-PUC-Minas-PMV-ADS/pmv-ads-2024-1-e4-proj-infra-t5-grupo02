using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API_Inquilino.Models
{
    [Table("Inquilinos")]
    public class Inquilino
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome completo é obrigatório.")]
        [StringLength(100)]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O endereço é obrigatório.")]
        [StringLength(200)]
        public string Endereco { get; set; }

        public string Complemento { get; set; }

        [Required(ErrorMessage = "A cidade é obrigatória.")]
        [StringLength(50)]
        public string Cidade { get; set; }

        [Required(ErrorMessage = "O estado é obrigatório.")]
        [StringLength(2)]
        public string Estado { get; set; }

        [Required(ErrorMessage = "O CEP é obrigatório.")]
        [StringLength(8)]
        public string CEP { get; set; }

        [Required(ErrorMessage = "O CPF é obrigatório.")]
        [StringLength(11)]
        public string CPF { get; set; }

        [Required(ErrorMessage = "O telefone é obrigatório.")]
        [StringLength(15)]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        public string Observacao { get; set; }
        public string UserId { get; set; }
    }
}