// Navbar.jsx
//
// Bu bileşen iki React hook kullanır:
//
// 1. useState → Bileşenin "hafızası"
//    Hamburger menünün açık mı kapalı mı olduğunu tutar.
//    State değişince React bileşeni yeniden render eder.
//    Sözdizimi: const [değer, değeriGüncelle] = useState(başlangıç)
//
// 2. useEffect → Yan etkiler (side effects)
//    Scroll event listener gibi React dışı işlemler için.
//    Component render edildikten sonra çalışır.
//    Sözdizimi: useEffect(() => { iş }, [bağımlılıklar])

import { useState, useEffect } from 'react'
import { NavLink, Link }       from 'react-router-dom'
import '../styles/Navbar.css'

// Navigasyon linkleri — veri ile görünümü ayırmak iyi pratiktir.
// Link eklemek istersen sadece bu diziyi değiştirirsin, JSX'e dokunmazsın.
const NAV_ITEMS = [
  { path: '/',        label: 'Ana Sayfa' },
  { path: '/kesifet', label: 'Keşfet'   },
  { path: '/doga',    label: 'Doğa'     },
  { path: '/kultur',  label: 'Kültür'   },
  { path: '/galeri',  label: 'Galeri'   },
  { path: '/ziyaret', label: 'Ziyaret'  },
]

export default function Navbar() {

  // ── STATE ────────────────────────────────────────────────────
  // isScrolled: Kullanıcı sayfayı aşağı kaydırdı mı?
  // isOpen:     Mobil menü açık mı?
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen,     setIsOpen]     = useState(false)


  // ── EFFECT: SCROLL DİNLEYİCİ ─────────────────────────────────
  // Component DOM'a eklenince çalışır ([] = sadece bir kez).
  // Temizleme fonksiyonu (return içi): component kaldırılınca
  // event listener'ı siler — bellek sızıntısını önler.
  useEffect(() => {

    const handleScroll = () => {
      // 10px'den fazla kaydırılmışsa scrolled = true
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)

    // Temizleme (cleanup): component DOM'dan çıkınca çalışır
    return () => window.removeEventListener('scroll', handleScroll)

  }, []) // Boş dizi = sadece mount/unmount'ta çalış


  // ── EFFECT: MENÜ AÇIKKEN SAYFA KAYDIRMAYI ENGELLE ────────────
  useEffect(() => {
    // Mobil menü açıkken arka plana kaydırma olmasın
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen]) // isOpen değişince çalış


  // ── YARDIMCI FONKSİYON ───────────────────────────────────────
  // Mobil menüdeki bir linke tıklanınca menüyü kapat
  const closeMenu = () => setIsOpen(false)


  // ── RENDER ───────────────────────────────────────────────────
  // JSX: JavaScript içinde HTML gibi görünen sözdizimi.
  // Fark: class yerine className, for yerine htmlFor kullanılır.
  // {} içine JavaScript yazabilirsin.
  return (
    <>
      {/* ── ANA NAVBAR ── */}
      {/*
        Template literal ile koşullu sınıf:
        `navbar ${isScrolled ? 'scrolled' : ''}`
        isScrolled true ise "navbar scrolled", false ise "navbar"
      */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>

        {/* Logo: Ana sayfaya link */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          Bozyazı
        </Link>

        {/* ── MASAÜSTÜ LİNKLER ── */}
        {/*
          .map() → Diziyi JSX elemanlarına dönüştürür.
          key prop → React'in her elemanı takip etmesi için zorunlu.
          NavLink → React Router'ın özel Link'i; aktif sayfaya
                    otomatik olarak "active" class'ı ekler.
          end prop → Sadece "/" için tam eşleşme zorunluluğu;
                     yoksa "/" her route'ta aktif olurdu.
        */}
        <ul className="nav-links">
          {NAV_ITEMS.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── HAMBURGEr BUTONU (Mobil) ── */}
        {/*
          aria-label: Ekran okuyucular için erişilebilirlik.
          aria-expanded: Menü açık mı bilgisini okuyucuya verir.
          onClick: Tıklanınca isOpen'ı tersine çevirir (toggle).
          !isOpen → true ise false, false ise true yapar.
        */}
        <button
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>

      </nav>

      {/* ── MOBİL MENÜ ── */}
      {/*
        Navbar'ın dışında ama aynı z-index katmanında.
        nav className değil ayrı bir div — CSS ile konumlandırılır.
      */}
      <div
        className={`mobile-menu ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
      >
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `mobile-link ${isActive ? 'active' : ''}`
            }
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
