using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/members")]
    public class MembersController : ControllerBase
    {
        private readonly MembersService _membersService;

        public MembersController(MembersService membersService)
        {
            _membersService = membersService;
        }

        [HttpGet("getAllMembers")]
        public async Task<IActionResult> GetAllMembers()
        {
            var members = await _membersService.GetAllMembersAsync();
            return Ok(members);
        }
    }
}