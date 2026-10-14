# World Biome, Zone and Sub-zone Catalog

This catalog powers the **World atlas** overlay in Redsigen Town Builder.

## Hierarchy

- **Biome group** — broad environment family: terrestrial, freshwater, marine/coastal, polar/cryosphere, or human-modified.
- **Major biome** — a broad ecological category such as tropical rainforest, desert, tundra, or wetland.
- **Sub-biome** — a more specific ecosystem type within a major biome.
- **Zone** — a broad geographic region or ecological subdivision.
- **Sub-zone** — a local landscape, habitat, or ecological unit used for map generation.

This is a game-development taxonomy intended for world generation. Biome classifications vary by scientific framework, and many real places are mosaics or ecotones. The list is broad and extensible rather than an assertion that one list can contain every locally recognized ecosystem.

## Included major categories

The TypeScript catalog currently includes tropical rainforest; tropical seasonal forest; savanna; desert and xeric shrubland; Mediterranean woodland and scrub; temperate broadleaf and mixed forest; temperate coniferous forest; boreal forest and taiga; temperate grassland and steppe; montane and alpine ecosystems; tundra; ice sheets and polar deserts; inland wetlands; freshwater aquatic habitats; coastal and transitional habitats; coral reefs; open ocean and deep sea; and human-modified landscapes.

Each catalog entry includes a stable ID, group, description, sub-biome names, zones, sub-zones, and suggested colors for map/editor palettes.

## World map

The built-in map is an **illustrative schematic** with selectable continent/region markers. It is useful for browsing and game-design planning but is not a GIS dataset, exact coastline drawing, political boundary map, or navigational chart. Do not use it for measurements or location-sensitive decisions.

For a production geographic map, add a licensed and attributed Natural Earth dataset or another suitable GIS source, then render its GeoJSON using a map library or a custom projection. Political borders and ecological regions should be separate layers; biome polygons should cite their dataset and version.

## Add a biome

Add a `BiomeEntry` object to `src/data/biomeCatalog.ts`. Give it a unique kebab-case `id`, choose a valid `group`, provide a concise description, list its `subBiomes`, define one or more named `zones` with `subZones`, and provide a 3–4 color palette. The UI derives catalog totals automatically.

## Future data model

For large generated worlds, consider separate normalized records for `biomes`, `sub_biomes`, `regions`, `zones`, `sub_zones`, and `map_layers`. Give map features stable IDs and optional latitude/longitude bounds, source attribution, climate ranges, elevation ranges, and procedural generation weights. Keep natural biomes distinct from administrative boundaries and human land use.