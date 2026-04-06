import { Link }              from 'react-router-dom'
import { useTranslation }    from 'react-i18next'
import { motion }            from 'framer-motion'
import PageWrapper           from '../components/PageWrapper.jsx'
import '../styles/Home.css'

// Kart animasyonu için variant — stagger (sıralı) animasyon
const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  }),
}

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <Ticker />
      <About />
      <PreviewGrid />
    </PageWrapper>
  )
}

function Hero() {
  const { t } = useTranslation('home')
  return (
    <section className="hero">
      <div className="hero-bg">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`particle particle--${i + 1}`} />
        ))}
      </div>
      <div className="hero-content">
        <p className="hero-eyebrow">{t('eyebrow')}</p>
        <h1 className="hero-title">
          {t('hero_title1')}<br />
          <em>{t('hero_title2')}</em><br />
          {t('hero_title3')}
        </h1>
        <p className="hero-sub">{t('hero_sub')}</p>
        <Link to="/kesifet" className="hero-cta">
          {t('hero_cta')} <span>→</span>
        </Link>
      </div>
      <div className="hero-waves">
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none">
          <path className="wave wave--1" d="M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 C1680,140 1920,20 2160,80 L2160,180 L0,180 Z"/>
          <path className="wave wave--2" d="M0,100 C180,60 360,140 540,100 C720,60 900,140 1080,100 C1260,60 1440,140 1620,100 C1800,60 1980,140 2160,100 L2160,180 L0,180 Z"/>
        </svg>
      </div>
      <p className="scroll-hint">{t('scroll')}</p>
    </section>
  )
}

function Ticker() {
  const { i18n } = useTranslation()
  const words = i18n.language === 'tr'
    ? ['Akdeniz Kıyısı', 'Antik Kentler', 'Berrak Sular', 'Toros Dağları', 'Narenciye Bahçeleri', 'Softa Kalesi', 'Nagidos']
    : ['Mediterranean Coast', 'Ancient Ruins', 'Crystal Waters', 'Taurus Mountains', 'Citrus Groves', 'Softa Castle', 'Nagidos']
  const text = [...words, ...words].join(' · ')
  return (
    <div className="ticker" aria-hidden="true">
      <span>{text} · </span>
    </div>
  )
}

function About() {
  const { t } = useTranslation('home')
  const STATS = [
    { num: '642',    label: t('stat_area')    },
    { num: 'BC 4th', label: t('stat_history') },
    { num: '300+',   label: t('stat_sun')     },
    { num: '220',    label: t('stat_dist')    },
  ]
  return (
    <section className="about section-padding">
      <div className="about-text">
        <p className="section-label">{t('about_label')}</p>
        <h2 className="section-title">
          {t('about_title1')}<br /><em>{t('about_title2')}</em>
        </h2>
        <div className="gold-bar" />
        <p>{t('about_p1')}</p>
        <p>{t('about_p2')}</p>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <blockquote className="about-quote">
        <p>{t('quote')}</p>
        <footer>{t('quote_attr')}</footer>
      </blockquote>
    </section>
  )
}

function PreviewGrid() {
  const { t } = useTranslation('home')
  const PREVIEWS = [
    { to: '/kesifet', tag: t('preview_discover_tag'),  title: t('preview_discover_title'), desc: t('preview_discover_desc'), color: 'var(--sea)'   },
    { to: '/doga',    tag: t('preview_nature_tag'),    title: t('preview_nature_title'),   desc: t('preview_nature_desc'),   color: '#1a3a20'      },
    { to: '/kultur',  tag: t('preview_culture_tag'),   title: t('preview_culture_title'),  desc: t('preview_culture_desc'),  color: '#3a2a08'      },
    { to: '/galeri',  tag: t('preview_gallery_tag'),   title: t('preview_gallery_title'),  desc: t('preview_gallery_desc'),  color: '#2a0a2a'      },
  ]
  return (
    <section className="preview-section section-padding">
      <p className="section-label">{t('preview_label')}</p>
      <h2 className="section-title">
        {t('preview_title1')}<br /><em>{t('preview_title2')}</em>
      </h2>
      <div className="preview-grid">
        {PREVIEWS.map((p, i) => (
          <motion.div
            key={p.to}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <Link to={p.to} className="preview-card" style={{ '--card-color': p.color }}>
              <span className="preview-tag">{p.tag}</span>
              <h3 className="preview-title">{p.title}</h3>
              <p className="preview-desc">{p.desc}</p>
              <span className="preview-arrow">→</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
