// ChatContext.jsx — Nagidos sohbetinin durumu
//
// Sohbet hem sağ alttaki pencerede hem de /asistan sayfasında görünüyor.
// Durumu burada, App seviyesinde tutuyoruz ki sayfa değişince konuşma
// kaybolmasın ve iki görünüm aynı mesajları paylaşsın.

import { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation }                                 from 'react-i18next'

const ChatContext = createContext(null)

export function ChatProvider({ children }) {
  const { t, i18n } = useTranslation('assistant')

  const [messages,  setMessages]  = useState([{ role: 'assistant', text: t('initial_message') }])
  const [isLoading, setIsLoading] = useState(false)
  const [error,     setError]     = useState(null)
  const [isOpen,    setIsOpen]    = useState(false)

  // Dil değişince başlangıç mesajını güncelle
  useEffect(() => {
    setMessages([{ role: 'assistant', text: t('initial_message') }])
  }, [i18n.language])

  async function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return false

    setMessages(prev => [...prev, { role: 'user', text: trimmed }])
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

      const { text: reply } = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', text: reply }])
    } catch (err) {
      console.error('Sohbet hatası:', err)
      setError(err.message === 'rate_limited' ? t('error_rate_limit') : t('error'))
    } finally {
      setIsLoading(false)
    }
    return true
  }

  const value = { messages, isLoading, error, sendMessage, isOpen, setIsOpen }
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat, ChatProvider içinde kullanılmalı')
  return ctx
}
