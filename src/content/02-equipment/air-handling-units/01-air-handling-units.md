---
id: ahu-01
title: "Air handling units components and configurations"
pillar: ducting
topic: air-handling-units
order: 1
difficulty: beginner
tier: free
tags: [ahu, air-side, equipment]
standards_referenced: []
region: global
ghana_callout: true
estimated_minutes: 9
related: [fcu-01, psy-04, cx-02]
last_updated: 2026-05-21
---

An air handling unit, or AHU, is an assembled box of components that takes air, conditions it and delivers it to a building through ductwork. It is the workhorse of central air-side systems, and understanding its sections in airflow order is the foundation for designing, commissioning or troubleshooting one.

## The AHU as an assembled box

An AHU is a sheet-metal enclosure, usually with an insulated double-skin panel construction, divided internally into functional sections. Air is drawn through these sections in sequence by a fan, picking up or losing heat and moisture and being cleaned along the way. Unlike a packaged rooftop unit, an AHU has no refrigeration of its own — it relies on coils fed with chilled water, hot water or refrigerant from a separate plant. This separation is what makes the AHU flexible: the same box can be matched to almost any heating and cooling source.

## Sections in airflow order

Following a stream of air from entry to discharge gives the clearest picture of how an AHU works.

### Outdoor air intake and dampers

Fresh air enters through an intake louvre fitted with a bird screen and a control damper. The damper modulates how much outdoor air is admitted to satisfy ventilation requirements. A separate damper controls how much return air is recirculated, and a third may exhaust spill air.

### Mixing box

Outdoor air and return air come together in the mixing box. Good mixing-box design ensures the two streams blend evenly before reaching the coil; poor mixing causes temperature stratification and can leave part of a coil exposed to near-freezing air in cold climates. Damper linkages are set so that outdoor and return dampers move in opposition.

### Filters

Air then passes through filtration, often in two stages: a coarse pre-filter that catches large particles and protects the more expensive final filter, and a final filter selected for the required air quality. Filters are placed upstream of the coils so the coils stay clean. A pressure gauge across each filter bank shows when it is loaded and due for replacement.

### Heating and cooling coils

The conditioning happens at the coils. A heating coil — hot water, steam or electric — raises air temperature; in many climates it also serves as a preheat coil protecting downstream components. The cooling coil, fed with chilled water or refrigerant, both lowers temperature and removes moisture by condensing it out of the air. Coils are finned-tube heat exchangers, and air velocity across them is kept low enough to avoid carrying condensate off the fins.

### Supply fan

The supply fan provides the energy to move air through every section and through the duct system against its total pressure drop. Modern AHUs commonly use plug fans or fan arrays driven by variable-speed drives so airflow can be matched to demand.

### Humidifier and sound attenuator

Where humidity control is needed, a humidifier section adds moisture. A sound attenuator section with acoustic splitters is often fitted near the discharge to reduce fan noise carried into occupied spaces.

```
 OA -->[damper]-->[mixing]-->[filter]-->[heat coil]-->[cool coil]-->[fan]--> SA
                     ^
                  return air
```

## Draw through and blow through

The fan position defines two arrangements.

| Arrangement | Fan location | Notes |
|---|---|---|
| Draw through | After the cooling coil | Even airflow across coil, fan heat added after coil |
| Blow through | Before the cooling coil | Fan heat removed by coil, less uniform coil airflow |

Draw-through is the more common layout because pulling air through the coil gives more uniform face velocity and therefore better heat transfer and condensate removal.

## Single zone multi zone and VAV configurations

A single-zone AHU conditions one space or one group of spaces that share a thermostat, delivering a constant airflow at a varying temperature. A multi-zone AHU produces hot and cold air streams and blends them per zone at the unit. A variable air volume, or VAV, AHU holds a constant supply-air temperature and instead varies the volume of air sent to each zone through VAV terminal boxes — the dominant approach in large commercial buildings because it saves fan energy at part load.

A dedicated outdoor air system, or DOAS, is a specialised AHU that conditions only the ventilation air, decoupling fresh-air treatment from space cooling that is handled by other terminal equipment.

## Condensate drainage and serviceability

Because the cooling coil condenses water, every AHU needs a sloped, corrosion-resistant drain pan beneath it, piped to a drain through a trap. The trap must be deep enough to overcome the fan's negative or positive pressure, or the pan will either fail to drain or pull air through the pipe. A blocked or undersized drain is one of the most common causes of water damage and microbial growth in AHUs.

Finally, an AHU must be serviceable. Each section needs an access door, adequate clearance to withdraw filters and coils, and lighting and viewing ports where practical. Designing for access pays back every time the unit is cleaned, recommissioned or repaired.

> 🇬🇭 **Ghana context**
> In Accra's hot-humid climate, with ambient design near 33°C, AHU cooling coils run wet for most of the year, so generously sized stainless or coated drain pans, properly trapped drains and accessible condensate routes are essential to prevent overflow and mould. High outdoor humidity and dust also load filters quickly, so specify robust pre-filtration and budget for frequent filter changes. Most AHUs and coils are imported, so confirm coil materials and panel construction suit a corrosive coastal environment before ordering.
