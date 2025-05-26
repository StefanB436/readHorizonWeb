// Supabase setup
const SUPABASE_URL = 'https://your-project-id.supabase.co'; // Replace with your project URL
const SUPABASE_ANON_KEY = 'your-anon-key'; // Replace with your anon/public key

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Handle waitlist form submit
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
