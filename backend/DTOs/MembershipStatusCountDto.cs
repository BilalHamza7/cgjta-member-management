using Backend.Models;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace Backend.DTOs
{
    // carries the member data + membership data.
    [Table("memberships")]
    public class MembershipStatusCountDto : BaseModel
    {
        [Column("status")]
        public string Status { get; set; } = string.Empty;

        [Column("count")]
        public int Count { get; set; }
    }
}