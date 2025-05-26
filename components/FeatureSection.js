import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import styles from '../styles/Home.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function FeatureSection({ title, description, image, align = 'left' }) {
  const sectionRef = useRef()

  useEffect(() => {
    const section = sectionRef.current
    
    // Set initial visibility
    gsap.set(['.feature-content', '.feature-image'], { 
      opacity: 1 
    })

    const contentAnimation = gsap.from(section.querySelector('.feature-content'), {
      x: align === 'left' ? -50 : 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    const imageAnimation = gsap.from(section.querySelector('.feature-image'), {
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      contentAnimation.scrollTrigger.kill()
      imageAnimation.scrollTrigger.kill()
    }
  }, [align])

  const getPlaceholderGradient = () => {
    const gradients = [
      'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
      'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
    ]
    
    const index = title.length % gradients.length
    return gradients[index]
  }

  return (
    <section className={`${styles.feature} feature`} data-align={align} ref={sectionRef}>
      <div className={`${styles.featureContent} feature-content`}>
        <h2 className={styles.featureTitle}>{title}</h2>
        <p className={styles.featureDescription}>{description}</p>
      </div>
      <div 
        className={`${styles.featureImage} feature-image`}
        style={{
          background: getPlaceholderGradient(),
          borderRadius: '20px',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: '500',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        }}
      >
        {title.split(' ')[0]} Illustration
      </div>
    </section>
  )
}