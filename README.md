# Bozyazı — Where the Taurus Mountains Meet the Sea

> A modern, interactive website showcasing Bozyazı, a hidden gem on Turkey's Mediterranean coast.

**Live Site:** [bozyazi.vercel.app](https://bozyazi.vercel.app)

---

## Pages

| Page | Description |
|------|-------------|
| **Home** | Hero section, district overview and statistics |
| **Discover** | Places to visit — Nagidos, Softa Castle, Çaltı Cave and more |
| **Nature** | Natural beauty, outdoor activities and routes |
| **Culture** | Local life, cuisine and cultural highlights |
| **Gallery** | Photo gallery with lightbox viewer |
| **Guide** | AI assistant answering questions about Bozyazı |
| **Visit** | Transport, accommodation and interactive Google Maps |

---

## Features

- **AI Guide** — Gemini API-powered chatbot constrained to Bozyazı topics
- **Interactive Map** — Google Maps JavaScript API with custom dark theme and markers
- **Photo Gallery** — Lightbox viewer with keyboard navigation
- **Fully Responsive** — Mobile, tablet, and desktop
- **Animated Navbar** — Hamburger menu with smooth transitions
- **Fast Build** — Vite-optimized bundle

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Component-based UI |
| **React Router v6** | Client-side routing (SPA) |
| **Vite** | Dev server and build tool |
| **Google Maps JavaScript API** | Interactive map |
| **Gemini API** | AI-powered chatbot |
| **Vercel** | Hosting and CI/CD |
| **CSS (Vanilla)** | Per-component stylesheets |

---

## Project Structure

```
src/
  components/
    Navbar.jsx        # Navigation with hamburger menu
    Footer.jsx
  pages/
    Home.jsx
    Discover.jsx
    Nature.jsx
    Culture.jsx
    Gallery.jsx       # Gallery + Lightbox
    Assistant.jsx     # AI chatbot
    Visit.jsx         # Visit info + Google Maps
  styles/
    global.css        # CSS variables and reset
    *.css             # Per-component styles
  App.jsx
  main.jsx
```

## Local Setup

```bash
npm install
```

Create a `.env` file:

```env
VITE_GEMINI_KEY=your_gemini_api_key
VITE_MAPS_KEY=your_google_maps_api_key
```

```bash
npm run dev
```

---

## Developer

**Bilge Han Erduran** — [github.com/bherduran](https://github.com/bherduran)
