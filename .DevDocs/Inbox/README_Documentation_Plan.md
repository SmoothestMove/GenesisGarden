# README Documentation & Admin Panel Guide — Combined Plan

> **Last Updated**: 2026-09-11

---

## Implementation Plan

Analyze the codebase and draft a clean, developer-focused `README.md` that serves as both a codebase architectural guide and an operational manual for the Decap CMS Admin panel (`/admin`).

### Objectives

1. Document the complete technology stack (Vite, React 19, React Router v7, Vanilla CSS, Decap CMS, Vercel Serverless OAuth).
2. Provide setup and installation instructions explicitly labeled as either **(one-time)** or **(every session)** as required by project guidelines.
3. Outline the file structure, component architecture, and decoupled JSON content model (`src/content/*.json`).
4. Write a step-by-step How-To for the Admin Panel (`/admin`), covering authentication (GitHub OAuth vs. local `decap-server`), content collections, image uploads, live previews, and publishing.
5. Detail design system tokens and developer maintenance workflows (adding pages, modifying schemas).

---

## Task Checklist

### ~~Phase 1: Codebase Analysis~~

- [x] Inspect project structure, Vite config, package dependencies, and scripts
- [x] Analyze `src/components/`, `src/pages/`, `src/hooks/`, and `src/content/` JSON architecture
- [x] Examine Decap CMS configuration (`public/admin/config.yml`, `index.html`, `preview-templates.js`)
- [x] Trace serverless OAuth authentication handlers (`api/auth.js`, `api/callback.js`)

### ~~Phase 2: README & Guide Drafting~~

- [x] Draft root `README.md` with Overview, Setup, Architecture, Content Model, Admin How-To, and Styling tokens
- [x] Label installation steps with `(one-time)` and `(every session)` tags
- [x] Format commands using strict `| command | → What the command does` syntax

### ~~Phase 3: Combined Documentation Plan Creation~~

- [x] Generate `README_Documentation_Plan.md` combining Implementation Plan, Task Checklist, Development Roadmap, and Walkthrough in `.DevDocs\Inbox`
- [x] Notify developer of updated documentation

---

## Commands Reference

[x] Install project dependencies
| `npm install` | → Installs required dependencies for the React frontend and Decap local server

[x] Run local development server
| `npm run dev` | → Starts the Vite dev server at http://localhost:3000 with HMR

[x] Run local CMS backend proxy
| `npm run cms` | → Starts decap-server on port 8081 for direct local file editing in /admin

[x] Execute production build
| `npm run build` | → Compiles and minifies assets into the dist/ directory

[x] Preview production build
| `npm run preview` | → Serves the compiled production build locally for verification

---

## Development Roadmap

| Phase | Scope | Status |
| ----- | ----- | ------ |
| 1 | Codebase Analysis & CMS Audit | ✅ Complete |
| 2 | Root README.md Creation & Admin How-To Guide | ✅ Complete |
| 3 | Plan Archival in `.DevDocs/Inbox/` | ✅ Complete |

---

## Walkthrough

### What Was Built

Created a comprehensive, structured `README.md` at the project root (`d:\Design Projects\GenesisGarden\README.md`) along with a combined plan file in `.DevDocs/Inbox/README_Documentation_Plan.md`.

### Summary of Documentation Included

1. **Overview & Tech Stack**: React 19, Vite 6, React Router v7, Decap CMS, Vercel OAuth Serverless Functions.
2. **Setup Instructions**: Separated clearly into **(one-time)** initial setup and **(every session)** development steps.
3. **Directory Structure**: Tree diagram detailing `api/`, `public/admin/`, `src/components/`, `src/content/`, `src/pages/`.
4. **Content Architecture**: Explanation of how Decap CMS updates `src/content/*.json` files and how React components import them.
5. **Admin Panel Manual (`/admin`)**:
   - Access URLs (Production vs Local)
   - OAuth login flow (`api/auth.js` -> GitHub -> `api/callback.js` -> `postMessage`)
   - Local `decap-server` filesystem proxy workflow
   - Collection mapping table for all 10 site content files
   - Image upload guidelines (`public/images/`)
   - Live Preview system (`public/admin/preview-templates.js`)
   - Save & Publish git workflow
6. **Design System & Maintenance**: CSS tokens (`--color-primary`, `--color-accent`), glassmorphism, scroll-reveal utilities, and instructions for adding new pages.
