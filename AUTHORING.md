# Adding articles to the Viszio HVAC library

You can add a new library article without writing any code. Each article
is a plain Markdown file with a small YAML header at the top. Drop it in
the right folder, commit, push — the site picks it up on the next deploy.

If you'd rather hand it off, just paste the source PDF path and tell
Claude "write articles from this and add them" — that's still the fastest
path. This guide is for when you want to write one yourself.

---

## TL;DR

1. Open `docs/article-template.md`. Copy its contents.
2. Decide which pillar (section) and topic the article belongs to.
   See the lookup table further down.
3. Create a new file at:
   `src/content/<pillar>/<topic>/<NN>-your-article-slug.md`
   where `NN` is a two-digit order number (`01`, `02`, ...).
4. Paste the template, fill in the YAML header, write the body in
   Markdown.
5. Commit and push:
   ```
   git add src/content/...
   git commit -m "Add article: <title>"
   git push
   ```
6. Wait 2 minutes — the GitHub Actions deploy will pick it up and the
   article appears live at the Library page.

Three things to watch:

- The `id` in the YAML must be **unique across the whole library**. If
  two articles share an id, only one will appear.
- The `pillar` and `topic` values must match the slugs in the lookup
  tables below — typos drop the article into "general".
- The `order` controls sort order inside a topic. Lower numbers appear
  first.

---

## The YAML header — every field explained

```yaml
---
id: vrf-piping-design        # unique slug, lowercase, dashes
title: "VRF Refrigerant Piping Design"
pillar: cooling              # see pillar table below
topic: vrf-vrv               # see topic table below
order: 4                     # sort within the topic (1, 2, 3, ...)
difficulty: intermediate     # beginner | intermediate | advanced
tier: free                   # free | pro  (pro is gated for paying users later)
tags: [vrf, piping, refrigerant]
standards_referenced: [ASHRAE, AHRI]
region: global               # global | ghana | africa
ghana_callout: false         # true to flag Ghana-specific content
estimated_minutes: 8
related: [vrf-overview, refrigerant-charge]   # ids of related articles
last_updated: 2026-05-28
---
```

| Field | Required | What it does |
|---|---|---|
| `id` | yes | Unique slug, used in URLs (`/article/<id>`). |
| `title` | yes | The headline shown in cards and at the top. Wrap in quotes if it has a colon. |
| `pillar` | yes | Which section it lives in (left sidebar). See pillar table. |
| `topic` | yes | The sub-grouping inside a pillar. See topic table. |
| `order` | recommended | Sort order inside the topic. Default 999. |
| `difficulty` | yes | Filter chip + badge. `beginner`, `intermediate`, `advanced`. |
| `tier` | yes | `free` for everyone, `pro` to gate later when SaaS is on. |
| `tags` | optional | Used for search and cross-linking. Keep short. |
| `standards_referenced` | optional | Shown as chips at the bottom. e.g. `[ASHRAE, SMACNA]`. |
| `region` | optional | `global`, `ghana`, or `africa`. Default `global`. |
| `ghana_callout` | optional | `true` shows a small "Ghana note" badge. |
| `estimated_minutes` | optional | Reading time chip. Default 6. |
| `related` | optional | Array of other article `id`s — shown as related cards. |
| `last_updated` | recommended | `YYYY-MM-DD`. Shown beside the title. |

After the closing `---` write the body in normal Markdown.

---

## Pillars (sections in the sidebar)

| Slug | Title | Folder |
|---|---|---|
| `fundamentals` | Fundamentals | `src/content/fundamentals/` |
| `load-calculations` | Load Calculations | `src/content/load-calculations/` |
| `cooling` | Cooling & Refrigeration | `src/content/cooling/` |
| `heating` | Heating | `src/content/heating/` |
| `ducting` | Air Distribution & Ducting | `src/content/ducting/` |
| `piping` | Piping & Hydronics | `src/content/piping/` |
| `ventilation` | Ventilation & Air Quality | `src/content/ventilation/` |
| `controls` | Controls, BMS & Commissioning | `src/content/controls/` |
| `standards` | Standards & Codes | `src/content/standards/` |
| `sustainability` | Energy & Sustainability | `src/content/sustainability/` |

## Topics (the sub-grouping inside each pillar)

Pick the topic slug that matches the article subject. If none fit, ask
Claude to add a new topic slug to `src/content/pillars.ts` — that's the
one file that lists them.

**Fundamentals** — `psychrometrics`, `refrigeration-cycle`, `heat-transfer`, `airflow-basics`, `units`
**Load Calculations** — `load-fundamentals`, `load-methods`, `load-components`
**Cooling** — `chillers`, `vrf-vrv`, `cooling-towers`, `cold-rooms`, `dx-systems`, `refrigerants`, `chilled-water`
**Heating** — `boilers`, `heat-pumps`, `heating-systems`
**Air Distribution & Ducting** — `duct-design`, `dampers`, `specialty-exhaust`, `air-handling-units`, `fan-coil-units`, `air-terminals`, `air-systems`
**Piping & Hydronics** — `pipe-sizing`, `pumps`, `valves`, `hydronics`
**Ventilation** — `ventilation`, `exhaust`, `air-quality`
**Controls** — `sequences-of-operation`, `commissioning`, `bms`
**Standards** — `ashrae`, `smacna`, `acca`, `ahri`, `icc`, `nfpa`
**Sustainability** — `edge`, `kigali-amendment`, `efficiency`

---

## Markdown body — what's supported

- **Headings**: use `##` for major sections and `###` for sub-sections.
  The table of contents on the right rail picks them up automatically.
- **Lists**: `- item` and `1. item` both work.
- **Tables**: standard GitHub-style pipe tables render with full
  styling.
- **Code blocks**: triple backticks. Used for sequences, sample SQL,
  or any monospaced content.
- **Bold and italics**: `**bold**`, `*italic*`.
- **Links**: `[text](url)`. External links open in a new tab.

Avoid raw HTML if you can — Markdown is parsed cleanly and styled by
the app theme. Raw HTML often breaks dark mode.

---

## Workflow for non-coders

You don't need a terminal. You can do everything in github.com:

1. Browse to `https://github.com/Gabsno/viszio-hvac/tree/main/src/content`.
2. Navigate to the pillar/topic folder for your article.
3. Click **Add file → Create new file**.
4. Name it `NN-your-slug.md` — match the folder's existing numbering.
5. Paste your article. Use the **Preview** tab to see how it renders.
6. Scroll to the bottom, write a commit message, click **Commit new file**.
7. The GitHub Action runs automatically. After ~2 minutes the article
   is live at the public site.

To preview locally before pushing (optional):
```
npm run dev
```
Open the URL it prints, navigate to your new article — Vite hot-reloads
on save.

---

## What NOT to put here

- Personal notes from a project. Use the in-app Notes feature on each
  article instead.
- PDFs of reference books. These live on your computer at
  `C:\Users\ntako\OneDrive\Desktop\GABS BUSINESS\Hvac References\`.
  They are NOT bundled with the app.
- Customer data. The library is public to everyone with the access code.

---

## When in doubt

Open one of the existing articles in `src/content/ducting/dampers/` and
copy its shape. It's the easiest way to learn the conventions.
