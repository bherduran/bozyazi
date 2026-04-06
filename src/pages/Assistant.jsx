import { useState, useRef, useEffect } from 'react'
import { useTranslation }              from 'react-i18next'
import PageWrapper                     from '../components/PageWrapper.jsx'
import '../styles/Assistant.css'

const SYSTEM_PROMPT_TR = `Sen Bozyazı'nın resmi dijital rehberisisin. Adın "Bozyazı Rehberi".
Bozyazı hakkında bilmen gerekenler:
- Mersin iline bağlı, Akdeniz kıyısında küçük bir ilçe
- Toros Dağları ile Akdeniz arasında, Mersin'in 220 km batısında
- Yaklaşık 26.000 nüfus
- Önemli yerler: Nagidos Adası, Softa Kalesi, Maraş Tepesi, Çaltı Mağarası, Dikilitaş Tabiat Parkı
- Ulaşım: En yakın havalimanları Gazipaşa-Alanya (GZP) ve Antalya (AYT)
- En iyi ziyaret zamanı: Mayıs-Ekim
Kuralların:
1. SADECE Bozyazı ve Mersin bölgesiyle ilgili sorulara cevap ver
2. Bozyazı dışındaki konular sorulursa nazikçe reddet
3. Her zaman Türkçe cevap ver
4. Kısa, samimi ve bilgilendirici ol`

const SYSTEM_PROMPT_EN = `You are the official digital guide of Bozyazı. Your name is "Bozyazı Guide".
What you know about Bozyazı:
- A small coastal district of Mersin Province, Turkey
- Between the Taurus Mountains and the Mediterranean, 220 km west of Mersin
- Population of approximately 26,000
- Key sites: Nagidos Island, Softa Castle, Maraş Hill, Çaltı Cave, Dikilitaş Nature Park
- Transport: Nearest airports are Gazipaşa-Alanya (GZP) and Antalya (AYT)
- Best time to visit: May-October
Rules:
1. ONLY answer questions about Bozyazı and the Mersin region
2. Politely decline questions about other topics
3. Always respond in English
4. Be concise, friendly and informative`

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

  const SYSTEM_PROMPT = i18n.language === 'en' ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_TR

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
      const history = messages
        .slice(1)
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.text }],
        }))

      const makeRequest = async (retries = 3) => {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                { role: 'user',  parts: [{ text: SYSTEM_PROMPT }] },
                { role: 'model', parts: [{ text: i18n.language === 'en' ? 'Understood, I will act as the Bozyazı Guide.' : 'Anladım, Bozyazı Rehberi olarak yardımcı olacağım.' }] },
                ...history,
                { role: 'user',  parts: [{ text: trimmed }] },
              ],
              generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
            }),
          }
        )
        if (response.status === 429 && retries > 0) {
          await new Promise(r => setTimeout(r, 3000))
          return makeRequest(retries - 1)
        }
        if (!response.ok) throw new Error(`API hatası: ${response.status}`)
        return response
      }

      const response = await makeRequest()
      const data = await response.json()
      const assistantText = data.candidates?.[0]?.content?.parts?.[0]?.text
        ?? (i18n.language === 'en' ? 'Sorry, something went wrong. Please try again.' : 'Üzgünüm, bir sorun oluştu. Tekrar dener misin?')

      setMessages(prev => [...prev, { role: 'assistant', text: assistantText }])
    } catch (err) {
      console.error('Gemini API hatası:', err)
      setError(t('error'))
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
