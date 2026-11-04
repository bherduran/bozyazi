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
  // isLoading: ilk kelime henüz gelmedi (bekleme noktaları görünür)
  // isBusy:    istek sürüyor, cevap hâlâ akıyor olabilir (input kilitli)
  const [isLoading, setIsLoading] = useState(false)
  const [isBusy,    setIsBusy]    = useState(false)
  const [error,     setError]     = useState(null)
  const [isOpen,    setIsOpen]    = useState(false)

  // Dil değişince başlangıç mesajını güncelle
  useEffect(() => {
    setMessages([{ role: 'assistant', text: t('initial_message') }])
  }, [i18n.language])

  async function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || isBusy) return false

    setMessages(prev => [...prev, { role: 'user', text: trimmed }])
    setIsLoading(true)
    setIsBusy(true)
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

      // Cevap akış halinde geliyor: ilk parçada yeni bir asistan mesajı
      // açıyoruz, sonraki parçaları onun sonuna ekliyoruz.
      const reader  = response.body.getReader()
      const decoder = new TextDecoder()
      let reply = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        if (!chunk) continue
        const started = reply === ''
        reply += chunk
        const text = reply
        setMessages(prev => started
          ? [...prev, { role: 'assistant', text }]
          : [...prev.slice(0, -1), { role: 'assistant', text }])
        // İlk kelime geldi: bekleme noktalarını kaldır
        if (started) setIsLoading(false)
      }
      if (!reply) throw new Error('empty_response')
    } catch (err) {
      console.error('Sohbet hatası:', err)
      setError(err.message === 'rate_limited' ? t('error_rate_limit') : t('error'))
    } finally {
      setIsLoading(false)
      setIsBusy(false)
    }
    return true
  }

  const value = { messages, isLoading, isBusy, error, sendMessage, isOpen, setIsOpen }
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat, ChatProvider içinde kullanılmalı')
  return ctx
}
