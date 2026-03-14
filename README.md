# Bozyazı Tanıtım Sitesi 🌊

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

## Kurulum & Çalıştırma

### Gereksinimler
- Node.js 18+ (https://nodejs.org)

### Adımlar

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Geliştirme sunucusunu başlat
npm run dev

# 3. Tarayıcıda aç
# http://localhost:5173
```

---

## Fotoğraf Ekleme

1. Fotoğraflarını `public/photos/` klasörüne koy:
   ```
   public/
     photos/
       sahil.jpg
       kale.jpg
       doga.jpg
       ...
   ```

2. `src/pages/Gallery.jsx` dosyasını aç

3. `PHOTOS` dizisini güncelle:
   ```js
   const PHOTOS = [
     { id: 1, src: '/photos/sahil.jpg',  alt: 'Bozyazı Sahili', caption: 'Kristal berraklığında Akdeniz' },
     { id: 2, src: '/photos/kale.jpg',   alt: 'Softa Kalesi',   caption: 'Fidik Dağı\'ndaki gizemli kale' },
     // ...
   ]
   ```

4. Placeholder'ları diziden sil, kaydet — bitti!

---

## GitHub Pages'e Deploy

### 1. vite.config.js'i güncelle

```js
export default defineConfig({
  plugins: [react()],
  base: '/REPO-ADI/',  // GitHub repo adını yaz
})
```

### 2. gh-pages paketini yükle

```bash
npm install --save-dev gh-pages
```

### 3. package.json'a script ekle

```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

### 4. Deploy et

```bash
npm run deploy
```

### 5. GitHub ayarları

GitHub repo → Settings → Pages → Source: `gh-pages` branch seç → Kaydet

Birkaç dakika sonra siteniz `https://KULLANICIADI.github.io/REPO-ADI/` adresinde yayında!

---

## React'te Öğrendiğin Kavramlar

### useState
```jsx
const [isOpen, setIsOpen] = useState(false)
// isOpen: mevcut değer
// setIsOpen: değeri güncelleyen fonksiyon
// false: başlangıç değeri
```

### useEffect
```jsx
useEffect(() => {
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll) // temizlik
}, []) // [] = sadece component yüklenince çalış
```

### Props
```jsx
// Tanım:
function PlaceCard({ title, desc, color }) { ... }

// Kullanım:
<PlaceCard title="Softa Kalesi" desc="..." color="#0a3a5c" />
```

### .map() ile liste render
```jsx
{ITEMS.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

---

## Geliştirme Fikirleri

- [ ] Google Maps entegrasyonu (Ziyaret sayfası)
- [ ] İletişim formu
- [ ] İngilizce / Türkçe dil seçeneği
- [ ] Dark mode toggle
- [ ] Animasyonlu sayfa geçişleri (Framer Motion)
- [ ] Gerçek fotoğraflar ekle 📷
