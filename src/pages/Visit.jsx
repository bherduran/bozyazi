import { useEffect, useRef } from 'react'
import { useTranslation }    from 'react-i18next'
import { motion }            from 'framer-motion'
import PageWrapper           from '../components/PageWrapper.jsx'
import '../styles/Visit.css'

const BOZYAZI_COORDS = { lat: 36.105387700746114, lng: 32.97387013494546 }

const LOCATIONS = [
  { name: 'Bozyazı Merkez',         coords: { lat: 36.105387700746114, lng: 32.97387013494546  }, desc: 'İlçe merkezi — sahil, liman ve çarşı',           icon: '🏘️' },
  { name: 'Nagidos Adası',          coords: { lat: 36.09574442728613,  lng: 32.975967408366465 }, desc: 'MÖ 4. yüzyıldan kalma Helenistik yerleşim',       icon: '🏛️' },
  { name: 'Softa Kalesi',           coords: { lat: 36.10456573935816,  lng: 33.01952146525461  }, desc: 'Fidik Dağı\'ndaki gizemli ortaçağ kalesi',         icon: '🏰' },
  { name: 'Dikilitaş Tabiat Parkı', coords: { lat: 36.09032487294654,  lng: 32.92109272977588  }, desc: '33,5 hektarlık doğa parkı',                        icon: '🌿' },
  { name: 'Bozyazı Sahili',         coords: { lat: 36.100450900257165, lng: 32.97219554113147  }, desc: 'Kristal berraklığında Akdeniz kıyısı',             icon: '🌊' },
]

const MAP_STYLE = [
  { elementType: 'geometry',           stylers: [{ color: '#0a2540' }] },
  { elementType: 'labels.text.fill',   stylers: [{ color: '#e8b86d' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#061824' }] },
  { featureType: 'water', elementType: 'geometry',         stylers: [{ color: '#1a6b8a' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#e8b86d' }] },
  { featureType: 'road',  elementType: 'geometry',         stylers: [{ color: '#1a3a5c' }] },
  { featureType: 'road',  elementType: 'labels.text.fill', stylers: [{ color: '#c8963e' }] },
  { featureType: 'poi',   elementType: 'geometry',         stylers: [{ color: '#1a3a20' }] },
  { featureType: 'poi',   elementType: 'labels.text.fill', stylers: [{ color: '#e8b86d' }] },
  { featureType: 'landscape', elementType: 'geometry',     stylers: [{ color: '#0e3a2a' }] },
  { featureType: 'administrative', elementType: 'geometry',stylers: [{ color: '#1a4a6a' }] },
]

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' }
  }),
}

export default function Visit() {
  const { t }       = useTranslation('visit')
  const mapRef      = useRef(null)
  const mapInstance = useRef(null)
  const scriptRef   = useRef(null)

  const CARDS = [
    { icon: '✈️', title: t('card1_title'), text: t('card1_text') },
    { icon: '🌤️', title: t('card2_title'), text: t('card2_text') },
    { icon: '🏡', title: t('card3_title'), text: t('card3_text') },
    { icon: '🍽️', title: t('card4_title'), text: t('card4_text') },
    { icon: '📍', title: t('card5_title'), text: t('card5_text') },
    { icon: '💡', title: t('card6_title'), text: t('card6_text') },
  ]

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY
    if (window.google?.maps) { initMap(); return }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
    script.async = true
    script.defer = true
    script.onload = initMap
    document.head.appendChild(script)
    scriptRef.current = script
    return () => {
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current)
      }
    }
  }, [])

  function initMap() {
    if (!mapRef.current) return
    const map = new window.google.maps.Map(mapRef.current, {
      center: BOZYAZI_COORDS, zoom: 13, styles: MAP_STYLE,
      mapTypeControl: false, streetViewControl: false, fullscreenControl: true,
    })
    mapInstance.current = map
    LOCATIONS.forEach(loc => {
      const marker = new window.google.maps.Marker({
        position: loc.coords, map, title: loc.name,
        icon: { path: window.google.maps.SymbolPath.CIRCLE, scale: 10, fillColor: '#c8963e', fillOpacity: 1, strokeColor: '#e8b86d', strokeWeight: 2 },
      })
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="background:#0a2540;color:#faf6ef;padding:12px 16px;border-radius:2px;min-width:180px;font-family:'Josefin Sans',sans-serif;border-top:2px solid #c8963e;"><div style="font-size:1.2rem;margin-bottom:4px;">${loc.icon}</div><strong style="font-size:0.85rem;letter-spacing:0.1em;color:#e8b86d;display:block;margin-bottom:4px;">${loc.name}</strong><p style="font-size:0.72rem;color:rgba(244,232,208,0.65);line-height:1.5;margin:0;">${loc.desc}</p></div>`,
      })
      marker.addListener('click', () => infoWindow.open(map, marker))
    })
  }

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

      <section className="visit-section section-padding">
        <div className="visit-grid">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="visit-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <span className="visit-icon">{card.icon}</span>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="map-section">
        <div className="map-header section-padding">
          <p className="section-label">{t('map_label')}</p>
          <h2 className="section-title">
            {t('map_title1')}<br /><em>{t('map_title2')}</em>
          </h2>
          <p className="map-desc">{t('map_desc')}</p>
          <div className="map-legend">
            {LOCATIONS.map(loc => (
              <span key={loc.name} className="legend-item">{loc.icon} {loc.name}</span>
            ))}
          </div>
        </div>
        <div ref={mapRef} className="map-container" />
      </section>
    </PageWrapper>
  )
}
