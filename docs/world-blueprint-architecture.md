# World Blueprint, Map Sizes, and Civilization DNA

The strategy mode includes a data-driven world blueprint catalog and square world presets.

## Supported map sizes

| Preset | Dimensions | Tiles | Intended scale |
|---|---:|---:|---|
| Compact | 32 × 32 | 1,024 | Short skirmish |
| Standard | 64 × 64 | 4,096 | Regional empire |
| Continental | 128 × 128 | 16,384 | Long campaign |
| Grand | 256 × 256 | 65,536 | Large-scale campaign |

The map viewport renders a 21 × 15 window around the selected coordinate rather than mounting all map cells as DOM nodes. The full tile array remains available to simulation and export tools.

## Tile data contract

Each tile stores:

- `x`, `y`: integer grid coordinates.
- `terrain`: terrain class used for movement and yield rules.
- `resource`: optional resource identifier.
- `improvement`: optional constructed improvement.
- `owner`: civilization identifier or null.
- `explored`: fog-of-war discovery state.
- `zoneId`: parent world zone.
- `subZoneId`: regional sub-zone.
- `dnaId`: compact terrain/resource phenotype key.

Example:

```json
{
  "x": 12,
  "y": 9,
  "terrain": "forest",
  "resource": "stone",
  "improvement": null,
  "owner": null,
  "explored": false,
  "zoneId": "boreal",
  "subZoneId": "Pine Taiga",
  "dnaId": "forest-stone"
}
```

## World zone taxonomy

The current catalog defines eight zones: Temperate Heartlands, Boreal Frontier, Arid Expanse, Tropical Belt, Highland Marches, Great Wetlands, Coastal Reach, and Polar Wastes. Each zone has a description, sub-zone list, terrain-weight profile, and visual palette. Current generation assigns zones in a deterministic regional grid; terrain generation is still a separate procedural pass, so the weight profile is metadata for future zone-weighted generation rather than a strict guarantee of terrain distribution.

## Modules and structures

The module catalog defines Terrain, Ecology, Settlement, Military, Society, and Turn Simulation modules. Each module lists submodules and tags. The structure catalog describes City Core, District Network, Defensive Works, and Infrastructure Network with substructures.

## Civilization DNA and unit taxonomy

Civilization DNA currently groups founder, society, military, and economy traits. Unit class taxonomy covers civilian, infantry, ranged, mobile, and naval roles. DNA subtype groups describe terrain, resources, units, and structures. These catalogs are configuration metadata, not genetic algorithms; they provide a consistent vocabulary for later trait-driven bonuses and data-driven class definitions.

## UI tools

In Strategy mode:
1. Open **World DNA** to inspect zones, sub-zones, civilization DNA, unit classes, subtypes, modules, and structures.
2. Open **Tools** to choose a map preset and export the full blueprint as JSON or tile data as CSV.
3. Open **Game → Map dimensions** to set a preset and generate a new world.
4. Select a tile to inspect terrain, resources, owner, zone identifiers, and DNA metadata in the map tooltip / tile panel.

## Extension guidance

Add new zones and taxonomy nodes in `src/world-blueprint.ts`. Add a new supported preset to `MAP_PRESETS` and the size validation in `createGame` in `src/strategy-engine.ts`. For truly zone-weighted generation, sample each tile's terrain from its assigned zone's `terrainWeights` and then apply coastline, elevation, and start-location constraints.
