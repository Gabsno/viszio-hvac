# Viszio HVAC — Claude Code Kickoff Prompt

**Copy this entire file into Claude Code as your first message in a new project directory.**

---

## Project: Viszio HVAC

You are building **Viszio HVAC** — a searchable HVAC knowledge library + Duolingo-style course app for engineers. This is a follow-up project to BMS Mastery (live at gabsno.github.io/bms-mastery/), built by the same person (Gabs / Yakuver Solutions Ltd, Ghana). It must follow the same shipping pattern: GitHub Pages deploy, free Gemini + Claude AI tutor, auto-update banner, mobile-first responsive.

This project will eventually become a paid SaaS — so SaaS scaffolding must be built in from day one, even if disabled in v1.0.

---

## Hard requirements

### Stack
- **Frontend**: React 18 + Vite + Tailwind CSS + TypeScript
- **Routing**: React Router (hash router for GitHub Pages compatibility)
- **Search**: FlexSearch (client-side full-text, no backend)
- **Icons**: lucide-react
- **State**: Zustand (lightweight, same pattern as MEP Takeoff Pro)
- **Markdown rendering**: react-markdown + remark-gfm + rehype-highlight
- **Storage**: localStorage for v1.0 (bookmarks, notes, progress, streaks, settings)
- **Deployment**: GitHub Pages at `gabsno.github.io/viszio-hvac/`
- **No backend in v1.0** — but auth/billing scaffolding must be present (see SaaS-readiness below)

### App shape

**Two modes, one codebase, shared content store:**

1. **Library mode** (default)
   - Left sidebar: collapsible topic tree (Pillar → Topic → Article)
   - Main area: rendered article with table of contents on the right
   - Top bar: persistent search input (FlexSearch, instant results dropdown)
   - Bookmark, "mark as read", and "ask AI tutor" buttons on every article
   - Filter chips: by pillar, by standard referenced, by region (Global/Africa/Ghana), by tier (Free/Pro)

2. **Course mode**
   - Duolingo-style path through the library content
   - Modules → lessons → quizzes → capstone
   - Streaks, XP, trophies (same mechanics as BMS Mastery — Gabs will recognize the pattern)
   - Pulls from the same Markdown articles, no duplicate content

Toggle between modes via top-right switcher.

### Content structure

Content lives in `/src/content/` as Markdown files with YAML frontmatter:

```
/src/content/
  /01-core-engineering/
    /psychrometrics/
      01-what-is-psychrometrics.md
      02-reading-psych-chart.md
      ...
    /load-calculations/
    /duct-design/
    /pipe-sizing/
    /fan-pump-laws/
    /refrigeration-cycle/
  /02-equipment/
    /chillers/
    /vrf-vrv/        # IMPORTANT: Gabs runs a Midea VRF business — make this thorough
    /air-handling-units/
    /fan-coil-units/
    /boilers/
    /cooling-towers/
    /pumps-and-fans/
  /03-standards/
    /ashrae/         # 62.1, 90.1, 55, 15, 34, 188 — study-guide format only, NO reproduction
    /smacna/         # Duct construction, seismic, leakage — study-guide format
    /acca/           # Manual J/D/S/N/T — study-guide format
    /ahri/           # Certification programs, rating standards
    /icc/            # IECC, IMC
  /04-controls-bms-commissioning/
  /05-energy-codes-iaq-sustainability/
    /leed/
    /edge/           # IFC EDGE — important for Africa
    /well/
    /kigali-amendment/
  /06-refrigeration-low-temp/
```

**Frontmatter schema** (every article must have this):
```yaml
---
id: psy-01
title: "What is psychrometrics?"
pillar: core-engineering
topic: psychrometrics
order: 1
difficulty: beginner   # beginner | intermediate | advanced
tier: free              # free | pro | enterprise
tags: [air-properties, humidity, fundamentals]
standards_referenced: [ASHRAE-Fundamentals-Ch1]
region: global          # global | africa | ghana
ghana_callout: false    # true if the article has a Ghana-specific section
estimated_minutes: 6
related: [psy-02, psy-03, load-01]
last_updated: 2026-05-21
---
```

### Reference materials (Gabs's personal licensed copies — kept OUTSIDE the project)

Gabs owns personal/licensed copies of several standards (ASHRAE, ACCA, SMACNA, possibly others). These are stored in a folder **completely outside this project directory** so they cannot accidentally be committed to git.

### Reference folder location

Suggested path on Gabs's machine:
```
C:\Users\ntako\OneDrive\Desktop\GABS BUSINESS\HVAC References\
  /ashrae/
  /acca/
  /smacna/
  /ahri/
  /icc/
  /other/         # CIBSE, ISHRAE, local Ghana codes, etc.
```

This folder lives **next to** the `Apps/` folder — not inside the Viszio HVAC project. Gabs will confirm the exact path when you ask him.

### Setup step

When you reach the reference-materials step in the build order:

1. **Ask Gabs**: "What's the absolute path to your HVAC references folder?"
2. **Save** the path in `/scripts/reference-path.local.txt` (single line, plaintext) at the project root
3. **Add** `/scripts/reference-path.local.txt` to `.gitignore` so the path itself isn't committed (the path may contain Gabs's username and is machine-specific)
4. **Verify** you can read files from that path. Run a quick `ls` to confirm structure.

### How you (Claude Code) use these files

When writing a standards study guide article (e.g. "ASHRAE 62.1 — ventilation for acceptable IAQ"):

1. **Read** the relevant PDF from the absolute external path to ground yourself in the actual structure, section numbers, terminology, and scope
2. **Write** the study guide in your own original wording — explain what the standard does, its structure, the engineering reasoning, how to use it in practice
3. **Cite** section numbers ("see ASHRAE 62.1 Section 6.2.2.1") so the article is genuinely useful as a study companion
4. **Quote sparingly** — at most ONE short quote per source, under 15 words, in quotes, attributed
5. **Never** reproduce tables, equations-as-printed, or paragraphs from the standard
6. **Never** write a section-by-section walkthrough that mirrors the original document's structure so closely it becomes a displacive summary
7. **Never** copy any PDF (or any part of one) into the project directory
8. **Always** end with the official-purchase link footer block (see Content rules below)

If Gabs hasn't yet placed a PDF for a standard you're writing about, write the article from general engineering knowledge and flag it in a comment at the top: `<!-- TODO: Gabs to provide reference PDF for verification of section numbers -->`. Don't invent section numbers if you're not sure.

### Why external path instead of a project subfolder?

- PDFs physically cannot end up in the repo, even by accident
- No git rules to maintain or worry about
- The references can be shared across multiple future projects (BMS Mastery v2, the MEP AI SaaS, MEP Takeoff Pro) without duplication
- Cloud-sync friendly (OneDrive backs them up automatically)

---

## Content rules — READ CAREFULLY

**Standards content (ASHRAE, SMACNA, ACCA, AHRI, ICC) must NEVER reproduce the actual standards.** These are copyrighted commercial documents. For every standards-related article:

- ✅ Summarize what the standard covers, in original wording
- ✅ Explain the underlying engineering (physics/math is not copyrighted)
- ✅ Reference section numbers ("see ASHRAE 90.1 Section 6.4")
- ✅ Link to the official purchase/free-read page
- ✅ Short quotations under 15 words, in quotes, with citation
- ❌ NEVER reproduce tables, charts, formulas-as-printed, or chapters
- ❌ NEVER paraphrase so closely it's a displacive summary
- ❌ NEVER ship the PDFs themselves

Every standards article must include a footer block:
```
> **Get the official standard:** [Link to ASHRAE bookstore / SMACNA store / etc.]
> This article is an independent study guide and is not affiliated with or endorsed by [organization].
```

### Ghana callouts

Content is **global-first** (so it's sellable as SaaS to engineers anywhere) but every article that has Ghana relevance should include a callout block:

```markdown
> 🇬🇭 **Ghana context**
> In Accra's hot-humid climate (ASHRAE Zone 1A equivalent), latent loads
> dominate. Designers should size for 26°C / 65% RH indoor with 33°C / 78%
> RH outdoor — significantly different from US handbook defaults.
```

Render these as a styled callout component. Filter chip in the UI: "Ghana relevant only."

### Search

- FlexSearch indexed on: title, body, tags, standards_referenced
- Instant results dropdown as you type (debounced 150ms)
- Result cards show: title, pillar > topic breadcrumb, snippet with highlighted match, difficulty badge, tier badge
- Keyboard nav: ↑↓ to move, Enter to open, Esc to close
- "/" keyboard shortcut focuses search from anywhere

### AI Tutor

Same pattern as BMS Mastery:
- Settings page lets user paste a Google Gemini API key (free, from aistudio.google.com/apikey) OR an Anthropic Claude key
- Gemini selected by default with green "FREE" badge
- "Ask the Tutor" button on every article opens a panel with the current article passed as context
- System prompt: "You are an expert HVAC engineering tutor. The user is reading the following article: {article_content}. Answer their questions clearly and reference the article where relevant. If they ask about something not in the article, answer concisely and link to the related article ID if one exists in this list: {related_article_titles_and_ids}."

### SaaS-readiness scaffolding (build in v1.0, ACTIVATE LATER)

Even though v1.0 ships as fully free with no auth, build these structures now:

1. **User store** (Zustand): `{ id, email, tier: 'free' | 'pro' | 'enterprise', subscriptionStatus, isAuthenticated }`. In v1.0, populate as `{ tier: 'pro', isAuthenticated: true }` so all content is accessible. A single flag `SAAS_MODE_ENABLED = false` in `/src/config.ts` controls gating.

2. **Content gating component**: `<TierGate requires="pro">{children}</TierGate>` — renders children if user tier ≥ required, otherwise renders a paywall card. In v1.0, always renders children.

3. **Auth scaffolding**: empty `/src/auth/` folder with placeholder `signIn()`, `signUp()`, `signOut()` functions. Login page route exists at `/login` but redirects home in v1.0.

4. **Paystack stub**: `/src/billing/paystack.ts` with placeholder functions matching Paystack's API shape. Not wired to anything yet.

5. **Settings page** has a "Subscription" section that just shows "Free tier — full access during beta" in v1.0.

This way when Gabs wants to flip the SaaS switch, it's a config change + backend wiring, not a rewrite.

### Auto-update banner

Identical to BMS Mastery:
- App fetches `/version.json` (containing `{ version: "1.0.0", buildHash: "..." }`) every 60 seconds
- On mismatch with the build's embedded version, slide up a banner: "A new version of Viszio HVAC is ready" with a "Refresh" button
- Refresh triggers `window.location.reload(true)`
- Version label visible in Settings → About

### Mobile-first responsive

- Sidebar collapses to a drawer on mobile
- TOC moves below article on mobile
- Search expands to full-screen overlay on mobile
- Tested at 375px, 768px, 1024px, 1440px

---

## v1.0 deliverable (what to ship first)

Don't build all 195 articles upfront. Ship a working app with a **v1.0 content backbone** of 30 high-value articles, then we'll grow the library iteratively via auto-update.

**v1.0 article list** (write these 30):

### Core engineering (10)
1. What is psychrometrics — and why it's the foundation of HVAC
2. Reading a psychrometric chart (step-by-step with worked example)
3. Sensible vs latent heat (with Ghana climate worked example)
4. The four basic HVAC processes on the chart (heating, cooling, humidification, dehumidification)
5. Cooling load calculation — the CLTD method overview
6. Cooling load calculation — the radiant time series (RTS) method overview
7. Duct sizing — equal friction vs static regain methods
8. Duct fitting losses and dynamic loss coefficients
9. Pipe sizing for chilled water systems
10. The vapor-compression refrigeration cycle explained

### Equipment (8)
11. Air-cooled vs water-cooled chillers — selection criteria
12. Chiller types: scroll, screw, centrifugal, absorption
13. VRF/VRV systems — architecture and how they work
14. VRF heat recovery vs heat pump systems
15. Air handling units — components and configurations
16. Fan coil units — 2-pipe vs 4-pipe systems
17. Cooling towers — open vs closed circuit, drift, blowdown
18. Pumps — primary, secondary, variable primary flow

### Standards study guides (6)
19. ASHRAE 62.1 — ventilation for acceptable IAQ (study guide)
20. ASHRAE 90.1 — energy standard for buildings (study guide)
21. ASHRAE 55 — thermal comfort (study guide)
22. SMACNA HVAC Duct Construction Standards (study guide)
23. ACCA Manual J — residential load calc (study guide)
24. AHRI certification — what AHRI 550/590 actually means

### Controls / commissioning (3)
25. Sequences of operation — how they're written and read
26. Commissioning vs retro-commissioning vs continuous Cx
27. Functional performance testing for AHUs

### Energy / IAQ / sustainability (2)
28. IFC EDGE certification — what it is and why it matters for Africa
29. The Kigali Amendment and HFC phase-down — what HVAC engineers must know

### Refrigeration (1)
30. Cold room design fundamentals — load components and equipment selection

For each: 600–1,200 words, with diagrams as inline SVG where useful, Ghana callout where relevant, and a "what to read next" footer.

---

## Build order

1. **Scaffold**: Vite + React + TS + Tailwind project, GitHub Pages deploy config, hash router, standard `.gitignore` (node_modules, dist, .env, etc.)
2. **Reference path setup**: ask Gabs for the absolute path to his external HVAC references folder, save it to `/scripts/reference-path.local.txt`, gitignore that file, verify you can read PDFs from the path
3. **Layout shell**: top bar (logo, search, mode switcher, settings icon), sidebar, main content area, mobile drawer
4. **Content pipeline**: Markdown loader with frontmatter parsing, content index builder at build time (generates `/src/content-index.json` for FlexSearch)
5. **Library mode**: topic tree, article renderer, TOC, breadcrumbs, related-articles footer
6. **Search**: FlexSearch integration, results dropdown, keyboard nav, "/" shortcut
7. **AI Tutor**: settings page, key storage, Gemini + Claude clients, tutor panel with article context
8. **Bookmarks, notes, progress**: localStorage-backed Zustand stores
9. **Course mode**: module/lesson path UI, quiz component, XP/streak engine
10. **SaaS scaffolding**: user store, TierGate, login page placeholder, settings subscription section
11. **Auto-update banner**: version check, banner UI, reload trigger
12. **Write the 30 v1.0 articles** — for standards articles, read the matching PDFs from the external reference path if Gabs has placed them. Otherwise flag with the TODO comment as described in the Reference materials section.
13. **Mobile responsive polish**: test at all breakpoints
14. **Deploy to GitHub Pages**, verify version.json updates work

**After scaffold + reference path setup (steps 1–2), pause and ask Gabs to confirm his PDFs are in place at the external path before you continue to the standards articles. He'll say "go" when he's done.**

---

## Project metadata

- **Repo name**: `viszio-hvac`
- **Owner**: gabsno (GitHub)
- **Live URL target**: `https://gabsno.github.io/viszio-hvac/`
- **Project path on Gabs's machine**: `C:\Users\ntako\OneDrive\Desktop\GABS BUSINESS\Apps\Viszio HVAC`
- **Support email**: visziogh@gmail.com
- **Brand**: Viszio family (sibling of BMS Mastery, Viszio App, Viszio Shift)
- **Color direction**: take cues from BMS Mastery but differentiate — suggest a deep teal/cyan primary with warm orange accent for "Ghana callouts," to feel distinct from BMS Mastery's palette

---

## What I do NOT want you to do

- ❌ Reproduce any copyrighted standard content (ASHRAE, SMACNA, ACCA, AHRI, ICC etc.)
- ❌ Ship PDFs of standards
- ❌ Build a backend in v1.0 — keep it client-only
- ❌ Use a heavy auth library (Auth0, Clerk) in v1.0 — just scaffold the shape
- ❌ Skip the auto-update banner — it's the difference between a usable app and a frustrating one
- ❌ Write all 195 articles before shipping — ship the 30-article v1.0, then iterate
- ❌ Forget the Ghana callouts — they're a differentiator for the eventual SaaS angle in African markets

---

## First action

Start by:
1. Creating the project directory at the path above
2. Scaffolding the Vite + React + TS + Tailwind setup with a standard `.gitignore`
3. Asking Gabs for the absolute path to his external HVAC references folder, then saving it to `/scripts/reference-path.local.txt` (and adding that file to `.gitignore`)
4. Showing me the planned folder structure for confirmation
5. **Pausing for Gabs to confirm his standards PDFs are in place at the external path** before continuing to write standards articles

Then proceed through the build order above. Commit and push to GitHub at the end of each phase so I can pull and inspect.

Let's go.
