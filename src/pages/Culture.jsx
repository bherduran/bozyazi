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
          <h1 className="section-title section-title--light">
            {t('title1')} <em>{t('title2')}</em>
          </h1>
          <p className="page-header-desc">{t('desc')}</p>
        </div>
      </header>
      <section className="culture-section section-padding">
        <ul className="entry-list">
          {ITEMS.map((item, i) => (
            <motion.li
              key={item.title}
              className="entry"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <h2 className="entry-title">{item.title}</h2>
              <p className="entry-desc">{item.desc}</p>
            </motion.li>
          ))}
        </ul>
      </section>
    </PageWrapper>
  )
}
