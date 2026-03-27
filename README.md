# Bozyazı Tanıtım Sitesi 🌊  
https://bozyazi.vercel.app/

Mersin'in gizli cenneti Bozyazı'yı tanıtan modern bir React SPA.

## Teknolojiler

| Araç | Neden? |
|------|--------|
| **React 18** | Bileşen tabanlı UI — her parça kendi mantığını yönetir |
| **React Router v6** | Sayfa yenilenmeden URL geçişi (SPA davranışı) |
| **Vite** | Hızlı geliştirme sunucusu + build aracı |
| **CSS (vanilla)** | Her bileşenin kendi CSS dosyası — temiz ve öğrenmesi kolay |

## Klasör Yapısı

```
src/
  components/
    Navbar.jsx      ← Hamburger menü dahil navigasyon
    Footer.jsx      ← Alt bilgi
  pages/
    Home.jsx        ← Ana sayfa (Hero, Hakkında, Ön İzleme)
    Discover.jsx    ← Gezilecek yerler
    Nature.jsx      ← Doğal güzellikler
    Culture.jsx     ← Kültür & lezzet
    Gallery.jsx     ← Fotoğraf galerisi + Lightbox
    Visit.jsx       ← Ziyaret planla
  styles/
    global.css      ← CSS değişkenleri, reset, utility sınıflar
    Navbar.css
    Footer.css
    Home.css
    Discover.css
    Gallery.css
    Pages.css       ← Nature, Culture, Visit için ortak stiller
  App.jsx           ← Router + layout
  main.jsx          ← React'i DOM'a bağlar
```

---
