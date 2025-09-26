using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Supabase.Postgrest.Interfaces;
using static Supabase.Postgrest.Constants;

namespace Backend.Services
{
    public class MembersService(SupabaseService clientFactory, MembershipsService membershipsService)
    {
        private readonly SupabaseService _clientFactory = clientFactory;
        private readonly MembershipsService _membershipsService = membershipsService;

        // Response model to include members and their profile URLs
        public class MembersResponse
        {
            public List<MemberDto> Members { get; set; }
        }

        // Get all members with optional filters and pagination
        public async Task<MembersResponse> GetAllMembersAsync(string? memberID = null, string? fullName = null, string? status = null, string? level = null, int pageNo = 1)
        {
            var client = _clientFactory.GetClient();

            // Select all fields from Members and all fields from related Membership
            IPostgrestTable<Members> query = client
                    .From<Members>()
                    .Select("*");

            if (!string.IsNullOrEmpty(memberID))
            {
                if (memberID.All(char.IsDigit))
                    query = query.Filter("member_id", Operator.Equals, int.Parse(memberID));
            }

            if (!string.IsNullOrEmpty(fullName))
            {
                query = query.Filter("fullname", Operator.ILike, fullName);
            }

            if (!string.IsNullOrEmpty(status) && status != "0")
                query = query.Filter("memberships.status", Operator.Equals, status);

            if (!string.IsNullOrEmpty(level) && level != "0")
                query = query.Filter("memberships.level_name", Operator.Equals, level);

            int from = (pageNo - 1) * 20;
            int to = from + 20 - 1;
            query = query.Range(from, to);

            var result = await query.Get();

            // var profileUrls = new List<string>();
            // foreach (var member in result.Models)
            // {
            //     if (!string.IsNullOrEmpty(member.ProfileUrl))
            //     {
            //         // Create signed URL (valid for 1 hour)
            //         var url = await GetProfilePictureUrlAsync(member.ProfileUrl);
            //         profileUrls.Add(url);
            //     }
            //     else
            //     {
            //         profileUrls.Add(string.Empty);
            //     }
            // }

            var cleanMembers = result.Models.Select(m => new MemberDto
            {
                MemberId = m.MemberId,
                ProfileUrl = m.ProfileUrl,
                FullName = m.FullName,
                JoinDate = m.JoinDate,
                Email = m.Email,
                NicNumber = m.NicNumber,
                MobileNumber = m.MobileNumber,
                Address = m.Address,
                City = m.City,
                PostalCode = m.PostalCode,
                Country = m.Country,
                BusinessName = m.BusinessName,
                BusinessActivity = m.BusinessActivity,
                BusinessType = m.BusinessType,
                Chinafort = m.Chinafort,
                MembershipId = m.MembershipId,
                Membership = new MembershipDto
                {
                    MembershipId = m.Membership.MembershipId,
                    Status = m.Membership.Status,
                    LevelName = m.Membership.LevelName,
                    Paid = m.Membership.Paid,
                    RenewalDate = m.Membership.RenewalDate,
                    ExpiryDate = m.Membership.ExpiryDate
                }
            }).ToList();

            return new MembersResponse { Members = cleanMembers };
        }

        // Generate a signed URL for a profile picture stored in Supabase Storage
        // public async Task<string> GetProfilePictureUrlAsync(string path)
        // {
        //     const { data, error } = await supabase.storage.from('avatars').createSignedUrl('folder/avatar1.png', 3600);
        //     var client = _clientFactory.GetClient();
        //     var storage = client.Storage.From("profile-images");
        //     var signedUrl = await storage.CreateSignedUrl(path, 3600); // 1 hour
        //     return signedUrl;
        // }

        // Get a member by their ID, including membership details
        public async Task<Members?> GetMemberByID(int memberID)
        {
            var client = _clientFactory.GetClient();

            // Query the Members table and include Membership fields if needed
            var query = client
                .From<Members>()
                .Select("*, Memberships!inner(*)") // include all membership fields
                .Filter("member_id", Operator.Equals, memberID);

            var result = await query.Get();

            // Return the first member found, or null if none
            return result.Models.FirstOrDefault();
        }

        public async Task<Members> RegisterMemberWithMembershipAsync(MemberRegistrationDto dto)
        {
            var client = _clientFactory.GetClient();

            // Create membership first
            var membershipResult = await _membershipsService.CreateMembershipAsync(dto.Membership);
            if (membershipResult == null || membershipResult.MembershipId == 0)
                throw new Exception("Failed to create membership");

            // Assign membership_id to member
            dto.Member.MembershipId = membershipResult.MembershipId;

            // Insert member
            var memberResult = await client.From<Members>().Insert(dto.Member);

            if (memberResult.Models.Count == 0)
                throw new Exception("Failed to register member!");

            var createdMember = memberResult.Models.First();

            return createdMember;
        }

        public async Task<Members?> UpdateMemberAsync(int id, Members member)
        {
            var client = _clientFactory.GetClient();

            // Update based on primary key (member_id)
            var response = await client
                .From<Members>()
                .Where(m => m.MemberId == id)
                .Update(member);

            return response.Models.FirstOrDefault(); // null if not found
        }

        // public async Task<Members?> UpdateMemberProfileAsync(int id, string base64Image)
        // {
        //     var client = _clientFactory.GetClient();

        //     var bucket = client.Storage.From("profile-images");

        //     var filePath = $"profiles/member_{id}.png";

        //     var imageBytes = Convert.FromBase64String(base64Image);

        //     var url = await GetProfilePictureUrlAsync(base64Image);

        //     // Update based on primary key (member_id)
        //     var response = await client
        //         .From<Members>()
        //         .Where(m => m.MemberId == id)
        //         .Update(new Members { ProfileUrl = filePath });

        //     return response.Models.FirstOrDefault(); // null if not found
        // }
    }
}