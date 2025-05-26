import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '../styles/Home.module.css'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email_address: email }])

      if (error) throw error

      toast.success('Thanks for joining our waitlist! We\'ll be in touch soon.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      
      setEmail('')
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.', {
        position: 'bottom-right',
        autoClose: 5000,
      })
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
        
        <form onSubmit={handleSubmit} className={styles.waitlistForm}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className={styles.waitlistInput}
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading}
            className={styles.waitlistSubmit}
          >
            {loading ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  )
}