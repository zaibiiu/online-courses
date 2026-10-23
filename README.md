# GlobeLearn

A responsive React frontend for the GlobeP2P Online Education ecosystem. It combines the client-supplied GlobeLearn content with a cohesive green visual system and interactive frontend demos.

## Included pages

- Landing page
- 10-course catalogue and course detail pages
- Digital library and reader preview
- AI learning assistant demo
- 100-question MCQ test concept and result preview
- Six GlobeP2P activation packages
- GlobeP2P-to-GlobeLearn “How it works” journey
- Teach and sell your course page
- Login and signup with GlobeP2P connection placeholder

This repository is intentionally frontend-only. Content is static demo data, login/signup use browser storage for the demo flow, and all future integrations are represented as UI placeholders.

## Local setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
```

The static build is generated in `docs/` for GitHub Pages.
