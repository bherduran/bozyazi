// Home.jsx — Ana Sayfa
//
// Birden fazla küçük bileşenden oluşur:
// <Hero />    → Tam ekran giriş bölümü
// <Stats />   → Rakamsal bilgiler
// <Preview /> → Diğer sayfalara kısa bakış + linkler
//
// Bunları ayrı bileşen yapmak yerine direkt burada yazdık
// çünkü sadece bu sayfada kullanılıyorlar.

import { Link } from 'react-router-dom'
import '../styles/Home.css'

// ── HERO VERİSİ ─────────────────────────────────────────────
// Veriyi bileşenin dışında tutmak: component temiz kalır.
const STATS = [
  { num: '642',   label: 'km² Yüzölçümü'          },
  { num: 'MÖ 4.', label: 'Yüzyıldan Gelen Tarih'  },
  { num: '300+',  label: 'Güneşli Gün / Yıl'       },
  { num: '220',   label: 'km Batısında Mersin'      },
]

const PREVIEWS = [
  {
    to: '/kesifet',
    tag: 'Antik & Tarihi',
    title: 'Keşfet',
    desc: 'Nagidos Antik Kenti, Softa Kalesi, Maraş Tepesi ve daha fazlası.',
    color: 'var(--sea)',
  },
  {
    to: '/doga',
    tag: 'Doğal Güzellikler',
    title: 'Doğa',
    desc: 'Kristal Akdeniz, Toros yürüyüş rotaları, Çaltı Mağarası.',
    color: '#1a3a20',
  },
  {
    to: '/kultur',
    tag: 'Yaşam & Lezzet',
    title: 'Kültür',
    desc: 'Deniz ürünleri, yerel pazarlar, Türk misafirperverliği.',
    color: '#3a2a08',
  },
  {
    to: '/galeri',
    tag: 'Fotoğraflar',
    title: 'Galeri',
    desc: 'Bozyazı\'nın dört mevsim güzelliğini keşfedin.',
    color: '#2a0a2a',
  },
]

// ── ANA BILEŞEN ──────────────────────────────────────────────
export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Ticker />
      <About />
      <PreviewGrid />
    </div>
  )
}

// ── HERO ─────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        {/* Yüzen partiküller — sadece CSS animasyonu, JS yok */}
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`particle particle--${i + 1}`} />
        ))}
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow">Mersin İli · Türkiye · Akdeniz Kıyısı</p>
        <h1 className="hero-title">
          Toroslar'ın<br />
          <em>Denizle</em><br />
          Buluştuğu Yer
        </h1>
        <p className="hero-sub">
          Dramatik dağların ve berrak Akdeniz'in kucağında saklı, el değmemiş
          bir kıyı cenneti — Bozyazı, alışılmışın dışına çıkma cesareti
          gösterenleri bekliyor.
        </p>
        {/*
          Link: React Router'ın <a> alternatifi.
          Sayfa yenilenmeden yönlendirir — SPA davranışı.
        */}
        <Link to="/kesifet" className="hero-cta">
          İlçeyi Keşfet <span>→</span>
        </Link>
      </div>

      {/* SVG Dalga — CSS animasyonlu */}
      <div className="hero-waves">
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none">
          <path
            className="wave wave--1"
            d="M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80
               C1680,140 1920,20 2160,80 L2160,180 L0,180 Z"
          />
          <path
            className="wave wave--2"
            d="M0,100 C180,60 360,140 540,100 C720,60 900,140 1080,100
               C1260,60 1440,140 1620,100 C1800,60 1980,140 2160,100
               L2160,180 L0,180 Z"
          />
        </svg>
      </div>

      <p className="scroll-hint">Kaydır</p>
    </section>
  )
}

// ── TICKER (Kayan Yazı Bandı) ─────────────────────────────────
function Ticker() {
  const words = [
    'Akdeniz Kıyısı', 'Antik Kentler', 'Berrak Sular',
    'Toros Dağları', 'Narenciye Bahçeleri', 'Softa Kalesi', 'Nagidos',
  ]
  // İki kopya yan yana — sonsuz kayan efekti için
  const text = [...words, ...words].join(' · ')

  return (
    <div className="ticker" aria-hidden="true">
      <span>{text} · </span>
    </div>
  )
}

// ── HAKKINDA ─────────────────────────────────────────────────
function About() {
  return (
    <section className="about section-padding">
      <div className="about-text">
        <p className="section-label">Bozyazı Hakkında</p>
        <h2 className="section-title">
          Akdeniz'in<br /><em>Gizli Cenneti</em>
        </h2>
        <div className="gold-bar" />
        <p>
          Bozyazı; Mersin iline bağlı, muhteşem Toros Dağları ile pırıl pırıl
          Akdeniz arasına gizlenmiş, el değmemiş bir kıyı ilçesidir. Yaklaşık
          26.000 kişilik nüfusuyla, büyük tatil beldelerinin çoktan yitirdiği
          özgünlüğünü koruyan ender yerlerden biridir.
        </p>
        <p>
          Bir zamanlar ziyaretçileri uzak tutan dağ yolları artık bu ilçenin
          cazibesinin bir parçası — bu yolculuğu göze alanlar kristal
          berraklığında sular, Helenistik dönemden kalma antik kentler ve
          samimi bir sıcaklıkla karşılaşır.
        </p>

        {/* Stat kartları — .map() ile dinamik render */}
        <div className="stats-grid">
          {STATS.map(s => (
            <div key={s.label} className="stat-card">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <blockquote className="about-quote">
        <p>
          "Zamanın <strong>gelgitiyle birlikte</strong> yavaşça aktığı,
          sessiz bir Akdeniz kıyısı."
        </p>
        <footer>— Bozyazı'dan bir seyyah izlenimi</footer>
      </blockquote>
    </section>
  )
}

// ── ÖN İZLEME GRİDİ ─────────────────────────────────────────
function PreviewGrid() {
  return (
    <section className="preview-section section-padding">
      <p className="section-label">Sayfalar</p>
      <h2 className="section-title">Neyi Keşfetmek<br /><em>İstersiniz?</em></h2>
      <div className="preview-grid">
        {PREVIEWS.map(p => (
          <Link
            key={p.to}
            to={p.to}
            className="preview-card"
            style={{ '--card-color': p.color }}
          >
            <span className="preview-tag">{p.tag}</span>
            <h3 className="preview-title">{p.title}</h3>
            <p className="preview-desc">{p.desc}</p>
            <span className="preview-arrow">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
