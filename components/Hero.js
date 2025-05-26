import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import styles from '../styles/Home.module.css'

export default function Hero() {
  const heroRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.from(heroRef.current.querySelector('h1'), {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    })
    .from(heroRef.current.querySelector('.tagline'), {
      y: 50,
      opacity: 0,
      duration: 0.8,
    }, "-=0.6")
    .from(heroRef.current.querySelector('.subtitle'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
    }, "-=0.6")
    .from(heroRef.current.querySelector('.cta'), {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
    }, "-=0.4")

    // Parallax effect on background
    gsap.to(heroRef.current.querySelector('.parallax'), {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })
  }, [])

  return (
    <section className={styles.hero} ref={heroRef}>
      <motion.div 
        className={`${styles.heroContent} hero-content`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.heroTitle}>ReadHorizon</h1>
        <p className={`${styles.heroTagline} tagline`}>Turn every page into progress.</p>
        <p className={`${styles.heroSubtitle} subtitle`}>
          Track your reading, build your habits, and stay inspired.
        </p>
        <motion.a 
          href="#waitlist" 
          className={`${styles.heroCta} cta`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Waitlist
        </motion.a>
      </motion.div>
      <div className={`${styles.heroBackground} parallax`} data-speed="0.2">
        <motion.div 
          className={styles.bgGradient}
          animate={{ 
            background: [
              "linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)",
              "linear-gradient(135deg, #e8e8ed 0%, #f5f5f7 100%)"
            ]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
      </div>
    </section>
  )
}