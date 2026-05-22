---
id: air-static-pressure
title: "Air system static pressure and fan selection"
pillar: ducting
topic: air-systems
order: 2
difficulty: intermediate
tier: free
tags: [static-pressure, fan-selection, system-curve]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 9
related: [air-fans, duct-02, fund-airflow]
last_updated: 2026-05-21
---

Selecting a fan correctly comes down to one number that designers routinely get wrong: the total static pressure the fan must overcome at design airflow. Get it right and the fan delivers the air you sized the ducts for; get it wrong and the system is either starved or noisy and over powered.

## External and total static pressure

Static pressure is the resistance the air system imposes on the fan, measured in pascals (Pa) or inches of water gauge (in wg). It is helpful to separate two values.

Total static pressure is the full resistance the fan must develop, counting everything from the inlet to the final outlet. External static pressure is the resistance outside the air handler casing, that is the supply and return ductwork, diffusers, grilles and dampers, but not the internal filters and coils.

Equipment selection software almost always asks for external static pressure, because the manufacturer already knows the pressure drop of the internal components for the configuration you picked. If you are selecting a bare fan rather than a packaged air handler, you must account for the internal losses yourself and work in total static pressure.

| Term | What it includes | Where it is used |
|---|---|---|
| External static pressure | Ductwork, diffusers, grilles, external dampers | Packaged AHU selection |
| Internal static pressure | Filters, coils, internal attenuators, casing | Built into AHU rating |
| Total static pressure | Everything from inlet to outlet | Bare fan selection |

## The system curve

A duct system does not have a single pressure drop. Its resistance rises with the square of airflow, because pressure loss is proportional to velocity pressure and velocity pressure is proportional to flow squared. Plot pressure against airflow and you get a parabola starting at the origin. That parabola is the system curve.

The practical consequence is direct. If you push 20 percent more air through a fixed duct system, the pressure it demands rises by roughly 44 percent, since 1.2 squared is 1.44. This square law is why a small error in estimated airflow becomes a larger error in required pressure, and why oversizing a fan does not simply give you more air for free.

## Adding component losses to find the design point

The design static pressure is the sum of every pressure drop along the air path at design airflow. Build it as a line item list rather than a single guess.

### Typical contributors

- Air intake louver and bird screen
- Filters, using the dirty or mid life drop, not the clean drop
- Cooling and heating coils at design face velocity
- Sound attenuators
- Straight duct friction along the longest run, the index run
- Fittings such as elbows, transitions and tees, as dynamic losses
- Volume control and fire dampers
- Terminal units such as VAV boxes
- Diffusers and return grilles

Sum these for the longest, highest resistance path in the network. That index run defines the fan duty, because if the fan can satisfy the worst path, every shorter path is satisfied with the help of balancing dampers.

A worked snapshot for a modest commercial supply system might be: filters 150 Pa, cooling coil 180 Pa, attenuator 60 Pa, ductwork friction 250 Pa, fittings 120 Pa, VAV box 75 Pa, diffuser 35 Pa, giving roughly 870 Pa external. Always use realistic mid life filter drops, since selecting on clean filters guarantees the fan falls short within months.

## Matching the fan curve to the system curve

Every fan has a performance curve, pressure plotted against airflow at a given speed. The fan can only ever operate where its own curve crosses the system curve. That intersection is the operating point, and it is the airflow and pressure the installation will actually deliver.

To select correctly, plot the calculated system curve, then choose a fan whose curve crosses it at the design airflow and design pressure. A good selection lands in the stable, high efficiency middle of the fan curve, away from the steep stall region of a centrifugal fan and away from the over flowing far right where power and noise climb.

<svg viewBox="0 0 420 220" width="420" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="180" x2="390" y2="180" stroke="#333333" stroke-width="2"/>
<line x1="50" y1="180" x2="50" y2="30" stroke="#333333" stroke-width="2"/>
<path d="M50 180 Q200 150 360 60" fill="none" stroke="#33597f" stroke-width="3"/>
<path d="M50 180 Q230 165 360 50" fill="none" stroke="#b03030" stroke-width="3"/>
<circle cx="300" cy="92" r="6" fill="#1a7a3a"/>
<text x="300" y="40" font-size="13" fill="#b03030">Fan curve</text>
<text x="130" y="150" font-size="13" fill="#33597f">System curve</text>
<text x="250" y="115" font-size="13" fill="#1a7a3a">Operating point</text>
<text x="200" y="205" font-size="13" fill="#333333">Airflow</text>
</svg>

## The danger of guessing static pressure too low

Underestimating static pressure is the most common and most damaging selection error. If the real system resistance is higher than assumed, the operating point slides up the fan curve and back to the left, so the fan delivers less air than the design intent. Rooms run warm, ventilation rates fall and occupants complain.

Fixes after the fact are all unattractive. Speeding up a belt driven fan or raising a variable speed drive setpoint draws more power and more noise, may overload the motor, and on a fixed speed fan may not be possible at all. The cleaner answer is to calculate the index run carefully before ordering the fan.

## Safety margins

A modest, deliberate margin is sensible, not an excuse for sloppy calculation. Adding roughly 10 percent to the calculated static pressure covers buildup over time and minor field deviations. Avoid stacking margins, since adding 25 percent on pressure and another 15 percent on airflow produces a grossly oversized fan that runs throttled, wastes energy and generates noise. Calculate honestly, add one clearly stated margin, and select for high efficiency at the design point.
