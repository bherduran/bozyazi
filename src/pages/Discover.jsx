import { useTranslation } from 'react-i18next'
import { motion }         from 'framer-motion'
import PageWrapper        from '../components/PageWrapper.jsx'
import '../styles/Discover.css'

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' }
  }),
}

export default function Discover() {
  const { t } = useTranslation('discover')

  const PLACES = [
    { id: 1, tag: t('place1_tag'), name: t('place1_name'), desc: t('place1_desc'), color: '#0a3a5c', accent: '#1a6b8a', num: '01' },
    { id: 2, tag: t('place2_tag'), name: t('place2_name'), desc: t('place2_desc'), color: '#1a3a20', accent: '#2d6a35', num: '02' },
    { id: 3, tag: t('place3_tag'), name: t('place3_name'), desc: t('place3_desc'), color: '#3a2a08', accent: '#7a5a15', num: '03' },
    { id: 4, tag: t('place4_tag'), name: t('place4_name'), desc: t('place4_desc'), color: '#2a0a2a', accent: '#6a2060', num: '04' },
    { id: 5, tag: t('place5_tag'), name: t('place5_name'), desc: t('place5_desc'), color: '#0a2a3a', accent: '#1a5a7a', num: '05' },
    { id: 6, tag: t('place6_tag'), name: t('place6_name'), desc: t('place6_desc'), color: '#0a2540', accent: '#1a6b8a', num: '06' },
  ]

  return (
    <PageWrapper>
      <header className="page-header">
        <div className="page-header-inner">
          <p className="section-label">{t('label')}</p>
          <h1 className="section-title section-title--light">
            {t('title1')}<br /><em>{t('title2')}</em>
          </h1>
          <p className="page-header-desc">{t('desc')}</p>
        </div>
      </header>
      <section className="places-grid-section section-padding">
        <div className="places-grid">
          {PLACES.map((place, i) => (
            <motion.article
              key={place.id}
              className="place-card"
              style={{ '--card-bg': place.color, '--card-accent': place.accent }}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
            >
              <span className="place-num">{place.num}</span>
              <div className="place-content">
                <span className="place-tag">{place.tag}</span>
                <h2 className="place-name">{place.name}</h2>
                <p className="place-desc">{place.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}
