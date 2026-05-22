---
id: air-fans
title: "Fans in HVAC types and selection"
pillar: ducting
topic: air-systems
order: 3
difficulty: beginner
tier: free
tags: [fans, fan-laws, fan-efficiency]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 9
related: [air-static-pressure, fund-airflow, pump-01]
last_updated: 2026-05-21
---

Fans move the air that an HVAC system depends on, and they are also one of its largest consumers of electricity. Understanding the main fan types, the fan curve and the fan laws lets an engineer pick the right machine and predict how it behaves before anything is installed.

## Centrifugal fans

A centrifugal fan throws air radially outward from a rotating wheel into a scroll shaped casing. It develops higher pressure than an axial fan of the same size, which makes it the standard choice for ducted systems with meaningful resistance. The wheel blade shape defines three families with very different characters.

### Forward curved

Blades curve toward the direction of rotation. The wheel is small and runs slowly, so it is cheap and quiet at low pressure. Its weakness is the power curve, which rises continuously with airflow, so a forward curved fan can overload its motor if the system resistance turns out lower than expected. It suits small air handlers and fan coil units.

### Backward curved

Blades lean away from the direction of rotation. Efficiency is good, typically 75 to 80 percent, and the power curve is non overloading, meaning power reaches a maximum and then falls, so the motor cannot be overloaded by a light system. Backward curved wheels handle the medium and high pressure duties of most commercial air handlers.

### Airfoil

An airfoil wheel is a backward curved fan with hollow aerofoil section blades. It is the most efficient centrifugal type, reaching 80 to 86 percent, and the quietest at high pressure. It costs more and dislikes dirty or wet airstreams that can clog the hollow blades, so it is reserved for clean, large, energy sensitive systems.

| Wheel type | Peak efficiency | Power curve | Typical use |
|---|---|---|---|
| Forward curved | 60 to 68 percent | Overloading | Small AHU, fan coils |
| Backward curved | 75 to 80 percent | Non overloading | Commercial AHU |
| Airfoil | 80 to 86 percent | Non overloading | Large efficient AHU |

## Axial and plug fans

An axial fan moves air straight along the shaft axis, like a propeller in a tube. It shifts large volumes at low pressure very efficiently, which suits exhaust, condenser fans and high airflow ventilation. It struggles against high duct resistance and is generally noisier in the ducted role than a centrifugal fan.

A plug fan, also called a plenum fan, is a backward curved or airfoil wheel mounted with no scroll casing, discharging directly into a pressurised plenum. Without the scroll it is compact and easy to fit into a modern air handler, and it allows flexible discharge in any direction. A small efficiency penalty compared to a housed fan is usually accepted for the packaging convenience, and arrays of small plug fans, called fan walls, add redundancy.

## The fan curve and the operating point

A fan curve plots the pressure a fan can develop against the airflow it delivers at a fixed speed. Pressure is highest near zero flow and falls as airflow rises. The duct system has its own rising system curve, and the fan can only operate where the two curves cross. That intersection is the operating point and it is the airflow and pressure the installation actually delivers. Change the duct resistance or the fan speed and the operating point moves.

## The fan laws

The fan laws describe how a single fan behaves when its speed changes, assuming the same air system. They are the most useful arithmetic in air side HVAC.

- Airflow is proportional to speed. Double the speed, double the airflow.
- Pressure is proportional to speed squared. Double the speed, four times the pressure.
- Power is proportional to speed cubed. Double the speed, eight times the power.

The third law is the prize. Slowing a fan to 50 percent speed cuts its airflow in half but cuts its power to roughly one eighth, because 0.5 cubed is 0.125. This is why running fans slowly whenever the load allows saves so much energy, and why variable speed control is central to efficient design. The fan laws also let you correct a manufacturer test point, for example scaling a 1450 rev per minute curve to a 1100 rev per minute selection.

## Variable speed drives

A variable speed drive, also called a variable frequency drive, changes the frequency of the power supplied to the fan motor and therefore the motor speed. It replaces wasteful older methods of capacity control such as inlet guide vanes and discharge dampers, which throttle airflow while the fan keeps spinning at full speed and burning power.

With a drive the fan slows to match demand and the fan laws deliver the cubic energy saving. Drives also give soft starting, which reduces mechanical and electrical stress, and they integrate cleanly with building controls for static pressure reset and demand based ventilation. A common caution is to avoid running continuously at very low speed where motor cooling weakens and certain resonant frequencies must be locked out.

## Fan efficiency and specific fan power

Fan efficiency compares the useful air power delivered to the electrical power drawn. Total efficiency includes the motor and drive, and good modern selections reach 65 to 80 percent overall depending on type and size.

Specific fan power, or SFP, is the practical metric engineers track. It is the electrical input power divided by the airflow moved, expressed in watts per litre per second, or W per L per s. A well designed variable air volume supply system targets an SFP around 1.5 to 2.0 W per L per s. A high number signals oversized fans, excessive duct resistance or a poor selection. Tracking SFP turns fan efficiency from an abstract idea into a single number you can design to and verify in commissioning.
