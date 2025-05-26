// Supabase setup
const SUPABASE_URL = 'https://yhzkgfgwblhwuatkpmbg.supabase.co'; // Replace with your project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloemtnZmd3Ymxod3VhdGtwbWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDc4MTksImV4cCI6MjA2MzgyMzgxOX0.SG_aqjc9bvXaiUTvObK8pmNw0ZlSUpFAksP4ejZvciI'; // Replace with your anon/public key

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Handle waitlist form submit

console.log('Script loaded ✅');

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
      .from('waitlist') // Assuming your table is named "waitlist"
      .insert([{ email_address: email }]);

    if (error) {
      console.error('Supabase insert error:', error);
      alert('Something went wrong. Please try again later.');
    } else {
      alert('Thanks for joining the waitlist!');
      form.reset();
    }
  });
});
