---
id: load-01
title: "Cooling load calculation the CLTD method"
pillar: core-engineering
topic: load-calculations
order: 1
difficulty: intermediate
tier: pro
tags: [cooling-load, cltd, design]
standards_referenced: [ASHRAE-Fundamentals]
region: global
ghana_callout: true
estimated_minutes: 9
related: [load-02, psy-03, chil-01]
last_updated: 2026-05-21
---

Sizing cooling equipment starts with one number that is harder to pin down than it looks: the cooling load. The CLTD method is a hand-calculation approach that turns building geometry, construction and use into a defensible peak load, and understanding it teaches you why a cooling load is never simply the sum of heat entering a space.

## What a cooling load actually is

A cooling load is the rate at which heat must be removed from a space to hold the design indoor condition. It is easy to confuse this with instantaneous heat gain, the rate at which heat enters the space, but they are not the same number at the same hour.

When solar radiation strikes a floor slab or a wall, much of that energy is absorbed by the mass of the building rather than instantly warming the air. The mass heats up, then slowly releases that energy to the room over the following hours by convection and radiation. The result is two distinct effects: the peak load is lower than the peak heat gain, and it is delayed in time. This is thermal storage and time lag, and it is the single most important idea in load calculation.

Because of storage, a heavy masonry building and a light steel-and-glass building with identical heat gains will not present the same load profile to the chiller. Ignoring lag leads to oversized equipment that short-cycles and dehumidifies poorly.

## The CLTD CLF and SCL framework

The CLTD method, developed for ASHRAE Fundamentals as a manual procedure, captures storage with three families of factors.

### CLTD for conduction through opaque surfaces

CLTD stands for Cooling Load Temperature Difference. For roofs and exterior walls, the conductive load is calculated as:

Q = U × A × CLTD

U is the surface conductance, A is the area, and CLTD is a tabulated temperature difference that already accounts for outdoor temperature swing, solar absorption on the surface, and the time lag of that particular construction type. A massive roof has a CLTD that peaks late in the afternoon or evening; a light roof peaks near solar noon. Published CLTD values must be corrected for the actual indoor and outdoor design temperatures, the month and latitude, and surface colour.

### SCL for solar through glass

Solar gain transmitted through glazing is handled by the Solar Cooling Load factor:

Q = A × SC × SCL

SC is the shading coefficient of the glass and any internal shading, and SCL is the solar cooling load factor for the orientation, latitude and zone construction weight. SCL embeds the storage delay of beam and diffuse radiation that lands on interior surfaces.

### CLF for internal gains

Internal gains from people, lights and equipment also partly radiate to the mass, so they too are delayed. The Cooling Load Factor adjusts the raw gain:

Q = (instantaneous gain) × CLF

CLF depends on how many hours the source has been operating and the hour of interest. Lighting left on continuously eventually reaches a CLF near unity.

## Load components you must account for

A complete CLTD calculation walks through every path heat can take into the space.

- Roof conduction, using roof CLTD values.
- Exterior wall conduction, by orientation, using wall CLTD values.
- Glass conduction, the U × A × CLTD part of the window load.
- Glass solar gain, the SC × SCL part.
- Partition, floor and ceiling gain from adjacent unconditioned spaces, driven by a steady temperature difference.
- Infiltration, air leaking through the envelope, carrying both sensible and latent heat.
- Ventilation, outdoor air deliberately introduced, usually treated at the coil rather than as a space load.
- Internal sensible and latent gain from people.
- Lighting gain, adjusted by a use factor and CLF.
- Equipment and appliance gain, motors, and any process loads.

Keep sensible and latent components separate throughout. The latent portion does not respond to thermal storage in the same way and drives the dehumidification duty of the coil.

## Space load coil load and refrigeration load

These three terms are often used loosely, and confusing them causes sizing errors.

The space cooling load is the heat removed from the room itself. The coil load, or cooling coil load, adds the ventilation air load and any heat picked up by the supply fan and duct, and subtracts nothing useful, so it is always larger than the sum of space loads. The refrigeration load, the duty the chiller or condensing unit must reject, adds further pickup such as chilled water pump heat and pipe gains.

| Term | Includes |
|------|----------|
| Space load | Envelope, solar, internal gains for the room |
| Coil load | Space loads plus ventilation air plus fan and duct heat |
| Refrigeration load | Coil load plus pump and distribution heat |

Always size the air side to the coil load and the plant to the refrigeration load.

## Rules of thumb and why they are dangerous

Experienced engineers carry figures such as one ton per 25 to 40 square metres of office floor. These are useful only as a sanity check after a real calculation, never as a substitute for one.

A rule of thumb cannot know your glass area, orientation, occupancy density, lighting power or ventilation rate. Apply an office figure to a server room or a restaurant and you will be wrong by a wide margin. Oversizing wastes capital, harms part-load efficiency and ruins humidity control; undersizing means the space never holds setpoint. Use the rule to flag a calculation that looks implausible, then trust the calculation.

> 🇬🇭 **Ghana context**
> Accra sits in ASHRAE climate zone 1A, hot and humid, with a design dry-bulb near 33°C and persistently high moisture content. The latent share of the load from ventilation, infiltration and occupants is large and must be carried explicitly in the calculation. A CLTD result that looks low on the sensible side is often hiding an undersized latent duty, so verify the coil can both cool and dehumidify the design outdoor air before selecting equipment.

## When to step beyond CLTD

CLTD is transparent and good for teaching and quick checks, but its tabulated factors assume specific construction groups and zone weights. For unusual envelopes, complex shading or any project where hourly profiles matter, the radiant time series method gives a cleaner, more general result and is now the preferred manual procedure.
