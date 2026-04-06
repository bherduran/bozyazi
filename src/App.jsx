// App.jsx
//
// Yeni eklenenler:
// 1. AnimatePresence — Framer Motion'ın sayfa geçiş bileşeni
//    Bir bileşen DOM'dan çıkarken animasyonunu tamamlamasına izin verir
// 2. useLocation — Hangi sayfada olduğumuzu bilmek için
//    AnimatePresence'a key olarak veriyoruz ki her sayfa değişimini fark etsin

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar    from './components/Navbar.jsx'
import Footer    from './components/Footer.jsx'
import Home      from './pages/Home.jsx'
import Discover  from './pages/Discover.jsx'
import Nature    from './pages/Nature.jsx'
import Culture   from './pages/Culture.jsx'
import Gallery   from './pages/Gallery.jsx'
import Assistant from './pages/Assistant.jsx'
import Visit     from './pages/Visit.jsx'

// AnimatedRoutes ayrı bileşen — useLocation hook'u BrowserRouter içinde olmalı
function AnimatedRoutes() {
  const location = useLocation()

  return (
    // AnimatePresence: Sayfa değişince çıkan sayfanın
    // exit animasyonunu tamamlamasını bekler
    // mode="wait": Yeni sayfa gelmeden önce eski sayfa çıksın
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<Home />}      />
        <Route path="/kesifet"  element={<Discover />}  />
        <Route path="/doga"     element={<Nature />}    />
        <Route path="/kultur"   element={<Culture />}   />
        <Route path="/galeri"   element={<Gallery />}   />
        <Route path="/asistan"  element={<Assistant />} />
        <Route path="/ziyaret"  element={<Visit />}     />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  )
}
