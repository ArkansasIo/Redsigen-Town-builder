import React, { useMemo, useState } from 'react';
import { BIOME_CATALOG, BIOME_COUNTS, BIOME_GROUP_LABELS, type BiomeGroup } from './data/biomeCatalog';
import './world-atlas.css';

const CONTINENTS = [
  { id: 'north-america', name: 'North America', x: 160, y: 115, detail: 'Arctic tundra, boreal forest, temperate forests, prairie, deserts, chaparral, tropical forests.' },
  { id: 'south-america', name: 'South America', x: 270, y: 280, detail: 'Amazon rainforest, Cerrado and Llanos savannas, Andes, Atacama, Pampas, Patagonia.' },
  { id: 'europe', name: 'Europe', x: 470, y: 105, detail: 'Atlantic broadleaf forest, mixed forest, Mediterranean scrub, alpine zones, northern taiga.' },
  { id: 'africa', name: 'Africa', x: 485, y: 230, detail: 'Congo rainforest, Sahel, savannas, Sahara, Cape fynbos, mangroves and wetlands.' },
  { id: 'asia', name: 'Asia', x: 650, y: 120, detail: 'Tundra, Siberian taiga, steppe, Gobi and Arabian deserts, monsoon forests, Himalaya.' },
  { id: 'oceania', name: 'Oceania', x: 770, y: 300, detail: 'Australian deserts, tropical savannas, eucalypt forests, New Guinea rainforest, New Zealand temperate forests.' },
  { id: 'antarctica', name: 'Antarctica', x: 490, y: 400, detail: 'Ice sheet, glaciers, polar desert, exposed rock and coastal marine ecosystems.' }
] as const;

const GROUPS = Object.keys(BIOME_GROUP_LABELS) as BiomeGroup[];

function WorldMap({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <svg className="atlas-map" viewBox="0 0 960 470" role="img" aria-label="Schematic world map with selectable continents">
      <defs>
        <pattern id="atlas-graticule" width="80" height="48" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 48" fill="none" stroke="rgba(148,190,205,.14)" strokeWidth="1" />
        </pattern>
        <linearGradient id="atlas-ocean" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b2637" /><stop offset="100%" stopColor="#102f40" />
        </linearGradient>
      </defs>
      <rect width="960" height="470" rx="12" fill="url(#atlas-ocean)" />
      <rect width="960" height="470" rx="12" fill="url(#atlas-graticule)" />
      <g fill="#456c58" stroke="#91b18b" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M72 76 L110 48 157 55 181 77 214 81 232 111 211 136 184 143 176 170 153 187 145 222 124 232 107 206 89 181 80 146 61 121Z" />
        <path d="M187 225 L216 232 239 255 251 291 239 330 224 368 208 353 202 317 186 282 177 249Z" />
        <path d="M412 93 L433 75 463 77 480 93 470 110 445 118 427 111Z" />
        <path d="M449 128 L482 119 514 139 526 174 511 211 492 249 471 263 455 235 445 199 431 169Z" />
        <path d="M484 86 L514 63 558 57 601 69 646 61 696 79 738 94 772 119 751 140 714 136 692 157 658 149 632 171 600 150 567 151 544 132 515 139 494 119Z" />
        <path d="M652 184 L681 178 710 196 736 220 754 243 741 264 718 251 699 231 676 225 660 206Z" />
        <path d="M755 288 L790 279 825 296 847 321 831 345 800 349 774 331 751 312Z" />
        <path d="M386 413 L424 399 470 404 513 398 559 410 577 427 550 439 504 441 463 434 424 440 396 430Z" />
        <path d="M820 88 L842 76 857 88 851 109 833 113Z" />
        <path d="M863 131 L877 124 885 138 874 149Z" />
      </g>
      <g fill="#a4b878" opacity=".65">
        <path d="M91 93 L130 68 166 79 182 103 161 130 132 148 112 132Z" />
        <path d="M195 251 L222 258 232 292 215 332 207 306Z" />
        <path d="M466 143 L496 143 507 172 492 209 477 228 464 193Z" />
        <path d="M537 88 L591 82 622 96 608 119 573 121 550 110Z" />
        <path d="M769 300 L803 294 822 314 806 331 781 323Z" />
      </g>
      <g fill="#7ea0ad" opacity=".5">
        <path d="M73 76 L110 48 157 55 181 77 214 81 232 111 211 136 184 143 176 170 153 187 145 222 124 232 107 206 89 181 80 146 61 121Z" />
        <path d="M484 86 L514 63 558 57 601 69 646 61 696 79 738 94 772 119 751 140 714 136 692 157 658 149 632 171 600 150 567 151 544 132 515 139 494 119Z" />
      </g>
      {CONTINENTS.map((continent) => {
        const active = selected === continent.id;
        return (
          <g key={continent.id} className="atlas-map-pin" role="button" tabIndex={0}
            aria-label={'Select ' + continent.name} onClick={() => onSelect(continent.id)}
            onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(continent.id); } }}>
            <circle cx={continent.x} cy={continent.y} r={active ? 8 : 5} fill={active ? '#f5c77e' : '#e5eee5'} stroke="#0a1c26" strokeWidth="2" />
            <circle cx={continent.x} cy={continent.y} r={active ? 15 : 11} fill="none" stroke={active ? '#f5c77e' : '#d6e7dc'} strokeOpacity={active ? 0.8 : 0.35} />
          </g>
        );
      })}
      <text x="20" y="28" fill="#c8dbe1" fontSize="12" letterSpacing="2">EARTH · SCHEMATIC EQUIRECTANGULAR OVERVIEW</text>
      <text x="20" y="451" fill="#8fb1bd" fontSize="10">Illustrative outline, not a navigational or survey map</text>
    </svg>
  );
}

export default function WorldAtlas() {
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState<BiomeGroup | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedBiome, setSelectedBiome] = useState(BIOME_CATALOG[0].id);
  const [selectedContinent, setSelectedContinent] = useState('north-america');

  const visibleBiomes = useMemo(() => BIOME_CATALOG.filter((biome) => {
    const groupMatches = group === 'all' || biome.group === group;
    const term = search.trim().toLowerCase();
    const textMatches = !term || [biome.name, biome.description, ...biome.subBiomes,
      ...biome.zones.flatMap((zone) => [zone.name, ...zone.subZones])]
      .some((value) => value.toLowerCase().includes(term));
    return groupMatches && textMatches;
  }), [group, search]);

  const biome = BIOME_CATALOG.find((item) => item.id === selectedBiome) ?? visibleBiomes[0] ?? BIOME_CATALOG[0];
  const continent = CONTINENTS.find((item) => item.id === selectedContinent) ?? CONTINENTS[0];

  return (
    <>
      <button className="atlas-launcher" type="button" onClick={() => setOpen(true)} aria-haspopup="dialog">
        <span aria-hidden="true">◎</span> World atlas
      </button>
      {open && <div className="atlas-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <section className="atlas-dialog" role="dialog" aria-modal="true" aria-labelledby="atlas-title">
          <header className="atlas-header">
            <div><div className="atlas-eyebrow">REDSIGEN · WORLD GENERATION</div><h2 id="atlas-title">Earth Biome Atlas</h2>
              <p>Browse major biome families, ecological sub-biomes, world regions, and local sub-zones.</p></div>
            <button className="atlas-close" type="button" onClick={() => setOpen(false)} aria-label="Close atlas">×</button>
          </header>
          <div className="atlas-stats">
            <div><strong>{BIOME_COUNTS.majorBiomes}</strong><span>major categories</span></div>
            <div><strong>{BIOME_COUNTS.subBiomes}</strong><span>sub-biomes</span></div>
            <div><strong>{BIOME_COUNTS.zones}</strong><span>regional zones</span></div>
            <div><strong>{BIOME_COUNTS.subZones}</strong><span>sub-zones</span></div>
          </div>
          <div className="atlas-layout">
            <div className="atlas-map-column">
              <WorldMap selected={selectedContinent} onSelect={setSelectedContinent} />
              <div className="atlas-region-card"><div className="atlas-eyebrow">SELECTED WORLD REGION</div><h3>{continent.name}</h3><p>{continent.detail}</p></div>
              <p className="atlas-map-note">Map is a built-in schematic overview for planning and biome discovery. Use a sourced GIS basemap for precise borders, coastlines, or navigation.</p>
            </div>
            <aside className="atlas-browser">
              <label className="atlas-search-label" htmlFor="atlas-search">Search catalog</label>
              <input id="atlas-search" className="atlas-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search biomes, zones, sub-zones…" />
              <div className="atlas-filters" aria-label="Biome groups">
                <button type="button" className={group === 'all' ? 'selected' : ''} onClick={() => setGroup('all')}>All</button>
                {GROUPS.map((item) => <button type="button" key={item} className={group === item ? 'selected' : ''} onClick={() => setGroup(item)}>{BIOME_GROUP_LABELS[item]}</button>)}
              </div>
              <div className="atlas-biome-list" aria-label="Biome results">
                {visibleBiomes.map((item) => <button type="button" key={item.id} className={'atlas-biome-option ' + (biome.id === item.id ? 'selected' : '')} onClick={() => setSelectedBiome(item.id)}>
                  <span className="atlas-swatches">{item.palette.map((color) => <i key={color} style={{ backgroundColor: color }} />)}</span>
                  <span><strong>{item.name}</strong><small>{BIOME_GROUP_LABELS[item.group]} · {item.subBiomes.length} sub-biomes</small></span>
                </button>)}
                {visibleBiomes.length === 0 && <p className="atlas-empty">No matching biomes. Try a broader search.</p>}
              </div>
              <div className="atlas-detail">
                <div className="atlas-eyebrow">BIOME PROFILE</div>
                <h3>{biome.name}</h3><p>{biome.description}</p>
                <h4>Sub-biomes</h4><div className="atlas-chip-list">{biome.subBiomes.map((item) => <span key={item}>{item}</span>)}</div>
                <h4>Zones and sub-zones</h4>
                {biome.zones.map((zone) => <details key={zone.name} open><summary>{zone.name}<span>{zone.subZones.length}</span></summary><ul>{zone.subZones.map((subZone) => <li key={subZone}>{subZone}</li>)}</ul></details>)}
              </div>
            </aside>
          </div>
          <footer className="atlas-footer"><span>Taxonomy is extensible; real ecosystems overlap and classifications vary by scientific framework.</span><button type="button" onClick={() => setOpen(false)}>Return to builder</button></footer>
        </section>
      </div>}
    </>
  );
}
