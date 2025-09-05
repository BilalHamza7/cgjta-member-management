using Backend.Data;
using Backend.Models;

namespace Backend.Services
{
    public class MembersService
    {
        private readonly SupabaseService _clientFactory;

        public MembersService(SupabaseService client)
        {
            _clientFactory = client;
        }

        public async Task<List<Members>> GetAllMembersAsync()
        {
            var client = _clientFactory.GetClient();
            var result = await client.From<Members>().Get();
            return result.Models;
        }
    }
}