# Genesis Garden 🌱 — Developer Documentation & Admin Manual

Welcome to the developer documentation and operational manual for **Genesis Garden**, a 501(c)(3) nonprofit organization dedicated to addressing housing insecurity, preventing homelessness, and providing community support services across Western Illinois (including Macomb, McDonough, and Knox counties).

This project features a modern, mobile-first React application coupled with a git-based Headless CMS (Decap CMS) and serverless OAuth handlers for content administration.

---

## 📋 Table of Contents

- [Overview & Tech Stack](#-overview--tech-stack)
- [Setup & Installation Instructions](#-setup--installation-instructions)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [Content Management Architecture](#-content-management-architecture)
- [Admin Panel How-To Guide (`/admin`)](#-admin-panel-how-to-guide-admin)
- [Design System & Styling Conventions](#-design-system--styling-conventions)
- [Developer Maintenance Guide](#-developer-maintenance-guide)

---

## 🚀 Overview & Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/) (`BrowserRouter` with client-side SPA routing)
- **Styling**: Vanilla CSS custom design system featuring CSS variables, glassmorphism, animated gradients, and scroll-reveal utility classes.
- **Typography**: Google Fonts — [Fraunces](https://fonts.google.com/specimen/Fraunces) (headings) + [Manrope](https://fonts.google.com/specimen/Manrope) (body).
- **Admin Panel**: [Decap CMS v3](https://decapcms.org/) embedded at `/admin/index.html`.
- **Backend / Authentication**: Decoupled Serverless Functions (`api/auth.js` and `api/callback.js`) for GitHub OAuth token exchange, designed for deployment on Vercel or similar serverless hosts.
- **Local CMS Development**: `decap-server` for direct filesystem read/write during local editing.

---

## 🛠️ Setup & Installation Instructions

Follow these instructions to set up and run the Genesis Garden project locally.

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

---

### Initial Setup (one-time)

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SmoothestMove/GenesisGarden.git
   cd GenesisGarden
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables** (Required for production admin authentication testing):
   Create a `.env.local` file in the root directory if configuring serverless OAuth locally:
   ```env
   GITHUB_OAUTH_CLIENT_ID=your_github_oauth_app_client_id
   GITHUB_OAUTH_CLIENT_SECRET=your_github_oauth_app_client_secret
   ```

---

### Development Session (every session)

#### Option 1: Standard Frontend Development
Run the Vite development server to work on React components, pages, and styles:

| Step | Command | Purpose |
| :--- | :--- | :--- |
| 1 | `npm run dev` | Starts the Vite dev server at `http://localhost:3000` |

#### Option 2: Admin Panel & Content Editing Development
To edit content locally via the Decap CMS admin interface without requiring GitHub OAuth:

| Step | Command | Purpose |
| :--- | :--- | :--- |
| 1 | `npm run cms` | Starts the local `decap-server` proxy at `http://localhost:8081` (writes directly to local filesystem) |
| 2 | `npm run dev` | Starts the Vite dev server at `http://localhost:3000` |
| 3 | Navigate to `http://localhost:3000/admin` | Access the Admin Panel with local backend mode enabled |

---

### Production Build & Deployment

| Command | Purpose |
| :--- | :--- |
| `npm run build` | Bundles and minifies production assets into `dist/` |
| `npm run preview` | Serves the production `dist/` build locally for verification |

---

## 📁 Project Architecture & Directory Structure

```text
GenesisGarden/
├── api/                           # Serverless OAuth Endpoints (Vercel)
│   ├── auth.js                    # OAuth Step 1: Redirects to GitHub authorize
│   └── callback.js                # OAuth Step 2: Exchanges code for token & posts back
├── public/                        # Static Assets & Admin Panel Entry
│   ├── admin/                     # Decap CMS Admin Interface
│   │   ├── config.yml             # Decap CMS collections & field schemas
│   │   ├── index.html             # Admin entry point & import map setup
│   │   ├── preview-templates.js   # Live JSX preview components for Decap CMS
│   │   └── preview.css            # Styles for admin live preview frame
│   ├── images/                    # Project photography & CMS uploaded media
│   └── logo/                      # Genesis Garden brand logos & favicon
├── src/                           # Application Source Code
│   ├── components/                # Reusable UI & Layout Components
│   │   ├── AnimatedCounter.jsx    # Scroll-triggered count-up statistics
│   │   ├── Footer.jsx / .css      # Main footer with links & brand details
│   │   ├── Header.jsx / .css      # Sticky glassmorphism header & mobile nav
│   │   ├── Layout.jsx             # SPA wrapper with automatic scroll restoration
│   │   ├── SectionDivider.jsx     # SVG wave/organic section dividers
│   │   └── SEOHead.jsx            # Dynamic document head & meta manager
│   ├── content/                   # Decoupled JSON Content Storage (CMS Data)
│   │   ├── site.json              # Global organization & contact details
│   │   ├── nav.json               # Header menu & footer navigation configuration
│   │   ├── home.json              # Home page hero, mission cards, impact & CTA
│   │   ├── housing-services.json  # Housing services, eligibility, & programs
│   │   ├── about.json             # Mission, vision, values, team, & history
│   │   ├── partners.json          # Partner network directory
│   │   ├── donate.json            # Financial & goods donation guidelines
│   │   ├── contact.json           # Contact form, office hours, & map info
│   │   ├── job-openings.json      # Career listings & status flags
│   │   └── summer-meals.json      # Summer food program details & sites
│   ├── hooks/                     # Custom React Hooks
│   │   └── useInView.js           # Intersection Observer for scroll-reveal animations
│   ├── pages/                     # Main Route Pages
│   │   ├── Home.jsx / .css
│   │   ├── HousingServices.jsx / .css
│   │   ├── JobOpenings.jsx / .css
│   │   ├── SummerMeals.jsx / .css
│   │   ├── AboutUs.jsx / .css
│   │   ├── Partners.jsx / .css
│   │   ├── Donate.jsx / .css
│   │   └── ContactUs.jsx / .css
│   ├── App.jsx                    # React Router route definitions
│   ├── index.css                  # Global CSS design tokens, reset, & keyframes
│   └── main.jsx                   # React root entry point
├── DesignConcepts/                # Original design assets & reference images
├── index.html                     # HTML root template with web fonts
├── package.json                   # NPM dependencies & scripts
└── vite.config.js                 # Vite bundler configuration (port 3000)
```

---

## 🗃️ Content Management Architecture

All text, statistics, team members, partner details, and page structure configurations are **decoupled from React component code**.

1. **Storage**: Content files are plain JSON documents located in `src/content/`.
2. **Consumption**: React components import these JSON files directly:
   ```javascript
   import homeContent from '../content/home.json';
   ```
3. **Decap CMS Editing**: When an editor changes content via `/admin`, Decap CMS writes updates to the corresponding `src/content/*.json` file.
4. **Build & Live Updates**:
   - **In Local Dev**: Editing via `npm run cms` instantly updates local `.json` files; Vite HMR re-renders the page immediately.
   - **In Production**: Edits commit directly to the `main` GitHub branch, triggering an automated production deployment build.

---

## 📖 Admin Panel How-To Guide (`/admin`)

The Genesis Garden Admin Panel enables team members to manage website content without editing code.

### 🔑 1. How to Access the Admin Panel

- **Production Admin URL**: `https://genesisgarden.org/admin` (or `https://<your-vercel-domain>/admin`)
- **Local Dev Admin URL**: `http://localhost:3000/admin` (requires running `npm run cms` in terminal)

---

### 🔓 2. Authentication Workflow

#### Production Mode (GitHub OAuth)
1. Navigate to `/admin`.
2. Click **Login with GitHub**.
3. A popup opens pointing to `/api/auth`, which redirects to GitHub's authorization page.
4. Authorize access. GitHub redirects back to `/api/callback` with a temporary code.
5. `/api/callback` exchanges the code for a GitHub access token server-side and securely passes it to the Decap CMS tab via `postMessage`.
6. Decap CMS authenticates and opens the content editor dashboard.

> **Note**: Users must have write/push access to the `SmoothestMove/GenesisGarden` GitHub repository to save changes.

#### Local Mode (`local_backend`)
1. Run `npm run cms` (starts `decap-server` on port `8081`).
2. Run `npm run dev` (starts site on port `3000`).
3. Visit `http://localhost:3000/admin`. Decap CMS automatically detects the local proxy server and bypasses OAuth, allowing direct editing of files on disk.

---

### 📝 3. Managing Content Collections

The admin panel is organized into key content collections defined in `public/admin/config.yml`:

| Collection | Target File | What You Can Edit |
| :--- | :--- | :--- |
| **Site Settings** | `src/content/site.json` | Org name, tagline, phone numbers, email, physical address, social links. |
| **Site Navigation** | `src/content/nav.json` | Header navigation bar links, footer "Our Work" links, and "Support" links. |
| **Home Page** | `src/content/home.json` | Hero titles, background image, mission cards, "Things to Know" steps, Impact statistics, CTA band. |
| **Housing Services** | `src/content/housing-services.json` | Service descriptions, eligibility checklist, background hero images, CTA section. |
| **About Us Page** | `src/content/about.json` | Mission & Vision statements, core values, staff list, board of directors, history timeline, volunteer info. |
| **Partners Page** | `src/content/partners.json` | Partner organization names, descriptions, and icon selections. |
| **Donate Page** | `src/content/donate.json` | GuideStar/Candid transparency seal text, Zeffy donation URL, wish lists, shelter items, unaccepted items. |
| **Contact Us Page** | `src/content/contact.json` | Mailing address, phone/email notes, emergency hotline box details, form success message. |
| **Job Openings** | `src/content/job-openings.json` | Career listings, open/closed status badges, job descriptions, bullet points, apply links. |
| **Summer Meals** | `src/content/summer-meals.json` | Program notice, pickup site names, addresses, schedules, sign-up notes. |

---

### 🖼️ 4. Managing Media & Images

- **Media Folder**: Uploaded images are stored in `public/images/`.
- **Public URL Path**: Images are referenced on the website as `/images/filename.png` or `/images/filename.webp`.
- **Uploading**: Click the **Image** field widget in any collection item to pick an existing image or upload a new file.

---

### 👁️ 5. Live Preview System

Decap CMS includes customized **Live Preview Templates** (`public/admin/preview-templates.js`):
- As text or images are modified in the edit pane, a styled preview pane on the right renders an interactive preview of the section.
- Built with React 19 JSX compatibility using Babel automatic runtime, ensuring accurate visual representation of site styles (`public/admin/preview.css`).

---

### 💾 6. Publishing Changes

1. After making edits, click **Save** (top toolbar).
2. Click **Publish** -> **Publish Now**.
3. Decap CMS creates a git commit directly on the `main` branch.
4. The deployment pipeline automatically builds and publishes the updated site within 1–2 minutes.

---

## 🎨 Design System & Styling Conventions

The visual design system is centralized in `src/index.css`:

### Color Palette (Tokens)

```css
--color-primary: #2D6A4F;        /* Deep Forest Green - Headers, primary elements */
--color-primary-dark: #1B4332;   /* Dark Forest Green - Hover states, dark accents */
--color-secondary: #40916C;     /* Medium Sage Green - Accents, secondary actions */
--color-accent: #D4A373;        /* Warm Gold/Amber - Donate CTAs, highlight badges */
--color-dark: #1B1B1B;          /* Soft Charcoal - Body text */
--color-light: #F8F9FA;         /* Off-White - Section backgrounds */
```

### Visual Enhancements
- **Glassmorphism**: `.glass-card` uses `backdrop-filter: blur(12px)` and subtle white border glows.
- **Scroll-Reveal Animations**: Add `.reveal` class to elements; `useInView` hook adds `.is-visible` when scrolled into view.
- **Text Gradients**: `.text-gradient` applies background clip gold-to-green gradient fills to main titles.

---

## 🛠️ Developer Maintenance Guide

### Adding a New Page to the Site & Admin Panel

1. **Create Component & Style**:
   Add `src/pages/NewPage.jsx` and `src/pages/NewPage.css`.
2. **Create Content JSON**:
   Add `src/content/new-page.json`.
3. **Register Route**:
   Add route in `src/App.jsx`:
   ```javascript
   <Route path="/new-page" element={<NewPage />} />
   ```
4. **Register CMS Collection**:
   Add collection configuration in `public/admin/config.yml` under `collections -> pages -> files`.
5. **Update Navigation**:
   Add the link entry to `src/content/nav.json`.

### 🌐 Custom Domain Cutover Checklist (one-time)

When switching from the preview/staging URL (`https://genesisgarden.vercel.app`) to Genesis Garden's final production custom domain (e.g. `https://www.genesis-garden.org`):

1. **Update Site URL in `src/content/site.json`** (one-time):
   Change `"siteUrl"` to your final domain. This single source of truth powers:
   - Dynamic canonical `<link rel="canonical">` tags
   - Open Graph `<meta property="og:url">` tags
   - Social card link generation
2. **Add Domain in Vercel Project Settings** (one-time):
   - Open Vercel Dashboard → Genesis Garden Project → Settings → Domains.
   - Enter your domain and apply the DNS A/CNAME records at your DNS registrar.
3. **Set Production Mail Environment Variables** (one-time):
   | `vercel env add RESEND_API_KEY` | → Stores the production mail API key
   | `vercel env add CONTACT_TO_EMAIL` | → Sets recipient inbox (e.g. `info@genesis-garden.org`)
4. **Update GitHub OAuth App Callback** (one-time):
   - In GitHub Developer Settings → OAuth Apps:
   - Update Homepage URL and Authorization Callback URL to `https://<your-domain>/api/callback`.
5. **Update `public/sitemap.xml` & Search Console** (one-time):
   - Search and replace base domain in `public/sitemap.xml`.
   - Submit the sitemap in Google Search Console.

---

## 📄 License & Attribution

Designed and maintained for **Genesis Garden** (501(c)(3) Nonprofit Organization). All rights reserved.
