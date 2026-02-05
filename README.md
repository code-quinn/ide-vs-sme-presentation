# IDE vs SME Presentation

An interactive, gamified web presentation explaining the Innovation Driven Environment (IDE) framework compared to traditional Small/Medium Enterprise (SME) approaches.

Built for **WorldClass University Excursion 2026**.

![IDE vs SME](https://img.shields.io/badge/Framework-IDE%20vs%20SME-8B5CF6)
![React](https://img.shields.io/badge/React-18.2-61DAFB)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 🎮 Features

### Interactive Elements
- **Quiz System**: Test understanding with immediate feedback
- **Points & Scoring**: Gamified learning experience
- **Achievements**: Unlock badges for participation
- **Timer**: Built-in timer for group exercises

### Navigation
- **Arrow keys**: Navigate slides (← →)
- **Space bar**: Next slide
- **Click dots**: Jump to any slide
- **Touch/swipe**: Mobile friendly

### Slide Types
- Title slides with animations
- Definition slides with icons
- Side-by-side comparisons
- Visual decision flow diagrams
- Interactive quizzes
- Group exercise prompts
- Live demo placeholders

## 📖 Content Overview

1. **IDE vs SME Framework**
   - Clear definitions
   - Head-to-head comparison table

2. **How IDEs Work**
   - Team structure differences
   - Decision-making speed
   - Culture of experimentation
   - AI integration in workflows

3. **WorldClass Examples**
   - Vent.Africa (fintech)
   - AI Dev Platform
   - Multiple parallel ventures

4. **Interactive Quiz**
   - 4 questions to test understanding
   - Points and achievements

5. **Group Exercise**
   - Design your own IDE approach
   - 5-minute timed activity

## 🛠 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📁 Project Structure

```
src/
├── App.jsx                 # Main application
├── index.css              # Global styles
├── main.jsx               # Entry point
├── components/
│   ├── ParticleBackground.jsx
│   ├── ProgressBar.jsx
│   ├── ScoreBoard.jsx
│   ├── SlideRenderer.jsx
│   └── slides/            # Individual slide components
│       ├── TitleSlide.jsx
│       ├── DefinitionSlide.jsx
│       ├── ComparisonSlide.jsx
│       └── ... (12 more)
└── data/
    └── slides.jsx         # Slide content data
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```js
colors: {
  'wc-purple': '#8B5CF6',
  'wc-blue': '#3B82F6',
  'wc-cyan': '#06B6D4',
  'wc-pink': '#EC4899',
}
```

### Content
Edit `src/data/slides.jsx` to modify presentation content.

## 📄 One-Pager

A printable one-pager PDF is available at `/one-pager.html` for takeaway materials.

## 🚢 Deployment

### GitHub Pages (Automatic)

This repo includes a GitHub Actions workflow for automatic deployment:

1. Push to `master` or `main` branch
2. Go to repo Settings → Pages
3. Set Source to "GitHub Actions"
4. The site will deploy automatically on every push

**Live URL:** `https://<username>.github.io/ide-vs-sme-presentation/`

### Manual Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy dist/ folder to any static host
```

### Netlify (Alternative)

1. Connect your GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

## 📝 License

Private - WorldClass © 2026

---

Built with ❤️ by WorldClass & Quinn (AI Assistant) at 2am
