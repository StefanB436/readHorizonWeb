import { useState } from 'react'
import { supabase } from '../lib/supabase'
import styles from '../styles/Home.module.css'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }])

      if (error) throw error

      setSuccess(true)
      setEmail('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="waitlist" className={styles.waitlist}>
      <div className={styles.waitlistContent}>
        <h2 className={styles.waitlistTitle}>Join the ReadHorizon Waitlist</h2>
        <p className={styles.waitlistSubtitle}>
          Be among the first to experience mindful reading tracking.
        </p>
        
        {success ? (
          <div className={styles.successMessage}>
            <p>Thank you for joining our waitlist! We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.waitlistForm}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className={styles.waitlistInput}
            />
            <button 
              type="submit" 
              disabled={loading}
              className={styles.waitlistSubmit}
            >
              {loading ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        )}

        {error && (
          <p className={styles.errorMessage}>{error}</p>
        )}
      </div>
    </section>
  )
}