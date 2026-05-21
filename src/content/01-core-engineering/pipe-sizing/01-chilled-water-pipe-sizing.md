---
id: pipe-01
title: "Pipe sizing for chilled water systems"
pillar: core-engineering
topic: pipe-sizing
order: 1
difficulty: intermediate
tier: free
tags: [pipe-sizing, chilled-water, hydronics]
standards_referenced: [ASHRAE-Fundamentals]
region: global
ghana_callout: true
estimated_minutes: 9
related: [pump-01, chil-01]
last_updated: 2026-05-21
---

Chilled water pipe sizing converts a cooling duty into a physical pipe diameter. Get it right and the system is quiet, efficient and affordable; get it wrong and you pay in pump energy, noise or eroded pipe walls for the life of the building.

## Flow follows from the load

The starting point is not the pipe, it is the load and the design temperature difference. The heat a chilled water stream can carry is set by its mass flow rate and the temperature rise it is allowed across the load:

Q = m × cp × ΔT

Q is the cooling capacity, m is the mass flow rate, cp is the specific heat of water, and ΔT is the chilled water temperature difference between return and supply. Rearranged, the required flow is the load divided by the product of specific heat and ΔT.

The practical consequence is direct. For a fixed load, a larger design ΔT means a smaller flow, and a smaller flow means smaller pipes and smaller pumps. A system designed for a 5 K rise needs roughly two thirds more flow than the same load on an 8 K rise. This is why the chosen ΔT is one of the most important early decisions in a chilled water design.

## The trade-off behind every pipe diameter

Once the flow in each section is known, sizing is a balance between two competing costs.

Choose a small pipe and the first cost of pipe, fittings and insulation is low, but the water moves fast, the friction rate is high, and the pump must develop more head every hour the system runs. Choose a large pipe and friction falls, pump energy falls, the system is quieter, but the capital cost of pipe and insulation rises and the pipe takes more space.

The friction rate, the pressure loss per metre of pipe, is the variable the engineer adjusts to strike this balance. A higher allowable friction rate gives smaller, cheaper pipe but a thirstier pump; a lower rate does the opposite. Because the pump runs for years, life cycle thinking usually favours the more generous pipe, especially on the longest runs and the index circuit.

## Typical friction rates and velocity limits

Two criteria are applied together: a friction rate band and a velocity ceiling. The pipe must satisfy both.

A common design friction rate for chilled water mains falls in the range of roughly 100 to 400 Pa/m, with many engineers aiming near the middle of that band for the bulk of the system and easing toward the lower end on long runs.

Velocity is the second check, and the limits are not a single number.

| Pipe size | Velocity guidance | Why |
|-----------|-------------------|-----|
| Small branch pipe | lower, around 1 to 1.5 m/s | Avoid air noise and water velocity noise |
| Medium pipe | around 1.5 to 2.4 m/s | Balanced |
| Large mains | up to about 2.4 to 3 m/s | Friction and erosion become governing |

Small pipes are held to lower velocities because flow noise is more intrusive and the consequences of erosion are proportionally worse. Large pipes can run faster, but an upper limit of roughly 2.4 to 3 m/s is widely respected.

## Erosion corrosion at high velocity

The upper velocity limit is not only about noise. Water moving too fast, particularly where it carries entrained air or fine solids, strips the protective oxide film from the inside of the pipe. Once that film is removed faster than it can reform, the bare metal corrodes and the cycle repeats. This is erosion corrosion, and it attacks elbows, tees and reducers first, where the flow turns and local velocity peaks.

Copper is especially sensitive. Holding to sensible velocity limits is a durability requirement, not just an acoustic preference, and is one reason designers resist the temptation to undersize pipe to save first cost.

## Delta T and low delta T syndrome

The design relies on the system actually achieving its design ΔT. In practice many chilled water systems return water that is cooler than intended, so the real ΔT is smaller than the design value.

When the ΔT collapses, the flow needed to deliver the same cooling rises, pumps run harder or extra pumps stage on, and the plant cannot load its chillers properly. This widespread problem is called low delta T syndrome. Its causes include three way valves left in bypass, dirty or airbound coils, incorrect control valve selection, and coils operating below design load. The pipe sizing itself is sound, but the system never sees the flow regime it was designed for. Designing for a realistic ΔT and specifying two way control valves and proper coil selection are the defences.

## Closed and open loops

Most chilled water distribution is a closed loop: the water is sealed, recirculated, and not exposed to the atmosphere. Closed loops stay clean, hold their treatment chemistry, and the pump only fights friction, not static lift.

An open loop is exposed to the atmosphere, the condenser water circuit through a cooling tower being the classic example. Open loops continuously pick up oxygen, dust and biological growth, so they need more aggressive water treatment, and the pump may also have to lift water. Chilled water sizing in this article assumes a closed loop; condenser water sizing follows similar principles but with its own velocity and fouling considerations.

> 🇬🇭 **Ghana context**
> In Accra's hot-humid climate, chilled water plant runs almost continuously, so pump energy is a year-round cost on an expensive and unreliable grid. Slightly more generous pipe sizing and a healthy design ΔT reduce pump head and ease load on generators during outages. High ambient and humidity also make chilled pipe insulation and vapour sealing critical, since any gap will sweat heavily and corrode the pipe from the outside.
