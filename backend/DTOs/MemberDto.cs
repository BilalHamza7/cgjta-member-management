namespace Backend.DTOs
{
    public class MemberDto
    {
        public int MemberId { get; set; }
        public string ProfileUrl { get; set; }
        public string FullName { get; set; }
        public DateOnly JoinDate { get; set; }
        public string Email { get; set; }
        public string NicNumber { get; set; }
        public string MobileNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string BusinessName { get; set; }
        public string BusinessActivity { get; set; }
        public string BusinessType { get; set; }
        public bool Chinafort { get; set; }
        public int MembershipId { get; set; }
        public MembershipDto Membership { get; set; }
    }

    public class MembershipDto
    {
        public int? MembershipId { get; set; }
        public string Status { get; set; }
        public string LevelName { get; set; }
        public bool? Paid { get; set; }
        public DateOnly? RenewalDate { get; set; }
        public DateOnly? ExpiryDate { get; set; }
    }
}