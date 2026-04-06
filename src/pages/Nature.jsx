import { useTranslation } from 'react-i18next'
import { motion }         from 'framer-motion'
import PageWrapper        from '../components/PageWrapper.jsx'
import '../styles/Pages.css'

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  }),
}

export default function Nature() {
  const { t } = useTranslation('nature')

  const ITEMS = [
    { icon: '🌊', title: t('item1_title'), desc: t('item1_desc') },
    { icon: '⛰️', title: t('item2_title'), desc: t('item2_desc') },
    { icon: '🦇', title: t('item3_title'), desc: t('item3_desc') },
    { icon: '🌿', title: t('item4_title'), desc: t('item4_desc') },
    { icon: '🍋', title: t('item5_title'), desc: t('item5_desc') },
    { icon: '🌅', title: t('item6_title'), desc: t('item6_desc') },
  ]

  const ACTIVITIES = [
    t('act1'), t('act2'), t('act3'), t('act4'), t('act5'), t('act6'),
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
      <section className="nature-section section-padding">
        <div className="nature-grid">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              className="nature-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <span className="nature-icon">{item.icon}</span>
              <h2 className="nature-title">{item.title}</h2>
              <p className="nature-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="nature-cta section-padding">
        <p className="section-label">{t('activities_label')}</p>
        <h2 className="section-title">{t('activities_title')}</h2>
        <div className="activities-list">
          {ACTIVITIES.map((a, i) => (
            <motion.span
              key={a}
              className="activity-tag"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              {a}
            </motion.span>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}
