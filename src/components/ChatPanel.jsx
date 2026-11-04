// ChatPanel.jsx — Nagidos sohbet arayüzü
//
// Hem /asistan sayfasında hem de sağ alttaki pencerede kullanılıyor.
// Sohbet durumu ChatContext'te; bu bileşen sadece görüntüler ve input'u yönetir.

import { useEffect, useRef, useState } from 'react'
import { useTranslation }              from 'react-i18next'
import ReactMarkdown                   from 'react-markdown'
import { useChat }                     from '../chat/ChatContext.jsx'
import NagidosMark                     from './NagidosMark.jsx'
import Icon                            from './Icon.jsx'
import '../styles/Assistant.css'

// Gemini cevapları markdown geliyor. Ham HTML'i render etmiyoruz (rehype-raw
// yok); linkler sitenin dışına çıktığı için yeni sekmede açılıyor.
const MARKDOWN_COMPONENTS = {
  a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
}

export default function ChatPanel({ variant = 'page', autoFocus = false }) {
  const { t } = useTranslation('assistant')
  const { messages, isLoading, isBusy, error, sendMessage } = useChat()

  const [input, setInput] = useState('')
  const messagesRef = useRef(null)
  const inputRef    = useRef(null)

  // scrollIntoView sayfanın kendisini de kaydırıyordu; pencere içinde bu
  // istenmiyor. Sadece mesaj kutusunu en alta indiriyoruz.
  useEffect(() => {
    const el = messagesRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, isLoading, error])

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus({ preventScroll: true })
  }, [autoFocus])

  // Cevap gelince input'a geri odaklan (önceki davranış). Sadece yükleme
  // bitince; ilk açılışta odaklanırsak mobilde klavye kendiliğinden açılır.
  const wasBusy = useRef(isBusy)
  useEffect(() => {
    if (wasBusy.current && !isBusy) inputRef.current?.focus({ preventScroll: true })
    wasBusy.current = isBusy
  }, [isBusy])

  const SUGGESTIONS = [t('suggestion1'), t('suggestion2'), t('suggestion3'), t('suggestion4')]

  async function handleSend() {
    const text = input
    if (!text.trim() || isBusy) return
    setInput('')
    await sendMessage(text)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Pencerede, sohbet henüz başlamamışken öneriler mesajların altında durur
  const showSuggestions = variant === 'page' || messages.length === 1

  return (
    <div className={`chat-container chat-container--${variant}`}>
      {/* data-lenis-prevent: Lenis bu kutudaki tekerlek kaydırmasına karışmasın */}
      <div className="chat-messages" ref={messagesRef} data-lenis-prevent>
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message chat-message--${msg.role}`}>
            <div className="chat-avatar">
              {msg.role === 'assistant' ? <NagidosMark size={36} /> : <Icon name="user" size={18} />}
            </div>
            {msg.role === 'assistant' ? (
              <div className="chat-bubble chat-bubble--markdown">
                <ReactMarkdown components={MARKDOWN_COMPONENTS}>{msg.text}</ReactMarkdown>
              </div>
            ) : (
              <div className="chat-bubble">
                {msg.text.split('\n').map((line, j) => (
                  <span key={j}>{line}{j < msg.text.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="chat-message chat-message--assistant">
            <div className="chat-avatar"><NagidosMark size={36} /></div>
            <div className="chat-bubble chat-bubble--loading">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          </div>
        )}
        {error && <div className="chat-error">{error}</div>}

        {variant === 'widget' && showSuggestions && (
          <div className="chat-suggestions chat-suggestions--inline">
            {SUGGESTIONS.map(q => (
              <button key={q} className="suggestion-btn" onClick={() => sendMessage(q)} disabled={isBusy}>
                {q}
              </button>
            ))}
          </div>
        )}
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
          disabled={isBusy}
        />
        <button
          className={`chat-send ${isBusy ? 'loading' : ''}`}
          onClick={handleSend}
          disabled={isBusy || !input.trim()}
          aria-label="Send"
        >
          {isBusy ? <span className="chat-spinner" /> : <Icon name="arrowRight" size={20} />}
        </button>
      </div>

      {variant === 'page' && (
        <div className="chat-suggestions">
          {SUGGESTIONS.map(q => (
            <button
              key={q}
              className="suggestion-btn"
              onClick={() => { setInput(q); inputRef.current?.focus() }}
              disabled={isBusy}
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
