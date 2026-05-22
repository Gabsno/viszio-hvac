---
id: load-block-vs-room
title: "Block load versus room by room load"
pillar: load-calculations
topic: load-methods
order: 3
difficulty: intermediate
tier: pro
tags: [block-load, room-load, diversity]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 7
related: [load-overview, load-01, load-02]
---

A load calculation can be carried out at two levels of detail, and they answer different questions. A block load sizes the central plant; a room-by-room load sizes everything inside the building. Knowing which to run, and when, prevents both wasted effort and undersized components.

## What a block load is

A **block load** treats a defined area — the whole building, a single floor, or everything served by one air handler — as one combined zone. All the heat gains for that area are summed hour by hour, and the calculation reports a single peak for the block.

That peak is what you use to size **central plant**: the chiller, the boiler, the cooling tower, the main air handler, the primary pumps. These components serve the whole block and only ever need to meet the block's combined peak demand.

A block load is fast. You do not subdivide the geometry by room; you work with totals. For a feasibility study, a plant-room sizing exercise, or an early budget, a block load is often all you need.

## What a room by room load is

A **room-by-room load** calculates each individual space — every office, meeting room and corridor — as its own zone, with its own envelope, glazing, orientation, occupancy and peak hour.

This detail is required to size everything **downstream of the plant**:

- The terminal unit or fan coil serving each room.
- The supply air quantity for each space.
- The diffusers and grilles in each room.
- The branch ducts and the duct main, sized from the cumulative airflow.
- Zone control — thermostats and dampers.

You cannot size a diffuser from a block load, because the block load never tells you how much cooling any single room needs. Room-by-room is the only way to distribute capacity correctly through the building.

## Why the building peak is smaller than the sum of room peaks

This is the central concept, and it is called **diversity**.

Each room reaches its own peak at its own time. An east-facing office peaks mid-morning. A west-facing office peaks late afternoon. An interior conference room peaks when it is occupied. A corridor barely peaks at all.

If you add up every room's individual maximum, you are pretending all those peaks happen simultaneously. They do not. At the moment the east offices peak, the west offices are well below their own maximum, and vice versa.

A small worked illustration for a four-zone floor:

| Zone | Individual peak kW | Load at 10:00 kW | Load at 16:00 kW |
|------|--------------------|--------------------|--------------------|
| East offices | 18 | 18 | 9 |
| West offices | 20 | 8 | 20 |
| Interior | 12 | 11 | 11 |
| Conference | 9 | 9 | 5 |
| Sum of peaks | 59 | | |
| Block total | | 46 | 45 |

The sum of individual room peaks is 59 kW. The true block peak — the largest hourly combined total — is 46 kW at 10:00. The difference, here about 22 percent, is the diversity benefit. Sizing the chiller for 59 kW would oversize it by a fifth, with the usual penalties of higher cost, short cycling and poor part-load efficiency.

The **diversity factor** is the ratio of the block peak to the sum of room peaks. It is always less than or equal to 1.0, and it is the reason a block load and a room-by-room load give different totals for the same building.

## When to use each

The two are complementary, not competing. A complete design usually needs both.

| Situation | Use |
|-----------|-----|
| Concept design, budgeting | Block load |
| Plant-room and electrical sizing | Block load |
| Sizing chiller, boiler, cooling tower | Block load |
| Sizing fan coils and terminal units | Room by room |
| Sizing diffusers and duct branches | Room by room |
| Zoning and control design | Room by room |
| Detailed design, construction documents | Both |

A practical workflow is to run the room-by-room calculation first, size all the terminal equipment and ductwork from the individual room peaks, then aggregate the hourly results into a block to find the diversified building peak for the central plant. Good load software does both passes from one model.

### A caution on misusing diversity

Diversity must be applied to the plant, never to the terminal equipment. Each fan coil still has to meet its own room's peak when that room actually peaks, regardless of what the rest of the building is doing. Applying a building-wide diversity factor to individual terminals would leave every room undersized at its own worst hour. Diversity is a property of the combined whole, not of any single part.

Equally, do not assume a diversity factor — derive it from the hourly calculation. The factor depends on the mix of orientations and schedules, and a building dominated by west glazing has far less diversity than one with balanced exposures.

## Bringing it together

Run a block load to size the central plant at the diversified building peak, and a room-by-room load to size the terminals, diffusers and ducts at each space's own peak. The block total is smaller than the sum of room totals because rooms peak at different hours — that is diversity, and it belongs to the plant alone.
