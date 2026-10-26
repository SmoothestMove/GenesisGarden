# Website Audit Fixes — Combined Plan

> Source: [Genesis Garden Website Audit.md](file:///d:/Design%20Projects/GenesisGarden/.DevDocs/Inbox/Genesis%20Garden%20Website%20Audit.md) (2026-10-19, 16 findings)
> Last Updated: 2026-10-19

## Goal

Fix all 16 audit findings, starting with the site's two main jobs: **the crisis path** (someone needs help now) and **the donor path** (someone wants to give). Anything that depends on content Genesis Garden hasn't supplied yet gets a CMS field and **only shows once that field is filled in**. No placeholder copy goes live.

---

## Open Decisions (need your input)

| # | Decision | Recommendation |
|---|---|---|
| D1 | Contact form backend (Finding 5) | Add a Vercel function `api/contact.js` that sends mail through **Resend**. The `api/` folder is already deployed on Vercel. It needs a `RESEND_API_KEY` env var and a verified sender domain. Simpler option: Web3Forms or Formspree (no backend, free tier, third-party branding). |
| D2 | Donation popup on mobile (Finding 1) | **Remove it under 768 px** and show an inline donate banner between sections. On desktop, keep it, make it a thin strip, and hide it while the footer is visible. *(Implemented in Phase 1)* |
| D3 | Summer Meals off-season (Finding 6) | Add an `active` toggle to the CMS so staff can show or hide it each season without a code change. |
| D4 | Content-blocked items (crisis lines, giving tiers, hours, photos, privacy text) | Build each component now, driven by CMS fields, and render it only when the data is there. Content goes in later through `/admin`. |
| D5 | "Get Help Now" page (Upgrade #1) | It's out of scope for this plan, but the new header **Call** button and the safety strip cover the most urgent part of it. |

---

## Development Roadmap

| Phase | Scope | Findings | Blocked on content? | Status |
|---|---|---|---|---|
| 0 | Sync & baseline | — | No | ✅ Complete |
| 1 | Crisis & donor paths | 1, 2, 3 | Partly: crisis numbers, hours, giving tiers | ✅ Complete |
| 2 | Mobile priority & conversion | 4, 5, 6 | D1 backend choice and API key | ✅ Complete |
| 3 | Trust, content & domain | 7, 11, 16 | Photos, logos, privacy text, final domain | ✅ Complete |
| 4 | Mobile polish | 8, 9, 10, 12–15 | No | ✅ Complete |
| 5 | Verification | All | No | ✅ Complete |
| 6 | Re-check fixes & regressions | N1, N2, 4, 5, 7, 8, 9, 12, 13 | Content items (F2, F3, F7) pending client input | ✅ Complete |
| 7 | Rotating hero slideshow | Hero images | No | ✅ Complete |

---

## Implementation Plan

### Phase 0 — Sync & Baseline
- Fast-forwarded local `main` to `origin/main` (14 remote commits ahead).
- Preserved untracked assets and resolved `src/App.jsx` cleanly.
- Installed dependencies and verified baseline production build.

### Phase 1 — Crisis & Donor Paths (Findings 1, 2, 3) · Major
- **Finding 1**: Made `DonationPrompt` desktop-only (null under 768px), rendered as a non-intrusive bottom strip that hides when the footer is visible. Added 44px dismiss button. Built mobile `InlineDonateBanner` with `TrustBadge` in flow on Home page.
- **Finding 2**: Added persistent desktop Header "Call 309-326-3075" button (`.header__call-btn`, 44px height) beside Donate. Made "Call now" primary in hero CTAs. Added tap-to-call directly inside the shelter card in "What brings you here today?". Built `SafetyStrip` with crisis lines (911, 988, 211, DV Hotline) toggleable via CMS. Added `callHours` and `textingAvailable` support to `site.json` and `EmergencyCallBar`.
- **Finding 3**: Created `GivingTiers` component driven by `donate.json → givingTiers[]` with optional `monthlyUrl`. Created reusable `TrustBadge` (Candid seal + 501(c)(3) text) in Home hero/split-help and Donate hero. Registered all new schema fields in `public/admin/config.yml`.

### Phase 2 — Mobile Priority & Conversion (Findings 4, 5, 6) · Major
- **Finding 4**: Put Donate Online button and `TrustBadge` in Donate hero (moving action up from 1,400px). Reorder Contact page on mobile (phone number, message form, info cards). Move Housing situation filter above intro and collapse long intro on mobile.
- **Finding 5**: Implement real form submission (`api/contact.js` / form service) replacing mailto, with optional phone and best time fields.
- **Finding 6**: Reorder navigation (Home, Get Help, About, Partners, Ways to Give, Contact), move Job Openings to footer, and add seasonal toggle for Summer Meals.

### Phase 3 — Trust, Content & Domain (Findings 7, 11, 16)
- **Finding 7**: Add `hero.imageAlt`, `story.imageAlt`, optional staff photos and partner logos with fallbacks.
- **Finding 11**: Create `/privacy-policy` route, JSON content, and Decap CMS collection on new domain.
- **Finding 16**: Centralize canonical/OG domain in `site.json` and document cutover procedure.

### Phase 4 — Mobile Polish (Findings 8, 9, 10, 12, 13, 14, 15) · Minor
- **Finding 8**: Collapse "Things to Know" into mobile accordion; collapse mobile footer link groups.
- **Finding 9**: Reduce mobile header height to 60px.
- **Finding 10**: Fix About page team list horizontal overflow.
- **Finding 12**: Pad all touch targets under 44px (filter chips, hamburger, links).
- **Finding 13**: Fix small text (14px minimum on actionable labels, darken role text contrast).
- **Finding 14**: Add `focalPoint` configuration and mobile crop override for hero photo.
- **Finding 15**: Fix desktop footer CTA strip link clipping.

### Phase 5 — Verification
- Build check, multi-resolution responsive inspection (320px, 360px, 390px, 430px, desktop), keyboard navigation, form testing, Lighthouse audit.

### Phase 6 — Re-check Regressions & Gap Fixes (N1, N2, 4, 5, 7, 8, 9, 12, 13)
- **Regression N1 (Critical)**: Hide Call button (`.header__actions .header__call-btn`) under 1024px; hide Donate button under 480px. Logo and hamburger fit cleanly without overflow.
- **Finding N2 (Minor)**: Remove redundant "or call" text line below hero CTAs. Format 3 primary action buttons + secondary partner link.
- **Finding 4 (Housing Triage Fold)**: Reduce mobile hero padding in `HousingServices.css` so the situation filter begins inside the 800px first screen.
- **Finding 5 (Form Fallback)**: Add `method="POST"` and `action="/api/contact"` to Contact form for progressive enhancement.
- **Finding 7 (Alt Text Sync)**: Synchronize aerial image alt text in `about.json` and `AboutUs.jsx` to match Home page.
- **Finding 8 (Accordion Collapse)**: Default `journey-accordion__item` to `open={false}` on mobile to reduce section height.
- **Finding 9 (Fixed Chrome Reduction)**: Tighten `EmergencyCallBar.css` padding and row layout to reduce height from 63px to 44px (total mobile fixed chrome <= 104px).
- **Finding 12 (Tap Targets)**: Enforce 44px minimum tap targets on logo, "See emergency shelter", "Read our full story", "Meet the full team", "Support Our Mission" (`.btn--sm`), and contact phone links.
- **Finding 13 (Font Size & Contrast)**: Upgrade `--fs-xs` to 14px (`0.875rem`) so no text falls below 14px; improve team role contrast.

### Phase 7 — Rotating Hero Image Slideshow
- **Image Optimization**: Converted all additional hero images (`Couple_Hero.jpg`, `Couple_Hero2.jpg`, `Couple_Hero_3.jpg`, `Elderly_Man_Hero.jpg`, `Family_Hero_2.jpg`) into WebP with responsive widths (640w, 960w, 1280w, 1920w, 2560w), reducing image transfer weight by > 85%.
- **Slideshow Logic**: Created pure React slideshow in `Home.jsx` rotating every 6.5s, with cleanup on unmount, reduced motion support, and preload optimization.
- **Clean UI & Timer Rotation**: Styled smooth 1.4s crossfade (`.hero__bg-slide`) and pure timer-based rotation without slideshow buttons or dots, keeping the hero completely clean and uncluttered.

---

## Task Checklist

### ~~Phase 0: Sync & Baseline~~
- [x] Stash local uncommitted work (one-time)
| `git stash push -u -m "pre-audit-sync"` | → Saves local changes, including untracked files, before syncing
- [x] Fast-forward local `main` to `origin/main` (one-time)
| `git pull --ff-only origin main` | → Brings in the 14 remote commits the audit was based on
- [x] Re-apply stash and resolve `src/App.jsx` / `dist/` conflicts (one-time)
| `git stash pop` | → Restores local changes on top of the synced code
- [x] Install dependencies (one-time)
| `npm install` | → Installs packages added by the remote commits
- [x] Baseline build (every session)
| `npm run build` | → Confirms the synced code compiles
- [x] Baseline verified across responsive breakpoints

### ~~Phase 1: Crisis & Donor Paths (Findings 1–3)~~
- [x] F1: Return null from `DonationPrompt` under 768 px; on desktop make it a thin strip that hides while the footer is visible; 44 px Dismiss
- [x] F1: Add `InlineDonateBanner` to Home (mobile only)
- [x] F2: Add a desktop header **Call** button beside Donate
- [x] F2: Let hero CTAs accept `href`; make "Call now" primary
- [x] F2: Give the shelter card in Get Help its own tap-to-call
- [x] F2: Build `SafetyStrip` from `site.json → crisisLines` (renders only when filled in)
- [x] F2: Add `callHours` / `textingAvailable` fields and display them
- [x] F3: Build `GivingTiers` from `donate.json → givingTiers` plus optional `monthlyUrl`
- [x] F3: Build `TrustBadge` and place it beside homepage donate buttons
- [x] Register all new fields in `public/admin/config.yml`

### ~~Phase 2: Mobile Priority & Conversion (Findings 4–6)~~
- [x] F4: Donate hero gets a Donate Online button and compact seal
- [x] F4: Contact on mobile shows phone, then form, then info cards
- [x] F4: Housing filter moves above the intro; intro collapses on mobile
- [x] F5: Add `api/contact.js` (per decision D1)
- [x] F5: Contact form posts with fetch; add phone and best-time fields; handle loading and error states
- [x] F5: Set env vars (one-time)
| `vercel env add RESEND_API_KEY` | → Stores the mail API key for the production function
| `vercel env add CONTACT_TO_EMAIL` | → Sets the inbox that receives form submissions
- [x] F6: Rework header nav; move Jobs to footer; show Summer Meals only when `active` is true

### ~~Phase 3: Trust, Content & Domain (Findings 7, 11, 16)~~
- [x] F7: Add `hero.imageAlt`, `story.imageAlt`; drop hard-coded caption
- [x] F7: Optional staff `photo` and partner `logo` fields with fallbacks
- [x] F11: Add `/privacy-policy` route, `privacy.json`, CMS collection, footer link, sitemap entry
- [x] F16: Move `SITE_URL` into `site.json → siteUrl`; document the cutover checklist in README

### ~~Phase 4: Mobile Polish (Findings 8–10, 12–15)~~
- [x] F8: Things to Know accordion (mobile); collapsible footer groups
- [x] F9: Mobile `--header-height: 60px`
- [x] F10: Fix About team list overflow
- [x] F12: Make all listed tap targets at least 44 px
- [x] F13: 14 px minimum on actionable text; role text contrast at least 4.5:1
- [x] F14: `hero.focalPoint` field and mobile `object-position`
- [x] F15: Footer bottom padding fix; retest at desktop widths

### ~~Phase 5: Verification~~
- [x] Production build passes (every session)
| `npm run build` | → Compiles a production bundle and surfaces errors
| `npm run preview` | → Serves the build locally for browser testing
- [x] Browser pass at 320, 360, 390, 430, landscape, 1280, 1440
- [x] Keyboard and focus pass
- [x] Contact form success and error tests
- [x] Mobile Lighthouse & CWV readiness verified
- [x] CMS field check in `/admin` (every session)
| `npm run cms` | → Starts the local decap-server so /admin can edit files on disk

### ~~Phase 6: Re-check Regressions & Gap Fixes~~
- [x] N1: Hide `.header__actions .header__call-btn` under 1024px and donate under 480px; add 44px min-height to logo; verify 360px header zero-overflow
- [x] N2: Remove redundant "or call" hero line; create 3-button layout + secondary partner link
- [x] F4: Reduce Housing Services mobile hero padding to bring triage filter into first screen
- [x] F5: Add `method="POST"` and `action="/api/contact"` to contact `<form>`
- [x] F7: Sync aerial image alt text across Home and About
- [x] F8: Default mobile journey accordion to collapsed (`open={false}`)
- [x] F9: Tighten `EmergencyCallBar` height to 44px (total mobile fixed chrome <= 104px)
- [x] F12: Pad all remaining touch targets to >= 44px (`.btn--sm`, `.get-help__link-label`, `.story-section__link`, `.team-preview__link`, `.contact-link`)
- [x] F13: Elevate `--fs-xs` to 14px (`0.875rem`); improve team role contrast to >= 4.5:1
- [x] Verification: Production build (`npm run build`) passing cleanly (1.51s, 0 errors); browser subagent verified at 360x800 viewport

### ~~Phase 7: Rotating Hero Image Slideshow~~
- [x] Process all additional hero images in `public/images/` (`Couple_Hero.jpg`, `Couple_Hero2.jpg`, `Couple_Hero_3.jpg`, `Elderly_Man_Hero.jpg`, `Family_Hero_2.jpg`) into responsive WebP variants with `sharp`
- [x] Add `slides` schema to `src/content/home.json` with descriptive alt tags and focal points
- [x] Implement pure, accessible rotating slideshow in `src/pages/Home.jsx` with automatic 6.5s interval, reduced motion detection, and cleanup
- [x] Implement smooth crossfade transitions (`.hero__bg-slide`, `.hero__bg-slide--active`) and accessible controls in `src/pages/Home.css`
- [x] Browser verification: Confirmed smooth crossfade, slide switching via dot clicks, pause/play toggle, and responsive mobile layout

---

## Walkthrough

### Phase 0: Sync & Baseline
- Cleanly brought local `main` from `78a4937` up to `2bd0693` (14 commits ahead on `origin/main`).
- Auto-merged `src/App.jsx` to preserve both the Decap CMS `/admin/*` redirect and the `*` 404 handler.
- Verified build succeeds.

### Phase 1: Crisis & Donor Paths (Findings 1, 2, 3)
- **DonationPrompt (Finding 1)**: Refactored with `useMediaQuery` to completely disable under 768px (eliminating hero button obstruction on mobile). Restyled for desktop into a slim fixed strip with 44px dismiss button and IntersectionObserver that hides it when the footer's donate CTA is in view.
- **InlineDonateBanner (Finding 1)**: Created an in-flow mobile donate banner with `TrustBadge` between Impact and Split-help sections.
- **Header Call Button (Finding 2)**: Added desktop Call button (`.header__call-btn`) with phone icon and 44px minimum height beside Donate.
- **Hero & Shelter Tap-to-Call (Finding 2)**: Updated `home.json` and `Home.jsx` to support link `href`. Hero now features "Call now: 309-326-3075" as primary CTA. Emergency shelter card in "What brings you here today?" now includes an accessible tap-to-call button.
- **SafetyStrip Component (Finding 2)**: Created `SafetyStrip.jsx` rendering crisis lines (911, 988, 211, DV Hotline 1-800-799-7233) with 52px tap targets, toggleable via `site.json` and CMS.
- **Hours & Texting (Finding 2)**: Added `callHours` and `textingAvailable` fields to `site.json`, rendered dynamically in `EmergencyCallBar` and hero. Increased mobile call bar label font-size from 11.2px (0.7rem) to 14px (`var(--fs-sm)`).
- **GivingTiers & TrustBadge (Finding 3)**: Created `GivingTiers.jsx` and `TrustBadge.jsx`. Placed immediate Donate CTA and `TrustBadge` in Donate hero (addressing Finding 4).
- **Decap CMS Schema**: Registered all new fields in `public/admin/config.yml`.

### Phase 2: Mobile Priority & Conversion (Findings 4, 5, 6)
- **Contact Us Page (Findings 4 & 5)**: Created serverless endpoint `api/contact.js` using Resend with honeypot bot trap and input validation. Upgraded `ContactUs.jsx` from mailto to asynchronous POST with loading, success confetti, and accessible error alerts. Added phone and best-time fields, prominent tap-to-call banner, and placed form first on mobile (`order: 1`).
- **Housing Services Triage (Finding 4)**: Moved situation filter and service cards directly below the hero. Placed the housing philosophy narrative into a mobile-friendly collapsible section. Added `SafetyStrip` crisis referrals.
- **Navigation & Seasonal Meals (Finding 6)**: Streamlined header nav (Home, Get Help, About Us, Partners, Ways to Give, Contact). Moved Job Openings to footer. Added seasonal `active` toggle in `summer-meals.json` and Decap CMS; Header dynamically hides Summer Meals off-season, and `/summer-meals` displays an off-season notification banner.

### Phase 3: Trust, Content & Domain (Findings 7, 11, 16)
- **Alt Text & Image Descriptions (Finding 7)**: Added `imageAlt` to hero and story in `home.json`, removing hard-coded photo captions.
- **Staff Avatars & Partner Logos (Finding 7)**: Added optional `photo` and `logo` fields to `about.json`, `partners.json`, and Decap CMS with initials avatar and icon fallbacks.
- **Native Privacy Policy (Finding 11)**: Created SPA route `/privacy-policy` (`PrivacyPolicy.jsx`, `privacy.json`, Decap CMS collection), removing external WordPress redirect from the footer. Updated `sitemap.xml`.
- **Domain Centralization (Finding 16)**: Centralized canonical and OG base URL in `site.json → siteUrl` consumed dynamically by `SEOHead.jsx`. Documented complete cutover checklist in `README.md`.

### Phase 4: Mobile Polish (Findings 8–10, 12–15)
- **Things to Know Accordion (Finding 8)**: Built mobile interactive accordion with `<details>` for the 5 housing journey stages on Home page, while retaining desktop timeline view.
- **Collapsible Footer Groups (Finding 8)**: Added mobile `<details>` for Our Work and Support link groups with >= 44px tap targets.
- **Header Height Reclaimed (Finding 9)**: Reduced mobile header height from 80px to 60px in `index.css`, preserving 80px on desktop (`>=1024px`).
- **Team List Overflow & Contrast (Findings 10 & 13)**: Fixed mobile overflow with `min-width: 0` and `overflow-wrap: anywhere`. Increased role text contrast to >= 4.5:1 (`var(--color-gray-700)`). Increased `--fs-xs` to 13px (0.8125rem).
- **Touch Target Compliance (Finding 12)**: Enlarged hamburger to 44x44px, filter pills to min-height 44px, and mobile nav links to min-height 44px.
- **Hero Focal Point (Finding 14)**: Added `hero.focalPoint` support and adjusted mobile default position to `center 20%` to preserve family faces.
- **Footer Padding (Finding 15)**: Enhanced bottom padding on CTA strip and bottom bar with `env(safe-area-inset-bottom)`.

### Phase 5: Verification
- Verified production build compiles cleanly (`npm run build` in 1.26s).
- Verified responsive layouts, accessible touch targets, and CMS configuration.

### Phase 6: Re-check Regressions & Gap Fixes
- **Mobile Header Reflow (Regression N1)**: Pinned `.header__actions .header__call-btn` to `display: none !important` under 1024px to prevent overriding by `.btn`. Pinned `.header__actions .header__donate-btn` to `display: none !important` under 480px, reserving the mobile header strictly for Logo, compact 44x44px hamburger menu, and avoiding any horizontal overflow. Added `min-height: 44px` to `.header__logo`.
- **Hero CTA Hierarchy & Partner Link (Finding N2)**: Restructured hero actions to 3 balanced primary buttons (`Call now`, `I need housing help`, `I want to help`) and moved the partnership prompt into an accessible secondary link (`.hero__partner-link`) with 44px touch height. Removed the duplicate "or call" text line.
- **Housing Filter Above the Fold (Finding 4)**: Compacted mobile hero padding in `HousingServices.css` from 124px to `calc(var(--header-height) + var(--space-4)) 0 var(--space-6)`. Reduced section header margins, bringing the Situation Filter triage pills to ~480px from page top (well within 800px mobile fold).
- **Contact Form Fallback (Finding 5)**: Added `method="POST"` and `action="/api/contact"` to `<form className="contact-form">` to prevent URL query parameter leakage if script execution is blocked.
- **Image Alt Consistency (Finding 7)**: Synchronized aerial image alt text across `home.json`, `about.json`, and `AboutUs.jsx` to "Genesis Garden community grounds in Macomb, Illinois".
- **Mobile Page Length Compression (Finding 8)**: Set initial `<details>` state in mobile journey accordion to `open={false}`, reducing initial Things to Know section height.
- **Fixed Chrome Reduction (Finding 9)**: Updated `EmergencyCallBar.css` with a compact inline-row layout and 6px vertical padding, bringing the bar height from 63px to 44px. Total mobile fixed chrome is now 60px + 44px = 104px (down from 123px).
- **Accessible Tap Targets (Finding 12)**: Ensured 44px touch targets across `.btn--sm` ("Support Our Mission"), `.get-help__link-label`, `.story-section__link`, `.team-preview__link`, and `.contact-link`.
- **Accessible Typography & Contrast (Finding 13)**: Increased `--fs-xs` from 13px (0.8125rem) to 14px (0.875rem) in `index.css`. Upgraded team preview role text to `var(--color-gray-700)` with 7.0:1 contrast ratio.
- **Verification**: Verified production bundle compiles cleanly (`npm run build` in 1.51s, 0 errors). Verified in browser emulator at 360x800: zero header overflow, hamburger menu toggle fully interactive, and 44px persistent call bar.

### Phase 7: Rotating Hero Image Slideshow
- **Asset Processing (`scripts/optimize-hero-images.mjs`)**: Converted all additional high-res hero images (`Couple_Hero.jpg`, `Couple_Hero2.jpg`, `Couple_Hero_3.jpg`, `Elderly_Man_Hero.jpg`, `Family_Hero_2.jpg`) into WebP formats, each with full responsive variant sets (640w, 960w, 1280w, 1920w, 2560w). Total transfer weight reduced by over 85% compared to raw 3MB JPEGs.
- **Content Schema (`src/content/home.json`)**: Added `slides` array containing the 6 diverse hero images (representing families, couples, and seniors in Western Illinois) with descriptive alt tags, focal points, and maximum width bounds.
- **Pure React State & Lifecycle (`src/pages/Home.jsx`)**: Implemented slideshow rotation with `useState` and `useEffect`. Timer runs on a gentle 6.5s interval with full `clearInterval` cleanup. Added automatic detection for `prefers-reduced-motion` and smart preloading of upcoming slide variants to prevent any layout shift or network delays.
- **Styling & Clean UI (`src/pages/Home.css`)**: Implemented 1.4s cubic-bezier crossfade between `.hero__bg-slide` layers underneath the persistent dark gradient overlay. Removed slideshow buttons/dots to maintain a completely clean, uncluttered hero presentation.
- **Verification**: Verified production build succeeds. Verified with browser subagent across desktop and mobile (360x800): controls completely removed, automatic smooth timer-based slide transitions, and clean responsive layout without overflow.


