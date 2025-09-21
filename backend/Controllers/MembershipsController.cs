using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/memberships")]
    public class MembershipsController(MembershipsService membershipsService) : ControllerBase
    {
        private readonly MembershipsService _membershipsService = membershipsService;

        [HttpPut("updateMembership/{id}")]
        public async Task<IActionResult> UpdateMemberhipAsync(int id, [FromBody] Memberships membership)
        {
            if (membership == null || id != membership.MembershipId)
            {
                return BadRequest("Invalid membership data.");
            }

            try
            {
                var updatedMembership = await _membershipsService.UpdateMembershipAsync(membership);

                if (updatedMembership == null)
                    return NotFound($"Member with ID {id} not found.");

                return Ok(updatedMembership);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Update failed: " + ex);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("statusCounts")]
        public async Task<IActionResult> GetMembershipStatusCounts()
        {
            try
            {
                var statusCounts = await _membershipsService.GetMembershipStatusCountsAsync();
                var total = statusCounts.Sum(s => s.Count);

                return Ok(new
                {
                    StatusCounts = statusCounts,
                    Total = total
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Get membership by member ID by search
        [HttpPost("searchMembership/{id}")]
        public async Task<IActionResult> GetMembershipById(int id)
        {
            try
            {
                var membership = await _membershipsService.GetMembershipByMemberIdAsync(id);
                if (membership == null)
                    return NotFound($"Membership for Member ID {id} not found.");

                return Ok(membership);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Returning a specific member with all details
        [HttpGet("getMember/{id}")]
        public async Task<IActionResult> GetMember(int id)
        {
            try
            {
                var member = await _membershipsService.GetMemberByIdAsync(id);
                if (member == null)
                    return NotFound($"Member with Member ID {id} not found.");

                return Ok(member);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("getMembersByMembership/{level}")]
        public async Task<IActionResult> GetMembersByMembership(string level)
        {
            try
            {
                var members = await _membershipsService.GetMembersByMembershipLevelAsync(level);
                return Ok(members);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}