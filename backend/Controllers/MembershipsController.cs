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
    }
}