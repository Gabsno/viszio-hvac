---
id: pipe-condenser-water
title: "Condenser water systems"
pillar: piping
topic: hydronics
order: 3
difficulty: intermediate
tier: free
tags: [condenser-water, cooling-tower, water-treatment]
standards_referenced: []
region: global
ghana_callout: true
estimated_minutes: 8
related: [ct-01, chil-01, hyd-fundamentals]
last_updated: 2026-05-21
---

A condenser water system is the open loop that rejects heat from a water-cooled chiller to the atmosphere through a cooling tower. Unlike the sealed chilled water loop, it is exposed to air, which makes water treatment and strainers central to keeping it reliable.

## The open loop between condenser and tower

A water-cooled chiller has two water circuits. The chilled water loop, on the evaporator side, is a closed loop serving the building. The condenser water loop, on the condenser side, carries the heat the chiller absorbs plus the work of the compressor out to a cooling tower where it is rejected.

The condenser water loop is open because the cooling tower exposes the water to the atmosphere. Warm water from the chiller condenser is sprayed or distributed over the tower fill, air is drawn through it, a fraction of the water evaporates, and that evaporation carries away heat. The cooled water collects in the tower basin and is pumped back to the condenser.

Because the loop opens to atmosphere at the basin, it behaves very differently from a closed loop. It continuously gains oxygen, loses water to evaporation and drift, and concentrates whatever dissolved solids the make-up water brings in.

## Typical temperatures and range

Condenser water runs warmer than chilled water because it is rejecting heat, not delivering cooling. A widely used design basis at AHRI conditions is 29.4 °C entering the condenser and 35 °C leaving it, a range of about 5.5 K (85 °F and 95 °F). The leaving water temperature from the chiller is the entering water temperature to the tower.

Two terms matter:

- **Range** is the temperature drop the tower achieves, supply minus return, typically 5 to 6 K.
- **Approach** is how close the cooled water gets to the ambient wet bulb temperature. A tower might cool water to within 3 to 5 K of wet bulb. The approach, not the dry bulb temperature, sets how cold the condenser water can get.

Colder condenser water lowers the lift the compressor must work against and improves chiller efficiency, so designers and operators push condenser temperature as low as the tower and ambient wet bulb allow.

## Condenser water pumps

A dedicated condenser water pump moves water from the tower basin, through the chiller condenser, and back to the tower distribution. Sizing follows the same Q equals m times cp times ΔT relationship as any hydronic loop, but with the condenser load, which is the building cooling load plus the compressor heat of rejection, roughly 1.2 to 1.25 times the evaporator load.

The head these pumps develop must overcome condenser tube friction, pipe and fitting losses, and crucially the static lift from the basin water level up to the tower distribution point. Unlike a closed loop, this static lift does not balance out, because the water is delivered into an open tower and falls back through air. The pump must genuinely lift the water that height, so the open loop static head is a real component of pump head.

Condenser water pumps are usually constant speed in simpler plants, though variable speed control on multi-cell towers and large plants saves energy by trimming flow and tower fan speed together.

## Fouling scaling and water treatment

Because it is an open evaporative loop, the condenser water system is the dirtiest circuit in the plant and the one most dependent on water treatment.

### Why an open loop fouls

Three mechanisms degrade an untreated condenser loop:

- **Scaling.** Evaporation removes pure water vapour and leaves dissolved minerals behind. As the remaining water concentrates, calcium carbonate and other salts precipitate as hard scale on condenser tubes, throttling heat transfer and chiller efficiency.
- **Corrosion.** Constant oxygen contact in the tower attacks steel pipe, basins and condenser components.
- **Biological growth.** A warm, wet, sunlit tower is an ideal habitat for algae, slime and bacteria, including Legionella. Biofilm insulates surfaces and harbours pathogens.

### Treatment and control

A proper treatment programme combines several measures. Chemical dosing adds scale inhibitors, corrosion inhibitors and biocides. **Bleed or blowdown** deliberately drains a portion of concentrated water and replaces it with fresh make-up, controlling the **cycles of concentration**, the ratio of dissolved solids in the loop to that in the make-up water. A conductivity controller automates bleed. Side stream filtration removes suspended dirt, and strainers protect the chiller condenser tubes from debris carried off the tower fill.

A small drop in condenser tube cleanliness shows up directly as higher chiller energy use, so condenser water treatment is one of the highest value maintenance activities in a chilled water plant.

## Basin and make-up

The tower basin is the reservoir at the base of the tower. It holds the cooled water, gives the pump a stable suction source, and is where make-up water is added.

Make-up water replaces three losses: evaporation, which is the intended heat rejection mechanism and the largest loss; drift, the small amount of water carried out as droplets in the air stream; and bleed, the deliberate blowdown. A float valve or a level controller admits make-up to hold the basin level. As a rough figure, evaporation is around 1 percent of circulating flow for every 5.5 K of range, so make-up demand is significant and must be allowed for in the building water supply.

The basin also needs a strainer on the pump suction, an overflow, a drain, and protection against freezing in cold climates and against debris and sunlight that feed biological growth.

> 🇬🇭 **Ghana context**
> In Accra the high wet bulb temperature limits how cold a cooling tower can run, so approach and tower selection deserve careful attention. Municipal and borehole make-up water quality varies widely and is often hard, which accelerates scaling, so a properly commissioned treatment programme with conductivity-controlled bleed is essential. Strainers on the condenser pump suction and regular basin cleaning protect chiller tubes from the silt and debris common in local supplies.
