---
id: cold-01
title: "Cold room design fundamentals loads and equipment selection"
pillar: cooling
topic: cold-rooms
order: 1
difficulty: advanced
tier: pro
tags: [cold-room, refrigeration, load-calculation]
standards_referenced: []
region: global
ghana_callout: true
estimated_minutes: 10
related: [refr-01, psy-03]
last_updated: 2026-05-21
---

Designing a cold room is a load calculation problem followed by an equipment selection problem. Get the load wrong and every downstream decision, evaporator size, condensing unit capacity, defrost strategy, inherits the error. This article walks through the load components and the selection logic an engineer can defend.

## Cold rooms versus freezer rooms

The first design decision is the operating temperature, because it changes the physics. A chiller cold room holds product above freezing, typically between 0 and 8 °C, for fresh produce, dairy, beverages and flowers. A freezer room holds product below freezing, typically between minus 18 and minus 25 °C, for frozen meat, fish and ice cream.

The temperature band drives everything: insulation thickness, the need to handle latent heat of freezing, the choice of refrigerant and compressor, and the defrost strategy, because a freezer evaporator accumulates frost aggressively and a chiller room far less so.

## The load components

The total refrigeration load is the sum of four families of heat gain. Each must be calculated, then summed, then divided by the running hours to get the required equipment capacity.

| Load component | Source |
|---|---|
| Transmission | Heat conducted through panels, floor and ceiling |
| Product or pull-down | Cooling and freezing the goods placed inside |
| Infiltration | Warm humid air entering when doors open |
| Internal | People, lights, fan motors, defrost, fork trucks |

### Transmission load

Transmission is steady heat flow through the insulated envelope, driven by the temperature difference between outside and inside. It is calculated as the panel U-value multiplied by the total surface area multiplied by that temperature difference. In a hot climate the outside design temperature is high and the inside is low, so the difference is large and transmission is significant. Thicker panels with a lower U-value cut this load directly.

### Product or pull down load

The product load is the heat removed from the goods themselves. Above the freezing point it is sensible heat: mass multiplied by specific heat multiplied by the temperature drop. If the product is taken below its freezing point there are two more terms: the latent heat of freezing, which is the mass multiplied by the latent heat of fusion of the product, and a further sensible term for cooling the now-frozen product down to storage temperature using the frozen specific heat. The load is spread over the allowed pull-down time, so a faster pull-down demands a larger plant.

### Infiltration load

Every time a door opens, warm outside air flows in and cold room air flows out. This load has two parts. The sensible part cools the incoming air. The latent part condenses and freezes the moisture it carries. In a humid climate the latent part is large and is often underestimated. Air curtains, strip curtains, fast-acting doors and disciplined door management all reduce it.

### Internal load

Internal gains come from everything inside generating heat: workers, lighting, the evaporator fan motors which run almost continuously, the defrost heaters, and fork trucks. Fan and defrost heat are easy to forget yet can be a meaningful fraction of a freezer load.

## Insulation and vapour sealing

Cold room envelopes are built from insulated sandwich panels, commonly polyurethane or polyisocyanurate, with thickness chosen for the operating temperature. A chiller room may use panels around 80 to 100 mm; a low-temperature freezer often uses 150 to 200 mm. Equally important is the vapour seal. Warm humid air will drive moisture toward the cold side, and if it reaches the cold face it condenses and freezes inside the panel, degrading the insulation and damaging the structure. Continuous vapour-tight joints and a sealed floor are not optional.

## Running hours and the safety factor

Refrigeration plant is not sized to run continuously. Time must be left for defrost and for the compressor to rest. A common design assumption is 16 to 18 running hours per day for a chiller room and around 18 to 20 for a freezer room. The total daily load in kWh is divided by these hours to give the required capacity in kW. A diversity or safety factor, often around 10 percent, is then added to cover uncertainty, ageing and future load growth, without grossly oversizing, which causes short cycling and poor humidity control.

## A worked load component example

Consider a chiller room receiving 2000 kg of fresh produce per day, cooled from 25 °C to 4 °C, with a specific heat of 3.8 kJ per kg per kelvin.

Product load = 2000 × 3.8 × (25 − 4) = 159 600 kJ per day, which is about 44.3 kWh per day.

Suppose transmission, infiltration and internal loads sum to a further 95 kWh per day, giving a total of about 139 kWh per day. Over 16 running hours that is 8.7 kW. Adding a 10 percent safety factor gives roughly 9.6 kW of required refrigeration capacity.

## Selecting evaporators condensing units and defrost

The evaporator is selected for the calculated capacity at the design temperature difference between room air and refrigerant, commonly a small difference to keep humidity high in a chiller room. The condensing unit, compressor plus condenser, is selected to match at the design evaporating and condensing temperatures, with the condenser sized for the local ambient. Defrost strategy follows the room type: a chiller room above 1 to 2 °C may defrost simply by stopping the fans, while a freezer room needs scheduled electric or hot-gas defrost to clear frost from the coil and restore capacity.

> 🇬🇭 **Ghana context**
> Accra's hot and humid climate pushes both the transmission and the latent infiltration loads well above what temperate-climate rules of thumb assume, so cold rooms must be sized from a proper calculation, not a copied figure. Demand for cold storage in Ghana is strong and growing across fish landing sites, produce markets and pharmaceutical cold chains. Because grid reliability is variable, designers should also plan for standby power and for the heavier pull-down load that follows a power interruption.
