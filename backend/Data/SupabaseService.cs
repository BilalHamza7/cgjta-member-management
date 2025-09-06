using Supabase;

namespace Backend.Data
{
    public class SupabaseService
    {
        private readonly Client _client;

        public SupabaseService()
        {
            var supabaseUrl = Environment.GetEnvironmentVariable("SUPABASE_URL") ?? throw new InvalidOperationException("SUPABASE_URL is not set");
            var supabaseKey = Environment.GetEnvironmentVariable("SUPABASE_KEY") ?? throw new InvalidOperationException("SUPABASE_KEY is not set");
            var options = new SupabaseOptions
            {
                AutoConnectRealtime = true
            };

            _client = new Client(supabaseUrl, supabaseKey, options);

            // Initialize once synchronously
            _client.InitializeAsync().GetAwaiter().GetResult();
        }

        // Expose the Supabase client
        public Client GetClient() => _client;
    }
}