# 🎬 Movie Hunt — Curated Cinema Journal

> **Stop searching. Start watching stories worth your time.**
> *A high-craftsmanship, human-curated film and series discovery web app built with Next.js 15, React 19, and TypeScript.*

---

## ✨ Overview

**Movie Hunt** is an editorial film discovery platform designed for people who appreciate storytelling, visual craft, and thoughtful recommendations. Unlike algorithmic streaming platforms that push endless content walls, Movie Hunt presents **handpicked masterpieces**—each personally watched, rated, and articulated with spoiler-free hooks and curation perspectives.

---

## 🌟 Key Features

- **📖 Chapter-Based Storytelling Homepage**: Rebuilt into 5 distinct editorial chapters (Hero Opening Frame, Today's Story, Warm Paper Manifesto, Curated Journeys, and The Vault Archive).
- **🎲 4-Step Conversational Curation Engine (`HuntWizard`)**: An interactive wizard matching your mood, time availability, and streaming preference with a smart *"I Don't Know Yet (Surprise Me)"* option.
- **🎛️ Custom Cinematic Trailer Player**: Built-in modal player featuring custom playback controls ($\pm 10\text{s}$ skip, play/pause toggle, volume mute toggle, interactive timeline seek, and keyboard shortcuts).
- **📚 Curated Journeys & Collections**: Theme-based journeys (*Rainy Night Stories*, *Hidden Indian Gems*, *Edge-of-Seat Thrillers*, *Meditative Masterpieces*) with interactive list interactions.
- **🗃️ Vault Archive with Smart Pagination**: Clean 10-item initial view to prevent endless scrolling fatigue, with inline expansion and full catalog exploration.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Tailwind CSS & Vanilla Design Tokens
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/moviehunt.git
cd moviehunt
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view Movie Hunt.

---

## 📁 Project Structure

```text
moviehunt/
├── app/                  # Next.js App Router pages & layouts
│   ├── collections/      # Curated Collections page
│   ├── hunt/[id]/        # Individual Film Breakdown pages
│   ├── journey/          # Full Archive Vault page
│   ├── globals.css       # Design token system & keyframe animations
│   ├── layout.tsx        # Root layout with fonts & Navbar
│   └── page.tsx          # Homepage chapter sequence
├── components/           # UI Components
│   ├── CinematicTrailerModal.tsx # Custom trailer player with -10s/+10s controls
│   ├── FeaturedCollections.tsx   # Numbered editorial list component
│   ├── Hero.tsx                  # Full-bleed opening chapter
│   ├── HuntArchiveTimeline.tsx   # Archive grid with pagination
│   ├── HuntWizard.tsx            # 4-Step Curation Engine
│   ├── ManifestoSection.tsx      # Warm light paper trust chapter
│   ├── Navbar.tsx                # Responsive header navigation
│   └── TodaysHunt.tsx            # Today's Pick cover story component
├── data/                 # Curated film database & collections
│   └── hunts.ts          # 69+ hand-selected films, series & metadata
└── public/               # Static media & poster image assets
```

---

## 📝 License

Distributed under the MIT License. Built with passion for cinema lovers.

