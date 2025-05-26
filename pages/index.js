import { useRef, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Header from '../components/Header'
import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import WaitlistForm from '../components/WaitlistForm'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef()

  useEffect(() => {
    // Register GSAP animations
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      })

      // Feature animations
      gsap.utils.toArray('.feature').forEach((feature, i) => {
        gsap.from(feature, {
          scrollTrigger: {
            trigger: feature,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power2.out'
        })
      })

      // Subtle parallax effects
      gsap.utils.toArray('.parallax').forEach((layer) => {
        const speed = layer.dataset.speed || 1
        gsap.to(layer, {
          y: 100 * speed,
          scrollTrigger: {
            trigger: layer,
            scrub: true
          }
        })
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.container} ref={mainRef}>
      <Head>
        <title>ReadHorizon | Track Your Reading Journey</title>
        <meta name="description" content="Track your reading, build your habits, and stay inspired with ReadHorizon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <Hero />
        <div className={styles.features}>
          <FeatureSection 
            title="Visualize Your Reading Journey"
            description="See your progress through beautiful charts and statistics. Watch your reading horizon expand with every book."
            image="/images/feature1.png"
            align="left"
          />
          <FeatureSection 
            title="Offline-first. Sync Later."
            description="Track your books even without internet. Seamless syncing when you're back online."
            image="/images/feature2.png"
            align="right"
          />
          <FeatureSection 
            title="Finish Books, Not Just Start Them"
            description="Get personalized reminders and motivation to help you complete what you start."
            image="/images/feature3.png"
            align="left"
          />
        </div>
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  )
}