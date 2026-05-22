---
id: cool-economizer
title: "Free cooling and the waterside economizer"
pillar: cooling
topic: chilled-water
order: 2
difficulty: advanced
tier: pro
tags: [economizer, free-cooling, energy-efficiency]
standards_referenced: [ASHRAE-90.1]
region: global
ghana_callout: false
estimated_minutes: 8
related: [cool-chw-systems, ct-01, sust-efficiency]
last_updated: 2026-05-21
---

When the outdoor air is cooler than the building wants to be, running a compressor to make cooling is wasteful. Free cooling, or economizer operation, uses the cool outdoors directly and lets the chiller or DX compressor idle. On the right project in the right climate it cuts cooling energy substantially.

## The principle of free cooling

A building with internal heat gains, people, lights, equipment, server racks, needs cooling even on a mild day. If the outdoor air or a body of cool water can absorb that heat without a compressor, the most expensive component in the cooling plant simply switches off. Economizers come in two families: airside, which uses cool outdoor air directly, and waterside, which uses a cool water source through a heat exchanger. ASHRAE Standard 90.1 makes one or the other mandatory on many commercial systems above a size threshold, precisely because the saving is so reliable.

## The airside economizer

An airside economizer is a set of motorised dampers and controls on an air handler. When conditions allow, the outdoor air damper opens wide, the return air damper closes down, and the unit floods the building with cool outdoor air instead of recirculating and mechanically cooling its own warm return air.

```
  ┌─────────── air handler ───────────┐
  outdoor ──▶[OA damper]──┐
                          ├─▶[ filter ]─▶[ coil ]─▶ supply
  return ───▶[RA damper]──┘                ▲
                                    coil idle when
                                    economizing
```

### Control modes

- **Dry-bulb control** opens the economizer when outdoor dry-bulb temperature is below a changeover setpoint, often around 18 to 21 °C. Simple, but it ignores humidity.
- **Enthalpy control** compares the total heat content of outdoor and return air and economizes only when outdoor air carries less energy. It is the better choice in humid climates because cool but moist outdoor air can actually add latent load.
- **Differential control** compares outdoor against return rather than a fixed setpoint, capturing more hours.

The economizer also has an integrated mode: when outdoor air is cool enough to help but not to satisfy the whole load, it runs alongside partial mechanical cooling rather than as an all-or-nothing switch.

## The waterside economizer

A waterside economizer makes chilled water without running the chiller compressor. It exploits the fact that a cooling tower, given cool dry outdoor air, can produce condenser water cold enough to cool the chilled water loop directly.

A plate heat exchanger sits between the condenser water loop and the chilled water loop. When the tower can produce condenser water a few degrees below the chilled water return temperature, valves route flow through the heat exchanger. The tower and the heat exchanger now do the cooling; the chiller compressor stays off. This is sometimes called the free cooling or tower free cooling mode.

There are three operating regimes:

- **Full economizer**, where the heat exchanger meets the entire load and the chiller is off.
- **Partial or integrated economizer**, where the heat exchanger pre-cools the chilled water return and the chiller trims the rest.
- **Mechanical only**, where ambient is too warm and the chiller carries everything.

The enabling condition is wet-bulb temperature, because a cooling tower is limited by wet-bulb, not dry-bulb. A practical rule is that useful waterside economizing needs an outdoor wet-bulb roughly 4 to 8 K below the chilled water supply temperature, allowing for tower approach and heat exchanger approach.

| Feature | Airside economizer | Waterside economizer |
|---------|--------------------|-----------------------|
| Cooling source | Cool outdoor air | Cooling tower water |
| Limited by | Dry-bulb or enthalpy | Outdoor wet-bulb |
| Main hardware | Dampers and controls | Plate heat exchanger and valves |
| Brings in outdoor air | Yes, large volumes | No, loop stays closed |
| Best fit | Air handlers, mild dry climates | Chilled water plants, data centres |

## Energy savings

The saving is the elimination of compressor energy during economizer hours, which is the dominant slice of cooling plant power. In a temperate climate an airside economizer can serve a meaningful fraction of annual cooling hours, and a data centre on a waterside economizer in a cool dry climate can run compressor-free for a large part of the year. Both still cost some energy: airside economizers run fans harder to move larger air volumes, and waterside economizers run tower fans and pumps. But fan and pump power is far smaller than compressor power, so the net saving is large and predictable, which is why 90.1 treats economizers as a baseline expectation rather than an upgrade.

Two design cautions protect the saving. First, dampers must seal and actuators must work; a stuck-open economizer admitting hot humid air on a design day is a notorious energy and comfort fault. Second, the changeover logic must be commissioned and trended, because an economizer that never enables, or one that fights the mechanical cooling, quietly wastes everything it was meant to save.

## Why hot humid climates limit economizer hours

Free cooling depends on the outdoors being genuinely cooler, or genuinely drier, than the building target. In a hot humid climate it is rarely either.

An airside economizer in a humid climate faces a latent penalty. Outdoor air may be only moderately warm but heavily laden with moisture, so even when dry-bulb looks favourable the enthalpy comparison says no, and pulling that air in only adds dehumidification load. Enthalpy control correctly refuses to economize, which means few usable hours. A waterside economizer is governed by wet-bulb, and a humid climate is precisely a high wet-bulb climate, so the tower cannot produce water cold enough to meet the chilled water loop for much of the year.

The result is a clear geographic pattern. Cool, dry and temperate climates reap large economizer savings and may run free for thousands of hours annually. Persistently hot and humid climates capture only a thin band of cool night and rainy-season hours, and an economizer there is justified mainly for that limited shoulder period or for high internal-gain spaces like data halls. The honest design step is an hour-by-hour bin analysis against local weather data, so the economizer is sized and justified on the real number of usable hours rather than an assumption.
