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
        public string Nome { get; set; }

        [Required]
        [StringLength(500)]
        public string Caminho { get; set; }

        [Required]
        public DateTime DataUpload { get; set; }

    }
}
