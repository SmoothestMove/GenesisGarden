# Genesis Garden Audit: Re-check After Changes

Oct 19, 2026 · @Jay Mathews

## Summary

Of the 16 earlier findings, 5 are done, 9 are partly done, and 2 are still open. The crisis path and the phone layout improved the most. One new critical issue appeared: on phones the header pushes the menu button and Donate off the screen (N1). After that, the donor path, the safety-referral strip, and the photo and source questions are the main work left.

**What was checked:** your local build at localhost:3000, on 2026-10-19, compared against the first audit of genesisgarden.vercel.app. Desktop was measured at 1430 px wide. Mobile was measured at 360 px wide by loading each page in a 360x800 frame inside the desktop tab, which applies the phone layout rules but not touch or a real browser toolbar.

**Pages re-checked:** Home, Housing, Donate, Contact, About, Partners, Job Openings, Summer Meals and the new Privacy Policy page.

**Not submitted:** the new contact form was inspected but never submitted, so where it sends messages is unconfirmed.

## Checklist of the earlier findings

Checked items were confirmed in the local build. Unchecked items were not found. Numbers match the first audit.

**1. Homepage popup hid the hero buttons on a phone: done**

- [x] Remove or restructure the popup on small screens. At 360 px it is absent on every page and at every scroll position. On desktop it is now a slim 560x72 bar that covers no footer link.

**2. Call action and crisis path: partly done**

- [x] Call button beside Donate in the desktop header (198x44).
- [x] "Call now: 309-326-3075" as the primary hero button (285x54).
- [x] Tap-to-call inside the shelter card ("Call shelter line").
- [ ] "In danger or unsafe right now?" strip with 911, 988, 211 and the DV hotline. None appear on Home or Housing; the team must confirm which numbers to list.
- [ ] State call hours and whether texting works. No hours appear anywhere checked.

**3. Donor path: partly done**

- [x] 501(c)(3) line and Candid seal beside the homepage donate button.
- [x] A Donate Online button in the Donate page hero.
- [ ] Giving cards tied to real costs. Not present.
- [ ] A monthly giving option. Not mentioned anywhere checked.
- [ ] Tribute gifts and employer match. Not present.

**4. Key actions far down on a phone: partly done**

- [x] Donate Online on the Donate page: now at y 398 at 360 px, down from 1,400.
- [x] Contact page: an "Need immediate help or shelter? Calling is fastest" box with a Call button comes first, and the form starts at y 729, down from 1,236.
- [ ] Housing filter within the first screen. It now starts at y 908, down from 1,514, but is still just below an 800 px screen.

**5. Contact form: partly done**

- [x] Replace the mailto with a real form: name, email, optional phone, optional best-time dropdown, message, and a hidden spam-trap field.
- [x] Optional phone and best-time fields.
- [x] Phone number before the form.
- [ ] Confirm where the form sends messages. It has no action and uses GET, so if the script fails the message could land in the web address. Not submitted in this check.

**6. Navigation: done**

- [x] Summer Meals out of the top nav; its page now says "Program Status: Off-Season."
- [x] Job Openings moved to the footer.
- [x] Nav now reads Home, Get Help, About Us, Partners, Ways to Give, Contact.

**7. Photos and trust: partly done**

- [x] Alt text added to the hero photo and the aerial image.
- [ ] Confirm the hero photo's source. The file is still named "Enhanced-Family\_Hero."
- [ ] Confirm the aerial image and caption. Alt text is "community grounds in Macomb" on Home but still "Genesis Garden campus" on About.
- [ ] Staff headshots. Initials are still used.
- [ ] Partner logos. The Partners page shows only the Genesis logo.

**8. Page length on a phone: partly done**

- [x] Shorter "Things to Know": 920 px, down from 1,675.
- [x] Shorter footer: 805 px, down from 974.
- [ ] Accordion for "Things to Know." It was shortened instead; the homepage is still 8,725 px, about 11 screens.

**9. Fixed chrome on a phone: partly done**

- [x] Header cut from 80 to 60 px.
- [ ] Total fixed chrome is still 123 px (15% of the screen) because the call bar grew from 59 to 63 px.

**10. About page staff list clipped: done**

- [x] All 9 rows fit at 360 px (rightmost text edge 340 px).

**11. Privacy Policy link: done**

- [x] A /privacy-policy page exists on the new site and the footer links to it.

**12. Tap targets: partly done**

- [x] Footer links, hero "or call" link (44 px), Housing chips (44 px) and hamburger (42x44) fixed.
- [ ] Still under 44 px: logo 40; "See emergency shelter" 22; "Read our full story" and "Meet the full team" 27; "Support Our Mission" 33; the phone link in the Contact details 19.

**13. Small text: partly done**

- [x] Smallest text is now 13 px, up from 11.2 px.
- [ ] Reach a 14 px minimum and measure role-text contrast.

**14. Hero headline over the family's faces on a phone: open**

- [ ] Set the image focal point. The image is unchanged and was not re-checked by eye.

**15. Desktop footer strip: done**

- [x] "Partners" is fully visible above the strip at 1430 px. It sits tight, so recheck at 1280 px.

**16. Canonical and Open Graph URLs: open**

- [ ] Both still point to genesisgarden.vercel.app. Update them at go-live.

## New findings from the changes

The update added a regression that blocks phone navigation, plus one small hero issue.

| # | Finding and evidence | Fix | Severity | Effort |
| --- | --- | --- | --- | --- |
| N1 | **On phones, the header pushes Donate and the menu button off the screen.** The new header call button makes the header wider than a phone. In frames from 320 to 600 px wide, the controls sit at the same positions: logo 16 to 208, Call 224 to 413, Donate 425 to 545, menu button 557 to 599. At 360 px the screen is 345 px of content width in my frame, so only the logo and part of the Call button show, and the menu button is unreachable. The header's content is 662 px wide, hidden by the page rather than scrolling. This is a regression: the earlier header fit. (WCAG 2.1.1, WCAG 1.4.10 Reflow, Nielsen #3) | At 480 px and below, show the Call button as an icon-only 44x44 button, or remove it from the header since the call bar already exists. Keep the menu button in view and put Donate in the menu or keep it as a small button. Confirm in your device emulator, since this was measured in a frame, not a real device. | Critical | Small |
| N2 | **The hero repeats the phone number and leaves one button alone on a row.** "Call now: 309-326-3075" is followed by "or call 309-326-3075" below the buttons. At 1430 px, four buttons wrap three-plus-one, so "I want to partner" sits alone on a second row. (Nielsen #8, Gestalt proximity) | Remove the "or call" line, or keep it only below 480 px. Make "I want to partner" a text link so the button row holds three. | Minor | Trivial |

## Remaining work in priority order

Fix N1 first, because it blocks navigation on phones. Items 2, 3 and 5 need answers from Genesis Garden before they can be built.

1. **N1: header overflow on phones.** Critical, small effort. Do this before anything else ships.
2. **Finding 2: safety strip and call hours.** Major, small effort. Needs the team to confirm which referral numbers to list and the real call hours.
3. **Finding 3: giving cards and monthly option.** Major, small to medium effort. Needs real per-gift costs and confirmation that the Zeffy form supports monthly giving.
4. **Finding 5: confirm the contact form's destination.** Major, small effort. Confirm where it posts, and make sure it never falls back to GET, which puts the message in the web address.
5. **Finding 7: photos and trust.** Major, trivial to small effort. Confirm the hero and aerial photo sources, then add headshots and partner logos.
6. **Findings 4, 8 and 9: phone page length and chrome.** Minor, small effort. Move the Housing filter into the first screen, consider an accordion for "Things to Know," and let the header hide on scroll.
7. **Findings 12 and 13: tap targets and text size.** Minor, trivial effort. Pad the five remaining links to 44 px and raise the 13 px text to 14 px.
8. **Finding 14 and N2: hero polish.** Minor, trivial to small effort. Set the image focal point, remove the repeated phone line, and fix the lone button row.
9. **Finding 16: canonical and Open Graph URLs.** Minor, trivial effort. Do it at go-live.

## Not verified and next tests

The phone measurements came from loading pages in a 360x800 frame inside a desktop tab. That applies the phone layout rules but not touch input, the browser toolbar or the on-screen keyboard.

- [ ] Confirm N1 in your device emulator at 360x800, since it is the only critical finding and it was measured in a frame.
- [ ] Contact form submission: where it posts, what the thank-you state says, and whether it works without script. It was not submitted.
- [ ] The Zeffy donation form on mobile and desktop.
- [ ] Keyboard and screen-reader behavior: menu Escape and focus trapping, tab order, and focus against the call bar.
- [ ] Real mobile performance on a throttled connection, and which hero image size a phone loads.
- [ ] Measured contrast for small gray text and the team role text.
- [ ] Phone sizes other than 360 px, iOS Safari, and landscape.
- [ ] Whether the desktop footer strip still sits tight at 1280 px.
- [ ] The Privacy Policy text itself was not reviewed for accuracy.
