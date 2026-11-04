import { useState, useEffect, useCallback } from 'react'
import { useTranslation }                   from 'react-i18next'
import { useLenis }                         from 'lenis/react'
import PageWrapper                          from '../components/PageWrapper.jsx'
import Icon                                 from '../components/Icon.jsx'
import '../styles/Gallery.css'

const PHOTOS = [
  { id: 1,  src: null, alt: 'Photo 1',  caption: '' },
  { id: 2,  src: null, alt: 'Photo 2',  caption: '' },
  { id: 3,  src: null, alt: 'Photo 3',  caption: '' },
  { id: 4,  src: null, alt: 'Photo 4',  caption: '' },
  { id: 5,  src: null, alt: 'Photo 5',  caption: '' },
  { id: 6,  src: null, alt: 'Photo 6',  caption: '' },
  { id: 7,  src: null, alt: 'Photo 7',  caption: '' },
  { id: 8,  src: null, alt: 'Photo 8',  caption: '' },
  { id: 9,  src: null, alt: 'Photo 9',  caption: '' },
  { id: 10, src: null, alt: 'Photo 10', caption: '' },
  { id: 11, src: null, alt: 'Photo 11', caption: '' },
  { id: 12, src: null, alt: 'Photo 12', caption: '' },
]

export default function Gallery() {
  const { t } = useTranslation('gallery')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const lenis = useLenis()

  const handleKeyDown = useCallback((e) => {
    if (selectedIndex === null) return
    if (e.key === 'ArrowRight') setSelectedIndex(i => (i + 1) % PHOTOS.length)
    else if (e.key === 'ArrowLeft') setSelectedIndex(i => (i - 1 + PHOTOS.length) % PHOTOS.length)
    else if (e.key === 'Escape') setSelectedIndex(null)
  }, [selectedIndex])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Lenis body'deki overflow'a bakmıyor; lightbox açıkken onu da durduruyoruz
  useEffect(() => {
    const locked = selectedIndex !== null
    document.body.style.overflow = locked ? 'hidden' : ''
    if (locked) lenis?.stop(); else lenis?.start()
    return () => { document.body.style.overflow = ''; lenis?.start() }
  }, [selectedIndex, lenis])

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
      <section className="gallery-section section-padding">
        <div className="gallery-grid">
          {PHOTOS.map((photo, index) => (
            <button
              key={photo.id}
              className="gallery-item"
              onClick={() => setSelectedIndex(index)}
              aria-label={`${photo.alt}`}
            >
              {photo.src ? (
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              ) : (
                <div className="gallery-placeholder">
                  <Icon name="camera" size={30} strokeWidth={1.3} className="placeholder-icon" />
                  <span className="placeholder-num">{photo.id}</span>
                  <span className="placeholder-text">{t('placeholder')}</span>
                </div>
              )}
              {photo.caption && (
                <div className="gallery-overlay">
                  <span className="gallery-caption">{photo.caption}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>
      {selectedIndex !== null && (
        <Lightbox
          photo={PHOTOS[selectedIndex]}
          index={selectedIndex}
          total={PHOTOS.length}
          onClose={() => setSelectedIndex(null)}
          onPrev={() => setSelectedIndex(i => (i - 1 + PHOTOS.length) % PHOTOS.length)}
          onNext={() => setSelectedIndex(i => (i + 1) % PHOTOS.length)}
          placeholder={t('placeholder')}
          labels={{ close: t('close'), prev: t('prev'), next: t('next') }}
        />
      )}
    </PageWrapper>
  )
}

function Lightbox({ photo, index, total, onClose, onPrev, onNext, placeholder, labels }) {
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label={labels.close}>
          <Icon name="close" size={26} strokeWidth={1.4} />
        </button>
        <button className="lightbox-nav lightbox-nav--prev" onClick={onPrev} aria-label={labels.prev}>
          <Icon name="chevronLeft" size={38} strokeWidth={1.2} />
        </button>
        <div className="lightbox-content">
          {photo.src ? (
            <img src={photo.src} alt={photo.alt} />
          ) : (
            <div className="lightbox-placeholder">
              <Icon name="camera" size={44} strokeWidth={1.2} />
              <p>{placeholder}</p>
            </div>
          )}
          {photo.caption && <p className="lightbox-caption">{photo.caption}</p>}
          <span className="lightbox-counter">{index + 1} / {total}</span>
        </div>
        <button className="lightbox-nav lightbox-nav--next" onClick={onNext} aria-label={labels.next}>
          <Icon name="chevronRight" size={38} strokeWidth={1.2} />
        </button>
      </div>
    </div>
  )
}
