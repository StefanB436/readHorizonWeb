import styles from '../styles/Home.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.heroContent} hero-content`}>
        <h1 className={styles.heroTitle}>ReadHorizon</h1>
        <p className={styles.heroTagline}>Turn every page into progress.</p>
        <p className={styles.heroSubtitle}>
          Track your reading, build your habits, and stay inspired.
        </p>
        <a href="#waitlist" className={styles.heroCta}>
          Join Waitlist
        </a>
      </div>
      <div className={`${styles.heroBackground} parallax`} data-speed="0.2"></div>
    </section>
  )
}