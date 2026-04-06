// PageWrapper.jsx — Sayfa geçiş animasyonu
//
// Framer Motion nasıl çalışır?
// - motion.div: Normal div gibi ama animasyon özellikleri var
// - initial: Başlangıç durumu (görünmeden önce)
// - animate: Hedef durum (görünürken)
// - exit: Çıkış durumu (sayfa değişince)
// - transition: Animasyon süresi ve eğrisi
//
// Her sayfa bu bileşeni kullanır — kod tekrarı önlenir

import { motion } from 'framer-motion'

// Sayfa animasyon varyantları
// variants: Animasyon durumlarını isimle tanımlar
const pageVariants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1], // Custom easing — yumuşak giriş
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
}

export default function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
