import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Enable smooth scrolling
    const html = document.documentElement
    html.style.scrollBehavior = 'smooth'
  }, [])

  return <Component {...pageProps} />
}

export default MyApp