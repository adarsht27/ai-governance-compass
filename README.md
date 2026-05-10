# AI Governance Compass 🧭

> An interactive reference tool for navigating AI compliance across the **EU AI Act** (Regulation 2024/1689) and the **UK DSIT principles-based framework**.

**[![View Live](https://img.shields.io/badge/View%20Live-Open%20Tool-2ea44f?style=for-the-badge)](https://adarsht27.github.io/ai-governance-compass/)**

---

## Overview

AI Governance Compass translates two complex and divergent regulatory frameworks into an accessible, interactive format. It is designed for researchers, policy professionals, compliance teams, and anyone assessing an organisation's AI governance posture under EU or UK rules.

The analytical framing — particularly the EU vs UK comparison structured around coercive, mimetic, and normative isomorphism — draws on original thesis research on AI governance and institutional theory conducted at the Hertie School of Governance, Berlin.

---

## Features

| Module | Description |
|---|---|
| **EU Risk Tiers** | All four risk tiers with Annex III sector uses, provider & deployer obligations, penalties, and role definitions (provider / deployer / importer / distributor) |
| **GPAI Models** | Chapter V obligations, systemic risk threshold (10²⁵ FLOPs), GPAI Code of Practice, and value chain breakdown |
| **UK Framework** | Five DSIT cross-sectoral principles, nine key sector regulators, and an eight-step compliance pathway |
| **EU vs UK Comparison** | Fifteen governance dimensions compared with divergence tagging and institutional isomorphism analysis |
| **Timeline** | Enforcement dates from February 2025 through December 2030, including Digital Omnibus trilogue updates |
| **Self-Assessment** | Guided questionnaire (18 questions) generating a personalised EU and UK compliance checklist |
| **About** | Research background, thesis connection, and how the tool is built |

---

## Research background

This tool was built alongside a master's thesis examining how organisations in Germany and the UK structure internal AI governance under divergent regulatory frameworks. The thesis uses a Most Similar Systems Design comparing ten firms across four analytical dimensions, theorised through DiMaggio and Powell's institutional isomorphism framework.

The core finding — that regulatory differences produce distinct *types* of governance (procedural vs. communicative) rather than simply different *levels* — shapes the framing throughout the tool, and most explicitly in the EU vs UK comparison module.

**Thesis:** *Organising AI Governance Under Divergent Regulatory Frameworks: A Comparative Study of German and UK Firms Under the EU AI Act and the UK Principles-Based Approach*  
**Method:** Most Similar Systems Design Framework · Thematic document analysis · Expert interviews  

---

## Tech stack

```
React 18          — component architecture
Vite 5            — build tooling and dev server
CSS Modules       — scoped, conflict-free styling
gh-pages          — GitHub Pages deployment
```

All regulatory content lives in `src/data/governance.js` — a single structured data file that powers every module. The entire tool runs statically in the browser.

---

## Project structure

```
ai-governance-tool/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css              # global design tokens
│   ├── data/
│   │   └── governance.js      # all regulatory content
│   └── components/

```

---

## Sources

- [EU AI Act — Official text (EUR-Lex)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689) — Regulation (EU) 2024/1689
- [European Commission — AI policy](https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence)
- [European Commission — Regulatory framework](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
- [UK DSIT AI White Paper response](https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach) — February 2024
- [Implementing UK AI Regulatory Principles](https://assets.publishing.service.gov.uk/media/65c0b6bd63a23d0013c821a0/implementing_the_uk_ai_regulatory_principles_guidance_for_regulators.pdf)

Content reflects the regulatory landscape as of **May 2026**.

---

## Disclaimer

For educational and research purposes only. This tool synthesises publicly available regulatory guidance and does not constitute legal advice. Always consult the source regulation and qualified legal counsel for compliance decisions.

---

## Contributing

Contributions are welcome, especially for:

- Factual corrections to EU/UK regulatory references
- Typos, broken links, and UI/accessibility fixes
- Clarifying language (without changing meaning)

Before submitting a pull request:

- Open an issue describing the change and why it’s needed (screenshots or references appreciated).
- For regulatory/content changes, include a source link and the “as of” date for the claim.

By contributing, you agree that your contributions may be redistributed under the project’s license(s).

---

## License

Code in this repository is licensed under the MIT License.

Non-code content (e.g., regulatory summaries, explanatory text, the self-assessment questions, and other written material) is licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).

Third-party materials, if any, remain under their respective licenses. If you believe any content is incorrectly attributed or should be removed, please open an issue.

---

## Author

**Adarsh Tripathi**  
Public Policy / Data Science Candidate · Hertie School, Berlin  
[LinkedIn](https://www.linkedin.com/in/adarsht/)