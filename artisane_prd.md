# Product Requirements Document (PRD)
# Artisane Gallery â€” Curated Art Marketplace

**Version:** 1.0  
**Date:** 2026-05-30  
**Project Path:** `C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub`  
**Local Dev Server:** `http://localhost:5173`  
**Tech Stack:** HTML5 Â· TailwindCSS (CDN) Â· Vanilla JavaScript (ES Modules) Â· Vite

---

## 1. Product Overview

**Artisane** is a premium online art marketplace that connects curated contemporary artists with discerning collectors. The platform supports direct artwork purchases, live and scheduled auction bidding, artist commission requests, editorial content, and a collector dashboard.

The brand identity is rooted in luxury editorial aesthetics: EB Garamond serif headlines, Hanken Grotesk body text, a deep navy primary color (`#123358`), warm terracotta secondary (`#94492d`), and light gallery surfaces (`#faf9f7`). Both a light and dark theme are supported via the `html.light` / `html.dark` class toggle.

---

## 2. User Roles

| Role | Description |
|---|---|
| **Visitor** | Unauthenticated guest who can browse gallery, artists, auctions, and journal |
| **Collector** | Authenticated buyer who can purchase art, bid at auctions, request commissions, and manage their dashboard |
| **Artist** | Authenticated creator who can apply to join, manage their portfolio, and receive commissions |
| **Curator / Admin** | Staff who review artist applications via the Curation Review page |

---

## 3. Pages & Features

### 3.1 Global Navigation (`index.html`, all pages)
- **Fixed top navigation bar** with logo (`Artisane`), primary links: Browse, Artists, Auctions / Collections, Journal / Exhibitions.
- **Theme toggle** (light/dark) persisted via `js/theme-toggle-helper.js`.
- **Cart icon** (`shopping_cart`) links to `checkout.html`; cart state managed by `js/cart-helper.js` using `localStorage`.
- **Auth/Profile icon** (`person`) triggers Supabase auth flow via `js/supabase-auth.js`.
- **Follow button** state managed by `js/fol
<truncated 13792 bytes>