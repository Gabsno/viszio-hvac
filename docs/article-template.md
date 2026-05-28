---
id: my-article-slug
title: "Article Title Goes Here"
pillar: cooling
topic: chillers
order: 99
difficulty: intermediate
tier: free
tags: [tag-one, tag-two]
standards_referenced: [ASHRAE]
region: global
ghana_callout: false
estimated_minutes: 7
related: []
last_updated: 2026-05-28
---

One or two short paragraphs of orientation. Tell the reader what this
article covers and why an HVAC engineer would care. Set context, then
get into the substance.

## First major section

Use `##` for top-level sections. Each one becomes a link in the right-rail
table of contents on desktop and a collapsible header on mobile.

Write in plain English, no jargon without a definition. If you reference
a standard (ASHRAE 90.1, SMACNA HVAC Duct Construction Standards, NFPA 96)
spell it out the first time.

### A sub-section

Use `###` for sub-sections inside a major section.

- Bulleted lists work for short items, parallel ideas, or checklists.
- Keep each bullet to one line where possible.
- For multi-paragraph items, use a numbered list instead.

## When to use a table

Tables are the right tool when you're comparing fixed properties of
several options.

| Variable | SI unit | IP unit | Typical range |
|---|---|---|---|
| Static pressure | Pa | in wg | 100 - 750 Pa |
| Velocity        | m/s | fpm   | 4 - 15 m/s |
| Volume          | l/s | CFM   | varies |

## When to use a code block

```
H = m × cp × ΔT
where:
  H  = sensible heat (W)
  m  = mass flow rate (kg/s)
  cp = specific heat (J/kg·K)
  ΔT = temperature difference (K)
```

Use code blocks for formulas, sequences of operation, command snippets
or anything that should be in monospaced text.

## A closing section

End with practical guidance — what an engineer should DO with this
information on a real project. Selection rules of thumb, common pitfalls,
or how this article connects to others in the library (mention those by
adding them to the `related:` array in the YAML header).

Add `last_updated: YYYY-MM-DD` to the header before publishing.
