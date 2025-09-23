using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Supabase.Postgrest.Interfaces;
using static Supabase.Postgrest.Constants;

namespace Backend.Services
{
    public class AdminsService(SupabaseService clientFactory)
    {
        private readonly SupabaseService _clientFactory = clientFactory;

        public async Task<Admins?> RegisterAdminAsync(string email, string username, string password)
        {
            var client = _clientFactory.GetClient();

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

            var admin = new Admins
            {
                Email = email,
                Password = hashedPassword,
                Username = username
            };

            var response = await client.From<Admins>().Insert(admin);

            return response.Models.FirstOrDefault();
        }

        public async Task<Admins?> AdminLoginAsync(string email, string password)
        {
            var client = _clientFactory.GetClient();
            var response = await client
                .From<Admins>()
                .Select("*")
                .Filter("email", Operator.Equals, email)
                .Get();

            var admin = response.Models.FirstOrDefault();
            if (admin == null) return null;

            // returns true or false
            return BCrypt.Net.BCrypt.Verify(password, admin.Password) ? admin : null;
        }
    }
}