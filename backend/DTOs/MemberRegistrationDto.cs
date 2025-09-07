using Backend.Models;

namespace Backend.DTOs
{
    // carries the member data + membership data.
    public class MemberRegistrationDto
    {
        public Members Member { get; set; } = new Members();
        public Memberships Membership { get; set; } = new Memberships();
    }
}