using System.ComponentModel.DataAnnotations;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace Backend.Models
{
    [Table("members")]
    public class Members : BaseModel
    {
        [PrimaryKey("member_id", false)]
        public int MemberId { get; set; }

        [Column("profile_url")]
        public string? ProfileUrl { get; set; }

        [Column("fullname")]
        public string FullName { get; set; } = string.Empty;

        [Column("join_date")]
        public DateOnly JoinDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);

        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [Column("nic_number")]
        public string? NicNumber { get; set; }

        [Column("mobile_number")]
        public string? MobileNumber { get; set; }

        [Column("address")]
        public string Address { get; set; } = string.Empty;

        [Column("city")]
        public string? City { get; set; }

        [Column("postal_code")]
        public string? PostalCode { get; set; }

        [Column("country")]
        public string? Country { get; set; }

        [Column("business_name")]
        public string BusinessName { get; set; } = string.Empty;

        [Column("business_activity")]
        public string? BusinessActivity { get; set; }

        [Column("business_type")]
        public string? BusinessType { get; set; }

        [Column("chinafort")]
        public string Chinafort { get; set; } = string.Empty;

        [Column("membership_id")]
        public int MembershipId { get; set; }
    }
}