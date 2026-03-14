// Nature.jsx — Doğa Sayfası
import '../styles/Pages.css'

const NATURE_ITEMS = [
  {
    icon: '🌊',
    title: 'Kristal Deniz',
    desc: 'Bozyazı açıklarındaki Akdeniz suları eşsiz berraklığıyla ünlüdür; yüzme, şnorkelle dalış ve kıyıdan ya da tekneden balık tutma için mükemmel bir ortam sunar.',
  },
  {
    icon: '⛰️',
    title: 'Toros Rotaları',
    desc: 'Toros Dağları yalnızca dramatik bir arka fon değil; zirvelerin sunduğu panoramik kıyı manzarasıyla birlikte kilometrelerce yürüyüş rotası da barındırır.',
  },
  {
    icon: '🦇',
    title: 'Çaltı Mağarası',
    desc: '1.200 metre rakımda yer alan bu doğal mucize, sarkıt ve dikitleriyle muhteşem bir yeraltı atmosferi sunar. Ormanın içindeki yürüyüş yolu da ayrı bir keyif.',
  },
  {
    icon: '🌿',
    title: 'Dikilitaş Parkı',
    desc: '33,5 hektarlık tabiat parkı; kıyı çamları, berrak hava ve deniz sesiyle sakinleşmek isteyenler için ideal bir kaçış noktasıdır.',
  },
  {
    icon: '🍋',
    title: 'Narenciye Bahçeleri',
    desc: 'Ilıman kıyı şeridi; muz bahçeleri, portakal ve limon bağları, çilek tarlaları ve zeytin bahçeleriyle bezenmiş canlı bir kültür peyzajıdır.',
  },
  {
    icon: '🌅',
    title: 'Akdeniz Gün Batımları',
    desc: 'Güneşin Toroslar\'ın ardına çekilişini izlemek için Maraş Tepesi ya da sahil şeridi mükemmel manzara noktaları sunar.',
  },
]

export default function Nature() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="page-header-inner">
          <p className="section-label">Doğal Güzellikler</p>
          <h1 className="section-title section-title--light">
            Vahşi<br /><em>Güzellikle Dolu</em>
          </h1>
          <p className="page-header-desc">
            Toros zirvelerinden Akdeniz kıyısına uzanan bu eşsiz coğrafyada
            doğa her köşede farklı bir sürpriz saklar.
          </p>
        </div>
      </header>

      <section className="nature-section section-padding">
        <div className="nature-grid">
          {NATURE_ITEMS.map(item => (
            <div key={item.title} className="nature-card">
              <span className="nature-icon">{item.icon}</span>
              <h2 className="nature-title">{item.title}</h2>
              <p className="nature-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="nature-cta section-padding">
        <p className="section-label">Aktiviteler</p>
        <h2 className="section-title">Ne Yapabilirsiniz?</h2>
        <div className="activities-list">
          {['Yüzme & Şnorkel', 'Toros Yürüyüşü', 'Mağara Keşfi', 'Balık Tutma', 'Doğa Fotoğrafçılığı', 'Piknik & Kamp'].map(a => (
            <span key={a} className="activity-tag">{a}</span>
          ))}
        </div>
      </section>
    </div>
  )
}
