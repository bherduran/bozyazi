// i18n.js — i18next yapılandırması
//
// i18next nasıl çalışır?
// 1. init() ile dil ayarları yapılır
// 2. resources içinde çeviriler tanımlanır
// 3. t('key') ile çeviri çağrılır
// 4. changeLanguage() ile dil değiştirilir
// 5. React komponenleri otomatik yeniden render edilir

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { translations } from './translations'

i18n
  // react-i18next eklentisini bağla
  .use(initReactI18next)
  .init({
    // Çeviri verileri
    resources: {
      tr: {
        common:    translations.tr.common,
        home:      translations.tr.home,
        discover:  translations.tr.discover,
        nature:    translations.tr.nature,
        culture:   translations.tr.culture,
        gallery:   translations.tr.gallery,
        assistant: translations.tr.assistant,
        visit:     translations.tr.visit,
      },
      en: {
        common:    translations.en.common,
        home:      translations.en.home,
        discover:  translations.en.discover,
        nature:    translations.en.nature,
        culture:   translations.en.culture,
        gallery:   translations.en.gallery,
        assistant: translations.en.assistant,
        visit:     translations.en.visit,
      },
    },

    // Tarayıcı dilini algıla, yoksa Türkçe kullan
    lng: localStorage.getItem('bozyazi-lang') || 'tr',
    fallbackLng: 'tr',

    // Varsayılan namespace
    defaultNS: 'common',

    interpolation: {
      // React zaten XSS koruması yapıyor
      escapeValue: false,
    },
  })

export default i18n
