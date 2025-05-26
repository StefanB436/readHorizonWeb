import styles from '../styles/Home.module.css'
import Image from 'next/image'

export default function FeatureSection({ title, description, image, align = 'left' }) {
  return (
    <section className={`${styles.feature} feature`} data-align={align}>
      <div className={styles.featureContent}>
        <h2 className={styles.featureTitle}>{title}</h2>
        <p className={styles.featureDescription}>{description}</p>
      </div>
      <div className={styles.featureImage}>
        <Image 
          src={image} 
          alt={title}
          width={500}
          height={400}
          className="parallax"
          data-speed="0.1"
        />
      </div>
    </section>
  )
}