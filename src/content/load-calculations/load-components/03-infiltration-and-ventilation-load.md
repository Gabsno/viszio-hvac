---
id: load-infiltration
title: "Infiltration and ventilation cooling load"
pillar: load-calculations
topic: load-components
order: 3
difficulty: intermediate
tier: free
tags: [infiltration, ventilation, outdoor-air]
standards_referenced: [ASHRAE-62.1]
region: global
ghana_callout: true
estimated_minutes: 8
related: [load-overview, vent-fundamentals, psy-03]
---

Outdoor air entering a building always carries a cooling load, because that air must be brought from outdoor conditions to indoor conditions. It enters two ways — uncontrolled and controlled — and in a humid climate it can be the single largest load the equipment faces.

## Infiltration versus ventilation

The distinction is about intent.

**Infiltration** is uncontrolled air leakage. It enters through cracks around windows and doors, gaps in construction, and openings every time a door is used. It is driven by wind pressure and by the stack effect from temperature differences. You do not choose how much infiltration you get; you can only reduce it by building tightly.

**Ventilation** is deliberate outdoor air, introduced by the HVAC system through an outdoor air intake to dilute indoor pollutants and keep the air healthy. The required quantity is set by standards such as ASHRAE 62.1, which specifies minimum outdoor air rates based on floor area and the number of people.

Both bring outdoor air inside, so both impose the same kind of load — but ventilation is a known design quantity, while infiltration must be estimated.

## Both carry sensible and latent load

Outdoor air differs from indoor air in two ways, and conditioning it costs energy on both:

- **Sensible load** — cooling the incoming air down to the indoor temperature.
- **Latent load** — removing moisture from the incoming air down to the indoor humidity, by condensing it on the cooling coil.

In a dry climate the latent part may be small. In a humid climate it is often the larger of the two. Ignoring the latent component is one of the most common and most damaging load calculation errors.

## Estimating the load from airflow

The two components are estimated from the outdoor airflow and the difference between indoor and outdoor conditions.

The **sensible** load, with airflow V in L/s and temperature difference ΔT in K:

`Q_sensible = 1.2 × V × ΔT`

The **latent** load, with humidity ratio difference ΔW in grams of moisture per kilogram of dry air:

`Q_latent = 3.0 × V × ΔW`

The constants bundle air density and the specific heat or latent heat of vaporisation into convenient working numbers for L/s.

### A worked example

Take 500 L/s of outdoor air. Outdoor design is 35 °C at a humidity ratio of 21 g/kg; indoor design is 24 °C at 9.3 g/kg. So ΔT = 11 K and ΔW = 11.7 g/kg.

`Q_sensible = 1.2 × 500 × 11 = 6600 W`

`Q_latent = 3.0 × 500 × 11.7 = 17 550 W`

`Q_total = 24 150 W`

The latent load is more than twice the sensible load. The total outdoor air load — over 24 kW from 500 L/s — would dwarf the conduction load of a well-insulated building of moderate size. This is not an unusual result; it is the normal situation in a humid climate.

## Why outdoor air is often the largest single load

Several factors combine to make outdoor air dominant:

- Modern envelopes are well insulated, so conduction loads have shrunk.
- Occupancy-based ventilation standards require substantial outdoor airflow, especially in densely occupied spaces.
- The latent penalty of humid outdoor air is large and unavoidable.

| Load component | Typical share, humid climate office |
|----------------|-------------------------------------|
| Outdoor air, sensible plus latent | 30 to 45 percent |
| Solar through glazing | 15 to 25 percent |
| Internal gains | 20 to 35 percent |
| Envelope conduction | 10 to 20 percent |

The exact split varies, but outdoor air being the biggest line item is common rather than exceptional.

### Reducing the outdoor air load

You cannot skip ventilation — indoor air quality depends on it — but the load can be managed:

- **Energy recovery.** An energy recovery ventilator transfers heat and moisture between the incoming and outgoing air streams, pre-conditioning the fresh air and cutting both sensible and latent load.
- **Demand-controlled ventilation.** Sensors modulate outdoor airflow to actual occupancy, so a partly filled room is not ventilated as if it were full.
- **Tighter construction.** Reducing infiltration shrinks the uncontrolled portion.
- **Dedicated outdoor air systems.** A separate unit conditions the fresh air, often handling most of the latent load so the space units can run a higher sensible heat ratio.

## Infiltration estimating notes

Because infiltration is uncontrolled, it is estimated rather than specified. The common approaches are an assumed air change rate per hour, or an air leakage rate per square metre of envelope at a reference pressure from a blower-door style figure. A loose older building might see 0.5 to 1.0 air changes per hour from infiltration; a tight modern building far less. When the building is mechanically pressurised slightly positive by its ventilation system, infiltration is suppressed, and some designers reduce or omit it for that reason — but only when positive pressure is genuinely maintained.

> 🇬🇭 **Ghana context**
> Accra's outdoor design air is both hot and very wet, around 33 °C at roughly 78 percent relative humidity, which corresponds to a high humidity ratio. As the worked example shows, the latent load of conditioning that air typically exceeds its sensible load by a wide margin. Ventilation can easily be the largest single load on the system, so energy recovery and demand-controlled ventilation are not luxuries in this climate — they are among the most cost-effective measures available, and a calculation that omits the latent term will under-size the coil badly.

## Bringing it together

Treat infiltration and ventilation as distinct sources of the same kind of load, always calculate both the sensible and the latent parts, and recognise that in a humid climate outdoor air is frequently the dominant load. Recover energy from exhaust air and match ventilation to demand to keep that load under control.
