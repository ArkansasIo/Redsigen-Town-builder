export type WorldZoneId = 'temperate'|'boreal'|'arid'|'tropical'|'highland'|'wetland'|'coastal'|'polar';
export type WorldZone = {id:WorldZoneId;name:string;description:string;subZones:string[];terrainWeights:Record<string,number>;palette:string[]};
export const WORLD_ZONES:WorldZone[] = [
 {id:'temperate',name:'Temperate Heartlands',description:'Balanced farmland, mixed woodland, and settlement corridors.',subZones:['River Plain','Oakwood Belt','Open Prairie','Lake District'],terrainWeights:{grass:52,forest:24,hill:12,marsh:8,water:4},palette:['#83a968','#42684b','#b2a17a']},
 {id:'boreal',name:'Boreal Frontier',description:'Cold conifer forests, rocky uplands, and sparse northern settlements.',subZones:['Pine Taiga','Frozen Lake','Moraine Ridge','Muskeg'],terrainWeights:{tundra:40,forest:35,hill:15,water:7,marsh:3},palette:['#9aafa9','#385b50','#6b7e83']},
 {id:'arid',name:'Arid Expanse',description:'Dry basins, dunes, mineral shelves, and rare water sources.',subZones:['Dune Sea','Red Mesa','Salt Flat','Oasis Basin'],terrainWeights:{desert:62,hill:18,grass:8,mountain:8,water:4},palette:['#d7b879','#a86e4e','#e9d6a0']},
 {id:'tropical',name:'Tropical Belt',description:'Dense forests, fertile clearings, and humid lowland river networks.',subZones:['Rainforest','Monsoon Plain','Canopy Basin','Mangrove Fringe'],terrainWeights:{forest:42,grass:28,marsh:15,water:10,hill:5},palette:['#4f8a55','#2d5c42','#83ad69']},
 {id:'highland',name:'Highland Marches',description:'Rugged ridges, mountain passes, ore veins, and defensible plateaus.',subZones:['Alpine Ridge','Volcanic Shelf','Stone Plateau','Mountain Pass'],terrainWeights:{mountain:34,hill:38,forest:12,grass:10,tundra:6},palette:['#8a8d8e','#b0a28b','#546e65']},
 {id:'wetland',name:'Great Wetlands',description:'Floodplains, peat bogs, reed marshes, and slow waterways.',subZones:['Floodplain','Peat Bog','Reed Marsh','Delta Maze'],terrainWeights:{marsh:48,water:22,grass:18,forest:8,hill:4},palette:['#537a69','#456d80','#8caa7b']},
 {id:'coastal',name:'Coastal Reach',description:'Shallow seas, harbors, islands, fisheries, and maritime trade routes.',subZones:['Rocky Shore','Archipelago','Tidal Flats','Deepwater Shelf'],terrainWeights:{water:64,grass:14,forest:8,hill:8,marsh:6},palette:['#316b88','#5d947d','#c8b58b']},
 {id:'polar',name:'Polar Wastes',description:'Icebound tundra, exposed rock, frozen coasts, and extreme survival conditions.',subZones:['Ice Shelf','Permafrost','Glacier Valley','Aurora Coast'],terrainWeights:{tundra:55,mountain:18,water:17,hill:8,forest:2},palette:['#c5d7d8','#7b989f','#596b79']}
];
export type BlueprintNode = {id:string;name:string;description:string;children:string[];tags:string[]};
export const WORLD_MODULES:BlueprintNode[] = [
 {id:'terrain',name:'Terrain Module',description:'Base elevation, walkability, movement costs, and terrain yield rules.',children:['elevation','hydrology','biomes','climate'],tags:['worldgen','simulation']},
 {id:'ecology',name:'Ecology Module',description:'Resource placement, vegetation, wildlife habitats, and regeneration.',children:['flora','fauna','resources','regrowth'],tags:['worldgen','economy']},
 {id:'settlement',name:'Settlement Module',description:'City sites, borders, population, districts, and local services.',children:['city-core','districts','population','services'],tags:['cities','economy']},
 {id:'military',name:'Military Module',description:'Unit classes, movement, combat, logistics, and fortifications.',children:['unit-roster','combat','supply','fortifications'],tags:['combat','simulation']},
 {id:'society',name:'Society Module',description:'Civics, government, diplomacy, culture, and victory scoring.',children:['government','policies','diplomacy','victory'],tags:['4x','progression']},
 {id:'simulation',name:'Turn Simulation Module',description:'Turn phases, actions, yields, AI decisions, and deterministic replay.',children:['player-phase','economy-phase','ai-phase','cleanup-phase'],tags:['simulation','engine']}
];
export const WORLD_STRUCTURES:BlueprintNode[] = [
 {id:'city-core',name:'City Core',description:'Population, city health, borders, growth, and production queue.',children:['town-hall','granary','market-square','workshop'],tags:['settlement','economy']},
 {id:'districts',name:'District Network',description:'Specialized urban areas with adjacency and capacity rules.',children:['civic-district','science-district','military-district','harbor-district'],tags:['settlement','specialization']},
 {id:'defense',name:'Defensive Works',description:'Territorial defenses and siege resistance.',children:['palisade','stone-wall','watchtower','fortress'],tags:['military','defense']},
 {id:'infrastructure',name:'Infrastructure Network',description:'Connects settlements and improves movement and yields.',children:['road','bridge','harbor','trade-post'],tags:['logistics','economy']}
];
export const CIVILIZATION_DNA:BlueprintNode[] = [
 {id:'founder',name:'Founder DNA',description:'Starting traits and settlement strengths.',children:['pioneer','agrarian','maritime','frontier'],tags:['civilization','origin']},
 {id:'society',name:'Society DNA',description:'Cultural identity and governance behavior.',children:['republican','monarchic','merchant','scholarly'],tags:['civilization','government']},
 {id:'military',name:'Military DNA',description:'Doctrine biases and unit specializations.',children:['defensive','mobile','ranged','siege'],tags:['civilization','military']},
 {id:'economy',name:'Economic DNA',description:'Resource conversion and strategic priorities.',children:['agricultural','industrial','commercial','scientific'],tags:['civilization','economy']}
];
export const CLASS_TAXONOMY:BlueprintNode[] = [
 {id:'civilian',name:'Civilian Classes',description:'Non-combat roles that expand and improve the empire.',children:['settler','builder','merchant','diplomat'],tags:['unit-class']},
 {id:'infantry',name:'Infantry Classes',description:'Ground troops for holding territory and close combat.',children:['warrior','spearman','swordsman','guard'],tags:['unit-class','combat']},
 {id:'ranged',name:'Ranged Classes',description:'Units that attack from distance and control approaches.',children:['archer','crossbow','artillery','siege-engine'],tags:['unit-class','combat']},
 {id:'cavalry',name:'Mobile Classes',description:'Fast units for scouting, flanking, and rapid response.',children:['scout','horseman','knight','courier'],tags:['unit-class','mobility']},
 {id:'naval',name:'Naval Classes',description:'Ships for coastal defense, exploration, and transport.',children:['galley','trader','warship','transport'],tags:['unit-class','naval']}
];
export const DNA_SUBTYPES:BlueprintNode[] = [
 {id:'terrain-dna',name:'Terrain DNA',description:'A tile phenotype combining base terrain, resource, climate, and movement rules.',children:['grass-fertile','forest-dense','hill-mineral','coast-rich','desert-arid','tundra-frozen','mountain-rugged','marsh-wet'],tags:['tile','biome']},
 {id:'resource-dna',name:'Resource DNA',description:'Resource rarity and yield behavior attached to a tile or region.',children:['food-resource','strategic-resource','luxury-resource','marine-resource'],tags:['resource','economy']},
 {id:'unit-dna',name:'Unit DNA',description:'Role, strength, speed, range, health, upkeep, and unlock conditions.',children:['worker','explorer','melee','ranged','mounted','naval','siege'],tags:['unit','combat']},
 {id:'structure-dna',name:'Structure DNA',description:'Cost, prerequisites, yield effects, durability, and adjacency bonuses.',children:['economic','scientific','cultural','military','infrastructure'],tags:['building','settlement']}
];
export const MAP_PRESETS = [
 {size:32,label:'32 × 32',description:'Compact skirmish map',tiles:1024},
 {size:64,label:'64 × 64',description:'Standard empire map',tiles:4096},
 {size:128,label:'128 × 128',description:'Continental campaign',tiles:16384},
 {size:256,label:'256 × 256',description:'Grand campaign',tiles:65536}
] as const;
