---
id: load-internal-gains
title: "Internal heat gains people lights and equipment"
pillar: load-calculations
topic: load-components
order: 1
difficulty: intermediate
tier: free
tags: [internal-gains, occupancy, plug-loads]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 8
related: [load-overview, psy-03]
---

Internal heat gains are the heat generated inside the conditioned space by the things that occupy and use it — people, lighting and equipment. In a modern, well-insulated building with modest glazing, these gains are frequently the largest part of the cooling load, so estimating them carefully is essential.

## People

Occupants release heat by metabolism, and the amount depends on how active they are. The gain has two parts:

- **Sensible heat** warms the air directly.
- **Latent heat** is released as moisture through respiration and perspiration.

Typical values per person, suitable for design estimating:

| Activity | Sensible W | Latent W | Total W |
|----------|-----------|----------|---------|
| Seated, office work | 75 | 55 | 130 |
| Standing, light work | 80 | 80 | 160 |
| Walking, retail | 90 | 120 | 210 |
| Moderate dancing | 100 | 200 | 300 |
| Heavy work, gym | 150 | 280 | 430 |

The harder people work, the more the balance shifts toward latent heat. A packed gym is a latent load problem; a quiet office is mostly sensible. To get the room gain, multiply by the design occupancy. A 200 m2 office at 10 m2 per person holds 20 people, giving 20 × 75 = 1500 W sensible and 20 × 55 = 1100 W latent.

## Lighting

Almost all electrical power delivered to a light fitting ends up as heat in the space. Lighting gain is calculated from the installed **lighting power density** in W per m2:

`Q = LPD × floor area`

| Lighting type | Typical LPD |
|---------------|-------------|
| LED office, modern | 5 to 9 W per m2 |
| Fluorescent office, older | 10 to 16 W per m2 |
| Retail display | 15 to 25 W per m2 |
| Warehouse | 3 to 6 W per m2 |

For a 200 m2 office at 8 W per m2, lighting contributes 1600 W. The shift to LED has roughly halved lighting loads over the last two decades, which is one reason internal gains in offices are now dominated by equipment rather than lights.

## Equipment and plug loads

Equipment covers everything plugged in or hard-wired that is not lighting — computers, monitors, printers, kitchen appliances, motors and process gear. A workstation with a laptop and monitor draws around 60 to 120 W; a desktop with dual monitors closer to 200 to 300 W. Server and IT rooms are an extreme case, with rack loads of several kilowatts each.

Plug loads are easy to overestimate because nameplate ratings represent maximum draw, not typical operating draw. A photocopier rated 1500 W spends most of the day in standby drawing a fraction of that. Use measured or schedule-based averages where you can.

## Diversity and usage factors

The headline mistake in internal gains is assuming everything is on, at full power, with every seat filled, all at once. It never is. Two correction factors fix this:

- A **usage factor** scales an item to its realistic average operating fraction — for example, applying 0.6 to office equipment because not every machine runs flat out.
- A **diversity factor** accounts for the fact that not all spaces or items peak simultaneously across a building.

A worked illustration for the 200 m2 office above:

| Source | Connected W | Factor | Design W |
|--------|------------|--------|----------|
| People sensible | 1500 | 1.0 | 1500 |
| Lighting | 1600 | 0.9 | 1440 |
| Equipment | 3000 | 0.6 | 1800 |
| Total sensible | 6100 | | 4740 |

Ignoring the factors here would overstate the load by nearly 30 percent. Applying them too aggressively, however, risks under-sizing — judgement and the occupancy schedule should guide the numbers.

## The radiant and convective split

Internal gains do not all hit the air instantly. Each gain divides into:

- A **convective** part that warms room air immediately.
- A **radiant** part that first strikes floors, walls and furniture, is absorbed, stored, and released later.

Lighting from recessed fittings might be roughly 60 percent radiant; people are split close to even; equipment is mostly convective. The radiant fraction is why a load does not instantly equal a gain. Detailed methods such as the Radiant Time Series explicitly delay the radiant portion, smoothing and shifting the peak. For a hand calculation you can treat gains as instantaneous, accepting a slightly conservative result.

## Why internal gains dominate modern offices

Three trends have pushed internal gains to the front:

1. **Better envelopes.** Improved insulation and glazing have cut conduction and solar loads.
2. **Denser occupancy.** Open-plan layouts pack more people per square metre.
3. **More equipment.** Every desk now carries multiple powered devices.

The result is that in a typical contemporary office, people plus lighting plus equipment can account for half or more of the sensible cooling load. The building can need cooling even on a mild day simply because of what is happening inside it. Getting the occupancy schedule, LPD and plug-load assumptions right is therefore the highest-leverage part of the whole calculation.

## Bringing it together

Count occupants with their activity-based sensible and latent heat, lighting from a realistic LPD, and equipment from average rather than nameplate draw. Apply sensible diversity and usage factors, remember the radiant portion arrives late, and recognise that in a modern office these gains often outweigh the envelope entirely.
