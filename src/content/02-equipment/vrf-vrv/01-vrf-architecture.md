---
id: vrf-01
title: "VRF and VRV systems architecture and how they work"
pillar: cooling
topic: vrf-vrv
order: 1
difficulty: beginner
tier: free
tags: [vrf, vrv, refrigerant]
standards_referenced: []
region: global
ghana_callout: true
estimated_minutes: 9
related: [vrf-02, refr-01, ahu-01]
last_updated: 2026-05-21
---

Variable Refrigerant Flow is a direct-expansion air conditioning architecture in which one or more inverter-driven outdoor units serve many indoor units through a shared refrigerant pipe network. It has become the default choice for commercial fit-outs, hotels and mixed-use buildings because it delivers individual zone control without a central plant room.

## What VRF and VRV mean

VRF stands for Variable Refrigerant Flow. VRV, which stands for Variable Refrigerant Volume, is the original trademark coined by Daikin when the system class was introduced in the early 1980s. The two terms describe the same engineering principle, so VRV is simply one manufacturer's brand name for VRF. Every other major manufacturer markets an equivalent line — Mitsubishi Electric City Multi, Toshiba SMMS, LG Multi V, Midea, Gree and Hisense among them — and the architecture and design rules are broadly common across all of them.

The defining idea is in the name. Instead of running compressors at fixed speed and cycling them on and off, a VRF system continuously varies the mass flow of refrigerant delivered to each indoor unit so that capacity tracks the actual load in every zone, moment to moment.

## The core components

A VRF system is built from four functional blocks connected by refrigerant pipework rather than ductwork or chilled water.

### Outdoor units and inverter compressors

The outdoor unit, or ODU, houses one or more compressors, a heat exchanger, fans and the system controller. At least one compressor is inverter-driven, meaning its speed is varied by changing the electrical frequency supplied to the motor. As zone loads fall, the compressor slows down and pumps less refrigerant; as loads rise, it speeds up. This modulation is what gives VRF its strong part-load efficiency, because a building rarely sits at full design load. Larger systems combine several ODU modules to reach total capacities of several hundred kW.

### Electronic expansion valves at each indoor unit

Every indoor unit contains an electronic expansion valve, or EEV. The EEV meters refrigerant into that unit's coil and is modulated by the controls to hold the correct superheat and deliver the capacity that zone is calling for. Because each EEV acts independently, two adjacent rooms can demand very different amounts of cooling from the same ODU at the same time.

### Refrigerant piping with branch joints and headers

Refrigerant travels from the ODU to the indoor units through copper pipework. Flow is divided among the indoor units using branch joints (Y-shaped fittings) and headers — Daikin's branded fitting set is called Refnet, and other makers supply equivalent joints. Correct selection and orientation of these fittings, along with pipe sizing that steps down as capacity is distributed, is central to a reliable installation.

```
     ODU
      |
   [branch]---- IDU 1 (cassette)
      |
   [branch]---- IDU 2 (ducted)
      |
   [header]==== IDU 3, IDU 4, IDU 5 (wall)
```

### Indoor units

Indoor units come in many physical forms to suit the space: recessed ceiling cassettes, concealed ducted units feeding a small duct run, wall-mounted units, floor-standing units and ceiling-suspended units. A single system can mix several types.

## How the system modulates capacity

The system controller continuously polls every indoor unit for its demand, sums the load and sets the compressor speed to match. Each EEV then takes its share of the available refrigerant. The result is a system that breathes with the building: a meeting room that empties out simply has its EEV close down, and the compressor sheds the equivalent capacity rather than cycling off. Compared with fixed-speed direct-expansion equipment, this produces tighter temperature control, lower starting current and markedly better seasonal efficiency.

## Controls and centralized management

Each zone has a local wired or wireless controller. Above that, a centralized controller can supervise dozens or hundreds of indoor units from one screen, applying schedules, setpoint limits and tenant billing. VRF systems also integrate with building management systems through gateways using BACnet or Modbus, allowing the air conditioning to be coordinated with lighting, ventilation and metering.

## Advantages and limits

| Strength | Why it matters |
|---|---|
| Individual zone control | Every room sets its own temperature |
| Strong part-load efficiency | Inverter compressor tracks real load |
| No plant room or wet pipework | Outdoor units sit on roof or at grade |
| Flexible indoor unit mix | One system, many room types |
| Phased installation | Suits fit-outs and staged tenancies |

The same architecture imposes real constraints. Total refrigerant pipe length and the vertical separation between ODU and indoor units are capped by each manufacturer — typically a few hundred metres of total pipe and tens of metres of lift — and exceeding these limits derates capacity or voids the design. The systems carry a substantial refrigerant charge distributed through occupied spaces, so refrigerant leak detection and minimum room-area rules under the relevant safety standards must be checked, particularly for small rooms served by large indoor units. Long pipe runs also add charge and pressure drop, both of which must be calculated rather than assumed.

> 🇬🇭 **Ghana context**
> In Accra's hot-humid climate, with ambient design temperatures around 33°C, VRF inverter compressors hold capacity well and avoid the heavy starting current of fixed-speed units. Grid voltage in many areas sags and fluctuates, so confirm the inverter drive's voltage tolerance and consider voltage stabilisation, since inverter boards are the most failure-prone part under unstable supply. Because almost all VRF equipment is imported, plan lead times for outdoor units, branch fittings and spares, and order refrigerant pipework and controls as a matched set.
