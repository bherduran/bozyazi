import { useState, useRef, useEffect } from 'react'
import '../styles/Assistant.css'

const SYSTEM_PROMPT = `Sen Bozyazı'nın resmi dijital rehberisisin. Adın "Bozyazı Rehberi".

Bozyazı hakkında bilmen gerekenler:
- Mersin iline bağlı, Akdeniz kıyısında küçük bir ilçe
- Toros Dağları ile Akdeniz arasında, Mersin'in 220 km batısında
- Yaklaşık 26.000 nüfus
- Önemli yerler: Nagidos Adası (antik kent), Softa Kalesi, Maraş Tepesi, Çaltı Mağarası, Dikilitaş Tabiat Parkı
- Doğal güzellikler: Kristal Akdeniz, Toros yürüyüş rotaları, narenciye bahçeleri
- Ulaşım: En yakın havalimanları Gazipaşa-Alanya (GZP) ve Antalya (AYT)
- En iyi ziyaret zamanı: Mayıs-Ekim
- Yerel lezzetler: Taze deniz ürünleri, Akdeniz mezesi, yerel narenciye

Kuralların:
1. SADECE Bozyazı ve Mersin bölgesiyle ilgili sorulara cevap ver
2. Bozyazı dışındaki konular sorulursa nazikçe "Bu konuda yardımcı olamam, Bozyazı hakkında sormak istediğin bir şey var mı?" de
3. Her zaman Türkçe cevap ver
4. Kısa, samimi ve bilgilendirici ol
5. Gerektiğinde emoji kullan ama abartma`

const INITIAL_MESSAGE = {
  role: 'assistant',
  text: 'Merhaba! Ben Bozyazı Rehberi 🌊 Bozyazı hakkında merak ettiğin her şeyi sorabilirsin — gezilecek yerler, ulaşım, konaklama, yerel lezzetler... Nasıl yardımcı olabilirim?',
}

export default function Assistant() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    setMessages(prev => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      // Geçmiş mesajları Gemini formatına çevir (ilk karşılama mesajını atla)
      const history = messages
        .slice(1)
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.text }],
        }))

   //1.5
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b-001:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user',  parts: [{ text: SYSTEM_PROMPT }] },
              { role: 'model', parts: [{ text: 'Anladım, Bozyazı Rehberi olarak yardımcı olacağım.' }] },
              ...history,
              { role: 'user',  parts: [{ text: trimmed }] },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            },
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`API hatası: ${response.status}`)
      }

      const data = await response.json()
      const assistantText = data.candidates?.[0]?.content?.parts?.[0]?.text
        ?? 'Üzgünüm, bir sorun oluştu. Tekrar dener misin?'

      setMessages(prev => [...prev, { role: 'assistant', text: assistantText }])

    } catch (err) {
      console.error('Gemini API hatası:', err)
      setError('Bağlantı hatası oluştu. Lütfen tekrar dene.')
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
    <div className="assistant-page">
      <header className="page-header">
        <div className="page-header-inner">
          <p className="section-label">Yapay Zeka Rehber</p>
          <h1 className="section-title section-title--light">
            Bozyazı<br /><em>Rehberi</em>
          </h1>
          <p className="page-header-desc">
            Bozyazı hakkında aklına takılan her şeyi sor —
            gezilecek yerler, ulaşım, konaklama, yerel lezzetler.
          </p>
        </div>
      </header>

      <section className="chat-section section-padding">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message chat-message--${msg.role}`}>
                <div className="chat-avatar">
                  {msg.role === 'assistant' ? '🌊' : '👤'}
                </div>
                <div className="chat-bubble">
                  {msg.text.split('\n').map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message chat-message--assistant">
                <div className="chat-avatar">🌊</div>
                <div className="chat-bubble chat-bubble--loading">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
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
              placeholder="Bozyazı hakkında bir şey sor... (Enter ile gönder)"
              rows={1}
              disabled={isLoading}
            />
            <button
              className={`chat-send ${isLoading ? 'loading' : ''}`}
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              aria-label="Gönder"
            >
              {isLoading ? '⏳' : '→'}
            </button>
          </div>

          <div className="chat-suggestions">
            {[
              "Bozyazı'ya nasıl gidebilirim?",
              'En güzel plajlar hangileri?',
              'Ne zaman gitmeliyim?',
              'Konaklama seçenekleri neler?',
            ].map(q => (
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
    </div>
  )
}
