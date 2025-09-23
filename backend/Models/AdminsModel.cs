using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace Backend.Models
{
    [Table("admins")]
    public class Admins : BaseModel
    {
        [PrimaryKey("admin_id", false)]
        public int AdminId { get; set; }

        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [Column("username")]
        public string Username { get; set; } = string.Empty;

        [Column("password")]
        public string Password { get; set; } = string.Empty;
    }
}
