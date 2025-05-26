// Supabase setup
const SUPABASE_URL = 'https://yhzkgfgwblhwuatkpmbg.supabase.co'; // Replace with your project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloemtnZmd3Ymxod3VhdGtwbWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDc4MTksImV4cCI6MjA2MzgyMzgxOX0.SG_aqjc9bvXaiUTvObK8pmNw0ZlSUpFAksP4ejZvciI'; // Replace with your anon/public key

// Initialize client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('waitlist-form');
  const input = form.querySelector('input[type="email"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = input.value.trim();
    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }

    const { error } = await supabaseClient
      .from('waitlist')
      .insert([{ email_adress: email }]);

    if (error) {
      console.error('Error inserting email:', error);
      alert('Failed to join waitlist. Try again later.');
    } else {
      alert('Thanks for joining the waitlist!');
      form.reset();
    }
  });
});
