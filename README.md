# URULAKKUPPERI — Project Journal Website
> *TinkerHub Useless Projects 3.0 Build Diary*

This directory contains the standalone, static **Project Journal** website for **URULAKKUPPERI (ഉരുളക്കുപ്പേരി)**. It chronicles the complete journey, technical breakthroughs, debugging midnight crises, character design, and learnings in an engaging, story-driven format.

---

## 📁 File Structure

```
journal/
├── index.html        # Complete standalone project journal website
├── style.css         # Custom Kerala tea-shop & comic-poster visual design system
├── script.js         # Interactive reading progress, scroll animations, and interactive cards
└── README.md         # This deployment and preview guide
```

---

## 🚀 How to Preview Locally

### Option 1: Direct File Open
Simply double-click `journal/index.html` in your file explorer, or right-click and choose **Open with Google Chrome / Microsoft Edge / Brave**.

### Option 2: Local HTTP Server (Recommended)
From the root of your project directory, run:
```bash
# Using Python
python -m http.server 8080

# Or using npx serve
npx serve journal
```
Then visit: `http://localhost:8080/journal/` (or `http://localhost:3000`).

---

## 🌐 Deploying to GitHub Pages

You can deploy this journal live on the web in two simple ways:

### Method A: Deploy alongside the main repository (Easiest)
1. Commit and push the `journal/` folder to your GitHub repository:
   ```bash
   git add journal/
   git commit -m "docs: add Project Journal website for Useless Projects 3.0"
   git push origin main
   ```
2. Go to your GitHub repository: `https://github.com/margreattalarin-cpu/useless_project_temp`.
3. Click **Settings** (tab at top) → **Pages** (left sidebar).
4. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: Select `main` and `/ (root)`
   - Click **Save**.
5. Once deployed (typically 1–2 minutes), your journal is live at:
   **`https://margreattalarin-cpu.github.io/useless_project_temp/journal/`**

---

### Method B: Deploy using a dedicated GitHub Actions workflow
If you want the journal to be served as the primary root page of GitHub Pages:
Create `.github/workflows/deploy-journal.yml`:

```yaml
name: Deploy Journal to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - 'journal/**'

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'journal'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```
Then in **Settings → Pages**, set **Source** to **GitHub Actions**. Your journal will deploy automatically to:
`https://margreattalarin-cpu.github.io/useless_project_temp/`

---

## 🎨 Design System & Fonts
The journal uses the exact visual identity of **URULAKKUPPERI**:
- **Fonts (loaded via Google Fonts)**:
  - `Luckiest Guy`: Comic titles & branding
  - `Noto Sans Malayalam`: Malayalam script
  - `Bree Serif`: Journalistic subtitles & quotes
  - `Nunito Sans`: Clean, readable body copy
  - `Patrick Hand`: Authentic handwritten sticky notes & doodles
- **Palette**: Warm cream paper (`#FAF5EA`), dark coffee brown (`#2A170D`), turmeric mustard (`#E99E1B`), burnt orange (`#DF5624`), deep maroon (`#881919`), and Kerala leaf green (`#286F3E`).
- **Dependencies**: 0 dependencies. Zero build step. Pure standard HTML5, CSS3, and modern JavaScript.
