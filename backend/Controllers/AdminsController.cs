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

        [HttpPost("registerAdmin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] Admins admin)
        {
            if (admin == null || string.IsNullOrEmpty(admin.Email) || string.IsNullOrEmpty(admin.Password))
                return BadRequest("Email and Password are required.");

            try
            {
                var newAdmin = await _adminsService.RegisterAdminAsync(admin.Email, admin.Username, admin.Password);

                if (newAdmin == null)
                    return StatusCode(500, "Failed to register admin.");

                return Ok(newAdmin);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

    }
}