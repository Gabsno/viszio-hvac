---
id: pump-01
title: "Pumps primary secondary and variable primary flow"
pillar: equipment
topic: pumps-and-fans
order: 1
difficulty: intermediate
tier: pro
tags: [pumps, hydronics, variable-flow]
standards_referenced: []
region: global
ghana_callout: true
estimated_minutes: 9
related: [pipe-01, chil-01]
last_updated: 2026-05-21
---

How chilled water is pumped around a building shapes plant efficiency, control stability and energy cost as much as the chiller selection itself. Three arrangements dominate central plant design: constant primary flow, primary secondary, and variable primary flow. Each handles the conflict between the chiller's need for stable evaporator flow and the building's need for variable flow in a different way.

## Constant primary flow

The simplest scheme uses one set of pumps that push a fixed flow through both the chillers and the distribution loop. Coils are served by three way control valves that divert water around the coil instead of throttling it, so total system flow never changes.

The chiller sees stable, design evaporator flow at all times, which keeps it happy and the controls simple. The cost is energy. The pumps run at full power whenever the plant is on, even when the building load is light, because three way valves merely redirect flow rather than reduce it. Constant primary flow survives mainly on small plants where pump energy is modest.

## Primary secondary decoupled flow

The classic large plant arrangement splits the system into two hydraulically separate loops joined by a common pipe, also called a decoupler or bridge.

The primary loop has a dedicated pump per chiller, each running at constant flow to guarantee stable evaporator flow. The secondary loop has variable speed pumps that serve the building through two way control valves. The common pipe, a short large diameter connection with no valve, lets the two loops exchange flow freely so each is hydraulically independent.

### How the common pipe behaves

Flow in the common pipe reveals the load balance. When secondary demand is below the running primary flow, surplus chilled water flows back through the common pipe from supply to return. When secondary demand exceeds primary flow, return water flows forward through the common pipe and mixes into the supply, warming it, which is the signal to stage on another chiller. The arrangement is stable and forgiving, which is why it remained the default for decades.

## Variable primary flow

Variable primary flow, or VPF, removes the secondary pumps entirely. A single set of variable speed pumps varies flow through the chillers themselves, and two way control valves at the coils modulate building flow directly.

VPF saves capital, since one pump set replaces two, and saves energy because the pumps follow the load down without the constant primary leg dragging on the system. The trade off is control complexity, because modern chillers can only tolerate flow varying within a band.

### Minimum flow and the bypass

Every chiller has a minimum evaporator flow below which the refrigerant in the tubes risks freezing or the controls become unstable. As building two way valves close, system flow can fall below that limit. A VPF plant therefore needs a bypass line fitted with a modulating valve across the supply and return mains. A flow meter watches total flow, and when it nears the chiller minimum the bypass valve opens to recirculate enough water to protect the machine. Chiller staging in VPF must also be slower and better damped than in primary secondary, because adding or dropping a chiller suddenly changes the flow each running machine sees.

## Affinity laws and why variable speed saves energy

Centrifugal pump performance follows the affinity laws. Relative to speed:

- Flow varies in direct proportion to speed
- Head varies with the square of speed
- Power varies with the cube of speed

The cube relationship is the prize. A pump slowed to 70 percent speed delivers 70 percent flow but draws only about 34 percent power. In practice system static head and control losses flatten the curve so real savings are less than the ideal cube, but they remain large. This is why variable speed drives on secondary or VPF pumps are among the most reliable energy measures in a hydronic plant.

| Pump speed | Flow | Head | Shaft power |
|---|---|---|---|
| 100 percent | 100 percent | 100 percent | 100 percent |
| 80 percent | 80 percent | 64 percent | 51 percent |
| 60 percent | 60 percent | 36 percent | 22 percent |

## Differential pressure control and sensing

Variable speed pumps are usually controlled to hold a target differential pressure across the loop, so flow rises and falls as two way valves open and close. Where the sensor sits matters greatly.

A sensor placed at the pump is simple but forces the pump to maintain full head regardless of load, wasting energy. A sensor placed near the hydraulically most remote load lets the pump shed head as valves close, capturing far more of the affinity law saving. Many designs sense at two thirds to three quarters of the way along the index circuit, or use a demand based reset that lowers the pressure set point until one control valve is nearly fully open.

## Low delta T syndrome

Chilled water plants are designed for a specific temperature difference between return and supply, often 6 to 8 °C. Low delta T syndrome is the chronic failure to achieve it; return water comes back too cool. Causes include dirty or undersized coils, three way valves left in service, miscalibrated or oversized control valves, and incorrect coil piping.

The consequence is that more flow is needed for the same load. Pumps work harder, and a primary secondary plant must run an extra chiller just to supply flow, not capacity. Diagnosing and fixing low delta T, by retrofitting two way valves, cleaning coils and commissioning control valves properly, often recovers more energy than any pump upgrade.

> 🇬🇭 **Ghana context**
> With Accra's high ambient and frequent grid interruptions, pump energy is both a cost and a generator load, so variable speed pumping with remote differential pressure sensing pays back quickly. Low delta T syndrome is common locally where coils foul in dusty conditions or where original three way valves were never replaced, so commissioning the temperature difference, not just flow, is essential. Sizing pumps and standby generation around realistic part load operation, rather than the design peak, avoids oversized plant that runs inefficiently on most days.

## Selecting the duty point

A pump should be selected so its design duty point sits near the best efficiency point of the curve, with a little margin but not gross oversizing. An oversized pump throttles against its own valve, runs noisily and wears faster. Plot the system curve, the parabola of head against flow, against the pump curve; their intersection is the real operating point. For variable speed pumps, confirm the pump still operates efficiently and away from low flow instability at the minimum expected duty, not only at design.
