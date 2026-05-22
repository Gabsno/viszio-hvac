---
id: hyd-fundamentals
title: "Hydronic system fundamentals"
pillar: piping
topic: hydronics
order: 1
difficulty: beginner
tier: free
tags: [hydronics, closed-loop, water-flow]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 9
related: [pipe-01, pump-01, cool-chw-systems]
last_updated: 2026-05-21
---

A hydronic system moves heating or cooling energy through a building using water instead of air. Understanding why water is such an efficient carrier, and how the loop is assembled, is the foundation for every chilled water, hot water and condenser water topic that follows.

## Why water beats air as a heat carrier

Water carries far more heat per unit volume than air. The specific heat of water is about 4.18 kJ/kg·K and its density is roughly 1000 kg/m³, so one cubic metre of water absorbs about 4180 kJ for every 1 K of temperature rise. Air, at roughly 1.2 kg/m³ and 1.0 kJ/kg·K, absorbs only about 1.2 kJ for the same conditions. Water therefore transports on the order of 3000 times more energy per unit volume.

The practical consequence is pipe size. A duct carrying a given cooling load is physically large and consumes a lot of building space, while a pipe carrying the same load is a fraction of the diameter. A 200 kW cooling load at a 6 K chilled water rise needs only about 8 L/s of water, which fits comfortably in a DN65 pipe. The equivalent air system would need a duct several hundred millimetres across. This is why large buildings distribute energy as water from a central plant and convert it to air locally at fan coils or air handlers.

### The governing equation

Almost all hydronic sizing comes back to one relationship:

Q = m × cp × ΔT

where Q is heat transfer in kW, m is mass flow in kg/s, cp is specific heat, and ΔT is the temperature difference between supply and return. For water, a convenient working form is that flow in L/s is roughly Q in kW divided by (4.18 × ΔT). Memorise this and you can size a loop on the back of an envelope.

## Closed loops versus open loops

Hydronic circuits come in two families, and the distinction drives material selection, water treatment and pump design.

| Feature | Closed loop | Open loop |
| --- | --- | --- |
| Exposure to atmosphere | Sealed, pressurised | Open at one point (a basin) |
| Typical use | Chilled water, hot water | Condenser water with cooling tower |
| Make-up water | Tiny, only on leaks | Continuous, replaces evaporation |
| Oxygen ingress | Minimal once de-aerated | Constant |
| Corrosion and fouling risk | Low | High, needs ongoing treatment |

A **closed loop** is a fully sealed circuit. Once filled and de-aerated, the same water circulates indefinitely. Because fresh oxygenated water is not constantly introduced, corrosion is limited and water treatment is light. Chilled water and heating hot water circuits are almost always closed.

An **open loop** is exposed to atmosphere somewhere, classically the cooling tower basin. Evaporation, drift and bleed continuously remove water that must be replaced, so oxygen, dissolved solids and biological growth are constant concerns. Condenser water systems are open and demand robust treatment.

## The components of a hydronic loop

Every closed hydronic loop, whether heating or cooling, contains the same functional building blocks.

### Source

The source adds or removes heat from the water. For chilled water this is a chiller evaporator; for heating it is a boiler or heat pump. The source establishes the loop temperatures, for example 7 °C supply and 13 °C return on a typical chilled water system, or 80 °C and 60 °C on an older heating system.

### Distribution

The distribution network is the piping that carries water between the plant and the terminals. Mains, risers and branches are sized so velocity stays roughly in the 1 to 3 m/s range and pressure loss is around 100 to 400 Pa/m, balancing first cost against pumping energy.

### Terminals

Terminals are the heat exchangers that transfer energy between the water and the space, such as fan coil units, air handler coils, radiators or chilled beams. This is where the water actually does its job.

### Pump

The pump supplies the energy to overcome friction in the pipes, valves and coils, keeping water in motion. In a closed loop the pump does not lift water; it only fights friction, because what goes up the riser comes back down.

### Expansion and accessories

Water changes volume with temperature, so a closed loop needs an expansion tank to absorb that change without over-pressurising. Air separators, automatic air vents, strainers and balancing valves complete the loop. These accessories are covered in their own articles.

## Flow is set by load and delta T

A common beginner error is to think pump flow is fixed. In reality, the design flow rate is a consequence of two decisions: the load to be served and the temperature difference chosen between supply and return.

Choosing a larger ΔT reduces the required flow for the same load. A chilled water system designed for 6 K needs more flow than one designed for 8 K serving the identical building. Lower flow means smaller pipes and smaller pumps, so designers favour wider ΔT where coil selections allow. The trade-off is that terminals must be selected to perform at the lower flow, and a coil designed for 6 K will not deliver full capacity if starved to an 8 K flow.

In variable flow systems, two-way control valves at the terminals throttle as zones reach setpoint, the loop flow drops, and a variable speed pump follows it. Flow is therefore dynamic, always tracking the instantaneous load.

## The closed loop as a sealed pressurised circuit

Picture the closed loop as a continuous ring of water with no beginning and no end. It is filled, pressurised to a static fill pressure that keeps the highest point above atmospheric, and sealed. The pump circulates that fixed mass of water around the ring.

Because the loop is sealed and full, the pump head is not related to building height. A pump serving a twenty storey tower may need the same head as one serving a low warehouse if the friction is similar, because the weight of the down-coming column balances the up-going column. Pump head is a friction quantity, expressed in metres or kPa, that represents the resistance of the longest flow path.

Keeping the loop properly filled, pressurised and free of air is what allows it to behave predictably. Air pockets break the siphon balance, cause noise, and starve terminals. The expansion tank, air separator and fill arrangement exist precisely to maintain the loop as a stable, sealed, pressurised circuit, which is the theme of the next articles.
