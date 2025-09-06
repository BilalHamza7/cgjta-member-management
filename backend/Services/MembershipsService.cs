using Backend.Data;
using Backend.Models;

namespace Backend.Services
{
    public class MembershipsService(SupabaseService client)
    {
        private readonly SupabaseService _clientFactory = client;

        public async Task<List<Memberships>> GetAllMembershipsAsync()
        {
            var client = _clientFactory.GetClient();
            var result = await client.From<Memberships>().Get();
            return result.Models;
        }
    }
}