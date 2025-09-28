# 🖥️ Terminal Portfolio

## ✨ Features

- **Interactive Terminal Interface** — Type commands to navigate
- **Command History** — Use ↑/↓ arrow keys to browse previous commands  
- **Tab Autocomplete** — Start typing and press Tab
- **Responsive Design** — Works on desktop and mobile
- **GitHub Pages Ready** — Automated deployment via Actions

## 🚀 Available Commands

```bash
help      # Show all available commands
about     # Learn about Baiastan
skills    # View technical skills and tools
projects  # Explore featured projects
contact   # Get in touch
clear     # Clear terminal output
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Deployment:** GitHub Pages (Static Export)

## 📦 Quick Start

```bash
# Clone and install
git clone https://github.com/bsowlx/terminal-portfolio.git
cd terminal-portfolio
npm install

# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Code linting
```

## 🎨 Customization

**Personal Info:** Edit cases in `src/components/Terminal.tsx` → `handleCommand()`
**Styling:** Modify `src/app/page.tsx` and Tailwind classes
**New Commands:** Add cases to the switch statement and update `COMMANDS` array

## 📱 Live Demo

👉 **[bsowlx.github.io/terminal-portfolio](https://bsowlx.github.io/terminal-portfolio/)**

---

*Built with by Baiastan*
