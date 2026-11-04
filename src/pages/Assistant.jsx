import { useTranslation } from 'react-i18next'
import PageWrapper        from '../components/PageWrapper.jsx'
import ChatPanel          from '../components/ChatPanel.jsx'
import '../styles/Assistant.css'

// Sohbetin tam sayfa hali. Asıl giriş noktası artık sağ alttaki Nagidos
// penceresi; bu sayfa eski linkler bozulmasın diye duruyor ve aynı sohbeti
// (ChatContext) gösteriyor. Sistem promptu ve API anahtarı /api/chat içinde.

export default function Assistant() {
  const { t } = useTranslation('assistant')

  return (
    <PageWrapper>
      <header className="page-header">
        <div className="page-header-inner">
          <h1 className="section-title section-title--light">
            {t('title1')} <em>{t('title2')}</em>
          </h1>
          <p className="page-header-desc">{t('desc')}</p>
        </div>
      </header>

      <section className="chat-section section-padding">
        <ChatPanel variant="page" />
      </section>
    </PageWrapper>
  )
}
