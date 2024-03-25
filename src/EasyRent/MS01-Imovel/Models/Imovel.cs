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
        public double Valor { get; set; }
        public string Descricao { get; set; } = null!;
        public Status Status { get; set; }
    }
}
