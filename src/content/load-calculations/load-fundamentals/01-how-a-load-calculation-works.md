---
id: load-overview
title: "How an HVAC load calculation works start to finish"
pillar: load-calculations
topic: load-fundamentals
order: 1
difficulty: beginner
tier: free
tags: [load-calculation, cooling-load, design-process]
standards_referenced: [ASHRAE-Fundamentals]
region: global
ghana_callout: true
estimated_minutes: 10
related: [load-01, load-internal-gains, std-acca-manualj]
---

A load calculation is simply a heat accounting exercise: you find every watt of heat trying to enter or leave a space, add it up at the worst moment, and size equipment to remove or supply that amount. This article walks the whole process end to end so a newcomer can see how the pieces fit together.

## Start with design conditions and building data

Before any arithmetic, you collect two sets of inputs.

**Design conditions** are the outdoor and indoor temperatures and humidities you design for. Outdoor conditions come from ASHRAE climate data — typically the 0.4 percent or 1 percent summer design dry-bulb with its coincident wet-bulb. Indoor conditions are your comfort target, often 24 °C (75 °F) and 50 percent relative humidity for cooling.

**Building data** describes what you are conditioning: floor areas, ceiling heights, wall and roof construction with U-values, window areas, glazing type, orientation of each surface, occupancy schedule, lighting power density, and equipment loads. The quality of the answer never exceeds the quality of these inputs.

## Identify every heat gain

A cooling load is the sum of distinct heat gain paths. Each one is calculated separately:

- **Envelope conduction** — heat flowing through walls, roof and floor, driven by the indoor to outdoor temperature difference.
- **Solar gain** — radiation passing through glazing, the single most time-sensitive component.
- **Infiltration** — uncontrolled air leakage through cracks and openings.
- **Ventilation** — outdoor air you deliberately bring in for indoor air quality.
- **People** — body heat from occupants.
- **Lighting** — electrical power converted to heat.
- **Equipment** — computers, motors, kitchen gear and other plug loads.

Conduction is roughly `Q = U × A × ΔT`. For a 20 m2 wall at U = 0.5 W/m2·K with a 10 K difference, that is 0.5 × 20 × 10 = 100 W. Repeat for every surface and you have the envelope total.

## Separate sensible and latent

Every gain is split into two kinds of heat:

- **Sensible heat** changes air temperature.
- **Latent heat** changes air moisture content.

Conduction, solar, lighting and most equipment are purely sensible. People and outdoor air carry both. A seated office worker gives off about 75 W sensible and 55 W latent. This split matters because the cooling coil must handle both, and the ratio between them — the sensible heat ratio — drives coil and equipment selection.

## Find the peak hour

Heat gains do not all peak at the same time. East glass peaks mid-morning, west glass peaks late afternoon, the roof peaks after the hottest outdoor hour because mass delays it, and occupancy follows the schedule. The building load is the **largest hourly sum**, not the sum of each component's individual maximum.

A simple worked illustration for one zone:

| Hour | Solar W | Envelope W | Internal W | Total W |
|------|---------|-----------|-----------|---------|
| 10:00 | 2400 | 900 | 1800 | 5100 |
| 14:00 | 1600 | 1500 | 1800 | 4900 |
| 16:00 | 2900 | 1400 | 1800 | 6100 |

Here the peak is 16:00 even though envelope conduction was higher at 14:00. You must calculate several hours and pick the worst.

## Sum to space load then coil load then equipment load

The numbers climb in three stages:

1. **Space load** — the heat that must be removed from the room itself: envelope, solar, infiltration, people, lights, equipment.
2. **Coil load** — the space load plus the ventilation air load plus any duct and fan heat gain. The coil sees more than the room because outdoor air is mixed in upstream.
3. **Equipment load** — the coil load plus allowances for safety factor and, for some systems, compressor or pump heat. This is the capacity you actually purchase.

Skipping a stage is a classic mistake. Ventilation air can easily add 20 to 40 percent on top of the space load, especially in humid climates.

## Choose block load or room by room

A **block load** treats the whole building or a whole air handler's area as one lump and finds its single peak — ideal for sizing central plant. A **room-by-room load** calculates each space separately so you can size individual diffusers, ducts and zone equipment. The building block peak is always smaller than the sum of room peaks because rooms peak at different hours, an effect called diversity.

## Pick a calculation method

Three established methods produce hourly cooling loads:

- **CLTD/CLF** — the older cooling load temperature difference method, still useful for hand calculations and quick checks.
- **RTS** — the Radiant Time Series method in the ASHRAE Handbook of Fundamentals, the current standard for detailed work, properly modelling how radiant heat is stored and released over time.
- **Manual J** — the ACCA residential procedure, the recognised method for houses and small buildings.

Whichever you use, the workflow above stays the same: conditions, gains, sensible and latent split, peak hour, three-stage summation, selection.

> 🇬🇭 **Ghana context**
> In Accra the summer design condition is roughly 33 °C dry-bulb at around 78 percent relative humidity, so outdoor air arrives both hot and very wet. Latent load from people and ventilation often rivals or exceeds the sensible load, which means the sensible heat ratio is low and a temperate-climate template will badly under-size the coil. Always calculate the latent component explicitly rather than trusting a sensible-only rule of thumb.

## Bringing it together

The process is methodical, not mysterious. Gather good data, account for every heat path, keep sensible and latent separate, search for the true peak hour, and carry the total cleanly from space to coil to equipment. Do that and your selection will be right-sized — comfortable, efficient and able to control humidity.
