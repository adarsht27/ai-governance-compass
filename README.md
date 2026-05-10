# AI Governance Compass 🧭

An interactive tool for navigating AI compliance under the **EU AI Act (Regulation 2024/1689)** and the **UK DSIT principles-based framework**. Built as a portfolio project demonstrating AI governance knowledge.

**Live demo:** `https://YOUR-USERNAME.github.io/ai-governance-compass/`

---

## What's inside

| Section | What it covers |
|---|---|
| **EU Risk Tiers** | All four tiers — unacceptable, high, limited, minimal. Provider + deployer obligations for high-risk AI. Annex III use cases. |
| **GPAI Models** | General-purpose AI Chapter V obligations, systemic risk threshold (10²⁵ FLOPs), Code of Practice |
| **UK Framework** | Five DSIT principles, 9 key sector regulators, 8-step compliance pathway |
| **EU vs UK Comparison** | 15 governance dimensions compared with divergence analysis |
| **Timeline** | Enforcement dates from Feb 2025 → Dec 2030, including Digital Omnibus updates |
| **Self-Assessment** | 18-question guided questionnaire → personalised compliance checklist |

---

## Stack

- **React 18** + **Vite 5** — fast development, optimised builds
- **CSS Modules** — scoped styles, no conflicts
- **gh-pages** — one-command GitHub Pages deployment
- No external UI library — fully custom design

---

## 🚀 Deploy to GitHub Pages (step by step)

### Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `ai-governance-compass` (or any name you prefer)
3. Set it to **Public**
4. Click **Create repository**

### Step 2 — Update the base path

In `vite.config.js`, change `'ai-governance-compass'` to match your repo name:

```js
base: '/YOUR-REPO-NAME/',
```

### Step 3 — Update package.json homepage (optional but good practice)

Add this to `package.json`:
```json
"homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME"
```

### Step 4 — Install dependencies

```bash
npm install
```

### Step 5 — Test locally

```bash
npm run dev
```

Open `http://localhost:5173/ai-governance-compass/` in your browser.

### Step 6 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — AI Governance Compass"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ai-governance-compass.git
git push -u origin main
```

### Step 7 — Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the project and pushes the `dist/` folder to a `gh-pages` branch automatically.

### Step 8 — Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select branch: `gh-pages`, folder: `/ (root)`
4. Click **Save**
5. Wait ~2 minutes, then visit `https://YOUR-USERNAME.github.io/ai-governance-compass/`

### Future updates

After making changes, just run:
```bash
npm run deploy
```

---

## Project structure

```
ai-governance-compass/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.module.css
│   ├── index.css
│   ├── data/
│   │   └── governance.js        ← all EU AI Act + UK framework data
│   └── components/
│       ├── Header.jsx / .css
│       ├── Hero.jsx / .css
│       ├── EURiskExplorer.jsx / .css
│       ├── GPAIExplorer.jsx / .css
│       ├── UKFramework.jsx / .css
│       ├── Comparison.jsx / .css
│       ├── Timeline.jsx / .css
│       ├── Assessment.jsx / .css
│       └── Footer.jsx / .css
```

---

## Sources

- [EU AI Act full text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689) — Regulation (EU) 2024/1689
- [EU AI Act high-level summary](https://artificialintelligenceact.eu/high-level-summary/) — Future of Life Institute
- [EU AI Act implementation timeline](https://artificialintelligenceact.eu/implementation-timeline/)
- [GPAI Guidelines overview](https://artificialintelligenceact.eu/gpai-guidelines-overview/) — July 2025
- [European Commission AI regulation page](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
- [UK DSIT AI White Paper response](https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach) — Feb 2024
- [Implementing UK AI Regulatory Principles guidance](https://assets.publishing.service.gov.uk/media/65c0b6bd63a23d0013c821a0/implementing_the_uk_ai_regulatory_principles_guidance_for_regulators.pdf)

---

## Disclaimer

For educational and research purposes only. Not legal advice. Consult qualified legal counsel for compliance decisions. Content reflects the regulatory landscape as of May 2026.

---

*Built by Adarsh — MPP/Data Science candidate, Hertie School Berlin. Research focus: AI governance and institutional isomorphism.*
