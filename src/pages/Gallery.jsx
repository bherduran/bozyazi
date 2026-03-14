// Gallery.jsx — Fotoğraf Galerisi
//
// Bu sayfa bir "template" — fotoğrafları sen ekleyeceksin.
// useState ile lightbox (büyük görüntüleyici) mantığı var:
// Bir fotoğrafa tıklanınca state güncellenir, lightbox açılır.
//
// Fotoğrafları nasıl eklersin?
// 1. Fotoğrafları /public/photos/ klasörüne koy
// 2. Aşağıdaki PHOTOS dizisini doldur
// 3. Hazır!

import { useState, useEffect, useCallback } from 'react'
import '../styles/Gallery.css'

// ── FOTOĞRAF VERİSİ ───────────────────────────────────────────
// Fotoğraflarını eklemek için bu diziyi doldur.
// src: /public klasörüne göre yol (örn: "/photos/beach.jpg")
// GitHub'a yükleyince otomatik çalışır.
const PHOTOS = [
  // Bu satırların yorumunu kaldır ve kendi fotoğraflarınla değiştir:
  // { id: 1, src: '/photos/sahil.jpg',     alt: 'Bozyazı Sahili',    caption: 'Kristal berraklığında Akdeniz' },
  // { id: 2, src: '/photos/kale.jpg',      alt: 'Softa Kalesi',      caption: 'Fidik Dağı\'ndaki gizemli kale' },
  // { id: 3, src: '/photos/doga.jpg',      alt: 'Toros Dağları',     caption: 'Zirveden Akdeniz manzarası' },
  // { id: 4, src: '/photos/pazar.jpg',     alt: 'Yerel Pazar',       caption: 'Renkli sabah pazarı' },
  // { id: 5, src: '/photos/gunbatimi.jpg', alt: 'Gün Batımı',        caption: 'Toroslar\'ın arkasına çekilen güneş' },
  // { id: 6, src: '/photos/nagidos.jpg',   alt: 'Nagidos',           caption: 'Antik kentin kalıntıları' },

  // ── PLACEHOLDER'LAR (Fotoğraf ekleyince bunları sil) ──
  { id: 1,  src: null, alt: 'Fotoğraf 1',  caption: 'Buraya başlık ekle' },
  { id: 2,  src: null, alt: 'Fotoğraf 2',  caption: 'Buraya başlık ekle' },
  { id: 3,  src: null, alt: 'Fotoğraf 3',  caption: 'Buraya başlık ekle' },
  { id: 4,  src: null, alt: 'Fotoğraf 4',  caption: 'Buraya başlık ekle' },
  { id: 5,  src: null, alt: 'Fotoğraf 5',  caption: 'Buraya başlık ekle' },
  { id: 6,  src: null, alt: 'Fotoğraf 6',  caption: 'Buraya başlık ekle' },
  { id: 7,  src: null, alt: 'Fotoğraf 7',  caption: 'Buraya başlık ekle' },
  { id: 8,  src: null, alt: 'Fotoğraf 8',  caption: 'Buraya başlık ekle' },
  { id: 9,  src: null, alt: 'Fotoğraf 9',  caption: 'Buraya başlık ekle' },
  { id: 10, src: null, alt: 'Fotoğraf 10', caption: 'Buraya başlık ekle' },
  { id: 11, src: null, alt: 'Fotoğraf 11', caption: 'Buraya başlık ekle' },
  { id: 12, src: null, alt: 'Fotoğraf 12', caption: 'Buraya başlık ekle' },
]

export default function Gallery() {
  // selectedIndex: Lightbox'ta hangi fotoğraf açık?
  // null = lightbox kapalı, sayı = o indeksteki fotoğraf açık
  const [selectedIndex, setSelectedIndex] = useState(null)

  // ── KLAVYE GEZİNME ────────────────────────────────────────
  // useCallback: Fonksiyonu sadece bağımlılıklar değişince yeniden oluşturur.
  // Performans optimizasyonu — useEffect bağımlılığı olarak kullanılıyor.
  const handleKeyDown = useCallback((e) => {
    if (selectedIndex === null) return

    if (e.key === 'ArrowRight') {
      setSelectedIndex(i => (i + 1) % PHOTOS.length)
    } else if (e.key === 'ArrowLeft') {
      setSelectedIndex(i => (i - 1 + PHOTOS.length) % PHOTOS.length)
    } else if (e.key === 'Escape') {
      setSelectedIndex(null)
    }
  }, [selectedIndex])

  // Klavye olayını dinle; lightbox kapanınca temizle
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Lightbox açıkken sayfa kaydırmayı engelle
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedIndex])

  return (
    <div className="gallery-page">
      <header className="page-header">
        <div className="page-header-inner">
          <p className="section-label">Fotoğraf Galerisi</p>
          <h1 className="section-title section-title--light">
            Bozyazı'yı<br /><em>Gözlerle Keşfet</em>
          </h1>
          <p className="page-header-desc">
            Bir fotoğrafa tıkla, büyütülmüş hâlde görüntüle.
            Ok tuşlarıyla ya da ekrandaki butonlarla gezin.
          </p>
        </div>
      </header>

      {/* ── GALERİ GRİDİ ── */}
      <section className="gallery-section section-padding">
        <div className="gallery-grid">
          {PHOTOS.map((photo, index) => (
            <button
              key={photo.id}
              className="gallery-item"
              onClick={() => setSelectedIndex(index)}
              aria-label={`${photo.alt} fotoğrafını büyüt`}
            >
              {photo.src ? (
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              ) : (
                // Placeholder: Fotoğraf yokken gösterilir
                <div className="gallery-placeholder">
                  <span className="placeholder-icon">📷</span>
                  <span className="placeholder-num">{photo.id}</span>
                  <span className="placeholder-text">Fotoğraf eklenecek</span>
                </div>
              )}
              <div className="gallery-overlay">
                <span className="gallery-caption">{photo.caption}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="gallery-hint">
          <p>
            📁 Fotoğraflarını <code>/public/photos/</code> klasörüne ekle ve{' '}
            <code>Gallery.jsx</code>'teki PHOTOS dizisini güncelle.
          </p>
        </div>
      </section>

      {/* ── LİGHTBOX ── */}
      {/* selectedIndex !== null ise lightbox göster */}
      {selectedIndex !== null && (
        <Lightbox
          photo={PHOTOS[selectedIndex]}
          index={selectedIndex}
          total={PHOTOS.length}
          onClose={() => setSelectedIndex(null)}
          onPrev={() => setSelectedIndex(i => (i - 1 + PHOTOS.length) % PHOTOS.length)}
          onNext={() => setSelectedIndex(i => (i + 1) % PHOTOS.length)}
        />
      )}
    </div>
  )
}

// ── LİGHTBOX BİLEŞENİ ────────────────────────────────────────
// Ayrı bir bileşen — tek sorumluluk: büyük fotoğraf görüntüle.
function Lightbox({ photo, index, total, onClose, onPrev, onNext }) {
  return (
    // Arka plana tıklayınca kapat
    <div
      className="lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Fotoğraf görüntüleyici"
    >
      {/* İçeriğe tıklayınca kapanmasın — propagation durdur */}
      <div
        className="lightbox-inner"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Kapat"
        >
          ×
        </button>

        <button
          className="lightbox-nav lightbox-nav--prev"
          onClick={onPrev}
          aria-label="Önceki fotoğraf"
        >
          ‹
        </button>

        <div className="lightbox-content">
          {photo.src ? (
            <img src={photo.src} alt={photo.alt} />
          ) : (
            <div className="lightbox-placeholder">
              <span>📷</span>
              <p>Fotoğraf henüz eklenmedi</p>
            </div>
          )}
          {photo.caption && (
            <p className="lightbox-caption">{photo.caption}</p>
          )}
          <span className="lightbox-counter">{index + 1} / {total}</span>
        </div>

        <button
          className="lightbox-nav lightbox-nav--next"
          onClick={onNext}
          aria-label="Sonraki fotoğraf"
        >
          ›
        </button>
      </div>
    </div>
  )
}
