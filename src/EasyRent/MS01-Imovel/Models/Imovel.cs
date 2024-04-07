using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MS01_Imovel.Models
{
    public class Imovel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Endereco { get; set; } = null!;
        public string Complemento { get; set; } = null!;
        public string Cidade { get; set; } = null!;
        public string Estado { get; set; } = null!;
        public string CEP { get; set; } = null!;
        public int QtdQuartos { get; set; }
        public int QtdBanheiros { get; set; }
        public int QtdVagasGaragem { get; set; }
        public float AreaTotal { get; set; }
        public double ValorAluguel { get; set; }
        public double ValorCondominio { get; set; }
        public string DescricaoDetalhada { get; set; } = null!;
        public Status Status { get; set; }
        public TipoImovel TipoImovel { get; set; }
        public byte[] Imagem { get; set; } = new byte[] { };
    }
}
