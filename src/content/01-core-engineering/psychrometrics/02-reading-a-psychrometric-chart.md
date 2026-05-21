---
id: psy-02
title: "Reading a psychrometric chart step by step"
pillar: core-engineering
topic: psychrometrics
order: 2
difficulty: beginner
tier: free
tags: [psychrometric-chart, air-properties, design]
standards_referenced: [ASHRAE-Fundamentals]
region: global
ghana_callout: true
estimated_minutes: 9
related: [psy-01, psy-04, psy-03]
last_updated: 2026-05-21
---

The psychrometric chart is a single diagram that holds every property of moist air and every process that changes it. Once you can plot a point and trace a line, load calculations and coil selection stop being abstract and become geometry you can see.

## The layout of the chart

A psychrometric chart is drawn for one barometric pressure, usually standard sea level pressure of 101.325 kPa, and a separate chart or correction is needed at high altitude. Read the chart with this orientation in mind.

The horizontal axis is dry bulb temperature, increasing to the right. The vertical axis, normally drawn on the right hand edge, is humidity ratio in grams of water per kilogram of dry air, increasing upward. Every other line on the chart is a way of connecting those two coordinates to a third property.

### The saturation curve

The curved boundary sweeping up the left side is the saturation curve, the line of 100 percent relative humidity. Air cannot exist above and to the left of it. Any point sitting exactly on this curve has its dry bulb, wet bulb and dew point temperatures all equal.

### Relative humidity curves

Inside the saturation curve, a family of curves of similar shape represents constant relative humidity, typically labelled at 10 percent intervals. They sag downward as temperature rises, which is the visual proof that warm air can hold far more moisture than cool air at the same relative humidity.

### Wet bulb and enthalpy lines

Lines of constant wet bulb temperature run diagonally, sloping gently downward from upper left to lower right, and meet the saturation curve at their own value. Lines of constant enthalpy run almost parallel to the wet bulb lines, slightly steeper. On most practical charts they are treated as the same family with a small correction, because wet bulb temperature and enthalpy are closely linked.

### Specific volume lines

A separate set of steeper diagonal lines marks constant specific volume in cubic metres per kilogram of dry air. They let you convert a volumetric airflow into the mass flow that energy balances need.

## Plotting a state point

The chart works on a simple rule: any two independent properties fix the point, and the remaining properties are then read off by following the appropriate lines through it.

To plot a point, locate the first known property and trace its line. Locate the second known property and trace its line. The intersection is your state point. From that intersection you read every other property by following each family of lines back to its scale.

The only caution is that the two properties must be independent. Wet bulb temperature and enthalpy, for example, are nearly the same family of lines, so knowing both adds almost nothing. Dry bulb plus any moisture property, or dry bulb plus wet bulb, always works cleanly.

## A worked example

Suppose a measurement at sea level gives 30°C dry bulb and 24°C wet bulb. Find the relative humidity, humidity ratio, dew point and enthalpy.

First find 30°C on the bottom axis and follow the vertical dry bulb line upward. Next find 24°C on the saturation curve and follow the diagonal wet bulb line down and to the right. The two lines cross at the state point.

Reading from that intersection:

- Relative humidity is approximately 62 percent, found by noting which RH curve passes through the point.
- Humidity ratio is approximately 16.8 grams per kilogram of dry air, read by moving horizontally to the right hand axis.
- Dew point is approximately 22°C, found by moving horizontally left to the saturation curve and reading the dry bulb value there.
- Enthalpy is approximately 73 kilojoules per kilogram of dry air, read by following the enthalpy scale beyond the saturation curve.

These figures will vary by a small margin depending on the chart, but the method is exact and the values are consistent with one another.

<svg viewBox="0 0 480 320" width="480" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="480" height="320" fill="#ffffff"/>
  <line x1="60" y1="270" x2="440" y2="270" stroke="#333333" stroke-width="2"/>
  <line x1="60" y1="270" x2="60" y2="40" stroke="#333333" stroke-width="2"/>
  <path d="M60 270 Q150 200 240 110 Q300 60 360 40" fill="none" stroke="#1f6feb" stroke-width="2"/>
  <line x1="300" y1="270" x2="300" y2="150" stroke="#bbbbbb" stroke-width="1"/>
  <line x1="180" y1="120" x2="360" y2="195" stroke="#cc8800" stroke-width="1"/>
  <circle cx="300" cy="150" r="5" fill="#d62728"/>
  <line x1="60" y1="150" x2="300" y2="150" stroke="#bbbbbb" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="240" y="300" fill="#333333" font-size="13">Dry bulb temperature</text>
  <text x="10" y="160" fill="#333333" font-size="13" transform="rotate(-90 14 160)">Humidity ratio</text>
  <text x="305" y="143" fill="#d62728" font-size="12">state point</text>
  <text x="120" y="95" fill="#1f6feb" font-size="12">saturation curve</text>
  <text x="330" y="215" fill="#cc8800" font-size="12">wet bulb line</text>
</svg>

## Reading a process as a line

A single point describes air at rest. An HVAC process connects two points, the entering state and the leaving state, and the straight line between them is the process line.

The direction of that line tells you what the equipment did. A horizontal line to the right is sensible heating. A line down and to the left is cooling with dehumidification. A near vertical line upward is humidification. The slope of the line also reveals the ratio of sensible to latent change, which is the basis of the sensible heat ratio used in coil selection.

> 🇬🇭 **Ghana context**
> An Accra outdoor design point near 33°C dry bulb and 78 percent relative humidity plots high and well to the right on the chart, deep in moist territory. The supply air a system must deliver, often around 13 to 14°C and close to saturation, plots far down and to the left. The process line joining them is long and steeply sloped toward the latent axis, a direct picture of why coils in Ghana spend so much of their capacity wringing water out of the air rather than simply lowering its temperature.

## Practical tips

Always confirm the chart pressure matches your site altitude. Plot points lightly in pencil so process lines can be added and erased. When in doubt about which of two diagonal families you are reading, remember enthalpy and wet bulb slope one way while specific volume slopes the other and is noticeably steeper.
