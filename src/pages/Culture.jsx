// Culture.jsx — Kültür Sayfası
import '../styles/Pages.css'

const CULTURE_ITEMS = [
  { title: 'Deniz Ürünleri & Meze', desc: 'Denize nazır restoranlarda günün en taze avını, geleneksel Türk meze sofrasıyla tadın. Burada deniz kenarındaki akşamlar yavaş ve zamansız bir ritimle akar.' },
  { title: 'Türk Misafirperverliği', desc: 'Bozyazı\'da bir çay ya da kahve daveti asla tesadüf değildir — gerçek bir karşılama jestir. Samimi bir tokalaşma ve saygılı bir selam, her kapıda dost kazandırır.' },
  { title: 'Yerel Pazarlar', desc: 'İlçenin verimli kıyı şeridi Türkiye\'nin en kaliteli muzunu, narenciyesini ve yerfıstığını yetiştirir. Sabah pazarları renk, koku ve bereketla dolar taşar.' },
  { title: 'Deniz Kenarı Geceleri', desc: 'Güneş Toroslar\'ın ardına çekildiğinde kafeler Türk halk müziği, samimi sohbet ve açık suyun üzerindeki fener ışıklarıyla canlanır.' },
  { title: 'Arkeolojik Miras', desc: 'Nagidos\'tan çıkarılan eserler — antik gümüş sikkeler dahil — Mersin Müzesi\'nde sergilenmektedir. Bu kıyının geçmişi taşta ve toprağın derinliklerinde hâlâ yaşıyor.' },
  { title: 'Topluluk Ruhu', desc: 'İlçenin küçük ölçeği herkesi birbirine yakın kılar. Pazarlar, liman, çay ocakları — Bozyazı\'nın gerçek hayatı bu mekânlarda sessizce ve sıcacık akar.' },
]

export default function Culture() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="page-header-inner">
          <p className="section-label">Kültür & Lezzet</p>
          <h1 className="section-title section-title--light">
            Yerel Hayatı<br /><em>Tadın</em>
          </h1>
          <p className="page-header-desc">
            Bozyazı yalnızca görülecek değil, yaşanacak bir yer.
            Sofrası, insanı ve ritmiyle sizi içine çeker.
          </p>
        </div>
      </header>

      <section className="culture-section section-padding">
        <div className="culture-grid">
          {CULTURE_ITEMS.map((item, i) => (
            <div key={item.title} className="culture-card">
              <span className="culture-index">0{i + 1}</span>
              <h2 className="culture-title">{item.title}</h2>
              <p className="culture-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
