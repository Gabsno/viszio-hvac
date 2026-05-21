---
id: duct-01
title: "Duct sizing equal friction versus static regain"
pillar: core-engineering
topic: duct-design
order: 1
difficulty: intermediate
tier: free
tags: [duct-design, sizing, airflow]
standards_referenced: [SMACNA, ASHRAE-Fundamentals]
region: global
ghana_callout: true
estimated_minutes: 9
related: [duct-02, std-smacna-duct, ahu-01]
last_updated: 2026-05-21
---

Duct sizing is the step where airflow rates become physical dimensions. The two methods an engineer reaches for most often, equal friction and static regain, solve the same problem in different ways, and choosing well affects fan energy, noise, balancing effort and the space the ductwork occupies.

## The goal of duct sizing

A duct system has one job: deliver the design airflow to every outlet at an acceptable pressure, with acceptable noise, at acceptable cost, within the available space. Those four constraints pull against each other.

Make the duct large and friction drops, fan energy falls and the system runs quietly, but the duct costs more in sheet metal and steals ceiling void. Make it small and you save material and space, but velocity rises, the fan works harder for the life of the building, and air noise can become intrusive. Sizing is the act of finding a defensible balance, and the sizing method is the rule you use to find it.

## The equal friction method

Equal friction is the most widely used method. You select a single design friction rate, a pressure loss per unit length expressed in Pa/m, and size every section of duct so that it loses pressure at that same rate.

In practice you fix the friction rate, then for each section read the duct size that gives that rate at the section airflow, using a friction chart or a duct calculator. Because friction per metre is constant, velocity falls naturally as you move downstream and airflow drops, which is physically sensible.

### Strengths and weaknesses

Equal friction is simple, fast and predictable, and it produces reasonable proportions for most low and medium pressure commercial systems. Its weakness is that it does not equalise pressure between paths. A short run to a near outlet and a long run to a far outlet both lose the same Pa/m, so the long run has far more total loss. The near outlets end up with surplus pressure that must be choked off with dampers during balancing, which wastes fan energy and can cause noise at the damper.

## The static regain method

The static regain method takes a different angle. As air leaves a branch takeoff, the main carries less airflow, so if the duct size were held constant the velocity would drop. A drop in velocity converts velocity pressure into static pressure, a recovery known as static regain.

In the static regain method you deliberately resize the main after each branch so that the regain at the size change roughly offsets the friction loss in the next section. The static pressure available at the entry to each branch then comes out nearly equal along the run.

### Where it suits

Because static pressure is balanced along the system, the method is well suited to large, extensive systems and to medium and high velocity designs, where uniform pressure makes the system self-balancing and reduces reliance on dampers. The trade-offs are that the calculation is more involved, downstream ducts can end up generously sized and therefore bulkier, and the velocity must still be checked against noise limits at every section.

## The velocity reduction method

A third, older approach is the velocity reduction method. The designer simply assigns a target velocity to each section, lower as the duct moves downstream and away from the fan, and sizes from velocity and airflow. It is quick and gives the engineer direct control of noise, but it relies heavily on judgement and offers no automatic pressure balance, so it is now used mainly for small systems or quick estimates.

## Typical friction rates and velocity limits

The numbers below are common starting points for low pressure commercial work. They are guidance, not code, and must be checked against project acoustic targets and the duct construction class.

| Application | Friction rate | Velocity guide |
|-------------|---------------|----------------|
| Quiet spaces, near outlets | 0.6 to 0.8 Pa/m | 3 to 5 m/s |
| General commercial mains | 0.8 to 1.0 Pa/m | 5 to 7.5 m/s |
| Industrial or high velocity | higher, by design | 10 m/s and above |

Lower velocity branches near terminals keep regenerated noise down; mains can run faster because they are usually further from occupied space and often acoustically lined.

## How method choice affects balancing and energy

The sizing method writes the pressure profile of the system, and the pressure profile is what the balancing contractor inherits.

Equal friction tends to leave near outlets with excess pressure, so balancing means closing dampers, adding throttling loss that the fan pays for every hour of operation. Static regain aims to deliver nearly equal pressure to each branch, so less is thrown away at dampers and the design fan pressure can be lower. Over a building life, that difference in parasitic loss is real operating cost. Whichever method you use, keep the index run, the path of greatest total pressure loss, clearly identified, because the fan must be selected to satisfy it.

> 🇬🇭 **Ghana context**
> In Accra's hot-humid climate, cooling runs nearly year round, so any avoidable fan pressure is paid for in electricity on an unreliable and costly grid. Where generator backup carries part of the load, oversized fan power also raises fuel cost. Slightly more generous duct sizing and attention to a balanced pressure profile usually pay back well, and lower duct velocities also reduce condensation-driven noise complaints in humid return-air paths.
