using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

[Table("memberships")]
public class Memberships : BaseModel
{
    [PrimaryKey("member_id", false)]
    public int MemberId { get; set; }

    [Column("profile_url")]
    public string ProfileUrl { get; set; }

    [Column("fullname")]
    public string FullName { get; set; }

    [Column("join_date")]
    public string JoinDate { get; set; }

    [Column("email")]
    public string BusinessName { get; set; }

    [Column("registered_no")]
    public string RegisteredNo { get; set; }

    [Column("located_city")]
    public string LocatedCity { get; set; }

    [Column("address")]
    public string Address { get; set; }

    [Column("password")]
    public string Password { get; set; }
}
