using Backend.Data;
using Backend.DTOs;
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

        public async Task<List<MembershipStatusCountDto>> GetMembershipStatusCountsAsync()
        {
            var client = _clientFactory.GetClient();

            var response = await client
                .From<MembershipStatusCountDto>()
                .Select("status, count:count(*)")
                .Get();

            return response.Models;
        }

        public async Task<Memberships?> GetMembershipByMemberIdAsync(int memberId)
        {
            var client = _clientFactory.GetClient();

            var memberResponse = await client
                .From<Members>()
                .Where(m => m.MemberId == memberId)
                .Get();

            var membershipId = memberResponse.Models.FirstOrDefault()?.MembershipId;

            var response = await client
                .From<Memberships>()
                .Where(m => m.MembershipId == membershipId)
                .Get();

            return response.Models.FirstOrDefault(); // null if not found
        }

        public async Task<Members?> GetMemberByIdAsync(int id)
        {
            var client = _clientFactory.GetClient();

            var response = await client
                .From<Members>()
                .Where(m => m.MemberId == id)
                .Get();

            return response.Models.FirstOrDefault();
        }

        public class MembersResponse
        {
            // passing needed fields only
            public int MemberId { get; set; }
            public int MembershipId { get; set; }
            public string Email { get; set; } = String.Empty;
            public string Status { get; set; } = String.Empty;
            public bool Paid { get; set; } = false;
        }

        public async Task<List<MembersResponse>> GetMembersByMembershipLevelAsync(string level)
        {
            var client = _clientFactory.GetClient();

            var membershipResponse = await client
                .From<Memberships>()
                .Where(m => m.LevelName == level)
                .Get();

            var membershipIds = membershipResponse.Models.Select(m => m.MembershipId).ToList();

            var membersResponse = await client
                .From<Members>()
                .Where(m => membershipIds.Contains(m.MembershipId))
                .Get();

            // executed m number of times (total members returned) and converted to a list
            var result = membersResponse.Models.Select(m => new MembersResponse
            {
                MemberId = m.MemberId,
                MembershipId = m.MembershipId,
                Email = m.Email,
                Status = membershipResponse.Models.FirstOrDefault(mem => mem.MembershipId == m.MembershipId)?.Status ?? string.Empty,
                Paid = membershipResponse.Models.FirstOrDefault(mem => mem.MembershipId == m.MembershipId)?.Paid ?? true
            }).ToList();

            return result;
        }
    }
}