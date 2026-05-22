---
id: fund-heat-transfer
title: "Heat transfer for HVAC engineers"
pillar: fundamentals
topic: heat-transfer
order: 1
difficulty: beginner
tier: free
tags: [heat-transfer, u-value, conduction]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 8
related: [load-overview, psy-01, refr-01]
last_updated: 2026-05-21
---

Every HVAC calculation is, underneath, a heat transfer problem. Sizing a cooling load, picking a coil, choosing wall insulation and predicting condensation all rely on the same three ways heat moves. This article keeps the physics practical and ties each mode to something an engineer actually designs.

## The three modes of heat transfer

Heat always flows from warmer to cooler, and it does so by three mechanisms that often act together.

### Conduction

Conduction is heat moving through a solid material by direct molecular contact, with no bulk movement of the material itself. Heat passing through a brick wall, a steel duct or a copper pipe wall is conduction. The rate depends on the material conductivity, the area, the temperature difference and the thickness. A metal conducts readily; mineral wool resists strongly, which is exactly why we wrap it around things.

### Convection

Convection is heat carried by a moving fluid, a liquid or a gas. Warm air rising off a hot roof slab, chilled water carrying heat away from a coil and the boundary layer of air clinging to a window are all convection. Natural convection is driven by buoyancy alone; forced convection is driven by a fan or pump. Forced convection moves far more heat, which is the entire reason coils have fans and air on them rather than relying on still air.

### Radiation

Radiation is heat transferred as electromagnetic waves, needing no material between the source and receiver. It is how solar energy crosses empty space to strike a building, and how a hot roof radiates to the cooler sky at night. Radiant exchange depends strongly on surface temperature and on a surface property called emissivity. Dark, matte surfaces absorb and emit strongly; bright, shiny foils do not, which is why radiant barriers are reflective.

| Mode | Needs a medium | Driven by | HVAC example |
|---|---|---|---|
| Conduction | Solid | Temperature gradient | Wall and roof heat gain |
| Convection | Fluid | Fluid movement | Coil heat transfer |
| Radiation | None | Surface temperature | Solar gain through glass |

## U value and R value

For building fabric, engineers compress all of this into two linked numbers.

R value is thermal resistance, a measure of how strongly a layer opposes heat flow. The unit in SI is square metre kelvin per watt, written m2K per W. Resistances of layers in series simply add, so a wall R value is the sum of the inside air film, each material layer and the outside air film.

U value is the overall heat transfer coefficient, the inverse of the total R value, in watts per square metre kelvin, W per m2K. A low U value is a good, well insulated element. A single glazed window might sit near 5.7 W per m2K, a modern insulated wall near 0.3 W per m2K. The U value is the number you carry straight into a cooling or heating load calculation.

## The basic heat flow relationship

The heat flow through a building element is the product of three things: the U value, the area and the temperature difference across it.

Q equals U times A times delta T

Q is the heat flow in watts, U is the heat transfer coefficient in W per m2K, A is the area in square metres and delta T is the temperature difference in kelvin. A 30 square metre wall at U value 0.4 with a 12 kelvin difference between inside and outside passes 0.4 times 30 times 12, which is 144 watts. The same simple relationship, with a suitable coefficient, governs a pipe losing heat or a coil rejecting it. Convection and radiation are folded into combined coefficients so the same multiplication form can be reused.

## Thermal bridging

Thermal bridging is a weak spot in the insulation where heat takes a shortcut through a more conductive path. A steel column passing through an insulated wall, a concrete floor slab projecting to a balcony, or a continuous metal stud all bridge the insulation.

Two problems follow. First, real heat loss or gain is higher than a simple U value calculation suggests, so loads are underestimated. Second, the bridge creates a cold or warm patch on the inside surface; in a cooling climate a cold bridge can drop a surface below the air dew point and grow condensation and mould. Good detailing keeps insulation continuous and breaks conductive paths with thermal break materials.

## How each mode shows up in HVAC

The value of the theory is recognising it in everyday design work.

### Wall and roof heat gain

Fabric gain through opaque walls and roofs is conduction across the construction, driven by the temperature difference between outside and inside. Because sun heats the outer surface above shade air temperature, designers use a sol air temperature that bundles the solar effect into an effective outdoor temperature for the conduction calculation.

### Coil heat transfer

A cooling coil is a convection device on both sides. Air convects heat to the fin surface, conduction carries it through the fin and tube wall, and the refrigerant or chilled water convects it away inside the tube. Fins exist to enlarge the air side area, because the air side convection is the weakest link in the chain.

### Solar radiation

Solar radiation through glazing is often the single largest cooling load component in a glassy building. It is instantaneous radiant energy, unaffected by outdoor air temperature, and it is controlled with shading, glass coatings and a low solar heat gain coefficient rather than with insulation.

Recognising which mode dominates a given heat path tells you which design lever actually works: insulation for conduction, airflow and surface area for convection, and shading and reflective surfaces for radiation.
