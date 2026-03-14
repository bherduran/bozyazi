// App.jsx — Uygulamanın iskeleti
//
// Bu dosya iki şeyi yapar:
// 1. React Router'ı kurar (URL'ye göre hangi sayfanın gösterileceğini belirler)
// 2. Her sayfada ortak olan Navbar ve Footer'ı bir kez tanımlar
//
// React Router nasıl çalışır?
// Kullanıcı "/kesifet" adresine gittiğinde tarayıcı sunucuya istek ATMAZ.
// Bunun yerine React Router URL'yi okur ve <Discover /> bileşenini render eder.
// Bu SPA'nın özüdür: sayfa yenilenmez, sadece bileşen değişir.

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar   from './components/Navbar.jsx'
import Footer   from './components/Footer.jsx'
import Home     from './pages/Home.jsx'
import Discover from './pages/Discover.jsx'
import Nature   from './pages/Nature.jsx'
import Culture  from './pages/Culture.jsx'
import Gallery  from './pages/Gallery.jsx'
import Visit    from './pages/Visit.jsx'

export default function App() {
  return (
    // BrowserRouter: Tüm Router mantığını sarar.
    // History API'yi kullanır → URL değişir ama sayfa yenilenmez.
    <BrowserRouter>

      {/* Navbar her sayfada görünür, Routes dışında */}
      <Navbar />

      {/*
        Routes: URL'ye uyan ilk Route'u render eder.
        path="/" → sadece ana sayfa
        path="/kesifet" → sadece keşfet sayfası
        ... gibi
      */}
      <main>
        <Routes>
          <Route path="/"        element={<Home />}     />
          <Route path="/kesifet" element={<Discover />} />
          <Route path="/doga"    element={<Nature />}   />
          <Route path="/kultur"  element={<Culture />}  />
          <Route path="/galeri"  element={<Gallery />}  />
          <Route path="/ziyaret" element={<Visit />}    />
        </Routes>
      </main>

      {/* Footer da her sayfada görünür */}
      <Footer />

    </BrowserRouter>
  )
}
