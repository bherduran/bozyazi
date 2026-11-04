// NagidosMark.jsx — Nagidos rehberinin logosu
//
// Bozyazı açıklarındaki Nagidos Adası. Ada çizimi (public/nagidos-island.svg)
// gerçek adanın drone fotoğraflarına bakılarak yapıldı: alçak, oval kireçtaşı
// kayalık, üstü maki ile kaplı, sağ ucunda Osmanlı kalesinin yıkık duvarları.
// Burada akşam gökyüzü ve deniz renginde bir dairenin ufkuna oturtuluyor.

import { useId } from 'react'

export default function NagidosMark({ size = 36, className = '', title }) {
  // Sayfada birden fazla logo var; gradyan ve clip id'leri çakışmasın
  const id = useId().replace(/:/g, '')

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"   stopColor="#061824" />
          <stop offset=".52" stopColor="#0e3a5c" />
          <stop offset=".56" stopColor="#1a6b8a" />
          <stop offset="1"   stopColor="#0a2540" />
        </linearGradient>
        <clipPath id={`${id}-clip`}><circle cx="24" cy="24" r="23" /></clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <rect width="48" height="48" fill={`url(#${id}-sky)`} />
        {/* Ada: ufuk çizgisine (y≈27) oturuyor, kenarlardan biraz taşıyor */}
        <image href="/nagidos-island.svg" x="1" y="18.6" width="46" height="9.8" preserveAspectRatio="xMidYMid meet" />
        {/* Ufukta hafif altın yansıma */}
        <path d="M14 31 Q24 30 34 31" fill="none" stroke="var(--gold-light)" strokeWidth=".7" strokeLinecap="round" opacity=".55" />
        <path d="M18 34.5 Q24 33.8 30 34.5" fill="none" stroke="var(--cream)" strokeWidth=".6" strokeLinecap="round" opacity=".3" />
      </g>
      <circle cx="24" cy="24" r="23" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
    </svg>
  )
}
