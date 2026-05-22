---
id: load-solar
title: "Solar heat gain through glazing"
pillar: load-calculations
topic: load-components
order: 2
difficulty: intermediate
tier: free
tags: [solar-gain, glazing, shading]
standards_referenced: []
region: global
ghana_callout: true
estimated_minutes: 8
related: [load-overview, load-01]
---

Solar heat gain is the radiation that passes through glazing and ends up as heat inside the building. It is the most time-dependent component of a cooling load and frequently the largest single one in a building with significant glass, so it deserves careful treatment.

## Solar gain through glass

Sunlight striking a window does three things: part is reflected away, part is absorbed by the glass, and part is transmitted straight through. The transmitted radiation strikes interior surfaces, is absorbed, and becomes heat. A portion of the absorbed energy in the glass itself also re-radiates and convects inward. The total of transmitted plus inward-flowing absorbed energy is the solar heat gain.

The basic estimate is:

`Q = A × SHGC × incident solar irradiance`

For 10 m2 of glass with an SHGC of 0.4 facing solar radiation of 600 W per m2:

`Q = 10 × 0.4 × 600 = 2400 W`

Opaque walls also gain solar energy, but glass is dramatically worse — a window transmits radiation almost instantly, while a wall absorbs it and conducts only a small, delayed fraction inward. This is why glazing dominates the solar discussion.

## The solar heat gain coefficient

The **solar heat gain coefficient**, or SHGC, is the fraction of incident solar radiation that becomes heat inside the space. It ranges from 0 to 1.

| Glazing | Typical SHGC |
|---------|-------------|
| Single clear glass | 0.80 to 0.86 |
| Double clear glass | 0.70 to 0.76 |
| Double, tinted | 0.45 to 0.60 |
| Double, low-e, solar control | 0.25 to 0.40 |
| Triple, high-performance | 0.20 to 0.30 |

A lower SHGC means less solar heat admitted. Note that SHGC describes solar control, while the U-value describes conduction — a window can have a good U-value and a poor SHGC, or vice versa. For a cooling-dominated building, SHGC is usually the more important number.

## Orientation and time of day

Solar gain through a given window changes hour by hour as the sun moves, and the pattern depends entirely on which way the glass faces.

- **East glazing** peaks in mid-morning, when the low morning sun strikes it nearly head-on.
- **West glazing** peaks in late afternoon, often coinciding with the hottest outdoor air — a punishing combination.
- **South glazing** (in the northern hemisphere) peaks near solar noon and is easier to shade with a horizontal overhang because the sun is high.
- **North glazing** receives mostly diffuse sky radiation and has the lowest, flattest profile.

Because each face peaks at a different time, the building's overall solar peak rarely equals the sum of every window's individual maximum. This is why a load calculation steps through several hours of the day.

## External versus internal shading

Shading is the most powerful single lever on solar gain, and where it sits matters enormously.

**External shading** — overhangs, fins, louvres, screens, brise-soleil — intercepts radiation **before** it reaches the glass. The blocked energy never enters the building. This is by far the most effective approach.

**Internal shading** — blinds and curtains — stops radiation **after** it has already passed through the glass. The energy is inside; the blind only changes how it is distributed and re-radiated. Internal shading reduces glare and helps somewhat, but it cannot match an external device.

A horizontal overhang sized for the sun's noon altitude can cut south-facing gain substantially. Vertical fins are better for the low morning and afternoon sun on east and west faces.

## Thermal mass delays the peak

Transmitted solar radiation does not become a cooling load the instant it enters. Most of it strikes floors, walls and furniture, is absorbed, and is released slowly over the following hours. Heavy, massive construction stores more and releases later, so a building with exposed concrete floors sees a flatter, delayed solar load curve than a lightweight building, where the gain converts to load almost immediately.

This storage effect is why detailed methods like the Radiant Time Series exist — they model the delay rather than assuming gain equals load. The practical consequence is that the solar contribution to the afternoon peak may include radiation that actually entered the building hours earlier.

<svg viewBox="0 0 480 200" width="480" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="480" height="200" fill="#ffffff"/>
  <line x1="60" y1="160" x2="440" y2="160" stroke="#333333" stroke-width="2"/>
  <line x1="60" y1="160" x2="60" y2="30" stroke="#333333" stroke-width="2"/>
  <text x="240" y="190" fill="#333333" font-size="13" text-anchor="middle">Hour of day</text>
  <text x="20" y="100" fill="#333333" font-size="13" transform="rotate(-90 20 100)">Solar load</text>
  <path d="M70 150 Q150 50 230 100 Q300 140 380 70 Q410 55 430 130" fill="none" stroke="#e8820c" stroke-width="3"/>
  <text x="150" y="55" fill="#e8820c" font-size="12">East peak</text>
  <text x="350" y="60" fill="#e8820c" font-size="12">West peak</text>
</svg>

## Glazing selection

Because so much solar control is decided at the window, glazing choice is a primary design decision, not an afterthought:

- For cooling-dominated buildings, favour **low SHGC** solar-control low-e glass.
- Match SHGC to orientation — a stricter SHGC pays off most on east and west faces.
- Consider the daylight trade-off; very low SHGC can also dim the interior, so balance solar control against visible light transmittance.
- Combine good glass with external shading rather than relying on either alone.

> 🇬🇭 **Ghana context**
> Near the equator the sun climbs almost overhead at midday, so the classic horizontal overhang protects south and north glazing effectively but does little for the low morning and afternoon sun. East and west façades take a heavy beating in Accra, with strong beam radiation striking the glass nearly straight on. Specifying low-SHGC solar-control glass and adding vertical external fins or screens on east and west elevations is one of the highest-value moves for controlling cooling load in the local climate.

## Bringing it together

Estimate solar gain from glass area, SHGC and incident radiation; remember each orientation peaks at a different hour; favour external shading over internal; account for thermal mass delaying the peak; and treat glazing selection as a core load-reduction decision.
