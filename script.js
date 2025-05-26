// Supabase Configuration
const SUPABASE_URL = 'https://your-project.supabase.co' // Replace with your Supabase project URL
const SUPABASE_ANON_KEY = 'your-anon-key' // Replace with your Supabase anon key
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Scroll Reveal Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target) // Only animate once
        }
    })
}, observerOptions)

// Observe all elements with reveal-on-scroll class
document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el)
})

// Form Submission Handler
async function handleSubmit(event, formId) {
    event.preventDefault()
    const form = document.getElementById(formId)
    const input = form.querySelector('input[type="email"]')
    const button = form.querySelector('button')
    const messageDiv = form.querySelector('.form-message')
    
    // Disable form while submitting
    input.disabled = true
    button.disabled = true
    button.textContent = 'Joining...'
    
    try {
        const { data, error } = await supabase
            .from('waitlist')
            .insert([{ email_address: input.value }])
        
        if (error) throw error
        
        // Success message
        messageDiv.textContent = 'Thanks for joining! We\'ll be in touch soon.'
        messageDiv.className = 'form-message success'
        input.value = ''
    } catch (error) {
        // Error message
        messageDiv.textContent = error.message || 'Something went wrong. Please try again.'
        messageDiv.className = 'form-message error'
    } finally {
        // Re-enable form
        input.disabled = false
        button.disabled = false
        button.textContent = 'Join Waitlist'
    }
}

// Add submit handlers to both forms
document.getElementById('waitlist-form-top').addEventListener('submit', (e) => handleSubmit(e, 'waitlist-form-top'))
document.getElementById('waitlist-form-bottom').addEventListener('submit', (e) => handleSubmit(e, 'waitlist-form-bottom'))

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
})