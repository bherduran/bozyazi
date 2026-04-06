import { Link }           from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../styles/Footer.css'

export default function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">Bozyazı</Link>
          <p className="footer-tagline">{t('footer_tagline')}</p>
        </div>
        <nav className="footer-nav">
          <Link to="/kesifet">{t('nav_discover')}</Link>
          <Link to="/doga">{t('nav_nature')}</Link>
          <Link to="/kultur">{t('nav_culture')}</Link>
          <Link to="/galeri">{t('nav_gallery')}</Link>
          <Link to="/ziyaret">{t('nav_visit')}</Link>
        </nav>
        <div className="footer-meta">
          <p>{t('footer_location')}</p>
          <p className="coords">36°31′K 32°57′D</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Bozyazı — {t('footer_rights')}</p>
      </div>
    </footer>
  )
}
