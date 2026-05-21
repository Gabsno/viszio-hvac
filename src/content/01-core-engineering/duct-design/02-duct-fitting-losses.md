---
id: duct-02
title: "Duct fitting losses and dynamic loss coefficients"
pillar: core-engineering
topic: duct-design
order: 2
difficulty: intermediate
tier: pro
tags: [duct-design, pressure-loss, fittings]
standards_referenced: [ASHRAE-Fundamentals]
region: global
ghana_callout: false
estimated_minutes: 8
related: [duct-01, std-smacna-duct]
last_updated: 2026-05-21
---

When a duct system is calculated, the straight runs rarely cause trouble. It is the elbows, transitions, tees and dampers that quietly add up, and on many systems the fittings, not the straight duct, set the fan pressure. Understanding dynamic losses is what separates a duct sizing exercise from a real pressure calculation.

## Total pressure has two parts

The pressure loss along any duct path is the sum of two distinct effects:

Total pressure loss = friction loss + dynamic loss

Friction loss is the loss in straight duct, caused by shear between the moving air and the duct wall. It is proportional to the length of the run and is what the friction rate in Pa/m describes.

Dynamic loss is the loss at fittings, caused by the air being forced to change speed or direction. It is not related to length at all; it happens at a point, wherever the flow is disturbed. A single badly chosen elbow can lose more pressure than many metres of straight duct.

## The velocity pressure concept

Dynamic loss is built on velocity pressure, the kinetic energy of the moving air expressed as a pressure.

Velocity pressure rises with the square of velocity. For standard air it is approximately:

Pv = 0.6 × V²

with Pv in Pa and V in m/s. At 5 m/s the velocity pressure is about 15 Pa; double the velocity to 10 m/s and it quadruples to about 60 Pa. This square law is the reason high velocity systems are so sensitive to fitting design, and the reason a small reduction in velocity at a troublesome fitting pays back strongly.

## The loss coefficient C

Every fitting is characterised by a dimensionless loss coefficient, usually written C. The dynamic loss across the fitting is simply:

dynamic loss = C × Pv

A C of 1.0 means the fitting destroys one full velocity pressure. A C of 0.15 means it loses only fifteen percent of it. Because the loss is C multiplied by velocity pressure, and velocity pressure follows the square law, the engineer has two levers at every fitting: choose a geometry with a lower C, or reduce the velocity at that location.

ASHRAE Fundamentals publishes extensive tables of C values for hundreds of fitting geometries. You should look up the real values for design work; the table below is only an illustrative comparison to show how much geometry matters.

| Fitting | Illustrative C |
|---------|----------------|
| Sharp 90 degree mitred elbow, no vanes | about 1.2 |
| Mitred elbow with turning vanes | about 0.15 to 0.3 |
| Smooth radius elbow, radius equal to width | about 0.2 |
| Abrupt sudden expansion | about 0.6 to 1.0 |
| Gradual transition, shallow angle | about 0.05 to 0.15 |
| Branch takeoff, square tap | higher than a 45 degree tap |

These figures are indicative only. Use them to build intuition, then size from the published data.

## Why fittings dominate system pressure

In a typical commercial duct system the air passes through a great many fittings: the fan discharge transition, several elbows, every branch tee and takeoff, balancing dampers, fire dampers and the terminal connections. Each one removes a slice of velocity pressure.

Add a dozen fittings with an average C near 0.5 on a path running at 7 m/s, and you have lost several hundred pascals at the fittings alone, often more than the friction in all the straight duct combined. This is why a pressure calculation that counts only straight duct underestimates the fan duty and leaves the system short of air.

## The index run

The fan must overcome the pressure loss of the worst path through the system, the path with the greatest total loss of friction plus dynamic loss. This path is called the index run, or the critical run.

Identifying the index run matters for two reasons. First, the fan total pressure is selected to satisfy that path, so it must be calculated honestly, fittings included. Second, every other path has surplus pressure that will be dissipated at balancing dampers. If a poorly designed fitting sits on the index run, it inflates the fan duty for the whole building, so that is exactly where to spend effort improving fitting geometry.

## Practical advice for low loss fittings

Most dynamic loss is avoidable with good detailing.

- Use radius elbows rather than sharp mitred bends wherever space allows; a centreline radius of one to one and a half duct widths cuts the coefficient sharply.
- Where a mitred elbow is unavoidable, fit turning vanes. Vanes transform a high loss bend into one of the lowest loss fittings in the system.
- Make transitions gradual. A shallow included angle on a contraction or expansion keeps the flow attached and the coefficient small; an abrupt change separates the flow and wastes pressure.
- Prefer 45 degree branch takeoffs and conical taps over square taps, and keep branch velocities sensible.
- Locate dampers and obstructions away from fittings, since disturbed flow into a fitting raises its effective loss.
- Give the fan generous, straight, well shaped connections; the discharge and inlet are among the highest loss locations in any system.

Good fitting design is the cheapest fan energy saving available, because it is decided on the drawing board and costs nothing extra to build well.
