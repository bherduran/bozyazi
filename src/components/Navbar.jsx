// Navbar.jsx
//
// Yeni eklenenler:
// 1. useTranslation hook — i18next'ten çeviri fonksiyonu alır
//    const { t, i18n } = useTranslation('common')
//    t('nav_home') → "Ana Sayfa" veya "Home"
// 2. Dil toggle butonu — TR/EN arasında geçiş
//    i18n.changeLanguage() ile dil değiştirilir
//    localStorage'a kaydedilir — sayfa yenilenince hatırlanır

import { useState, useEffect }          from 'react'
import { NavLink, Link }                from 'react-router-dom'
import { useTranslation }               from 'react-i18next'
import '../styles/Navbar.css'

export default function Navbar() {
  const { t, i18n } = useTranslation('common')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen,     setIsOpen]     = useState(false)

  // Dil değiştirme fonksiyonu
  function toggleLang() {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr'
    i18n.changeLanguage(newLang)
    // Seçimi localStorage'a kaydet
    localStorage.setItem('bozyazi-lang', newLang)
  }

  const NAV_ITEMS = [
    { path: '/',        label: t('nav_home')      },
    { path: '/kesifet', label: t('nav_discover')  },
    { path: '/doga',    label: t('nav_nature')    },
    { path: '/kultur',  label: t('nav_culture')   },
    { path: '/galeri',  label: t('nav_gallery')   },
    { path: '/asistan', label: t('nav_assistant') },
    { path: '/ziyaret', label: t('nav_visit')     },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          Bozyazı
        </Link>

        <ul className="nav-links">
          {NAV_ITEMS.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          {/* Dil Toggle Butonu */}
          <li>
            <button className="lang-toggle" onClick={toggleLang}>
              {i18n.language === 'tr' ? 'EN' : 'TR'}
            </button>
          </li>
        </ul>

        <div className="nav-right">
          {/* Mobilde dil butonu */}
          <button className="lang-toggle lang-toggle--mobile" onClick={toggleLang}>
            {i18n.language === 'tr' ? 'EN' : 'TR'}
          </button>

          <button
            className={`hamburger ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={isOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
            end={item.path === '/'}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </>
  )
}
