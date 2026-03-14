// Discover.jsx — Keşfet Sayfası
// Gezilecek yerleri kart grid'i olarak gösterir.
// Her kart hover'da açıklamasını gösterir.

import '../styles/Discover.css'

const PLACES = [
  {
    id: 1,
    tag: 'Antik Kent',
    name: 'Nagidos Antik Kenti',
    desc: 'MÖ 4. yüzyılda Rodos ve Samos\'un üssü olarak kurulan Helenistik yerleşim, Paşabeleni Tepesi\'nde yer alır. Mersin Üniversitesi kazılarında Pers satraplığına ait gümüş sikkeler bulunmuştur.',
    color: '#0a3a5c',
    accent: '#1a6b8a',
    num: '01',
  },
  {
    id: 2,
    tag: 'Kale',
    name: 'Softa Kalesi',
    desc: 'İlçeye 4 km mesafede Fidik Dağı\'ndaki gizemli kale; çift sıra duvarları ve Mamure Kalesi\'ne uzandığı söylenen yeraltı tünelleriyle efsanelere konu olmuştur.',
    color: '#1a3a20',
    accent: '#2d6a35',
    num: '02',
  },
  {
    id: 3,
    tag: 'Tepe',
    name: 'Maraş Tepesi',
    desc: 'Yaklaşık 1.000 metre yükseklikte, antik dönemde Mısırlılar tarafından inşa edildiği düşünülen bu tepe; ilçeyi ve Akdeniz kıyısını kuşbakışı sunar.',
    color: '#3a2a08',
    accent: '#7a5a15',
    num: '03',
  },
  {
    id: 4,
    tag: 'Mağara',
    name: 'Çaltı Mağarası',
    desc: '1.200 metre rakımda yakın zamanda turizme açılan bu mağara, Mersin\'in en yüksek doğal güzelliğidir. Etkileyici sarkıt ve dikitleriyle büyüleyici bir yeraltı dünyası sunar.',
    color: '#2a0a2a',
    accent: '#6a2060',
    num: '04',
  },
  {
    id: 5,
    tag: 'Tabiat Parkı',
    name: 'Dikilitaş Tabiat Parkı',
    desc: 'Merkezine 15 km uzaklıkta, 33,5 hektarlık geniş alanda uzanan doğa parkı; kıyı çamları ve deniz sesinin eşliğinde nefes kesen yürüyüş rotaları sunar.',
    color: '#0a2a3a',
    accent: '#1a5a7a',
    num: '05',
  },
  {
    id: 6,
    tag: 'Marina',
    name: 'Bozyazı Marinası',
    desc: 'Tekne gezileri ve balıkçı teknelerinin yanaştığı küçük ama keyifli marina, özellikle gün batımında muhteşem bir manzara sunar.',
    color: '#0a2540',
    accent: '#1a6b8a',
    num: '06',
  },
]

export default function Discover() {
  return (
    <div className="discover">
      <PageHeader
        label="Mutlaka Görün"
        title={<>İlçeyi<br /><em>Keşfedin</em></>}
        desc="Tepedeki antik kalelerden bozulmamış doğa parklarına — Bozyazı'nın her köşesinde meraklı bir gezgini bekleyen bir keşif gizlidir."
      />
      <section className="places-grid-section section-padding">
        <div className="places-grid">
          {PLACES.map(place => (
            <PlaceCard key={place.id} {...place} />
          ))}
        </div>
      </section>
    </div>
  )
}

// ── SAYFA BAŞLIĞI ─────────────────────────────────────────────
// Birden fazla sayfada kullanılabilecek şekilde tasarlandı.
// Props: bileşene dışarıdan aktarılan veriler.
function PageHeader({ label, title, desc }) {
  return (
    <header className="page-header">
      <div className="page-header-inner">
        <p className="section-label">{label}</p>
        <h1 className="section-title section-title--light">{title}</h1>
        {desc && <p className="page-header-desc">{desc}</p>}
      </div>
    </header>
  )
}

// ── YER KARTI ────────────────────────────────────────────────
// Destructuring: {tag, name, desc, ...} = props
function PlaceCard({ tag, name, desc, color, accent, num }) {
  return (
    <article
      className="place-card"
      style={{
        '--card-bg': color,
        '--card-accent': accent,
      }}
    >
      <span className="place-num">{num}</span>
      <div className="place-content">
        <span className="place-tag">{tag}</span>
        <h2 className="place-name">{name}</h2>
        <p className="place-desc">{desc}</p>
      </div>
    </article>
  )
}
