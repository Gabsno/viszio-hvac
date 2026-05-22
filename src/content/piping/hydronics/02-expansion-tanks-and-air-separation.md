---
id: pipe-expansion
title: "Expansion tanks and air separation"
pillar: piping
topic: hydronics
order: 2
difficulty: intermediate
tier: free
tags: [expansion-tank, air-separator, closed-loop]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 8
related: [hyd-fundamentals, heat-hydronic-heating]
last_updated: 2026-05-21
---

Water expands when it is heated, and a sealed closed loop has nowhere for that extra volume to go. The expansion tank and air separation devices keep a hydronic loop at a safe, stable pressure and free of trapped air. Get them wrong and you get relief valve dumps, pump noise and starved coils.

## Why a closed loop needs an expansion tank

Water is nearly incompressible. If you fill a sealed circuit cold and then heat it, the volume increase has nowhere to go, so pressure climbs steeply. A heating loop going from 10 °C fill to 80 °C operation expands by roughly 2.5 to 3 percent of system volume. In a sealed steel loop with no expansion tank, that small volume change would push pressure past the relief valve setting in seconds.

The expansion tank provides a deliberate, controlled gas cushion that absorbs the volume change. As water expands it compresses the gas; as water cools it pulls volume back from the tank. The tank effectively gives the incompressible water a compressible partner so the loop pressure stays within a safe band between fill pressure and relief valve setting.

Chilled water loops also need expansion tanks, though the swing is smaller because the temperature range is narrower. A loop filled at 25 °C and run at 7 °C actually contracts slightly, so the tank also prevents the loop dropping below atmospheric pressure and drawing in air.

## Compression tanks versus diaphragm tanks

Two tank technologies are common, and they behave differently.

| Feature | Plain compression tank | Diaphragm or bladder tank |
| --- | --- | --- |
| Gas and water contact | Direct, gas touches water | Separated by membrane |
| Air absorption into water | High over time | Negligible |
| Pre charge | Not adjustable | Set with air valve |
| Typical size | Larger | Smaller for same duty |
| Maintenance | Periodic draining | Check pre charge pressure |

A **plain compression tank** is a steel vessel with an air space directly above the water. It works, but air is slowly absorbed into the water under pressure, so the tank waterlogs over time and must be drained and recharged. Older heating plant rooms still use them.

A **diaphragm or bladder tank** separates the air cushion from the water with a flexible membrane. The air cannot be absorbed, so the tank holds its charge for years. The pre charge pressure is set with a tyre type valve before the tank is connected, ideally matched to the loop fill pressure at the tank location. Diaphragm tanks are the default choice in modern systems and are smaller for the same acceptance volume.

### Sizing in brief

Tank sizing depends on system water volume, the temperature swing, the fill pressure and the maximum allowable pressure. Manufacturers provide selection charts, but the principle is that a wider operating temperature range and a higher system volume both demand a larger acceptance volume.

## The point of no pressure change

The single most important concept for expansion tanks is the **point of no pressure change**, often abbreviated PONPC. This is the point where the expansion tank connects to the loop. Because the tank holds a fixed gas pressure that only changes slowly with temperature, the loop pressure at that connection point is effectively held constant when the pump starts and stops.

When the pump runs, it adds head. That head distributes around the loop relative to the fixed point. Where the pump sits relative to the tank therefore decides whether pump head is added to or subtracted from the static loop pressure.

### Pump the loop away from the tank

The design rule is to locate the pump so it discharges away from the expansion tank connection. Then when the pump starts, its head is added on top of the static pressure everywhere downstream, raising pressure throughout the loop.

If the pump instead draws from a point near the tank and pushes toward it, the pump suction can drop below static pressure. At the high points of a tall building this can pull the loop below atmospheric, causing air to be drawn in through automatic vents and the pump to cavitate. The classic guidance, pump away from the tank, exists to keep every point of the loop positively pressurised when the pump runs.

## Air in the system and why it must be removed

Air is the enemy of a hydronic loop. It enters during filling, comes out of solution as water warms, and can be drawn in at low pressure points. The problems it causes are serious:

- **Noise** as bubbles travel through pipes and pumps.
- **Corrosion** because oxygen attacks steel and cast iron.
- **Reduced heat transfer** when air collects in coil headers and high points.
- **Pump damage** when air reaches the impeller and the pump loses prime or cavitates.
- **Blocked circulation** when an air lock stops flow in a riser or terminal branch.

Cold water holds more dissolved gas than warm water. As loop water heats, gas is driven out of solution and must be collected and expelled rather than allowed to circulate.

### Air separators and vents

An **air separator** is fitted in the main flow, ideally at the hottest, lowest pressure point where gas comes out of solution most readily, often near the chiller or boiler outlet. Coalescing separators force water through a mesh that encourages tiny bubbles to merge into larger ones that rise and are collected.

**Automatic air vents** are float operated valves placed at every high point, at coil headers and above the air separator. As air accumulates, the float drops and the vent opens to atmosphere; when water returns, the float rises and seals. Manual vents are also fitted at terminals so an engineer can bleed trapped air during commissioning.

A well designed loop combines a central air separator to do the bulk removal with automatic vents at local high points to catch what remains. Together with a correctly sized and pre charged expansion tank, they keep the closed loop sealed, pressurised and air free so it performs as designed.
