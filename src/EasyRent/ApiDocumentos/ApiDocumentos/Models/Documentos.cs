using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiDocumentos.Models
{
    public class Documento
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string NomeArquivo { get; set; }

        [Required]
        public byte[] Data { get; set; }

        [Required]
        public DateTime DataUpload { get; set; }
        [Required]
        public string UserId { get; set; }

    }
}
