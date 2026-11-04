// useTilt.js — Kartlar için fareyle hafif 3D eğilme
//
// Framer Motion'ın motion value'larıyla çalışır; React her harekette yeniden
// render etmez. Kartın kendi variant animasyonlarıyla (y, opacity) çakışmaz,
// çünkü Framer rotateX/rotateY'yi aynı transform'a birleştirir.
// Dokunmatik cihazlarda ve "hareketi azalt" açıkken devre dışı.

import { useMotionValue, useSpring } from 'framer-motion'

const canTilt = typeof window !== 'undefined'
  && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const SPRING = { stiffness: 220, damping: 22, mass: .6 }

export default function useTilt(maxDeg = 7) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, SPRING)
  const rotateY = useSpring(ry, SPRING)

  if (!canTilt) return { style: {}, handlers: {} }

  function onPointerMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width  - .5   // -0.5 … 0.5
    const py = (e.clientY - r.top)  / r.height - .5
    ry.set(px * maxDeg * 2)
    rx.set(-py * maxDeg * 2)
  }
  function onPointerLeave() {
    rx.set(0)
    ry.set(0)
  }

  return {
    style: { rotateX, rotateY, transformPerspective: 900 },
    handlers: { onPointerMove, onPointerLeave },
  }
}
