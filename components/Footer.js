import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>ReadHorizon</div>
        <div className={styles.footerLinks}>
          <Link href="/privacy" className={styles.footerLink}>Privacy</Link>
          <Link href="/contact" className={styles.footerLink}>Contact</Link>
          <a 
            href="https://github.com/yourusername/readhorizon" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            GitHub
          </a>
        </div>
        <div className={styles.footerCopyright}>
          © {new Date().getFullYear()} ReadHorizon. All rights reserved.
        </div>
      </div>
    </footer>
  )
}