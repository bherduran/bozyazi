// main.jsx — Uygulamanın başladığı yer
//
// React 18 ile gelen yeni API: createRoot
// Eski yöntem: ReactDOM.render(<App />, document.getElementById('root'))
// Yeni yöntem: createRoot(...).render(...)
// Fark: Yeni API concurrent (eşzamanlı) özellikleri destekler.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'   // Global stiller en başta yüklenir

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode: geliştirme sırasında olası hataları önceden yakalar.
  // Production build'de etkisi yoktur, sadece seni uyarır.
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
