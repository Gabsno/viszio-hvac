---
id: pipe-valves
title: "Valves in HVAC control balancing and isolation"
pillar: piping
topic: valves
order: 1
difficulty: intermediate
tier: free
tags: [valves, control-valve, balancing]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 9
related: [hyd-fundamentals, ctrl-01, damp-balancing]
last_updated: 2026-05-21
---

Valves do three distinct jobs in a hydronic system: they isolate sections for service, they control the flow that delivers capacity, and they balance the loop so every terminal gets its fair share. Choosing the right valve for each job is what makes a system controllable and maintainable.

## Isolation valves

Isolation valves exist to be fully open or fully closed. They let an engineer shut off a riser, a coil or a piece of plant for repair without draining the whole system. They are not meant to throttle flow, and using them to do so wears the seat quickly.

| Type | Action | Best use | Notes |
| --- | --- | --- | --- |
| Gate valve | Multi turn | Mains isolation | Low pressure drop open, slow to operate |
| Ball valve | Quarter turn | Branches, terminals | Fast, tight shut off, compact |
| Butterfly valve | Quarter turn | Large pipe isolation | Light and cheap on big diameters |

A **gate valve** uses a wedge that lifts clear of the bore when open, giving very low resistance, but it is slow and a partly open gate is prone to erosion. A **ball valve** rotates a bored ball a quarter turn, offering fast, bubble-tight shut off and a clear indication of position, which makes it the workhorse for branch and terminal isolation up to medium sizes. A **butterfly valve** swings a disc across the flow; it is economical and light on large diameters, though the disc sits in the flow path even when open and adds a little resistance.

A good design places isolation valves so any major component can be removed without draining more of the system than necessary, typically a pair around every pump, chiller, air handler coil and riser.

## Control valves and valve authority

A control valve modulates flow to vary the capacity a terminal delivers. It is driven by an actuator taking a signal from a controller responding to space temperature.

### Two way versus three way

A **two-way control valve** throttles flow through the coil. As it closes, flow to that terminal drops, and in a properly designed system the loop flow falls and a variable speed pump follows. Two-way valves create variable flow systems, the modern default, because they let pumping energy track the load.

A **three-way control valve** has a common port and two others. In a mixing arrangement it blends supply and return to hold a constant flow through the coil while diverting the rest around it. Three-way valves keep loop flow constant regardless of load, which suits constant speed pumping but wastes energy compared with variable flow. They survive in legacy systems and where a minimum flow must be guaranteed.

### Valve authority

Valve authority is the concept that decides whether a control valve actually controls. It is the ratio of the pressure drop across the fully open valve to the pressure drop across the whole controlled circuit, the valve plus the coil and its branch fittings.

Authority = ΔP valve open ÷ ΔP variable part of circuit

If the valve has too little pressure drop relative to the rest of the circuit, its authority is low. A low authority valve does almost nothing for the first half of its travel, then slams the flow shut over a small final movement, giving hunting and poor control. A practical target is authority of at least 0.5, meaning the open valve drops at least as much pressure as the coil and branch it serves. This is why control valves are deliberately sized for a healthy pressure drop, not simply matched to pipe size.

## The equal percentage characteristic

A control valve's inherent characteristic is the relationship between how far it is open and how much flow it passes. Two characteristics dominate.

A **linear** valve gives flow proportional to stem position. An **equal percentage** valve gives a small flow change near the closed position and a large flow change near open, each equal increment of travel changing flow by an equal percentage of current flow.

Equal percentage is preferred for coil control because a heating or cooling coil is itself non-linear: the first part of the flow range produces most of the capacity change, and extra flow beyond that does little. The equal percentage valve compensates. When its non-linear flow characteristic is multiplied by the coil's non-linear capacity characteristic, the result is a near-linear relationship between valve signal and delivered capacity, which a controller can manage smoothly.

## Balancing valves

Even a correctly sized system will not naturally distribute flow evenly. Terminals close to the pump see lower resistance and would take more than their share, starving terminals at the far end. Balancing valves correct this.

A **manual balancing valve** is a calibrated throttling valve with pressure test points. During commissioning a balancing engineer measures the flow at each, adjusts the valve to add resistance, and brings every terminal to its design flow. Once set, the valve is locked.

A **pressure independent control valve**, or PICV, combines three functions in one body: a control valve, a balancing valve and a differential pressure regulator. The internal regulator holds a constant pressure drop across the control element regardless of pressure changes elsewhere in the loop. The result is that the valve passes the same flow for a given control signal whatever other valves do, which means full control authority at all times, no separate balancing valve, and no commissioning balance walk for those circuits. PICVs are now common on fan coil and air handler branches in variable flow systems.

## Check valves

A check valve allows flow in one direction and blocks reverse flow. Its main hydronic role is on pump discharges. With pumps in parallel, a check valve on each discharge stops water short-circuiting backwards through an idle pump. It also stops reverse rotation that can damage a stopped pump.

Swing check valves are simple but can slam on flow reversal, causing water hammer. Spring-loaded or silent check valves close before full reversal and are preferred where pumps stop and start frequently.

## Where each valve belongs

A clear way to remember the layout: ball or gate valves at every isolation point so plant can be serviced; a check valve on every pump discharge; a control valve, ideally equal percentage or a PICV, at every modulating coil; and a balancing valve, manual or built into the PICV, on every branch so the loop delivers its design flow to every terminal. Match the valve to its job and the system will isolate cleanly, control smoothly and balance reliably.
