using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MS01_Imovel.Models;

namespace MS01_Imovel.Services
{
    public class ImoveisService
    {
        private readonly IMongoCollection<Imovel> _imoveisCollection;
        public ImoveisService(
            IOptions<ImoveisDatabaseSettings> imoveisDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                imoveisDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(
                imoveisDatabaseSettings.Value.DatabaseName);
            _imoveisCollection = mongoDatabase.GetCollection<Imovel>(
                imoveisDatabaseSettings.Value.ImoveisCollectionName);
        }

        public async Task<List<Imovel>> GetAsync() =>
            await _imoveisCollection.Find(_ => true).ToListAsync();
        public async Task<Imovel?> GetAsync(string id) =>
        await _imoveisCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Imovel novoImovel) =>
            await _imoveisCollection.InsertOneAsync(novoImovel);

        public async Task UpdateAsync(string id, Imovel atualizadoImovel) =>
            await _imoveisCollection.ReplaceOneAsync(x => x.Id == id, atualizadoImovel);

        public async Task RemoveAsync(string id) =>
            await _imoveisCollection.DeleteOneAsync(x => x.Id == id);
    }
}
