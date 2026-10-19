# Genesis Garden Website Audit

Oct 19, 2026 · @Jay Mathews

## Summary and scope

The site is a strong base with the right triage pattern, but the two moments that matter most still carry friction: a person in crisis has to hunt for the phone number on desktop, and a donor leaves the site with no sense of what a gift does. On a 360 px phone, the homepage popup also covers the two main hero buttons on load.

**Site:** genesisgarden.vercel.app (new), replacing genesis-garden.org (old). Audited 2026-10-19 in Chrome.

**Method:** live inspection of the DOM, screenshots, computed styles, contrast and meta checks, and tap-target measurements. No Lighthouse trace was run, so there are no Core Web Vitals numbers.

**Coverage:** all 8 pages were reviewed at desktop width (Home, Housing, Donate, Contact, About, Partners, Job Openings, Summer Meals). Mobile was re-tested at 360x800 CSS px (an emulated Samsung Galaxy A55 Android, 2.25x density, touch on), with all 8 pages measured. An earlier pass at 736 px was too wide to be a phone and has been superseded.

**Standards used:** Nielsen's 10 heuristics, Fitts's, Hick's and Jakob's laws, Gestalt principles, WCAG 2.2 AA, and a 44 px comfortable touch target.

## What is already working

The foundation is sound and should be kept as is.

- **Triage hero:** "What do you need right now?" routes people by situation, with three audience buttons and a tap-to-call link.
- **Mobile call bar:** a full-width "Need housing help now? Call 309-326-3075" bar (736x59, tap-to-call) exists at the tested mobile width.
- **Contrast:** the primary Donate button measures 7.6:1 and nav text 6.4:1.
- **Accessibility basics:** skip link, `:focus-visible` rule, reduced-motion support, correct viewport meta, and no horizontal scroll on Home, Contact, Housing, Donate or Partners at the tested width.
- **Mobile menu:** `aria-expanded` toggles, the label switches between Open and Close, items are 51 px tall, Donate is 53 px, and page scroll locks while open.
- **Contact form on mobile:** inputs are 55 px tall with 17 px text (no iOS auto-zoom), labels are associated, email has the right type, name and email have `autocomplete`, and the submit button is 53 px.
- **Housing filters:** the situation chips are real buttons with `aria-pressed`, and the page announces "Showing all 5 services."
- **SEO and sharing:** meta description, Open Graph image, Twitter card, JSON-LD, canonical and favicon are all present, and the hero image is set to high fetch priority.
- **Trust:** the Donate page states 501(c)(3) tax deductibility and shows the 2026 Candid Silver Seal of Transparency.
- **Popup memory:** dismissing the homepage donation popup is remembered for the session.

## Findings in priority order

Sixteen findings, ranked by impact on the two audiences. The first three protect the crisis path and the donor path, which are the site's two jobs.

| # | Finding and evidence | Fix | Severity | Effort |
| --- | --- | --- | --- | --- |
| 1 | **The homepage popup hides the main hero buttons on a phone.** At 360x800 the popup is fixed at 320x181 px (z-index 900). On first load it sits on top of "I need housing help" and "I want to help" (a hit test at each button's center lands on the popup); "I want to partner" falls under the call bar. At the bottom of the page it also covers the "Support Our Mission" donate button. It stays up at every scroll position and covers body text. Its Dismiss button is 28x28 px. Header (80), call bar (59) and popup (181) take 40% of the 800 px screen. (WCAG 2.4.11, Fitts's Law) | On small screens, drop the popup or turn it into an inline banner between sections. If kept, delay it and make it a thin strip. It must never cover a button or a footer action. | Major | Small |
| 2 | **Desktop has no persistent call action.** The header holds only Donate. The hero's "or call 309-326-3075" is small underlined text (132x22 px) under three equal-weight buttons. "I need a safe place tonight" links to a page, not a call. Domestic violence appears only in a Definitions paragraph. Call hours, texting and what to expect on the call are not near the top. Mobile already has a call bar. (Fitts's Law, Hick's Law, Nielsen #7) | Add a Call button beside Donate in the desktop header and make "Call now" the primary housing button. Put tap-to-call inside the shelter card. Add an "In danger or unsafe right now?" strip with 911, 988, 211 and the National DV Hotline (1-800-799-7233); the team must confirm which referrals to list. State hours and whether texting works. | Major | Small |
| 3 | **Donor path has no impact framing.** "Donate Online" goes straight to a Zeffy form in a new tab with no amounts or outcomes shown first. The Candid seal and tax-deductible line appear only on /donate. Monthly giving, tribute gifts and employer match are not mentioned. (Nielsen #1 and #6, Peak-End Rule) | Add 3 or 4 giving cards tied to real costs supplied by Genesis Garden. Add a "Give monthly" option if the Zeffy form supports it. Put the Candid seal and 501(c)(3) line beside the homepage donate buttons. | Major | Small to Medium |
| 4 | **On a phone, the key action on a page sits one to two screens down.** At 360x800: Donate Online is 1,400 px down the Donate page (page height 3,300 px); the contact form starts 1,236 px down the Contact page, below three info cards; the "What's your situation?" filter starts 1,514 px down the Housing page. (Fitts's Law, Nielsen #7) | Put a Donate button in the Donate hero and shrink the Candid seal to a badge. Put the form first on Contact with the phone number above it. Shorten the Housing intro so the filter appears within the first screen. | Major | Trivial to Small |
| 5 | **Contact form is a mailto.** "Send by Email" opens the visitor's mail app. It fails for phones without a configured mail app, library computers and webmail-only users. There is no phone field, though replies come by call or text. (Nielsen #7 and #9, WCAG 3.3.7) | Replace it with a real form that posts to a backend or form service. Add optional phone and best-time fields. Keep the phone number above the form. | Major | Small |
| 6 | **Stale and low-value nav items.** Summer Meals To-Go is top-level in October; its page says "Tentative 2026 sites" and "Sign-up form and menus coming soon," and the program ran June to August. Job Openings shows "No openings right now" and the one listing is filled. (Hick's Law, Nielsen #8) | Hide or demote Summer Meals off-season. Move Jobs to the footer. Use the space for a clear Get Help and Ways to Give. | Major | Trivial |
| 7 | **Photo accuracy and trust.** The hero file is named "Enhanced-Family\_Hero" and has no alt text; its source is unconfirmed. The "Where it started" aerial is captioned "Genesis Garden campus" while the text beside it is about the 2010 Shade Tree Mobile Park evictions; what it shows is unconfirmed. Staff are initials, not faces. Partners page has no logos. (Nielsen #2 and #4, WCAG 1.1.1) | Confirm both sources (see Open questions). Fix the caption or replace the image. Add headshots and partner logos. | Major | Trivial to Small |
| 8 | **The homepage is very long on a phone.** At 360 px it is 9,000 px tall (about 11 screens). "Things to Know" alone is 1,675 px, and the single-column footer is 974 px. Other pages run 2,900 to 7,200 px. (Nielsen #8, Miller's Law) | Collapse "Things to Know" into an accordion with the first item open. Collapse footer link groups. Keep the call bar. | Minor | Small |
| 9 | **Fixed chrome is 139 px (17% of an 800 px screen) even with the popup dismissed:** an 80 px sticky header plus the 59 px call bar. (Nielsen #8) | Shrink the mobile header to about 56 to 64 px, or hide it on scroll down and show it on scroll up. | Minor | Trivial |
| 10 | **About page staff list is wider than a phone screen.** The list is 14 px wider than the viewport. At 360 px the line for Amanda Bolte ("Outreach & PSH Care Manager") has its right edge at x 364, so the end of the text is cut off. Horizontal scroll is hidden only by `overflow-x: clip` on html and body. (WCAG 1.4.10 Reflow) | Find the fixed width or negative margin on `.about-team-grid__content` and its list; keep the clip as a safety net. | Minor | Trivial |
| 11 | **Footer Privacy Policy links to the old domain** (genesis-garden.org/privacy-policy/), which is being retired. | Host the policy on the new site. | Minor | Trivial |
| 12 | **Tap targets under 44 px** (all pass WCAG 2.5.8's 24 px minimum). At 360 px: hamburger 40x40; popup Dismiss 28x28; Housing filter chips 40 px tall; hero "or call" link 22 px tall; footer links 22 px tall (about 39 px apart); footer phone and email 25 px; phone link in the Contact card 93x19; "Read our full story" and "Meet the full team" 27 px; the two "contact us" links on Job Openings 19 px. (Fitts's Law) | Pad each to at least 44 px tall. | Minor | Trivial |
| 13 | **Small text.** Section labels and staff role lines are 12 px, and an 11.2 px size exists on the page; the call bar's small label appears to be it (not confirmed). Team role text looks low-contrast by eye (estimated, not measured). | Set a 14 px minimum for anything a person acts on and darken the role text. | Minor | Trivial |
| 14 | **Hero headline sits over the family's faces on mobile** (by eye; the image is cropped at 50% 30%). (Gestalt figure-ground) | Set the image focal point so faces clear the text, or stack the photo above the headline on small screens. | Minor | Small |
| 15 | **Desktop only: the footer "Support Our Mission" strip clips the last footer link (Partners)** in a desktop screenshot. At 360 px the footer links were not covered. | Add bottom padding or fix the strip's positioning, then retest on desktop. | Minor | Trivial |
| 16 | **Canonical and Open Graph URLs point to genesisgarden.vercel.app.** | Update both when the final domain goes live. | Minor | Trivial |

## Mobile test notes

Test device: 360x800 CSS px, Android (Galaxy A55 profile), 2.25x density, touch enabled. An earlier pass at 736 px was too wide to represent a phone and is replaced by this one.

What changed against that earlier pass:

- **The popup is worse on a real phone.** At 736 px it clipped part of two hero buttons; at 360 px it covers the two main ones completely on load (finding 1).
- **Hero buttons now stack in one column** (53 px tall each, starting at y 623). Only the first starts above the call bar at y 741, and it is under the popup; the third is under the call bar.
- **Key actions sit further down the page** than at 736 px: Donate Online moved from about 1,090 px to 1,400 px (finding 4).
- **The About page overflow now causes visible clipping** (finding 10).

Confirmed at 360 px:

- No page shows a horizontal scrollbar. The hero background image extends 32 px past the screen on Home and Housing, but it is decorative and clipped by its container.
- The call bar is present on every page checked (360x59, tap-to-call), and the popup appears on the Home page only.
- Contact form fields are 55 px tall with 17 px text, and the submit button is 53 px. Menu drawer behavior was verified at 736 px.
- Page heights at 360 px: Home 9,000; Housing 5,963; About 7,183; Job Openings 4,845; Donate 3,300; Contact 3,255; Summer Meals 2,983; Partners 2,922.
- Housing service cards stack in one column from y 1,830 to about 4,100, and none has its own call button.

## Images and assets to add

The site has three photos on the homepage and none that show a person's face on staff or a program in use. Use client photos only with written consent; illustrations or hands-only shots are good alternatives.

**Photography**

- Genesis House and Leighty House exteriors, and common rooms where resident privacy allows, to show what "private bedrooms and shared living" means.
- Staff headshots to replace the initials.
- Donated-goods photos (kitchen sets, furniture) for the donation page.
- Volunteer or community photos, if they exist.

**Proof and trust**

- One short resident or donor story with a pull quote.
- Partner and funder logos on the Partners page.
- A "Where your gift goes" graphic built from real figures.
- An annual report or Form 990 link, and the Candid badge on the homepage.

**Brand pieces** (extending the Palette 1 work: #f2ae1c, #ffffff, #4c7031, #fff0cb, #af7a1f, #f49619)

- A butterfly line-art motif for section dividers.
- A 1200x630 social share image and an updated favicon set.
- One icon per housing program: eviction prevention, emergency shelter, rapid re-housing and the others.

**Practical**

- A "What to expect when you call" mini-flow: call, short conversation, next steps.
- A county map of the four-county service area.
- A printable one-page flyer with a QR code to a phone-first help page.

## Modern upgrades worth considering

These go beyond fixing defects and are ordered by expected value to the two audiences.

1. **A dedicated "Get Help Now" page** that works at 2 a.m. on a phone: short, plain-language, with large tap-to-call, tap-to-text if offered, and 911, 988 and 211. Link it from the header.
2. **Eviction-prevention self-triage.** A 3 or 4 question screener that ends in the right call or program, extending the existing "What brings you here today?" cards.
3. **Outcome-based impact numbers.** "4 counties, 16+ years, 5 programs" describes the organization, not results. Households housed, evictions prevented and nights of shelter would be stronger, if the data exists and can be shared.
4. **Donor follow-up basics.** An email signup, and a thank-you page after giving that says what happens next.
5. **Language and reading level.** Simplify the dense "Things to Know" copy, and add Spanish if the service area needs it (to be confirmed with the team).
6. **Accessibility pass.** Test with keyboard and screen reader, check focus against the popup and call bar, and publish a short accessibility statement.
7. **Performance and local SEO.** Run a mobile Lighthouse pass, claim and complete a Google Business Profile, and keep the existing JSON-LD current.

## Open questions for Genesis Garden

Each item below is unconfirmed, and the report makes no claim about it until answered.

- [ ] Is the hero photo a real photo of people connected to Genesis Garden, a stock photo, or AI-generated or altered? (Its filename says "Enhanced.")
- [ ] Is the "Where it started" aerial image accurate to its "Genesis Garden campus" caption?
- [ ] Does the Zeffy donation form offer monthly giving and preset amounts?
- [ ] Is there a volunteer program? None was visible, so no volunteer button is recommended yet.
- [ ] Are the 501(c)(3) and Candid Silver Seal statements current and approved wording?
- [ ] Which crisis and domestic-violence referral numbers does the team want listed?
- [ ] What real per-gift costs can be used for the giving cards?
- [ ] Are call hours and texting available, and should they be stated on the site?

## Not verified and next test steps

No performance or Core Web Vitals figures are reported, because no Lighthouse trace was run. The items below need a further pass.

- [ ] Other phone sizes and browsers: 390 and 430 px, a narrow 320 px phone, landscape, and iOS Safari. Only 360x800 Android emulation was measured.
- [ ] Keyboard and screen-reader behavior: Escape to close the menu, focus trapping in the drawer, tab order, and focus against the popup and call bar.
- [ ] Real mobile performance on a throttled connection, including which hero image size mobile loads.
- [ ] Real-device touch behavior: on-screen keyboard overlap with the contact form and the fixed call bar, and browser toolbar changes while scrolling.
- [ ] The Zeffy donation form on mobile and desktop.
- [ ] Measured contrast for team role text and other small gray text; current notes are estimates by eye.
- [ ] Whether finding 15 (desktop footer strip clipping a link) appears at other desktop widths.
