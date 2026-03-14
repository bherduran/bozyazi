// vite.config.js
// Vite, modern bir "build tool" — React projesini tarayıcının
// anlayacağı optimize edilmiş koda dönüştürür.
// @vitejs/plugin-react ise JSX sözdizimini (HTML gibi görünen JS)
// normal JavaScript'e çevirir.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages'e deploy ettiğinde repo adını buraya yaz:
  base: '/bozyazi/',
})
