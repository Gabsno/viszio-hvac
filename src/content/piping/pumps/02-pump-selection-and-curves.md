---
id: pipe-pump-selection
title: "Pump selection and reading a pump curve"
pillar: piping
topic: pumps
order: 2
difficulty: intermediate
tier: free
tags: [pump-curve, duty-point, npsh]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 9
related: [pump-01, hyd-fundamentals, pipe-01]
last_updated: 2026-05-21
---

Selecting a pump is about matching a machine to a circuit so the two meet at the flow and head the system actually needs, near the pump's best efficiency. The tool that makes this visible is the pump curve, read together with the system curve.

## The pump curve of head against flow

A centrifugal pump does not deliver a single fixed flow. It delivers a flow that depends on how much head it is asked to produce. The pump curve plots head, on the vertical axis, against flow on the horizontal axis.

The curve slopes downward to the right. At zero flow, called shut-off, the pump produces its maximum head. As flow increases the head it can develop falls away. A typical building circulator might produce 30 m of head at zero flow, declining to perhaps 12 m at its rated flow of 20 L/s. Every point on that curve is a valid operating point the pump can reach, given the right system resistance.

The shape matters. A flat curve gives nearly constant head over a wide flow range, useful where flow varies but head must stay stable. A steep curve gives strong head change for small flow change, useful for stable control.

## The system curve

The system curve describes the circuit, not the pump. It plots how much head the piping system needs to push a given flow through itself.

In a closed hydronic loop, the resistance is almost entirely friction. Friction loss rises with the square of flow, so the system curve is a parabola starting near the origin. Double the flow and the head requirement roughly quadruples. If a loop needs 14 m of head at 20 L/s, it will need only about 3.5 m at 10 L/s.

In an open loop with a real lift, such as a condenser water system, the system curve starts not at zero but at the static lift height, and the friction parabola is added on top of that fixed value.

## The duty point where the curves cross

A pump connected to a system has no choice about where it operates. It runs where the pump curve and the system curve intersect, because that is the only flow at which the head the pump produces equals the head the system demands. This intersection is the **duty point**, also called the operating point.

This is the single most important idea in pump selection. You do not pick a flow and a head independently. You design the system, which fixes the system curve, then you select a pump whose curve crosses that system curve at the flow you need.

### A simple curve diagram

<svg viewBox="0 0 420 260" width="420" xmlns="http://www.w3.org/2000/svg">
  <line x1="50" y1="210" x2="390" y2="210" stroke="#333333" stroke-width="2"/>
  <line x1="50" y1="210" x2="50" y2="30" stroke="#333333" stroke-width="2"/>
  <text x="200" y="240" fill="#333333" font-size="13">Flow L per s</text>
  <text x="14" y="120" fill="#333333" font-size="13">Head m</text>
  <path d="M60 60 Q200 90 380 190" stroke="#1d6fb8" stroke-width="3" fill="none"/>
  <text x="300" y="150" fill="#1d6fb8" font-size="12">Pump curve</text>
  <path d="M50 210 Q200 190 360 60" stroke="#c0392b" stroke-width="3" fill="none"/>
  <text x="120" y="120" fill="#c0392b" font-size="12">System curve</text>
  <circle cx="232" cy="138" r="6" fill="#27732f"/>
  <text x="244" y="135" fill="#27732f" font-size="12">Duty point</text>
</svg>

If the installed system has more resistance than designed, perhaps from undersized pipe or a partly closed valve, the system curve steepens, the intersection slides up and to the left, and the pump delivers less flow at more head. If the system is less restrictive than designed, the pump runs out to the right, delivering more flow at less head and drawing more power.

## Efficiency islands and best efficiency point

Manufacturers overlay efficiency contours on the pump curve, forming concentric **efficiency islands**. The innermost island marks the **best efficiency point**, where the pump converts the most input power into useful water power.

Selecting a pump so its duty point sits on or close to the best efficiency point matters for several reasons:

- Lowest energy cost over the life of the pump.
- Least hydraulic load on bearings and seals, so longest service life.
- Quietest, most stable operation, with the least vibration and recirculation.

A pump running far to the left of best efficiency suffers internal recirculation and runs hot at low flow. A pump running far to the right risks cavitation and motor overload. Aim to land the duty point within roughly 70 to 110 percent of best efficiency flow.

## NPSH and cavitation in plain terms

Cavitation is what happens when the pressure at the pump inlet drops so low that water flashes to vapour. The vapour bubbles collapse violently as they reach higher pressure inside the impeller, eroding metal and producing a sound like gravel in the pump.

Two quantities govern this:

- **NPSH required** is a property of the pump, published by the maker, the minimum inlet pressure margin the pump needs to avoid cavitation. It rises with flow.
- **NPSH available** is a property of the installation, the actual pressure margin the system provides at the pump suction, set by loop pressure, water temperature and suction piping losses.

The rule for a safe selection is simple: NPSH available must comfortably exceed NPSH required, with a margin of at least 0.5 to 1 m. Hot water, high suction lift and long restrictive suction pipe all reduce NPSH available and push a pump toward cavitation.

## Impeller trim and variable speed

A selected pump rarely lands exactly on the target duty point, and loads change over time. Two adjustments tune the pump to the system.

**Impeller trim** machines the impeller to a smaller diameter. A smaller impeller produces less head and flow, shifting the whole pump curve down. Trimming lets a stock pump be matched precisely to the design duty without oversizing, and it permanently reduces energy use.

**Variable speed**, using a variable speed drive on the motor, changes pump speed in real time. The affinity laws describe the effect: flow varies with speed, head with the square of speed, and power with the cube of speed. Because power follows the cube, a small speed reduction yields a large energy saving. In variable flow systems where two-way valves throttle the load, a variable speed pump rides down the system curve, delivering only the flow the building needs at any moment, which is the single biggest pumping energy saving available.
