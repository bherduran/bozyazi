// Footer.jsx
// Basit bir "presentational component" — sadece görünüm, mantık yok.
// App.jsx'te bir kez tanımlanır, tüm sayfalarda görünür.

import { Link } from 'react-router-dom'
import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">Bozyazı</Link>
          <p className="footer-tagline">Toroslar'ın Denizle Buluştuğu Yer</p>
        </div>

        <nav className="footer-nav">
          <Link to="/kesifet">Keşfet</Link>
          <Link to="/doga">Doğa</Link>
          <Link to="/kultur">Kültür</Link>
          <Link to="/galeri">Galeri</Link>
          <Link to="/ziyaret">Ziyaret</Link>
        </nav>

        <div className="footer-meta">
          <p>Mersin İli · <span>Türkiye</span> · Akdeniz Kıyısı</p>
          <p className="coords">36°31′K 32°57′D</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Bozyazı — Tüm hakları saklıdır.</p>
      </div>
    </footer>
  )
}
