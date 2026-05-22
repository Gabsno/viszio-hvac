---
id: cool-chw-systems
title: "Chilled water system configurations"
pillar: cooling
topic: chilled-water
order: 1
difficulty: intermediate
tier: free
tags: [chilled-water, pumping, delta-t]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 9
related: [chil-01, pump-01, hyd-fundamentals]
last_updated: 2026-05-21
---

A chilled water system carries cooling from a central chiller plant to air handlers and fan coils through pipes of water rather than refrigerant. The configuration of that loop, how it is pumped and how flow is controlled, decides its efficiency and its ability to track a varying load. This article walks through the main layouts and the design numbers behind them.

## Why a water loop at all

Water is a far better cooling carrier than air or refrigerant over distance. A pipe carries vastly more cooling per unit cross-section than a duct, and refrigerant piping is bound by length and lift limits that water simply ignores. Centralising the refrigerant in a few large chillers concentrates maintenance, improves part-load efficiency, and lets the plant grow modularly. The cost is a pumped water loop and a plant room, which is why chilled water becomes attractive above roughly 350 to 700 kW of total building cooling.

## Design temperatures and delta T

Two numbers define a chilled water loop.

- **Supply temperature** is conventionally around 6 to 7 °C, cold enough to dehumidify the air at a coil.
- **Delta T** is the temperature rise across the load, with 5 to 7 K being typical, often expressed as a 7 °C supply and 12 to 13 °C return.

Delta T sets the flow rate, because the energy carried equals flow times delta T times the specific heat of water. The relationship below is the single most important equation in waterside design.

Q in kW equals flow in litres per second times delta T in kelvin times 4.19.

So a 1000 kW load at a 6 K delta T needs about 40 L/s. The same load at a 3 K delta T needs about 80 L/s, double the pump energy for the same cooling. A wide delta T is therefore not a detail; it is a direct lever on operating cost. Modern designs sometimes push to 8 K or higher to shrink pipes and pumps, provided coils are selected to match.

## Components of the loop

A chilled water loop is more than chiller and pipe. The recurring parts are:

- **Chiller evaporator**, where refrigerant cools the water.
- **Distribution pumps**, moving water around the loop.
- **Coils** in air handlers and fan coils, where water absorbs room heat.
- **Control valves**, usually two-port modulating valves, throttling flow to each coil to meet its load.
- **Expansion tank**, absorbing thermal expansion of the water volume.
- **Air separator and strainers**, removing entrained air and debris.
- **Balancing devices and a means of make-up water and dosing** for water treatment.

## The three pumping configurations

### Constant flow

The oldest layout. A constant-speed pump pushes a fixed flow continuously, and coils use three-port valves that divert water around the coil rather than throttling it. Total flow never changes, only the split between coil and bypass.

It is simple and stable but energy-blind: the pump draws full power at 10 percent load just as at full load. Constant flow survives only on very small systems or where simplicity outranks running cost.

### Primary secondary decoupled

The traditional answer for larger plants. The system is split into two loops joined by a short, low-resistance **decoupler** or common pipe.

The **primary loop** has one constant-flow pump per chiller, giving each chiller the steady, minimum evaporator flow it needs to run safely. The **secondary loop** has variable-speed pumps that serve the building and ride the load up and down. The decoupler hydraulically separates the two so the chillers see constant flow while the building sees variable flow. Chillers are staged by watching the direction and magnitude of flow in the decoupler.

This layout is robust and forgiving. Its weakness is the extra set of pumps and the energy they consume.

### Variable primary flow

The modern efficient choice. A single set of variable-speed pumps serves both the chillers and the building, and the secondary pumps are eliminated.

Flow through the chiller evaporators is now allowed to vary. The catch is that every chiller has a minimum evaporator flow below which it trips or freezes, so a **minimum-flow bypass valve** opens at low building load to keep the active chillers above their floor. Done correctly, variable primary flow saves significant pump energy and reduces plant footprint. It demands a more capable control system, fast-acting valves and careful chiller staging.

| Configuration | Pump energy | Complexity | Best fit |
|---------------|-------------|------------|----------|
| Constant flow | Highest | Lowest | Very small systems |
| Primary secondary | Moderate | Moderate | Large robust plants |
| Variable primary | Lowest | Highest | Efficiency-driven new plants |

## Low delta T syndrome

The most common chronic fault in real chilled water plants is **low delta T syndrome**: the return water comes back colder than design, so the actual delta T shrinks. Because flow must rise to carry the same load at a smaller delta T, pumps run hard, the loop runs short of flow at the far ends, and chillers are forced to stage on prematurely at low real load.

Causes are cumulative and stubborn:

- Coils selected with too little surface area for the design delta T.
- Three-port valves left in older sections of the loop, bypassing chilled water around coils.
- Control valves that fail open, are oversized, or hunt.
- Dirty coils and fouled strainers reducing heat transfer.
- Setpoints drifted so coils never load fully.

The cure is design discipline. Specify two-port valves throughout, select coils honestly for the design delta T, commission valves and balance properly, and trend return temperature so a drift is caught early rather than discovered as a capacity shortfall.

## When central plant beats unitary cooling

Chilled water is not always right. Below a few hundred kilowatts, scattered loads, or buildings where simplicity and partial redundancy matter most, DX and VRF win on first cost and commissioning effort. Chilled water earns its place when the building is large, when loads are concentrated, when long-term running cost and centralised maintenance dominate the decision, or when a campus needs a single plant feeding several buildings. The crossover is a judgement call, but the trend is clear: the bigger and longer-lived the building, the stronger the case for a water loop.
