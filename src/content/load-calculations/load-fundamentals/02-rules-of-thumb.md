---
id: load-rules-of-thumb
title: "HVAC rules of thumb and when they fail"
pillar: load-calculations
topic: load-fundamentals
order: 2
difficulty: beginner
tier: free
tags: [rules-of-thumb, estimating, sizing]
standards_referenced: []
region: global
ghana_callout: true
estimated_minutes: 7
related: [load-overview, load-block-vs-room]
---

Every HVAC engineer carries a few rules of thumb in their head — quick ratios that turn a floor area into a rough tonnage. They are genuinely useful for early budgeting, but they are not a design tool, and treating them as one causes real harm.

## What the common rules say

Rules of thumb come in two main forms: an area per unit of cooling, or a heat density per unit area.

| Building type | Area per ton | Heat density |
|---------------|--------------|--------------|
| General office | 28 to 37 m2 per ton | 95 to 125 W per m2 |
| Retail | 23 to 28 m2 per ton | 125 to 155 W per m2 |
| Restaurant | 14 to 19 m2 per ton | 185 to 250 W per m2 |
| Server or IT room | 5 to 9 m2 per ton | 400 to 700 W per m2 |
| Apartment or residence | 37 to 56 m2 per ton | 65 to 95 W per m2 |

One ton of refrigeration is 3.517 kW. So a 400 m2 office at 40 m2 per ton suggests 10 tons, or about 35 kW. That number is fine for a feasibility sketch or a first cost estimate.

## Why they are valuable early on

Before you have drawings, glazing schedules or an occupancy plan, you still need a number. Rules of thumb let you:

- Size a plant room and electrical service for a concept design.
- Produce a budget figure for a client in minutes.
- Sanity-check a detailed calculation — if your computed load is 60 W per m2 for a glassy west-facing office, something is wrong.

That last use is the most defensible. A rule of thumb is an excellent **cross-check** and a poor **substitute**.

## Why they fail for final design

A single ratio collapses a dozen independent variables into one average. It silently assumes your building is average. Real buildings are not.

### They ignore orientation and glazing

Two identical 200 m2 offices can differ by 50 percent in peak load purely from glass. A north-facing space with small punched windows behaves nothing like a west-facing space with full-height curtain wall. A floor-area rule cannot see the difference because it never looks at the façade. Solar gain through glazing is often the largest swing factor in a commercial load, and it is exactly what the rule discards.

### They ignore occupancy and internal gains

A call centre packed at 6 m2 per person with dual monitors carries a far higher internal load than an executive suite at 20 m2 per person. People and equipment are sensible plus latent heat the rule never counts directly.

### They ignore climate

A rule developed for a temperate climate assumes a modest design temperature difference and a low outdoor moisture content. Move that rule to a hot, humid location and it under-counts both the conduction load and, more seriously, the latent load.

## The cost of getting it wrong

Engineers often respond to this uncertainty by padding the number — bumping 10 tons to 15 "to be safe." Oversizing has a price:

- **Poor humidity control.** An oversized unit satisfies the thermostat quickly on sensible heat, short-cycles, and never runs long enough to wring moisture out of the air. The room feels cold and clammy.
- **Short cycling.** Frequent starts wear compressors and contactors and waste energy through repeated start-up losses.
- **Higher first cost.** Bigger coils, bigger ducts, bigger electrical service — all paid for and never used.
- **Worse part-load efficiency.** Most equipment is least efficient at very low load, where an oversized system spends its life.

Undersizing is also possible — a rule that under-counts latent load leaves a space humid and uncomfortable on the worst days. Either way, the rule is the culprit.

> 🇬🇭 **Ghana context**
> Many rules of thumb in circulation in Accra were imported from temperate-climate handbooks and carried over unchanged. Those rules were calibrated for dry outdoor air and a small latent load. Accra's design condition near 33 °C and 78 percent relative humidity means ventilation and infiltration bring in heavy moisture, so a temperate rule of thumb can under-count the true coil load by 20 to 30 percent — and the shortfall is almost entirely latent, the part that controls comfort.

## How to use them responsibly

Treat a rule of thumb the way you treat a rough mental estimate of a bill: good enough to know if you can afford dinner, useless for splitting the cheque.

- Use ratios for concept design, budgeting and plant-room space.
- Always state clearly that the figure is preliminary.
- Run a proper hour-by-hour calculation before equipment is selected or ordered.
- When the detailed result and the rule disagree, investigate — do not simply average them.

A rule of thumb answers "roughly how big." Only a load calculation answers "exactly how big, and why."
