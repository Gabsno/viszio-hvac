---
id: load-heating
title: "Heating load calculation fundamentals"
pillar: load-calculations
topic: load-fundamentals
order: 3
difficulty: intermediate
tier: free
tags: [heating-load, transmission-loss, design-temperature]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 8
related: [load-overview, heat-boilers]
---

A heating load calculation answers a narrower question than a cooling load: how much heat must the system supply to hold the indoor temperature on the coldest design night. Because it targets a worst case rather than a varying daily pattern, it is simpler — but the simplicity rests on a few deliberate assumptions worth understanding.

## A steady state worst case calculation

The cooling load is fundamentally a dynamic problem. Solar gain swings through the day, the roof stores and releases heat, and the engineer must search for a peak hour. The heating load is treated very differently — as a **steady state** problem.

The worst case for heating is a cold night: no sun, no daily temperature swing, and the building already cooled through. Under those conditions there is no transient heat storage to model and no peak hour to search for. You simply assume the indoor and outdoor temperatures are constant at their design values and that all heat flows are in equilibrium. This is conservative and very robust, which is why it remains standard practice.

## Transmission loss through the envelope

The dominant component is heat conducting outward through walls, roof, glazing, doors and floors. Each surface loses heat in proportion to its area, its U-value and the temperature difference across it:

`Q = U × A × ΔT`

Worked example for one wall: a 30 m2 external wall at U = 0.45 W/m2·K with an indoor design of 21 °C and an outdoor design of minus 5 °C has ΔT = 26 K.

`Q = 0.45 × 30 × 26 = 351 W`

Repeat this for every element of the envelope and sum the results. Glazing is usually the weakest link — a double-glazed window might be U = 2.8 W/m2·K, six times leakier than the wall around it.

### Floors and below grade surfaces

Floors over an unheated crawl space or slabs on grade need care. A slab loses heat mainly around its perimeter, so it is often calculated with a perimeter heat loss factor in W per metre of edge rather than a simple U × A. Below-grade walls lose heat to soil at a temperature well above the outdoor air, so they use a reduced effective temperature difference.

## Infiltration and ventilation loss

Cold outdoor air entering the building must be heated to room temperature, and that costs energy. The two paths are:

- **Infiltration** — uncontrolled leakage through cracks, gaps and door openings, often expressed as air changes per hour.
- **Ventilation** — outdoor air deliberately introduced for indoor air quality.

The sensible heating load for either is:

`Q = 1.2 × V × ΔT`

where V is the airflow in L/s and 1.2 is the volumetric heat capacity of air in kJ per m3 per K (used here per litre). For 200 L/s of outdoor air at a 26 K rise:

`Q = 1.2 × 200 × 26 = 6240 W`

In a tight modern building, infiltration and ventilation can rival or exceed transmission loss, so they are never optional.

### What about latent heating

In most heating calculations the latent component is small or ignored. Cold outdoor air holds very little moisture, and unless the building is deliberately humidified there is no latent load to meet. Where humidification is provided, the latent load of raising incoming dry air to the target indoor humidity is added separately.

## Why solar and internal gains are usually ignored

This is the key conceptual difference from cooling. Solar gain, people, lighting and equipment all **reduce** the heating load — they are free heat. But the heating design point is the coldest hour, typically pre-dawn, when:

- there is no sun,
- the building is unoccupied or lightly occupied,
- lights and equipment are off.

Counting heat that is not present at the worst moment would under-size the system. So the conventional heating load deliberately discards internal and solar gains as a safety margin. They still matter for energy modelling and for control, just not for sizing the worst-case capacity.

## Design temperature difference

The whole calculation hinges on ΔT, so the design temperatures must be chosen properly.

- The **outdoor** value comes from climate data — commonly the 99 percent or 99.6 percent winter design dry-bulb, meaning the temperature is exceeded on the cold side only a small fraction of hours per year.
- The **indoor** value is the comfort setpoint, often 20 to 22 °C.

Chasing an absolute record low is wasteful; the 99 percent value already covers nearly the whole year.

## How it compares with the cooling load approach

| Aspect | Heating load | Cooling load |
|--------|--------------|--------------|
| Method | Steady state | Dynamic, hour by hour |
| Worst case | Cold night | Hot afternoon |
| Solar gain | Ignored | Major component |
| Internal gains | Ignored | Major component |
| Peak hour search | Not needed | Required |
| Latent component | Usually omitted | Often significant |
| Heat storage | Not modelled | Modelled |

The cooling calculation is harder because heat gains help the load and arrive at different times. The heating calculation is easier because every significant flow runs in the same direction at the same moment.

## Bringing it together

A heating load is the sum of transmission loss and infiltration plus ventilation loss, evaluated at a steady cold-night design condition with free heat gains set aside. Get the U-values, areas, airflow rates and design temperatures right, and the arithmetic is straightforward and reliably conservative.
