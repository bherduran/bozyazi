// Assistant.jsx — Bozyazı AI Rehberi
//
// Bu sayfa şunları öğretir:
// 1. fetch API — tarayıcıdan HTTP isteği atmak
// 2. async/await — asenkron işlemler
// 3. useState ile sohbet geçmişi yönetimi
// 4. useRef ile otomatik scroll
// 5. Gemini API entegrasyonu

import { useState, useRef, useEffect } from 'react'
import '../styles/Assistant.css'

// ── SİSTEM PROMPTU ────────────────────────────────────────────
// Bu metin chatbot'a kimliğini ve görevini tanımlar.
// Ne kadar detaylı olursa, cevaplar o kadar iyi olur.
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

// ── BAŞLANGIÇ MESAJI ──────────────────────────────────────────
const INITIAL_MESSAGE = {
  role: 'assistant',
  text: 'Merhaba! Ben Bozyazı Rehberi 🌊 Bozyazı hakkında merak ettiğin her şeyi sorabilirsin — gezilecek yerler, ulaşım, konaklama, yerel lezzetler... Nasıl yardımcı olabilirim?',
}

export default function Assistant() {
  // messages: Tüm sohbet geçmişi — her mesaj {role, text} formatında
  // role: 'user' veya 'assistant'
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Son mesaja otomatik scroll için
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Yeni mesaj gelince en alta scroll et
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ── MESAJ GÖNDER ───────────────────────────────────────────
  async function sendMessage() {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    // Kullanıcı mesajını ekle
    const userMessage = { role: 'user', text: trimmed }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      // Gemini API'ye gönderilecek sohbet geçmişi formatı
      // Gemini "contents" dizisi bekliyor: [{role, parts: [{text}]}]
      // Sohbet geçmişini hazırla — ilk assistant mesajını atla
const history = messages
  .filter(m => m.role !== 'system')
  .slice(1) // ← İlk karşılama mesajını atla
  .map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.text }],
  }))

    

      // fetch: Tarayıcının HTTP isteği atma API'si
      // async/await: Promise'i bekle, sonucu al
      const response = await fetch(
        // Bunu kullan:
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=...`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
  contents: [
    {
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }],
    },
    {
      role: 'model',
      parts: [{ text: 'Anladım, Bozyazı Rehberi olarak yardımcı olacağım.' }],
    },
    ...history,
    {
      role: 'user',
      parts: [{ text: trimmed }],
    },
  ],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 500,
  },
}),

      // HTTP hatası kontrolü
      if (!response.ok) {
  throw new Error(`API hatası: ${response.status}`)
}

      const data = await response.json()

      // Gemini'nin cevabı bu yapıda geliyor:
      // data.candidates[0].content.parts[0].text
      const assistantText = data.candidates?.[0]?.content?.parts?.[0]?.text
        ?? 'Üzgünüm, bir sorun oluştu. Tekrar dener misin?'

      setMessages(prev => [...prev, { role: 'assistant', text: assistantText }])

    } catch (err) {
      console.error('Gemini API hatası:', err)
      setError('Bağlantı hatası oluştu. Lütfen tekrar dene.')
    } finally {
      // Hata da olsa yükleniyor durumunu kapat
      setIsLoading(false)
      // Input'a fokuslan
      inputRef.current?.focus()
    }
  }

  // Enter tuşuna basınca gönder (Shift+Enter = yeni satır)
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

          {/* ── MESAJLAR ── */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message chat-message--${msg.role}`}
              >
                {/* Avatar */}
                <div className="chat-avatar">
                  {msg.role === 'assistant' ? '🌊' : '👤'}
                </div>

                {/* Mesaj baloncuğu */}
                <div className="chat-bubble">
                  {/* Metni satırlara böl — \n karakterlerini <br> yap */}
                  {msg.text.split('\n').map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Yükleniyor animasyonu */}
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

            {/* Hata mesajı */}
            {error && (
              <div className="chat-error">{error}</div>
            )}

            {/* Bu div'e scroll edilir */}
            <div ref={messagesEndRef} />
          </div>

          {/* ── INPUT ALANI ── */}
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

          {/* Örnek sorular */}
          <div className="chat-suggestions">
            {[
              'Bozyazı\'ya nasıl gidebilirim?',
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
