# Fahad & Nadha — Wedding Invitation Site

A static Next.js wedding invitation website for the marriage of **Fahad P N** and **Nadha Shirin K N** on **26th July 2026**.

## Features

- **Landing page** — Animated F&N monogram inside an Islamic 8-pointed star frame with side selection
- **Bride's Side** — Nikkah ceremony invitation (11:30 AM, Cosmopolitan Convention Center)
- **Groom's Side** — Wedding reception invitation (7:00–10:00 PM, SB Convention Center)
- **Islamic aesthetic** — Arabic calligraphy (Bismillah, Surah Ar-Rum 30:21), geometric patterns, Rub el Hizb ornaments
- **Bilingual** — English / Malayalam toggle on both invitation pages
- **Live countdown** — Counts down to each event in real time
- **Google Maps** — Direct links to venue locations via coordinates

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, static export)
- [Tailwind CSS 3](https://tailwindcss.com/)
- Google Fonts — Amiri (Arabic), Cormorant Garamond (English display), Noto Sans Malayalam

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  layout.js          # Root layout — font setup, metadata
  globals.css        # Global styles, animations, Islamic pattern background
  page.js            # Landing page — F&N monogram + side selection
  bride/page.js      # Nikkah invitation
  groom/page.js      # Reception invitation
components/
  Countdown.js       # Client-side live countdown timer
```

## Event Details

| Event | Date | Time | Venue |
|-------|------|------|-------|
| Nikkah (Bride's Side) | 26 July 2026 | 11:30 AM | Cosmopolitan Convention Center |
| Reception (Groom's Side) | 26 July 2026 | 7:00 – 10:00 PM | SB Convention Center |

## Build

```bash
pnpm build   # production build
pnpm start   # serve the production build
```
