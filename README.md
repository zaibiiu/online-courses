# GlobeLearn

A polished frontend concept for an all-in-one educational platform, built with Laravel and React.

## Included pages

- Landing page
- Course catalogue and course detail
- Digital library and reader preview
- AI learning assistant demo
- Online MCQ tests and result screen
- Membership packages
- Login and signup with GlobeP2P connection placeholder

This repository is intentionally frontend-only. Content is static demo data and all backend integrations are represented as UI placeholders.

## Local setup

```bash
composer install
npm install
copy .env.example .env
php artisan key:generate
npm run dev
php artisan serve
```

Open `http://127.0.0.1:8000`.

## Production build

```bash
npm run build
```
