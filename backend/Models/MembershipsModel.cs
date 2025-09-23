using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace Backend.Models
{
    [Table("memberships")]
    public class Memberships : BaseModel
    {
        [PrimaryKey("membership_id", false)]
        public int MembershipId { get; set; }

        [Column("level_name")]
        public string LevelName { get; set; } = string.Empty;

        [Column("paid")]
        public bool Paid { get; set; } = true;

        [Column("status")]
        public string Status { get; set; } = "Active";

        [Column("renewal_date")]
        public DateOnly RenewalDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);

        [Column("expiry_date")]
        public DateOnly ExpiryDate { get; set; } = DateOnly.FromDateTime(DateTime.Now.AddYears(1));
    }
}