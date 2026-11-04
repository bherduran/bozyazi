import { Link }              from 'react-router-dom'
import { useTranslation }    from 'react-i18next'
import { motion }            from 'framer-motion'
import PageWrapper           from '../components/PageWrapper.jsx'
import HeroSeaLoader         from '../components/HeroSeaLoader.jsx'
import useTilt               from '../hooks/useTilt.js'
import Icon                  from '../components/Icon.jsx'
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
      <About />
      <PreviewGrid />
    </PageWrapper>
  )
}

function Hero() {
  const { t } = useTranslation('home')
  return (
    <section className="hero">
      <div className="hero-bg" />
      {/* 3D deniz ve Nagidos Adası. Desteklenmeyen cihazlarda hiç yüklenmez,
          yukarıdaki CSS arka planı ve aşağıdaki SVG dalgalar kalır. */}
      <HeroSeaLoader />
      <div className="hero-content">
        <h1 className="hero-title">
          {t('hero_title1')}<br />
          <em>{t('hero_title2')}</em><br />
          {t('hero_title3')}
        </h1>
        <p className="hero-sub">{t('hero_sub')}</p>
        <Link to="/kesifet" className="hero-cta">
          {t('hero_cta')} <Icon name="arrowRight" size={16} />
        </Link>
      </div>
      <div className="hero-waves">
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none">
          <path className="wave wave--1" d="M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 C1680,140 1920,20 2160,80 L2160,180 L0,180 Z"/>
          <path className="wave wave--2" d="M0,100 C180,60 360,140 540,100 C720,60 900,140 1080,100 C1260,60 1440,140 1620,100 C1800,60 1980,140 2160,100 L2160,180 L0,180 Z"/>
        </svg>
      </div>
    </section>
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
        <h2 className="section-title">
          {t('about_title1')} <em>{t('about_title2')}</em>
        </h2>
        <p>{t('about_p1')}</p>
        <p>{t('about_p2')}</p>
        {/* Kutu kutu istatistik kartları yerine sade bir bilgi satırı */}
        <dl className="facts">
          {STATS.map(s => (
            <div key={s.label} className="fact">
              <dt>{s.label}</dt>
              <dd>{s.num}</dd>
            </div>
          ))}
        </dl>
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
      <h2 className="section-title">
        {t('preview_title1')} <em>{t('preview_title2')}</em>
      </h2>
      <div className="preview-grid">
        {PREVIEWS.map((p, i) => (
          <PreviewCard key={p.to} preview={p} index={i} />
        ))}
      </div>
    </section>
  )
}

function PreviewCard({ preview: p, index }) {
  const tilt = useTilt(5)
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      style={tilt.style}
      {...tilt.handlers}
    >
      <Link to={p.to} className="preview-card" style={{ '--card-color': p.color }}>
        <span className="preview-tag">{p.tag}</span>
        <h3 className="preview-title">{p.title}</h3>
        <p className="preview-desc">{p.desc}</p>
        <Icon name="arrowRight" size={20} className="preview-arrow" />
      </Link>
    </motion.div>
  )
}
