// Supabase setup
const SUPABASE_URL = 'https://yhzkgfgwblhwuatkpmbg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloemtnZmd3Ymxod3VhdGtwbWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDc4MTksImV4cCI6MjA2MzgyMzgxOX0.SG_aqjc9bvXaiUTvObK8pmNw0ZlSUpFAksP4ejZvciI'; 

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM Elements
const elements = {
  nav: document.querySelector('nav'),
  menuToggle: document.querySelector('.menu-toggle'),
  navLinks: document.querySelector('.nav-links'),
  form: document.getElementById('waitlist-form'),
  emailInput: document.querySelector('#waitlist-form input[type="email"]'),
  featureCards: document.querySelectorAll('.feature-card'),
  ctaButtons: document.querySelectorAll('.btn-primary, .btn-secondary'),
  floatingDevices: document.querySelectorAll('.device')
};

// Initialize GSAP animations
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  
  // Set up scroll animations for all sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out"
    });
  });

  // Hero section specific animations
  gsap.from('.hero-content', {
    duration: 1.2,
    y: 80,
    opacity: 0,
    ease: "power3.out",
    delay: 0.2
  });

  // Feature cards staggered animation
  gsap.from('.feature-card', {
    scrollTrigger: {
      trigger: '.features',
      start: "top 75%"
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.2)"
  });

  // Floating devices animation
  elements.floatingDevices.forEach((device, index) => {
    gsap.from(device, {
      scrollTrigger: {
        trigger: '.waitlist',
        start: "top 75%"
      },
      y: index % 2 === 0 ? 50 : -50,
      opacity: 0,
      duration: 1,
      delay: index * 0.2,
      ease: "power3.out"
    });
  });

  // Continuous floating animation for devices
  elements.floatingDevices.forEach(device => {
    gsap.to(device, {
      y: "+=20",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
}

// Initialize hover effects
function initHoverEffects() {
  // Button hover effects
  elements.ctaButtons.forEach(button => {
    const hoverEffect = document.createElement('div');
    hoverEffect.className = 'btn-hover-effect';
    button.appendChild(hoverEffect);
    
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(button.querySelector('.btn-hover-effect'), {
        x: x,
        y: y,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });

  // Feature card hover effects
  elements.featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      gsap.to(card, {
        rotationX: angleX,
        rotationY: angleY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)"
      });
    });
  });
}

// Form handling
function initForm() {
  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = elements.emailInput.value.trim();
    
    if (!validateEmail(email)) {
      showToast('Please enter a valid email address.', 'error');
      shakeElement(elements.emailInput);
      return;
    }
    
    try {
      const { error } = await supabaseClient
        .from('waitlist') 
        .insert([{ email_address: email }]);
      
      if (error) throw error;
      
      showToast('🎉 Thanks for joining the waitlist!', 'success');
      elements.form.reset();
      triggerConfetti();
      
      // Track conversion
      if (window.gtag) {
        gtag('event', 'conversion', {
          'send_to': 'AW-123456789/AbCdEfGhIjKlMnOpQrStUv'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast('⚠️ Something went wrong. Please try again.', 'error');
    }
  });
}

// Helper functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-message">${message}</div>
    <div class="toast-progress"></div>
  `;
  document.body.appendChild(toast);
  
  // Animation in
  gsap.from(toast, {
    y: 50,
    opacity: 0,
    duration: 0.3,
    ease: "power2.out"
  });
  
  // Progress bar animation
  gsap.to(toast.querySelector('.toast-progress'), {
    width: '0%',
    duration: 3,
    ease: "linear"
  });
  
  // Animation out
  setTimeout(() => {
    gsap.to(toast, {
      y: -50,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => toast.remove()
    });
  }, 3000);
}

function shakeElement(element) {
  gsap.to(element, {
    x: [-5, 5, -5, 5, 0],
    duration: 0.5,
    ease: "power1.out"
  });
}

function triggerConfetti() {
  // Use built-in confetti if available
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4361ee', '#3a0ca3', '#7209b7', '#f72585']
    });
  } else {
    // Fallback to GSAP particles
    createParticles(elements.form);
  }
}

function createParticles(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    particle.style.backgroundColor = ['#4361ee', '#3a0ca3', '#7209b7', '#f72585'][Math.floor(Math.random() * 4)];
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 5 + Math.random() * 5;
    const x = centerX + Math.cos(angle) * 20;
    const y = centerY + Math.sin(angle) * 20;
    
    gsap.set(particle, {
      x: x,
      y: y,
      width: 8 + Math.random() * 8,
      height: 8 + Math.random() * 8,
      borderRadius: '50%'
    });
    
    gsap.to(particle, {
      x: x + Math.cos(angle) * velocity * 30,
      y: y + Math.sin(angle) * velocity * 30 + 100,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => particle.remove()
    });
  }
}

// Mobile menu toggle
function initMobileMenu() {
  elements.menuToggle.addEventListener('click', () => {
    const isExpanded = elements.navLinks.style.display === 'flex';
    
    if (isExpanded) {
      gsap.to(elements.navLinks, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          elements.navLinks.style.display = 'none';
        }
      });
    } else {
      elements.navLinks.style.display = 'flex';
      gsap.from(elements.navLinks, {
        opacity: 0,
        y: -20,
        duration: 0.3
      });
    }
    
    // Animate hamburger icon
    gsap.to(elements.menuToggle, {
      rotation: isExpanded ? 0 : 90,
      duration: 0.3
    });
  });
}

// Scroll event for nav
function initScrollEvents() {
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Nav background on scroll
    if (currentScroll > 50) {
      elements.nav.classList.add('scrolled');
      
      // Hide nav on scroll down
      if (currentScroll > lastScroll && currentScroll > 100) {
        gsap.to(elements.nav, {
          y: -80,
          duration: 0.3
        });
      } else {
        gsap.to(elements.nav, {
          y: 0,
          duration: 0.3
        });
      }
    } else {
      elements.nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initHoverEffects();
  initForm();
  initMobileMenu();
  initScrollEvents();
  
  // Add cursor follower for interactive elements
  initCursorFollower();
  
  console.log('All scripts initialized 🚀');
});

// Bonus: Cursor follower for interactive elements
function initCursorFollower() {
  const follower = document.createElement('div');
  follower.className = 'cursor-follower';
  document.body.appendChild(follower);
  
  // Scale up on interactive elements
  const interactiveElements = [
    ...document.querySelectorAll('a'),
    ...document.querySelectorAll('button'),
    ...document.querySelectorAll('input'),
    ...document.querySelectorAll('.feature-card')
  ];
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(follower, {
        scale: 3,
        backgroundColor: 'rgba(67, 97, 238, 0.2)',
        duration: 0.3
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        duration: 0.3
      });
    });
  });
  
  // Follow mouse movement
  window.addEventListener('mousemove', (e) => {
    gsap.to(follower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      ease: "power2.out"
    });
  });
}