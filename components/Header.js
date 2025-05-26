import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>ReadHorizon</div>
        <Link href="#waitlist" className={styles.waitlistButton}>
          Join Waitlist
        </Link>
      </nav>
    </header>
  )
}