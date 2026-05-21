---
id: vrf-02
title: "VRF heat recovery versus heat pump systems"
pillar: equipment
topic: vrf-vrv
order: 2
difficulty: intermediate
tier: pro
tags: [vrf, heat-recovery, energy]
standards_referenced: []
region: global
ghana_callout: true
estimated_minutes: 9
related: [vrf-01, refr-01]
last_updated: 2026-05-21
---

Variable Refrigerant Flow systems are sold in two fundamentally different forms: heat-pump systems and heat-recovery systems. The difference is not a feature add-on — it is a change in the pipe network and in what the system can physically do, and choosing wrongly is expensive to correct after installation.

## Heat pump VRF two pipe systems

A heat-pump VRF system is built around a two-pipe refrigerant network: a gas line and a liquid line running from the outdoor unit to all indoor units. The whole system operates in a single mode at any given time. Every connected indoor unit is either cooling or heating — there is no mixed operation. If one occupant calls for heating while the system is in cooling mode, that zone simply does not get heating until the system as a whole changes over.

This is the simpler and lower-cost configuration. It suits buildings where all zones tend to want the same thing at the same time: a single-tenant office floor, a hotel wing, a retail unit or a residential block. In a cooling-dominated tropical climate, where heating is rarely called for at all, a two-pipe heat-pump system covers the great majority of applications without complication.

## Heat recovery VRF three pipe systems

A heat-recovery VRF system adds a third pipe and a set of branch devices that allow heating and cooling to occur simultaneously in different zones from the same outdoor unit. The classic arrangement is a three-pipe network — high-pressure gas, low-pressure gas and liquid — though some manufacturers achieve the same result with a two-pipe layout plus more capable branch boxes.

The key extra component is the branch selector, also called a mode-change box or BS box. Each indoor unit, or small group of units, connects to a branch selector that decides whether that unit receives refrigerant for cooling or for heating. The system can then run some zones in cooling and others in heating at the same instant.

### How heat recovery saves energy

The efficiency gain comes from moving heat rather than rejecting and generating it. When one zone is being cooled, its indoor coil absorbs heat from the room. In a heat-recovery system, that absorbed heat is not dumped to outdoor air — it is piped to a zone that is calling for heating and released there. The outdoor unit only has to make up the net difference between total heating demand and total cooling demand. When the two are close to balanced, the compressor does very little work, and seasonal efficiency rises sharply.

```
   Zone A (cooling)        Zone B (heating)
        |  heat absorbed        |  heat released
        +-----> branch selector network ----->+
                     |
                   ODU  (only the net load)
```

## Comparing the two configurations

| Aspect | Heat pump two pipe | Heat recovery three pipe |
|---|---|---|
| Pipe network | Gas and liquid | Adds a third gas line |
| Branch devices | Branch joints only | Branch selectors required |
| Simultaneous modes | No | Yes |
| Installed cost | Lower | Higher |
| Best for | Uniform-load buildings | Mixed-load buildings |
| Peak efficiency case | Single-mode operation | Balanced heating and cooling |

## When each is the right choice

Choose a heat-pump system when the building's zones move together. A hotel guest wing, a small office, an apartment block or a shop will almost always have every zone wanting cooling at once, and the extra cost and pipework of heat recovery would never pay back.

Choose a heat-recovery system when the building has genuine simultaneous opposing loads. The most common driver is the split between a building's interior and perimeter: interior zones with no external walls collect heat from people, lighting and equipment and need cooling all year, while perimeter zones gain or lose heat through the façade. A server room or comms room sheds heat continuously and needs cooling even when adjacent offices are being warmed. In all of these, heat recovery lets the rejected heat do useful work instead of being wasted.

## Relevance in a tropical climate

In a hot climate the instinct is that heat recovery has nothing to offer because no one needs space heating. That instinct is only partly right. Two situations still make heat recovery worthwhile.

First, server and equipment rooms run cooling year-round while the rest of the building also cools — there is no opposing load, so the simultaneous-mode capability is unused, but the precise per-zone control remains valuable. Second, and more importantly, heat recovery enables efficient reheat for dehumidification. In humid conditions a zone often needs deep cooling at the coil to strip moisture, followed by reheat so the space is not overcooled. A heat-recovery system can supply that reheat from heat harvested elsewhere in the building rather than from an electric heater, which is a real and recurring energy saving in a humid market.

> 🇬🇭 **Ghana context**
> Accra's climate is almost purely cooling-driven with ambient design temperatures near 33°C, so most projects are well served by lower-cost two-pipe heat-pump VRF. Heat recovery earns its place mainly for buildings with 24-hour server rooms or where humidity control needs reheat without electric heaters — useful given unreliable grid supply and high tariffs. Because branch selectors and three-pipe fittings are imported and add cost, confirm the simultaneous-load case is real before specifying heat recovery, and protect the inverter electronics against voltage fluctuation either way.
