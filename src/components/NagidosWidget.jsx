// NagidosWidget.jsx — Sağ altta duran canlı destek tarzı rehber penceresi
//
// Her sayfada görünür (tam sayfa sohbet olan /asistan hariç). Butona
// tıklayınca Nagidos sohbeti açılır; mobilde tam ekran, masaüstünde
// köşede küçük bir panel olarak.

import { useEffect, useState }      from 'react'
import { useLocation }              from 'react-router-dom'
import { useTranslation }           from 'react-i18next'
import { AnimatePresence, motion }  from 'framer-motion'
import { useLenis }                 from 'lenis/react'
import { useChat }                  from '../chat/ChatContext.jsx'
import ChatPanel                    from './ChatPanel.jsx'
import NagidosMark                  from './NagidosMark.jsx'
import '../styles/NagidosWidget.css'

const TEASER_KEY = 'nagidos-teaser-seen'

function readFlag(key) {
  try { return sessionStorage.getItem(key) === '1' } catch { return false }
}
function writeFlag(key) {
  try { sessionStorage.setItem(key, '1') } catch { /* gizli sekme vb. */ }
}

export default function NagidosWidget() {
  const { t }    = useTranslation('assistant')
  const location = useLocation()
  const lenis    = useLenis()
  const { isOpen, setIsOpen, isBusy } = useChat()

  const [showTeaser, setShowTeaser] = useState(false)
  const [isMobile,   setIsMobile]   = useState(() => window.matchMedia('(max-width: 640px)').matches)
  const hidden = location.pathname === '/asistan'

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const onChange = e => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Oturumda bir kez, birkaç saniye sonra küçük bir "bana sor" baloncuğu
  useEffect(() => {
    if (readFlag(TEASER_KEY)) return
    const show = setTimeout(() => setShowTeaser(true), 4000)
    const hide = setTimeout(() => { setShowTeaser(false); writeFlag(TEASER_KEY) }, 14000)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  // Mobilde pencere tam ekran: arkadaki sayfa kaymasın
  useEffect(() => {
    if (!(isOpen && isMobile)) return
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    return () => { lenis?.start(); document.body.style.overflow = '' }
  }, [isOpen, isMobile, lenis])

  // Esc ile kapat
  useEffect(() => {
    if (!isOpen) return
    const onKey = e => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, setIsOpen])

  function open() {
    setIsOpen(true)
    setShowTeaser(false)
    writeFlag(TEASER_KEY)
  }

  if (hidden) return null

  return (
    <div className="nagidos-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            className="nagidos-panel"
            role="dialog"
            aria-modal={isMobile}
            aria-label="Nagidos"
            initial={{ opacity: 0, y: 24, scale: .96 }}
            animate={{ opacity: 1, y: 0,  scale: 1, transition: { duration: .32, ease: [0.22, 1, 0.36, 1] } }}
            exit={{    opacity: 0, y: 16, scale: .97, transition: { duration: .18, ease: 'easeIn' } }}
          >
            <header className="nagidos-panel-header">
              <NagidosMark size={40} />
              <div className="nagidos-panel-title">
                <strong>Nagidos</strong>
                <span>
                  <i className={`nagidos-status ${isBusy ? 'is-typing' : ''}`} aria-hidden="true" />
                  {t('widget_subtitle')}
                </span>
              </div>
              <button className="nagidos-close" onClick={() => setIsOpen(false)} aria-label={t('widget_close')}>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </header>
            <ChatPanel variant="widget" autoFocus={!isMobile} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.button
            key="teaser"
            className="nagidos-teaser"
            onClick={open}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
          >
            {t('widget_teaser')}
          </motion.button>
        )}
      </AnimatePresence>

      {!(isOpen && isMobile) && (
        <button
          className={`nagidos-launcher ${isOpen ? 'is-open' : ''}`}
          onClick={() => (isOpen ? setIsOpen(false) : open())}
          aria-label={isOpen ? t('widget_close') : t('widget_open')}
          aria-expanded={isOpen}
        >
          <NagidosMark size={60} className="nagidos-launcher-mark" />
          <span className="nagidos-launcher-label">{t('widget_open')}</span>
        </button>
      )}
    </div>
  )
}
