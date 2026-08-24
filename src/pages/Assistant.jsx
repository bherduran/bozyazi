import { useState, useRef, useEffect } from 'react'
import { useTranslation }              from 'react-i18next'
import PageWrapper                     from '../components/PageWrapper.jsx'
import '../styles/Assistant.css'

// Sistem promptu ve API anahtarı artık burada değil — ikisi de /api/chat
// içinde, sunucuda duruyor. Bu dosya sadece sohbet arayüzünü yönetir.

export default function Assistant() {
  const { t, i18n }  = useTranslation('assistant')

  const INITIAL_MESSAGE = {
    role: 'assistant',
    text: t('initial_message'),
  }

  const [messages,  setMessages]  = useState([INITIAL_MESSAGE])
  const [input,     setInput]     = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error,     setError]     = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef       = useRef(null)

  // Dil değişince başlangıç mesajını güncelle
  useEffect(() => {
    setMessages([{ role: 'assistant', text: t('initial_message') }])
  }, [i18n.language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const SUGGESTIONS = [
    t('suggestion1'),
    t('suggestion2'),
    t('suggestion3'),
    t('suggestion4'),
  ]

  async function sendMessage() {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    setMessages(prev => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      // Açılış mesajı bize ait, geçmişe dahil etmiyoruz.
      // Geçmişi kısaltma ve rol dönüşümü sunucuda yapılıyor.
      const history = messages.slice(1).map(m => ({ role: m.role, text: m.text }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history, lang: i18n.language }),
      })

      if (!response.ok) {
        const { error: code } = await response.json().catch(() => ({}))
        throw new Error(code ?? `http_${response.status}`)
      }

      const { text } = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', text }])
    } catch (err) {
      console.error('Sohbet hatası:', err)
      setError(err.message === 'rate_limited' ? t('error_rate_limit') : t('error'))
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <PageWrapper>
      <header className="page-header">
        <div className="page-header-inner">
          <p className="section-label">{t('label')}</p>
          <h1 className="section-title section-title--light">
            {t('title1')}<br /><em>{t('title2')}</em>
          </h1>
          <p className="page-header-desc">{t('desc')}</p>
        </div>
      </header>

      <section className="chat-section section-padding">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message chat-message--${msg.role}`}>
                <div className="chat-avatar">{msg.role === 'assistant' ? '🌊' : '👤'}</div>
                <div className="chat-bubble">
                  {msg.text.split('\n').map((line, j) => (
                    <span key={j}>{line}{j < msg.text.split('\n').length - 1 && <br />}</span>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message chat-message--assistant">
                <div className="chat-avatar">🌊</div>
                <div className="chat-bubble chat-bubble--loading">
                  <span className="dot" /><span className="dot" /><span className="dot" />
                </div>
              </div>
            )}
            {error && <div className="chat-error">{error}</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <textarea
              ref={inputRef}
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('placeholder')}
              rows={1}
              disabled={isLoading}
            />
            <button
              className={`chat-send ${isLoading ? 'loading' : ''}`}
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              aria-label="Send"
            >
              {isLoading ? '⏳' : '→'}
            </button>
          </div>

          <div className="chat-suggestions">
            {SUGGESTIONS.map(q => (
              <button
                key={q}
                className="suggestion-btn"
                onClick={() => { setInput(q); inputRef.current?.focus() }}
                disabled={isLoading}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
