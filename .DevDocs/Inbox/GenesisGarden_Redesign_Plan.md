# Genesis Garden Website Redesign - Combined Plan

> **Last Updated**: 2026-02-12

---

## Implementation Plan

Redesign genesis-garden.org as a modern, mobile-first React app. Preserving all content and branding for this 501(c)(3) nonprofit focused on housing services in Western Illinois.

### Tech Stack

- **Vite + React** | **React Router v6** | **Vanilla CSS** w/ custom properties
- **Mobile-first** breakpoints: 480px, 768px, 1024px, 1280px
- **Google Fonts**: Inter (body) + Outfit (headings)

### Branding (Implemented — Pending Confirmation)

| Token     | Value     | Usage                         |
| --------- | --------- | ----------------------------- |
| Primary   | `#2D6A4F` | Headers, nav, primary actions |
| Secondary | `#40916C` | Accents, backgrounds          |
| Accent    | `#D4A373` | Donate CTA, warm highlights   |
| Dark      | `#1B1B1B` | Text                          |
| Light     | `#F8F9FA` | Backgrounds                   |

> [!IMPORTANT]
> **Logo**: Text placeholder ("Genesis Garden 🌱") is currently in use. Provide the logo image file to swap it in.

### Components (All Complete ✅)

| Component | File                                                                                 | Status                                                  |
| --------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| Header    | [Header.jsx](file:///d:/Design%20Projects/GenesisGarden/src/components/Header.jsx)   | ✅ Sticky, logo + nav + Donate CTA, hamburger on mobile |
| Footer    | [Footer.jsx](file:///d:/Design%20Projects/GenesisGarden/src/components/Footer.jsx)   | ✅ Page links, Privacy Policy, Facebook, contact info   |
| Layout    | [Layout.jsx](file:///d:/Design%20Projects/GenesisGarden/src/components/Layout.jsx)   | ✅ Header + main + Footer wrapper, scroll-to-top        |
| SEOHead   | [SEOHead.jsx](file:///d:/Design%20Projects/GenesisGarden/src/components/SEOHead.jsx) | ✅ Per-page title/meta management                       |

### Pages (All Complete ✅)

| #   | Page             | File                                                                                            | Key Sections                                        |
| --- | ---------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| 1   | Home             | [Home.jsx](file:///d:/Design%20Projects/GenesisGarden/src/pages/Home.jsx)                       | Hero, mission strip, "things to know" cards, CTA    |
| 2   | Housing Services | [HousingServices.jsx](file:///d:/Design%20Projects/GenesisGarden/src/pages/HousingServices.jsx) | 5 service cards, eligibility, other activities      |
| 3   | About Us         | [AboutUs.jsx](file:///d:/Design%20Projects/GenesisGarden/src/pages/AboutUs.jsx)                 | Mission/Vision/Values, team, history, impact        |
| 4   | Partners         | [Partners.jsx](file:///d:/Design%20Projects/GenesisGarden/src/pages/Partners.jsx)               | 6 partner network cards                             |
| 5   | Donate           | [Donate.jsx](file:///d:/Design%20Projects/GenesisGarden/src/pages/Donate.jsx)                   | Financial + goods donations, Zeffy link, wish lists |
| 6   | Contact Us       | [ContactUs.jsx](file:///d:/Design%20Projects/GenesisGarden/src/pages/ContactUs.jsx)             | Info, hours, emergency line, form, embedded map     |

---

## Task Checklist

### ~~Phase 1: Project Setup~~

- [x] Research existing site content and branding
- [x] Create implementation plan
- [x] Get user approval on plan

### ~~Phase 2: Foundation~~

- [x] Initialize Vite + React project
- [x] Set up design system — [index.css](file:///d:/Design%20Projects/GenesisGarden/src/index.css) (CSS custom properties, typography, colors)
- [x] Create shared components (Header, Footer, Layout, SEOHead)

### ~~Phase 3: Pages~~

- [x] Landing Page (Home)
- [x] Housing Services Page
- [x] About Us Page
- [x] Partners Page
- [x] Donate Page
- [x] Contact Us Page

### Phase 4: Polish & Verification

- [x] Production build verification (`npx vite build` — **passed**)
- [ ] Mobile responsiveness testing
- [ ] SEO optimization review
- [ ] Accessibility audit
- [ ] Final walkthrough

### Pending User Input

- [ ] Confirm brand colors or provide updated palette
- [ ] Provide logo file (currently text placeholder)

---

## Verification Plan

### Automated

| Command         | Purpose                          | Status     |
| --------------- | -------------------------------- | ---------- |
| `npm run build` | Production build validation      | ✅ Passed  |
| `npm run dev`   | Visual verification of all pages | ⬜ Pending |

### Manual

1. Mobile responsiveness (375px → 1440px)
2. All nav/footer link routing
3. Sticky header + Donate CTA visibility
4. Hamburger menu functionality
5. External links (Zeffy, Facebook, Privacy Policy)
6. SEO tags per page
7. Keyboard/focus accessibility

---

## Development Roadmap

| Phase | Scope                                    | Status         |
| ----- | ---------------------------------------- | -------------- |
| 1     | Setup & approval                         | ✅ Complete    |
| 2     | Foundation (CSS, Header, Footer, Layout) | ✅ Complete    |
| 3     | All 6 pages                              | ✅ Complete    |
| 4     | Polish, responsiveness, SEO, a11y        | 🔲 In Progress |

---

## Walkthrough

### What Was Built

A complete 6-page React application for Genesis Garden (501(c)(3) nonprofit) using Vite, React Router v6, and a custom CSS design system with mobile-first responsive breakpoints.

### File Structure

```
GenesisGarden/
├── index.html                 # Entry HTML with Google Fonts, meta tags
├── package.json               # Vite + React + React Router deps
├── vite.config.js             # Dev server on port 3000
└── src/
    ├── main.jsx               # React root w/ BrowserRouter
    ├── App.jsx                # Route definitions for all 6 pages
    ├── index.css              # Full design system (tokens, reset, utilities)
    ├── components/
    │   ├── Header.jsx/css     # Sticky header, nav, Donate CTA, hamburger
    │   ├── Footer.jsx/css     # Links, social, contact, copyright
    │   ├── Layout.jsx         # Page wrapper (Header + Outlet + Footer)
    │   └── SEOHead.jsx        # Dynamic title/meta per page
    └── pages/
        ├── Home.jsx/css       # Hero, mission strip, info cards, CTA
        ├── HousingServices.jsx/css  # 5 service cards, eligibility
        ├── AboutUs.jsx/css    # Mission/Vision/Values, team, history
        ├── Partners.jsx/css   # 6 partner cards
        ├── Donate.jsx/css     # Financial + goods donations, Zeffy
        └── ContactUs.jsx/css  # Contact info, form, Google Map
```

### Build Verification

- **`npx vite build`** — ✅ Passed
- **Output**: `dist/assets/index-*.css` (26KB) + `dist/assets/index-*.js` (260KB)
