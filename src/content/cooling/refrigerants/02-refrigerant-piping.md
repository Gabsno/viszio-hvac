---
id: cool-refrigerant-piping
title: "Refrigerant piping for split and VRF systems"
pillar: cooling
topic: refrigerants
order: 2
difficulty: intermediate
tier: pro
tags: [refrigerant-piping, copper-lines, commissioning]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 9
related: [vrf-01, cool-dx-systems, cool-refrigerants]
last_updated: 2026-05-21
---

The refrigerant pipework is where a split or VRF installation is quietly won or lost. Get the sizing, brazing and evacuation right and the system runs efficiently for years; get it wrong and you face oil starvation, capacity loss, compressor failure and leaks that are slow and expensive to trace.

## Liquid and suction lines

A direct expansion circuit needs two pipes between the indoor and outdoor units: the liquid line and the suction line. They do very different jobs and are sized on different rules.

The **liquid line** carries subcooled high-pressure liquid from the condenser to the expansion device. Liquid is dense, so the line is small. The sizing concern is pressure drop and avoiding flashing: if the liquid drops too much pressure, or picks up heat, it flashes to vapour before the expansion valve and starves the evaporator. Keep liquid line pressure drop modest, the equivalent of around 1 K of saturation change, and insulate it where it runs through hot spaces.

The **suction line** carries low-pressure superheated vapour back to the compressor. Vapour is far less dense, so the suction line is much larger. Two competing concerns set its size. Make it too small and pressure drop robs capacity and efficiency, since every kilopascal of suction loss costs compressor performance. Make it too large and vapour velocity falls too low to carry oil back.

Always size from the manufacturer's line-set tables for the specific equipment and total piping length. Do not scale up from the unit's connection stub size; that stub is only a fitting, not a sizing instruction.

## Oil return and riser velocity

A small amount of compressor oil always circulates with the refrigerant. On horizontal runs and down the liquid line, oil moves easily. The problem is **vertical suction risers**, where oil must be dragged upward against gravity by the vapour flow.

This requires a minimum vapour velocity, typically in the order of 5 to 8 m/s in a riser, to entrain the oil film and sweep it up the pipe. Below that velocity oil collects at the bottom of the riser, slowly drains the compressor of lubrication, and eventually causes mechanical failure.

The trap is part-load operation. A line sized for full-load velocity may fall well below the oil-return minimum when an inverter compressor throttles down. Long tall risers are handled with a **double suction riser**: a small pipe sized to keep velocity high at minimum load, working in parallel with a larger pipe, plus a trap arrangement that activates the second pipe only at full load. VRF manufacturers also specify oil traps at intervals on long vertical runs. Follow the manufacturer's riser rules exactly.

## Maximum length and lift

Every split and VRF system has hard geometric limits, and they are not suggestions.

- **Total pipe length** caps how much line resistance the compressor can overcome.
- **Maximum lift** is the vertical height difference between the indoor and outdoor units, and it is usually limited separately depending on whether the condenser is above or below the indoor unit.
- **Length between branches** matters on VRF, where each branch joint and indoor unit has its own length allowance.

| Parameter | Typical single split | Typical VRF |
|-----------|----------------------|-------------|
| Max total length | 15 to 30 m | 100 to 1000 m |
| Max lift (ODU above) | 8 to 15 m | 50 m or more |
| Max lift (ODU below) | 8 to 15 m | 40 m or more |
| First branch to last IDU | not applicable | 40 to 90 m |

Exceeding these limits causes capacity derating, poor oil return and warranty refusal. If a layout cannot meet them, the answer is to relocate the outdoor unit, split the system, or choose a different technology, not to ignore the table.

## Insulation of the suction line

The suction line carries cold vapour, so it must be insulated along its entire length. Skipping insulation costs efficiency through heat gain and, worse, causes the line to sweat and drip wherever it runs through warm humid air, damaging ceilings and finishes.

Use closed-cell elastomeric insulation of adequate wall thickness, sized so the surface stays above dewpoint in the local climate. Seal every joint and butt with adhesive, and never compress the insulation with cable ties. The liquid line is usually insulated too where it shares the line set or passes through hot zones. Run both lines together and protect them from UV outdoors with a jacket or trunking.

## Brazing evacuation and charging

The commissioning sequence is where workmanship shows. Done properly it follows a strict order.

### Braze under flowing nitrogen

Every joint is brazed while a gentle flow of dry nitrogen passes through the pipe. Without it, the hot copper reacts with air to form a hard black oxide scale inside the pipe. That scale flakes off, blocks expansion valves and capillary tubes, and contaminates the oil. Nitrogen purging is non-negotiable.

### Pressure test with nitrogen

After brazing, pressurise the circuit with dry nitrogen to the manufacturer's test pressure and hold it, typically for 24 hours, watching for any pressure drop corrected for temperature change. Never pressure test with the refrigerant itself, and never with oxygen.

### Evacuate to remove moisture and air

Pull a deep vacuum with a two-stage vacuum pump down to roughly 500 microns or lower, then isolate the pump and confirm the vacuum holds. Evacuation removes moisture, which otherwise forms acids and freezes at the expansion valve, and removes non-condensable air, which raises head pressure. A triple evacuation, breaking the vacuum twice with dry nitrogen, gives the cleanest result.

### Charge accurately

Charge by weight against the nameplate, then trim using subcooling and superheat readings at the design condition. Liquid charging into the liquid line is faster and avoids slugging the compressor.

## Additional charge for long runs

Equipment leaves the factory pre-charged for a baseline pipe length. Any liquid line beyond that baseline holds extra refrigerant that must be added on site. Manufacturers publish an additional charge figure, typically a number of grams per metre of liquid line, scaled by line diameter. Measure the actual installed liquid line length, calculate the top-up, add it by weight, and record the total charge on a label at the outdoor unit. An undercharged long run starves the evaporator; an overcharged one floods the compressor.
