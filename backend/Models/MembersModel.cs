using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace Backend.Models
{
    [Table("members")] 
    public class Members : BaseModel
    {
        [PrimaryKey("id", false)]
        public int Id { get; set; }

        [Column("full_name")]
        public string FullName { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("business_name")]
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
}