using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/members")]
    public class MembersController(MembersService membersService) : ControllerBase
    {
        private readonly MembersService _membersService = membersService;

        [HttpGet("getAllMembers")]
        public async Task<IActionResult> GetAllMembers()
        {
            var members = await _membersService.GetAllMembersAsync();
            return Ok(members);
        }

        [HttpPost("registerMember")]
        public async Task<IActionResult> RegisterMember([FromBody] MemberRegistrationDto dto)
        {
            if (dto == null || dto.Member == null || dto.Membership == null)
                return BadRequest("Member and Membership data are required.");

            try
            {
                var createdMember = await _membersService.RegisterMemberWithMembershipAsync(dto);
                return Ok(createdMember);
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
                var updatedMember = await _membersService.UpdateMemberAsync(member);

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
    }
}