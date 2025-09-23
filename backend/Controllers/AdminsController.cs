using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/admins")]
    public class AdminsController(AdminsService adminsService) : ControllerBase
    {
        private readonly AdminsService _adminsService = adminsService;

        public class LoginDto
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        [HttpPost("adminLogin")]
        public async Task<IActionResult> AdminLogin([FromBody] LoginDto dto, [FromServices] JwtService jwtService)
        {
            if (dto == null || string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password))
                return BadRequest("Email and Password are required.");

            var loggedInAdmin = await _adminsService.AdminLoginAsync(dto.Email, dto.Password);
            if (loggedInAdmin == null)
                return Unauthorized("Invalid email or password.");

            var token = jwtService.GenerateToken(loggedInAdmin);

            return Ok(new
            {
                Token = token,
                loggedInAdmin.AdminId,
                loggedInAdmin.Email,
                loggedInAdmin.Username
            });
        }
    }
}