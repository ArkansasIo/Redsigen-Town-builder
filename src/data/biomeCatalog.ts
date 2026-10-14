/**
 * Biome and region taxonomy for Redsigen Town Builder.
 * This is a practical game-world catalog, not a claim that every biome has one
 * universally accepted classification. Categories can overlap by climate,
 * vegetation, landform, hydrology, and human land use.
 */
export type BiomeGroup =
  | 'terrestrial' | 'freshwater' | 'marine' | 'polar' | 'anthropogenic';

export interface BiomeEntry {
  id: string;
  name: string;
  group: BiomeGroup;
  description: string;
  subBiomes: string[];
  zones: { name: string; subZones: string[] }[];
  palette: string[];
}

export const BIOME_CATALOG: BiomeEntry[] = [
  {
    id: 'tropical-rainforest', name: 'Tropical rainforest', group: 'terrestrial',
    description: 'Warm, humid forests with very high rainfall and layered evergreen canopies.',
    subBiomes: ['Lowland evergreen rainforest', 'Montane cloud forest', 'Tropical peat swamp', 'Seasonal tropical rainforest', 'Tropical dry forest mosaic'],
    zones: [
      { name: 'Amazon Basin', subZones: ['Terra firme forest', 'Várzea floodplain', 'Igapó blackwater forest', 'Andean foothill forest'] },
      { name: 'Congo Basin', subZones: ['Lowland rainforest', 'Swamp forest', 'Forest-savanna transition'] },
      { name: 'Indo-Malayan', subZones: ['Dipterocarp forest', 'Peat-swamp forest', 'Heath forest', 'Monsoon forest'] },
      { name: 'Australasian tropics', subZones: ['New Guinea lowland forest', 'Queensland wet tropics', 'Island rainforest'] }
    ], palette: ['#174f36', '#26734a', '#579b5d', '#a6b86b']
  },
  {
    id: 'tropical-seasonal', name: 'Tropical seasonal forest and woodland', group: 'terrestrial',
    description: 'Seasonally dry tropical vegetation ranging from open woodland to deciduous forest.',
    subBiomes: ['Tropical dry deciduous forest', 'Monsoon forest', 'Tropical thorn woodland', 'Tropical dry scrub'],
    zones: [
      { name: 'South Asian monsoon belt', subZones: ['Moist deciduous forest', 'Dry deciduous forest', 'Thorn scrub'] },
      { name: 'Central American dry belt', subZones: ['Pacific dry forest', 'Seasonal woodland', 'Dry coastal scrub'] },
      { name: 'Madagascar', subZones: ['Western dry forest', 'Southern spiny thicket'] }
    ], palette: ['#386b36', '#6f8e42', '#b1a45b', '#d2bf7a']
  },
  {
    id: 'savanna', name: 'Savanna and tropical grassland', group: 'terrestrial',
    description: 'Grass-dominated landscapes with scattered trees and distinct wet and dry seasons.',
    subBiomes: ['Wet savanna', 'Dry savanna', 'Thorn savanna', 'Flooded savanna', 'Palm savanna', 'Montane grassland'],
    zones: [
      { name: 'East African savannas', subZones: ['Serengeti grassland', 'Acacia woodland', 'Seasonal wetlands'] },
      { name: 'Southern African savannas', subZones: ['Miombo woodland', 'Mopane woodland', 'Highveld grassland'] },
      { name: 'South American savannas', subZones: ['Cerrado', 'Llanos', 'Pantanal seasonally flooded mosaic'] },
      { name: 'Northern Australian savannas', subZones: ['Eucalyptus savanna', 'Monsoon grassland', 'Wet-season floodplain'] }
    ], palette: ['#8da34c', '#b6b85b', '#d1b86c', '#6b8b45']
  },
  {
    id: 'desert', name: 'Desert and xeric shrubland', group: 'terrestrial',
    description: 'Arid ecosystems shaped by low precipitation, high evaporation, and sparse cover.',
    subBiomes: ['Hot sandy desert', 'Rocky desert', 'Cold desert', 'Semi-desert', 'Salt flat', 'Desert pavement', 'Xeric shrubland', 'Oasis'],
    zones: [
      { name: 'Sahara and Sahel', subZones: ['Erg dune sea', 'Reg gravel plain', 'Hamada plateau', 'Wadi', 'Sahel transition'] },
      { name: 'Arabian Peninsula', subZones: ['Rub al Khali dunes', 'Rock desert', 'Coastal sabkha'] },
      { name: 'Central Asian deserts', subZones: ['Gobi cold desert', 'Taklamakan basin', 'Karakum dunes', 'Semi-desert steppe'] },
      { name: 'North American deserts', subZones: ['Sonoran desert', 'Mojave desert', 'Chihuahuan desert', 'Great Basin cold desert'] },
      { name: 'South American drylands', subZones: ['Atacama hyper-arid zone', 'Monte shrubland', 'Patagonian steppe'] },
      { name: 'Australian arid interior', subZones: ['Simpson dunes', 'Gibber plains', 'Mulga shrubland'] }
    ], palette: ['#c9a76b', '#e0c68b', '#a98658', '#8e8b76']
  },
  {
    id: 'mediterranean', name: 'Mediterranean woodland, scrub and forest', group: 'terrestrial',
    description: 'Dry-summer climates with drought-adapted shrubs, open woodland, and fire-shaped mosaics.',
    subBiomes: ['Maquis', 'Garrigue', 'Chaparral', 'Matorral', 'Fynbos', 'Mediterranean oak woodland'],
    zones: [
      { name: 'Mediterranean Basin', subZones: ['Coastal maquis', 'Garrigue limestone scrub', 'Cork oak woodland'] },
      { name: 'California', subZones: ['Coastal sage scrub', 'Chaparral', 'Oak savanna'] },
      { name: 'Central Chile', subZones: ['Matorral scrub', 'Sclerophyll woodland'] },
      { name: 'Cape region', subZones: ['Fynbos heathland', 'Renosterveld shrubland'] },
      { name: 'Southwest Australia', subZones: ['Kwongan shrubland', 'Jarrah woodland'] }
    ], palette: ['#4e7041', '#7d8c50', '#a4a06a', '#c2ad7c']
  },
  {
    id: 'temperate-broadleaf', name: 'Temperate broadleaf and mixed forest', group: 'terrestrial',
    description: 'Seasonal forests dominated by deciduous broadleaf trees, often mixed with conifers.',
    subBiomes: ['Temperate deciduous forest', 'Mixed mesophytic forest', 'Temperate rainforest', 'Temperate evergreen broadleaf forest', 'Floodplain forest'],
    zones: [
      { name: 'Eastern North America', subZones: ['Appalachian forest', 'Great Lakes hardwoods', 'Atlantic coastal forest'] },
      { name: 'Europe', subZones: ['Atlantic broadleaf forest', 'Central European mixed forest', 'Mediterranean transition'] },
      { name: 'East Asia', subZones: ['Manchurian mixed forest', 'Japanese temperate forest', 'Chinese subtropical evergreen forest'] },
      { name: 'Southern temperate coasts', subZones: ['Valdivian rainforest', 'Tasmanian wet forest', 'New Zealand temperate rainforest'] }
    ], palette: ['#2d5d3b', '#497a49', '#879b59', '#b0a56c']
  },
  {
    id: 'temperate-conifer', name: 'Temperate coniferous forest', group: 'terrestrial',
    description: 'Conifer-dominated forests of temperate mountains and coastal regions.',
    subBiomes: ['Coastal temperate rainforest', 'Montane conifer forest', 'Pine-oak forest', 'Temperate rain-shadow forest', 'Subalpine forest'],
    zones: [
      { name: 'Pacific Northwest', subZones: ['Coastal hemlock forest', 'Douglas-fir forest', 'Rain-shadow pine forest'] },
      { name: 'Western North American mountains', subZones: ['Ponderosa pine', 'Lodgepole pine', 'Sierra mixed conifer'] },
      { name: 'East Asian mountains', subZones: ['Korean pine mixed forest', 'Japanese montane conifer', 'Himalayan temperate conifer'] },
      { name: 'Southern Hemisphere', subZones: ['Araucaria forest', 'Patagonian Andean forest', 'New Zealand beech-conifer mix'] }
    ], palette: ['#204c3d', '#326c50', '#64895d', '#9aaa72']
  },
  {
    id: 'boreal', name: 'Boreal forest and taiga', group: 'terrestrial',
    description: 'Cold northern forests dominated by spruce, fir, pine, larch, peatlands, and lakes.',
    subBiomes: ['Closed boreal forest', 'Open taiga', 'Larch forest', 'Boreal bog forest', 'Forest-tundra ecotone'],
    zones: [
      { name: 'North American boreal', subZones: ['Alaska taiga', 'Canadian Shield forest', 'Hudson Bay lowlands'] },
      { name: 'Eurasian boreal', subZones: ['Scandinavian taiga', 'West Siberian taiga', 'East Siberian larch forest'] }
    ], palette: ['#244b42', '#386457', '#637b60', '#9b9d7b']
  },
  {
    id: 'temperate-grassland', name: 'Temperate grassland, savanna and shrubland', group: 'terrestrial',
    description: 'Open, often fire- and grazing-maintained landscapes in temperate climates.',
    subBiomes: ['Prairie', 'Steppe', 'Pampas', 'Veld', 'Puszta', 'Temperate shrub-steppe', 'Bunchgrass grassland'],
    zones: [
      { name: 'North American Great Plains', subZones: ['Tallgrass prairie', 'Mixed-grass prairie', 'Shortgrass steppe', 'Palouse'] },
      { name: 'Eurasian Steppe', subZones: ['Pontic steppe', 'Kazakh steppe', 'Mongolian steppe'] },
      { name: 'South American grasslands', subZones: ['Pampas', 'Campos', 'Patagonian grass steppe'] },
      { name: 'Southern African grasslands', subZones: ['Highveld', 'Drakensberg grassland', 'Karoo transition'] }
    ], palette: ['#91a85a', '#b5b96a', '#c6b77c', '#718d4d']
  },
  {
    id: 'montane', name: 'Montane and alpine ecosystems', group: 'terrestrial',
    description: 'Elevation-driven ecological belts that change with temperature, exposure, and moisture.',
    subBiomes: ['Montane forest', 'Cloud forest', 'Subalpine woodland', 'Alpine meadow', 'Alpine heath', 'Nival rock and scree', 'Páramo', 'Puna'],
    zones: [
      { name: 'Himalaya and Tibetan Plateau', subZones: ['Subtropical foothills', 'Temperate mountain forest', 'Subalpine conifer belt', 'Alpine steppe', 'Nival zone'] },
      { name: 'Andes', subZones: ['Yungas cloud forest', 'Páramo', 'Puna grassland', 'High-Andean desert'] },
      { name: 'Rocky Mountains', subZones: ['Montane forest', 'Subalpine fir', 'Alpine tundra'] },
      { name: 'Alps', subZones: ['Montane beech-spruce', 'Subalpine larch', 'Alpine pasture', 'Glacial nival zone'] }
    ], palette: ['#3e684b', '#75965c', '#b1b98d', '#d6d8cb']
  },
  {
    id: 'tundra', name: 'Tundra', group: 'polar',
    description: 'Treeless cold ecosystems with short growing seasons and often permafrost.',
    subBiomes: ['Arctic tundra', 'Alpine tundra', 'Dry heath tundra', 'Wet sedge tundra', 'Shrub tundra', 'Polar desert'],
    zones: [
      { name: 'North American Arctic', subZones: ['Low Arctic tundra', 'High Arctic barrens', 'Arctic coastal plain'] },
      { name: 'Eurasian Arctic', subZones: ['Scandinavian tundra', 'Siberian tundra', 'Yamal wet tundra'] },
      { name: 'High mountains', subZones: ['Alpine fellfield', 'Wind-scoured ridge', 'Snowbed meadow'] }
    ], palette: ['#7d927e', '#a9b4a1', '#c9cfc4', '#e0dfd5']
  },
  {
    id: 'ice-sheet', name: 'Ice sheet, glacier and polar desert', group: 'polar',
    description: 'Permanent ice, snow, exposed rock, and extremely sparse polar vegetation.',
    subBiomes: ['Continental ice sheet', 'Ice cap', 'Valley glacier', 'Ice-free polar oasis', 'Polar gravel desert', 'Periglacial patterned ground'],
    zones: [
      { name: 'Antarctica', subZones: ['East Antarctic plateau', 'West Antarctic ice sheet', 'Antarctic Peninsula', 'Dry valleys'] },
      { name: 'Greenland and Arctic islands', subZones: ['Ice sheet interior', 'Coastal nunatak', 'Glacier foreland', 'Polar rock desert'] }
    ], palette: ['#cdd9df', '#edf2f2', '#a9becb', '#778d9c']
  },
  {
    id: 'wetland', name: 'Inland wetland', group: 'freshwater',
    description: 'Water-saturated land including marshes, swamps, bogs, fens, and floodplains.',
    subBiomes: ['Freshwater marsh', 'Forest swamp', 'Peat bog', 'Fen', 'Floodplain', 'Vernal pool', 'Wet meadow', 'Tropical peatland'],
    zones: [
      { name: 'River floodplains', subZones: ['Seasonal floodplain', 'Oxbow lake', 'Backswamp', 'Riparian gallery forest'] },
      { name: 'Peatland regions', subZones: ['Raised bog', 'Blanket bog', 'Minerotrophic fen', 'Permafrost peatland'] },
      { name: 'Tropical wetlands', subZones: ['Pantanal', 'Everglades sawgrass marsh', 'Sudd papyrus wetland', 'Okavango seasonal delta'] }
    ], palette: ['#385e4b', '#5f8260', '#8ea17b', '#b2b68b']
  },
  {
    id: 'freshwater', name: 'Freshwater aquatic', group: 'freshwater',
    description: 'Inland waters ranging from flowing rivers to still lakes and seasonal pools.',
    subBiomes: ['Headwater stream', 'River channel', 'Rapids', 'Alluvial river', 'Oligotrophic lake', 'Eutrophic lake', 'Temporary pond', 'Spring', 'Reservoir'],
    zones: [
      { name: 'Running water', subZones: ['Source and headwaters', 'Upper course', 'Middle course', 'Lower course', 'Delta distributary'] },
      { name: 'Standing water', subZones: ['Littoral shelf', 'Open-water pelagic zone', 'Profundal bottom', 'Lake ice zone'] },
      { name: 'Groundwater', subZones: ['Karst spring', 'Aquifer-fed stream', 'Cave pool'] }
    ], palette: ['#244e65', '#347c91', '#63a4b0', '#a0c8c5']
  },
  {
    id: 'coastal', name: 'Coastal and transitional', group: 'marine',
    description: 'Land-sea interfaces influenced by tides, waves, salinity, and sediment movement.',
    subBiomes: ['Rocky shore', 'Sandy beach', 'Dune system', 'Salt marsh', 'Mangrove forest', 'Estuary', 'Lagoon', 'Tidal flat', 'Seagrass meadow', 'Kelp forest'],
    zones: [
      { name: 'Intertidal', subZones: ['Splash zone', 'High intertidal', 'Mid intertidal', 'Low intertidal', 'Tide pool'] },
      { name: 'Estuarine', subZones: ['Freshwater tidal reach', 'Brackish mixing zone', 'Salt wedge', 'Estuary mouth'] },
      { name: 'Coastal landforms', subZones: ['Barrier island', 'Spit and tombolo', 'Cliff coast', 'Delta coast', 'Coastal dune slack'] },
      { name: 'Tropical coasts', subZones: ['Mangrove fringe', 'Seagrass lagoon', 'Coral rubble shore'] }
    ], palette: ['#d5c69b', '#6f9c88', '#3d807b', '#36718a']
  },
  {
    id: 'coral-reef', name: 'Coral reef and tropical marine', group: 'marine',
    description: 'Warm shallow seas with coral communities and complex reef structures.',
    subBiomes: ['Fringing reef', 'Barrier reef', 'Atoll', 'Patch reef', 'Coral garden', 'Tropical seagrass bed', 'Tropical pelagic water'],
    zones: [
      { name: 'Reef zones', subZones: ['Reef flat', 'Reef crest', 'Fore reef slope', 'Back reef lagoon', 'Reef pass'] },
      { name: 'Indo-Pacific', subZones: ['Coral Triangle', 'Great Barrier Reef', 'Western Indian Ocean reef'] },
      { name: 'Atlantic-Caribbean', subZones: ['Caribbean reef tract', 'Mesoamerican Barrier Reef', 'Bermuda reef platform'] }
    ], palette: ['#2a8e91', '#4fb6ad', '#8ad0c1', '#e0d5a3']
  },
  {
    id: 'open-ocean', name: 'Open ocean and deep sea', group: 'marine',
    description: 'Marine habitats organized by depth, light, circulation, nutrients, and seafloor geology.',
    subBiomes: ['Epipelagic ocean', 'Mesopelagic twilight zone', 'Bathypelagic deep sea', 'Abyssal plain', 'Hadal trench', 'Seamount', 'Hydrothermal vent', 'Cold seep', 'Polar marine water'],
    zones: [
      { name: 'Water-column depth zones', subZones: ['Epipelagic 0–200 m', 'Mesopelagic 200–1,000 m', 'Bathypelagic 1,000–4,000 m', 'Abyssopelagic 4,000–6,000 m', 'Hadal below 6,000 m'] },
      { name: 'Seafloor habitats', subZones: ['Continental shelf', 'Continental slope', 'Abyssal plain', 'Mid-ocean ridge', 'Submarine canyon', 'Ocean trench'] },
      { name: 'Oceanographic regions', subZones: ['Tropical gyre', 'Temperate current zone', 'Upwelling zone', 'Sea-ice margin'] }
    ], palette: ['#0d344f', '#145879', '#237d98', '#69a8b4']
  },
  {
    id: 'human-modified', name: 'Human-modified and managed landscapes', group: 'anthropogenic',
    description: 'Built and managed environments that can be mapped alongside natural ecosystems.',
    subBiomes: ['Urban core', 'Suburban mosaic', 'Industrial land', 'Cropland', 'Orchard', 'Pasture', 'Plantation forest', 'Mine and quarry', 'Reclaimed land', 'Urban park'],
    zones: [
      { name: 'Settlement', subZones: ['City center', 'Residential district', 'Industrial district', 'Transport corridor', 'Greenbelt'] },
      { name: 'Agriculture', subZones: ['Irrigated cropland', 'Rain-fed field', 'Terraced farm', 'Orchard belt', 'Grazing pasture'] },
      { name: 'Extraction and infrastructure', subZones: ['Open-pit mine', 'Quarry', 'Tailings area', 'Reservoir margin', 'Renewable energy field'] }
    ], palette: ['#8e8b7b', '#b2aa91', '#c6b47a', '#6e8a62']
  }
];

export const BIOME_GROUP_LABELS: Record<BiomeGroup, string> = {
  terrestrial: 'Terrestrial',
  freshwater: 'Freshwater',
  marine: 'Marine & coastal',
  polar: 'Polar & cryosphere',
  anthropogenic: 'Human-modified'
};

export const BIOME_COUNTS = {
  majorBiomes: BIOME_CATALOG.length,
  subBiomes: BIOME_CATALOG.reduce((sum, biome) => sum + biome.subBiomes.length, 0),
  zones: BIOME_CATALOG.reduce((sum, biome) => sum + biome.zones.length, 0),
  subZones: BIOME_CATALOG.reduce((sum, biome) => sum + biome.zones.reduce((n, zone) => n + zone.subZones.length, 0), 0)
};
