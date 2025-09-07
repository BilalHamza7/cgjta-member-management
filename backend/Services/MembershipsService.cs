using Backend.Data;
using Backend.Models;

namespace Backend.Services
{
    public class MembershipsService(SupabaseService client)
    {
        private readonly SupabaseService _clientFactory = client;

        public async Task<Memberships> CreateMembershipAsync(Memberships membership)
        {
            var client = _clientFactory.GetClient();

            var result = await client.From<Memberships>().Insert(membership);

            if (result.Models.Count == 0)
                throw new Exception("Failed to create membership!");

            return result.Models.First();
        }

        public async Task<Memberships?> UpdateMembershipAsync(Memberships membership)
        {
            var client = _clientFactory.GetClient();

            // Update based on primary key (member_id)
            var response = await client
                .From<Memberships>()
                .Where(m => m.MembershipId == membership.MembershipId)
                .Update(membership);

            return response.Models.FirstOrDefault(); // null if not found
        }
    }
}