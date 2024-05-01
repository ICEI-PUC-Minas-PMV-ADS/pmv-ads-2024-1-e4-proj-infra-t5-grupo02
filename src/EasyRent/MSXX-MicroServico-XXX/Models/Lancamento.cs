using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MS03.Models
{
    [Table("Lancamentos")]
    public class Lancamento
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Lançamento")]
        public Tipo Tipo { get; set; }

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
        Receita = 1,
        Despesa = 2
    }

    public enum Forma
    {
        Dinheiro = 1,
        Cartão = 2,
        Pix = 3
    }

    public enum Classificacao
    {
        Aluguel = 1,
        IPTU = 2,
        TCR = 3
    }

    public enum StatusTransacao
    {
        Pendente = 1,
        Pago = 2 ,
        APagar = 3
    }
}
