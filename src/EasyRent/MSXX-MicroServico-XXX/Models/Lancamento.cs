using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MS02_v01.Models
{
    [Table("Lancamentos")]
    public class Lancamento
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Lançamento")]
        public Lancamento Tipo { get; set; }

        public Forma Forma { get; set; }

        [Display(Name = "Classificação")]
        public Classificacao Classificacao { get; set; }

        [Required(ErrorMessage = "Obrigatório informar a data!")]
        [Display(Name = "Data de Vencimento")]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime Data { get; set; }

        [Required(ErrorMessage = "Obrigatório informar o status!")]
        public StatusTransacao Status { get; set; }

        [Required(ErrorMessage = "É necessário informar o valor!")]
        [Column(TypeName = "decimal(18,2)")]
        [DataType(DataType.Currency)]
        [DisplayFormat(DataFormatString = "{0:C2}", ApplyFormatInEditMode = false)]
        public decimal Valor { get; set; }

        [Display(Name = "Descrição")]
        [Required(ErrorMessage = "Obrigatório informar a descrição!")]
        public string Descricao { get; set; }

        [Required]
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }


    }

    public enum Tipo
    {
        Receita,
        Despesa
    }

    public enum Forma
    {
        Dinheiro,
        Cartão,
        Pix
    }

    public enum Classificacao
    {
        Aluguel,
        IPTU,
        TCR
    }

    public enum StatusTransacao
    {
        Pendente,
        Pago,
        APagar
    }
}
