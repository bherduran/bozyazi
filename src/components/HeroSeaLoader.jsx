// HeroSeaLoader.jsx — Ana sayfa 3D sahnesini yalnızca uygun cihazlarda yükler
//
// three.js büyük bir paket; React.lazy ile ayrı bir dosyaya ayrılıyor ve
// sadece gerekiyorsa indiriliyor. Şu durumlarda hiç yüklenmez, CSS arka
// plan ve SVG dalgalar olduğu gibi kalır:
// - "Hareketi azalt" tercihi açık
// - Veri tasarrufu modu açık
// - Tarayıcı WebGL2 desteklemiyor

import { Suspense, lazy, useEffect, useRef, useState } from 'react'

const HeroSea = lazy(() => import('./HeroSea.jsx'))

function canRender3D() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (navigator.connection?.saveData) return false
  try {
    const canvas = document.createElement('canvas')
    return !!canvas.getContext('webgl2')
  } catch {
    return false
  }
}

export default function HeroSeaLoader() {
  const [enabled] = useState(canRender3D)
  const [inView,  setInView]  = useState(true)
  const [ready,   setReady]   = useState(false)
  const ref = useRef(null)

  // Hero ekrandan çıkınca render döngüsünü durdur (pil ve CPU için)
  useEffect(() => {
    if (!enabled || !ref.current) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    io.observe(ref.current)
    return () => io.disconnect()
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={ref} className={`hero-sea ${ready ? 'is-ready' : ''}`} aria-hidden="true">
      <Suspense fallback={null}>
        <HeroSea active={inView} onReady={() => setReady(true)} />
      </Suspense>
    </div>
  )
}
