import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import App from './App.jsx'
import './styles/global.css'
import './i18n/i18n.js'  // i18next başlatılır — App'ten önce import edilmeli!

// Lenis: yumuşak kaydırma. "Hareketi azalt" tercihi olanlarda Lenis'i hiç
// başlatmıyoruz, tarayıcının normal kaydırması kalıyor.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Root({ children }) {
  if (reduceMotion) return children
  return <ReactLenis root options={{ lerp: 0.1 }}>{children}</ReactLenis>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root>
      <App />
    </Root>
  </React.StrictMode>
)
