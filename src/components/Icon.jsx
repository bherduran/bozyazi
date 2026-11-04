// Icon.jsx — Sitenin küçük çizgi ikon seti
//
// Emoji ve unicode oklar (→ ‹ › ×) yerine kullanılıyor. Hepsi 24'lük ızgarada,
// aynı çizgi kalınlığında ve renklerini metinden (currentColor) alıyor.

const PATHS = {
  arrowRight:   <path d="M4 12h15M13 6l6 6-6 6" />,
  chevronLeft:  <path d="M15 5l-7 7 7 7" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  close:        <path d="M6 6l12 12M18 6L6 18" />,
  camera: (
    <>
      <path d="M4 8h3.5L9 5.5h6L16.5 8H20v11H4z" />
      <circle cx="12" cy="13.2" r="3.6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M5 20c.8-3.8 3.6-5.8 7-5.8s6.2 2 7 5.8" />
    </>
  ),
}

export default function Icon({ name, size = 18, strokeWidth = 1.6, className = '', label }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {PATHS[name]}
    </svg>
  )
}
