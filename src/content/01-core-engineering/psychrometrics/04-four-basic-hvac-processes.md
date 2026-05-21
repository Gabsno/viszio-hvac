---
id: psy-04
title: "The four basic HVAC processes on the chart"
pillar: core-engineering
topic: psychrometrics
order: 4
difficulty: intermediate
tier: free
tags: [psychrometric-chart, processes, coils]
standards_referenced: []
region: global
ghana_callout: true
estimated_minutes: 8
related: [psy-02, psy-03, ahu-01]
last_updated: 2026-05-21
---

Nearly everything an HVAC system does to air can be reduced to four elementary processes, each a recognisable direction on the psychrometric chart. Real equipment usually combines two of them, but learning the pure cases first makes the combinations easy to read.

## The four pure processes

Picture a state point on the chart with dry bulb temperature on the horizontal axis and humidity ratio on the vertical axis. The four basic processes are the four cardinal directions you can push that point.

### Sensible heating

Sensible heating adds heat without adding moisture. The point moves horizontally to the right at constant humidity ratio. Relative humidity falls during the move because warmer air can hold more moisture, even though the absolute moisture is unchanged. A heating coil with no humidifier produces this process.

### Sensible cooling

Sensible cooling removes heat without removing moisture. The point moves horizontally to the left. Relative humidity rises as the air cools toward saturation. This process is only possible while the cooling surface stays warmer than the air dew point, so that no condensation occurs.

### Humidification

Humidification adds moisture to the air. The point moves upward. If steam is injected the dry bulb temperature barely changes, giving a near vertical line. If water is sprayed and evaporates, it draws sensible heat from the air, so the point also drifts left along a line of nearly constant wet bulb temperature.

### Dehumidification

Dehumidification removes moisture, moving the point downward. In practice this is almost always achieved by cooling a surface below the air dew point so vapour condenses out, which means the point also moves left. Pure vertical dehumidification needs a desiccant rather than a coil.

## The real cooling coil process

In a hot climate the process that matters most is the cooling and dehumidifying coil, and it is not one of the pure directions. It is a combined process: the air loses both sensible heat and moisture, so the process line runs down and to the left.

### The apparatus dew point

Imagine a coil so deep and so effective that every particle of air touched the cold fin surface and left at the surface temperature. All that air would exit saturated at a single point on the saturation curve. That point is the apparatus dew point, the effective surface temperature of the coil seen by the air.

The straight line drawn from the entering air state to the apparatus dew point is the coil process line. The leaving air state lies somewhere along that line. If the coil were perfect the leaving state would sit exactly at the apparatus dew point. Real coils fall short of it.

### Bypass factor and contact factor

No coil contacts all the air. Some air slips between the fins without touching cold metal and leaves unchanged. The fraction of air that behaves as if it bypassed the coil entirely is the bypass factor. The fraction that behaves as if it fully contacted the coil is the contact factor, and the two add to one.

The leaving air state divides the process line in that ratio. A contact factor of 0.85 means the leaving state sits 85 percent of the way from the entering state toward the apparatus dew point. A deeper coil with more rows, closer fin spacing or lower face velocity has a higher contact factor and reaches closer to its apparatus dew point. This single idea lets a designer predict leaving air conditions before selecting hardware.

<svg viewBox="0 0 480 300" width="480" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="480" height="300" fill="#ffffff"/>
  <line x1="55" y1="250" x2="440" y2="250" stroke="#333333" stroke-width="2"/>
  <line x1="55" y1="250" x2="55" y2="35" stroke="#333333" stroke-width="2"/>
  <path d="M55 250 Q150 180 230 100 Q290 55 350 35" fill="none" stroke="#1f6feb" stroke-width="2"/>
  <line x1="340" y1="120" x2="150" y2="200" stroke="#d62728" stroke-width="2"/>
  <circle cx="340" cy="120" r="5" fill="#333333"/>
  <circle cx="150" cy="200" r="5" fill="#1f6feb"/>
  <circle cx="245" cy="160" r="5" fill="#2ca02c"/>
  <text x="348" y="116" fill="#333333" font-size="12">entering air</text>
  <text x="80" y="205" fill="#1f6feb" font-size="12">apparatus dew point</text>
  <text x="252" y="156" fill="#2ca02c" font-size="12">leaving air</text>
  <text x="230" y="285" fill="#333333" font-size="13">Dry bulb temperature</text>
  <text x="14" y="150" fill="#333333" font-size="13" transform="rotate(-90 14 150)">Humidity ratio</text>
</svg>

## Air mixing as a point on a line

Mixing is the fifth process every system relies on, and it is the simplest. When two airstreams combine, for example return air and outdoor air at an air handling unit, the resulting mixed state lies on the straight line joining the two original states.

The position along that line is set by the mass flow proportions. If 30 percent of the mixed flow is outdoor air, the mixed point sits 30 percent of the way from the return air state toward the outdoor air state. Because dry air mass, energy and moisture are all conserved, the mixed point is a simple weighted average and can be found with a ruler.

## Why hot humid climates push the coil down and left

In a hot humid climate the entering air to a coil starts high and to the right on the chart, warm and very moist. The supply air the building needs sits low and to the left, cool and dry enough to absorb both sensible and latent room gains.

Joining those two states gives a long process line with a steep slope toward the moisture axis. To reach it the coil must operate at a low apparatus dew point, which means lower chilled water temperature, more coil rows and reduced face velocity to lift the contact factor. The same building in a dry climate would need only a short, nearly horizontal process line and a much shallower coil.

> 🇬🇭 **Ghana context**
> An Accra system handling outdoor air near 33°C dry bulb and 78 percent relative humidity must drive its coil process line steeply down and to the left to deliver supply air around 13 to 14°C close to saturation. This forces low apparatus dew points and deep coils, and it makes mixed air design important, because every percent of outdoor air pulls the mixed point up into very moist territory. Designers here routinely use 6 or 8 row coils and chilled water near 6 to 7°C to land the leaving air where comfort, around 24 to 26°C and 55 to 65 percent relative humidity, actually requires.
