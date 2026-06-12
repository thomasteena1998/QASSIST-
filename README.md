# Q-ASSIST website

A self-contained static website for the Q-ASSIST study (QuAlitative reSearch
Supporting IncluSive Trials). Plain HTML, CSS, and vanilla JavaScript — no
build step. Open `index.html` directly in a browser, or host on GitHub Pages.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Home — intro, phase buttons, six-domain grid |
| `about.html` | About — study intro, PDF download button, Phase 1–3 sections (`#phase-1` … `#phase-3`) |
| `guiding-principles.html` | Six Domains of Guiding Principles — overview: intro + roadmap of 12 trial stages |
| `designing-inclusion-early.html` … `system-enablers.html` | One page per domain (intro, challenge, principles, practice, example, video placeholder) |
| `team.html` | Team grid |
| `resources.html` | Publications and documents list |
| `contact.html` | Contact email |
| `css/styles.css` | Single shared stylesheet |
| `js/main.js` | Navigation dropdown + mobile menu (the only JavaScript) |
| `assets/` | Images and documents |

## Filling in content

All missing content is marked with `[PLACEHOLDER: …]` and highlighted with a
dashed amber border so nothing is missed. Search the HTML files for
`PLACEHOLDER` and replace each one. In addition:

- **Logo:** replace `assets/logo-placeholder.svg` (or change the `src` in each
  page header and the home hero) and update the `alt` text.
- **Study summary PDF:** add the file at `assets/q-assist-study-summary.pdf`
  (the About page button already links there).
- **Team photos:** replace `assets/team-photo-placeholder.svg` per member and
  update each `alt` text. Copy/delete `<li class="team-card">` blocks to
  change the number of members.
- **Resources:** copy/delete `<li class="resource-item">` blocks and set each
  link `href`.
- **Contact email:** appears in `contact.html` and in the footer of every
  page (`placeholder@example.ac.uk`).
- Once placeholders are replaced, the highlight styling can be removed by
  deleting the `placeholder` / `placeholder-inline` classes (or leave the
  CSS rules unused — they only apply to elements with those classes).

## Navigation targets

- Phases (About page anchors): `#phase-1`, `#phase-2`, `#phase-3`
- Domains (separate pages, linked from the nav dropdown, the home grid,
  and the roadmap bands): `designing-inclusion-early.html`,
  `building-relationships.html`, `strengthening-trial-teams.html`,
  `improving-data.html`, `returning-findings.html`, `system-enablers.html`
- Each domain page has a labelled 16:9 video placeholder; an HTML comment
  beside it shows how to swap in a YouTube/Vimeo `<iframe>` or an uploaded
  `<video>` file using the `.video-embed` wrapper.

## Accessibility notes

- Semantic headings, landmarks, and a skip link on every page.
- The Guiding Principles dropdown opens with Enter/Space or Arrow-Down,
  closes with Escape, and every item is focusable; it also opens on hover
  for mouse users.
- Visible focus outlines, AA colour contrast, 18&nbsp;px base font size,
  and `alt` text on every image.
