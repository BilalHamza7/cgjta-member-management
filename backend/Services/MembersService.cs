using Backend.Data;
using Backend.DTOs;
using Backend.Models;

namespace Backend.Services
{
    public class MembersService(SupabaseService clientFactory, MembershipsService membershipsService)
    {
        private readonly SupabaseService _clientFactory = clientFactory;
        private readonly MembershipsService _membershipsService = membershipsService;

        public async Task<List<Members>> GetAllMembersAsync()
        {
            var client = _clientFactory.GetClient();
            var result = await client.From<Members>().Get();
            return result.Models;
        }

        public async Task<Members> RegisterMemberWithMembershipAsync(MemberRegistrationDto dto)
        {
            var client = _clientFactory.GetClient();

            // Create membership first
            var membershipResult = await _membershipsService.CreateMembershipAsync(dto.Membership);

            if (membershipResult == null || membershipResult.MembershipId == 0)
                throw new Exception("Failed to create membership");

            // Assign membership_id to member
            dto.Member.MembershipId = membershipResult.MembershipId.ToString();

            // Insert member
            var memberResult = await client.From<Members>().Insert(dto.Member);

            if (memberResult.Models.Count == 0)
                throw new Exception("Failed to register member!");

            return memberResult.Models.First();
        }

        public async Task<Members?> UpdateMemberAsync(Members member)
        {
            var client = _clientFactory.GetClient();

            // Update based on primary key (member_id)
            var response = await client
                .From<Members>()
                .Where(m => m.MemberId == member.MemberId)
                .Update(member);

            return response.Models.FirstOrDefault(); // null if not found
        }
    }
}