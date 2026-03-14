// Visit.jsx — Ziyaret Sayfası
import '../styles/Pages.css'

export default function Visit() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="page-header-inner">
          <p className="section-label">Yolculuğunuzu Planlayın</p>
          <h1 className="section-title section-title--light">
            Nasıl<br /><em>Gelinir & Kalınır</em>
          </h1>
          <p className="page-header-desc">
            Bozyazı'nın uzaklığı büyüsünün bir parçasıdır.
            Akdeniz kıyısından ya da Toros geçitlerinden yapılan yaklaşım,
            başlı başına bir yolculuktur.
          </p>
        </div>
      </header>

      <section className="visit-section section-padding">
        <div className="visit-grid">
          <div className="visit-card">
            <span className="visit-icon">✈️</span>
            <h2>Nasıl Gidilir</h2>
            <p>En yakın havalimanları <strong>Gazipaşa–Alanya (GZP)</strong> ve <strong>Antalya (AYT)</strong>'dır. Her ikisinden de sahil yolu ya da Toros geçidiyle ilçeye ulaşılabilir. Keşif özgürlüğü için araç kiralamak önerilir.</p>
          </div>
          <div className="visit-card">
            <span className="visit-icon">🌤️</span>
            <h2>En İyi Mevsim</h2>
            <p><strong>Mayıs–Ekim</strong> arası sıcak Akdeniz havası ve sakin deniz sunar. Temmuz–Ağustos yaz zirvesidir. İlkbahar ve sonbahar ise Toros yürüyüşleri için ideal ılık havasıyla daha sakin ve huzurlu geçer.</p>
          </div>
          <div className="visit-card">
            <span className="visit-icon">🏡</span>
            <h2>Nerede Kalınır</h2>
            <p>Deniz manzaralı <strong>butik otellerden</strong> samimi yerel pansiyonlara geniş bir konaklama yelpazesi mevcuttur. Konya ve Ankara'dan tatilcilere ait birçok yazlık daire de kiralanabilmektedir.</p>
          </div>
          <div className="visit-card">
            <span className="visit-icon">🍽️</span>
            <h2>Ne Yenir</h2>
            <p>Taze deniz ürünleri, yerel mevsim sebzeleri ve Akdeniz mezelerinden oluşan sofraları kesinlikle deneyin. Kahvaltıda <strong>yerel bal ve zeytinyağı</strong> ile başlamak en doğru tercih.</p>
          </div>
          <div className="visit-card">
            <span className="visit-icon">📍</span>
            <h2>Konum</h2>
            <p>Bozyazı, Mersin şehir merkezinin yaklaşık <strong>220 km batısında</strong>, Akdeniz kıyısında yer alır. Koordinatlar: <strong>36°31′K, 32°57′D</strong>.</p>
          </div>
          <div className="visit-card">
            <span className="visit-icon">💡</span>
            <h2>İpuçları</h2>
            <p>İlçe küçük ve samimi — yerel esnafla konuşmaktan çekinmeyin. Hafta sonu pazarını kaçırmayın. Dağ yollarında gün batımından sonra dikkatli sürün.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
