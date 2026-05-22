---
id: ctrl-bms
title: "Building management system architecture"
pillar: controls
topic: bms
order: 1
difficulty: beginner
tier: free
tags: [bms, bacnet, controls]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 9
related: [ctrl-01, cx-01, vent-dcv]
last_updated: 2026-05-21
---

A building management system (BMS), also called a building automation system (BAS), is the network of sensors, controllers and software that monitors and operates a building's mechanical plant. Understanding its layered architecture is the first step to specifying, commissioning or troubleshooting any modern HVAC installation.

## The three layer model

A BMS is conventionally drawn as three layers, each with a clear role. Signals flow up from the physical plant and commands flow down from the operator.

```svg
<svg viewBox="0 0 460 220" width="460" xmlns="http://www.w3.org/2000/svg">
  <rect x="40" y="20" width="380" height="45" fill="#1f6fb2" />
  <text x="230" y="48" font-size="13" fill="#ffffff" text-anchor="middle">Supervisory and head end software</text>
  <rect x="40" y="90" width="380" height="45" fill="#2e9e6b" />
  <text x="230" y="118" font-size="13" fill="#ffffff" text-anchor="middle">Controllers</text>
  <rect x="40" y="160" width="380" height="45" fill="#c97a1c" />
  <text x="230" y="188" font-size="13" fill="#ffffff" text-anchor="middle">Field devices and sensors</text>
  <line x1="230" y1="65" x2="230" y2="90" stroke="#444444" stroke-width="2" />
  <line x1="230" y1="135" x2="230" y2="160" stroke="#444444" stroke-width="2" />
</svg>
```

### Field devices and sensors

The bottom layer is the physical interface to the plant. **Inputs** include temperature sensors, humidity sensors, pressure transmitters, CO2 sensors, flow switches, current sensors and status contacts. **Outputs** include damper and valve actuators, fan and pump start signals, and variable speed drive references. These devices are simple — they sense or act, but they do not decide. Sensors come as analogue (a varying signal such as 4 to 20 mA or 0 to 10 V) or digital (a two state contact). Choosing the right sensor range and location is where many control problems are quietly born.

### Controllers

The middle layer holds the intelligence. Controllers are small programmable computers — direct digital control (DDC) panels — wired to the field devices in their zone. A typical building has plant controllers for the central chillers, boilers and air handlers, and many smaller terminal unit controllers for VAV boxes, fan coils and zone equipment. Each controller runs its **sequence of operation** continuously and locally: it reads its inputs, applies its program logic, and drives its outputs many times per second. Crucially, a properly programmed controller keeps running its sequence even if the network or head end fails — the building does not stop when a PC reboots.

### Supervisory and head end software

The top layer is the human interface. A supervisory server or workstation gathers data from every controller, presents graphical floor plans and plant schematics, stores history, manages alarms and schedules, and lets operators adjust setpoints. Modern head ends are increasingly web based, viewable from a browser or phone. The head end is powerful for visibility and management but does not perform real time control loops — that work stays down in the controllers.

## Open protocols

For the layers to talk, they share a communications protocol. Two open standards dominate.

| Protocol | Typical use | Strength |
|----------|-------------|----------|
| BACnet | Whole BMS, controller to head end | Rich HVAC object model, vendor neutral |
| Modbus | Meters, drives, chillers, gateways | Simple, universal on equipment |

**BACnet** (BACnet/IP and BACnet MS/TP) was written specifically for building automation. It defines standard objects — analogue input, binary output, schedule, trend log — so a BACnet device from one vendor can be read by a head end from another. **Modbus** is older and simpler: it moves raw registers with no built in meaning, so an integrator must map each register by hand, but it is found on almost every chiller, VFD and energy meter. Many projects use BACnet as the building backbone and Modbus only at equipment, joined by a gateway. Specifying open protocols protects the owner from being locked to a single contractor for life.

## Points lists

The **points list** is the master inventory of every input and output in the BMS, line by line, with the point name, type (analogue or binary, input or output), engineering units, range and the controller it lives on. It is the contractual definition of the system's scope.

Points are counted carefully because they drive cost and verification. A hard point is physically wired to a sensor or actuator. A soft or virtual point exists only in software — a calculated value, a setpoint or a network point read from another device. The points list is the checklist used during installation and commissioning: every point must be wired, addressed, ranged correctly and proven to read true.

## Trends alarms and schedules

Three operating functions turn raw points into a usable building.

- **Trends** log a point's value over time so operators can see how a space temperature or chiller load behaves across a day or week. Trend data is the single most valuable tool for diagnosing comfort and energy problems after handover.
- **Alarms** notify operators when a point leaves its acceptable band — a space too warm, a filter blocked, a pump failed. Good alarm design uses sensible delays and priorities so that genuine faults are not buried under nuisance alarms.
- **Schedules** start and stop plant by time of day and day of week, with holiday calendars and optimum start logic that learns how early to fire up the plant to hit setpoint by occupancy. Schedules are usually the largest single energy saving the BMS delivers.

## The home of the sequences of operation

The most important architectural point is this: the BMS is where the **sequences of operation** physically live and run. The engineer's written sequences — economizer changeover, supply air temperature reset, chilled water reset, VAV minimum airflow, staging of chillers and pumps — are translated into controller code. The controllers execute that logic continuously and autonomously. The head end is for people; the controllers are for control. Treating the BMS as the executable form of the design intent, rather than a monitoring add on, is what separates a building that runs well from one that merely reports its own discomfort.
