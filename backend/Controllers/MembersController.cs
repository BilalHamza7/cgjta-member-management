using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/members")]
    public class MembersController(MembersService membersService) : ControllerBase
    {
        private readonly MembersService _membersService = membersService;

        [HttpGet("getAllMembers")]
        public async Task<IActionResult> GetAllMembers()
        {
            var memberID = HttpContext.Request.Query["memberID"].ToString();
            var fullName = HttpContext.Request.Query["fullName"].ToString();
            var status = HttpContext.Request.Query["status"].ToString();
            var level = HttpContext.Request.Query["level"].ToString();
            var pageNo = int.Parse(HttpContext.Request.Query["page"].ToString());
            Console.WriteLine($"Received parameters: memberID={memberID}, fullName={fullName}, status={status}, level={level}, pageNo={pageNo}");
            var members = await _membersService.GetAllMembersAsync(memberID, fullName, status, level, pageNo);
            return Ok(members);
        }

        [HttpGet("getMemberByID/{id}")]
        public async Task<IActionResult> GetMemberByID(int id)
        {
            var member = await _membersService.GetMemberByID(id);
            if (member == null)
                return NotFound($"Member with ID {id} not found.");

            return Ok(member);
        }

        [HttpPost("registerMember")]
        public async Task<IActionResult> RegisterMember([FromBody] MemberRegistrationDto dto)
        {
            if (dto == null || dto.Member == null || dto.Membership == null)
                return BadRequest("Member and Membership data are required.");

            try
            {
                var createdMember = await _membersService.RegisterMemberWithMembershipAsync(dto);
                return Ok(createdMember.MemberId);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Registration failed: " + ex);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("updateMember/{id}")]
        public async Task<IActionResult> UpdateMemberAsync(int id, [FromBody] Members member)
        {
            if (member == null || id != member.MemberId)
            {
                return BadRequest("Invalid member data.");
            }

            try
            {
                var updatedMember = await _membersService.UpdateMemberAsync(id, member);

                if (updatedMember == null)
                    return NotFound($"Member with ID {id} not found.");

                return Ok(updatedMember);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Update failed: " + ex);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // [HttpPut("updateMemberProfile/{id}")]
        // public async Task<IActionResult> UpdateMemberProfileAsync(int id, [FromBody] string base64Image)
        // {
        //     if (string.IsNullOrEmpty(base64Image))
        //         return BadRequest("Invalid profile image.");

        //     try
        //     {
        //         var updatedMemberProfile = await _membersService.UpdateMemberProfileAsync(id, base64Image);

        //         if (updatedMemberProfile == null)
        //             return NotFound($"Member with ID {id} not found.");

        //         return Ok(updatedMemberProfile);
        //     }
        //     catch (Exception ex)
        //     {
        //         Console.WriteLine("Update failed: " + ex);
        //         return StatusCode(500, $"Internal server error: {ex.Message}");
        //     }
        // }
    }
}