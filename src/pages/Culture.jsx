import { useTranslation } from 'react-i18next'
import { motion }         from 'framer-motion'
import PageWrapper        from '../components/PageWrapper.jsx'
import '../styles/Pages.css'

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' }
  }),
}

export default function Culture() {
  const { t } = useTranslation('culture')

  const ITEMS = [
    { title: t('item1_title'), desc: t('item1_desc') },
    { title: t('item2_title'), desc: t('item2_desc') },
    { title: t('item3_title'), desc: t('item3_desc') },
    { title: t('item4_title'), desc: t('item4_desc') },
    { title: t('item5_title'), desc: t('item5_desc') },
    { title: t('item6_title'), desc: t('item6_desc') },
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
      <section className="culture-section section-padding">
        <div className="culture-grid">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              className="culture-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <span className="culture-index">0{i + 1}</span>
              <h2 className="culture-title">{item.title}</h2>
              <p className="culture-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}
