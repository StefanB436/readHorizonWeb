// Make content visible by default when JS loads
document.addEventListener('DOMContentLoaded', () => {
    // Set initial visibility of all elements
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        el.style.opacity = '1'
        el.style.transform = 'none'
    })

    // Then start observing for scroll animations
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
        // Reset the element's initial state for animation
        el.style.opacity = ''
        el.style.transform = ''
        observer.observe(el)
    })

    // Supabase Configuration
    const SUPABASE_URL = 'https://yhzkgfgwblhwuatkpmbg.supabase.co' // Replace with your Supabase project URL
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloemtnZmd3Ymxod3VhdGtwbWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDc4MTksImV4cCI6MjA2MzgyMzgxOX0.SG_aqjc9bvXaiUTvObK8pmNw0ZlSUpFAksP4ejZvciI' // Replace with your Supabase anon key
    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

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
})