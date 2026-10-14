import React, { useMemo, useState } from 'react';
import './strategy-game.css';

type Terrain = 'grass' | 'forest' | 'hill' | 'water' | 'desert' | 'tundra';
type UnitKind = 'Settler' | 'Warrior' | 'Scout';
type Tile = { x: number; y: number; terrain: Terrain; food: number; production: number; explored: boolean };
type Unit = { id: number; kind: UnitKind; x: number; y: number; moves: number };
type City = { id: number; name: string; x: number; y: number; population: number; production: number; queue: string[] };

const W = 12, H = 9;
const TERRAIN: Record<Terrain, { color: string; label: string; glyph: string; food: number; production: number }> = {
  grass: { color: '#6d9658', label: 'Grassland', glyph: '♧', food: 2, production: 1 },
  forest: { color: '#315f45', label: 'Forest', glyph: '♠', food: 1, production: 2 },
  hill: { color: '#9a8a68', label: 'Hills', glyph: '▲', food: 0, production: 3 },
  water: { color: '#316b88', label: 'Coast', glyph: '≈', food: 1, production: 0 },
  desert: { color: '#c5a66d', label: 'Desert', glyph: '·', food: 0, production: 1 },
  tundra: { color: '#a4b5b0', label: 'Tundra', glyph: '❄', food: 1, production: 1 }
};
const START_TILES: Tile[] = Array.from({ length: W * H }, (_, i) => {
  const x = i % W, y = Math.floor(i / W);
  const v = (x * 17 + y * 31 + x * y * 7 + 13) % 29;
  const terrain: Terrain = (x === 0 || y === 0 || x === W - 1 || y === H - 1) && v % 3 === 0 ? 'water'
    : v < 5 ? 'forest' : v < 9 ? 'hill' : v < 12 ? 'desert' : v < 14 ? 'tundra' : 'grass';
  return { x, y, terrain, food: TERRAIN[terrain].food, production: TERRAIN[terrain].production, explored: Math.abs(x - 3) + Math.abs(y - 4) < 5 };
});
const TABS = ['Empire', 'Cities', 'Research', 'Military', 'Diplomacy', 'World'] as const;
type Tab = typeof TABS[number];
const TECHS = [
  { name: 'Agriculture', cost: 8, desc: 'Improved food yields; unlocks Granary.' },
  { name: 'Masonry', cost: 10, desc: 'Stone construction; unlocks Walls.' },
  { name: 'Bronze Working', cost: 12, desc: 'Unlocks Spearmen and reveals strategic resources.' },
  { name: 'Writing', cost: 14, desc: 'Unlocks Library and diplomatic agreements.' },
  { name: 'Engineering', cost: 20, desc: 'Improved roads and defensive structures.' },
  { name: 'Navigation', cost: 24, desc: 'Unlocks ocean travel and harbor improvements.' }
];

export default function StrategyGame() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('Empire');
  const [turn, setTurn] = useState(1);
  const [gold, setGold] = useState(45);
  const [science, setScience] = useState(3);
  const [culture, setCulture] = useState(1);
  const [foodBank, setFoodBank] = useState(12);
  const [productionBank, setProductionBank] = useState(6);
  const [tiles, setTiles] = useState<Tile[]>(START_TILES);
  const [selected, setSelected] = useState({ x: 3, y: 4 });
  const [units, setUnits] = useState<Unit[]>([{ id: 1, kind: 'Settler', x: 3, y: 4, moves: 2 }, { id: 2, kind: 'Warrior', x: 4, y: 4, moves: 2 }, { id: 3, kind: 'Scout', x: 2, y: 4, moves: 2 }]);
  const [cities, setCities] = useState<City[]>([]);
  const [nextId, setNextId] = useState(4);
  const [research, setResearch] = useState('Agriculture');
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [buildQueue, setBuildQueue] = useState('Warrior');
  const [log, setLog] = useState<string[]>(['Turn 1: Your expedition enters an unknown land.', 'Objective: found a city, grow your empire, and explore.']);
  const [menu, setMenu] = useState<'game' | 'save' | 'help'>('game');

  const currentTile = tiles.find(t => t.x === selected.x && t.y === selected.y) ?? tiles[0];
  const selectedUnit = units.find(u => u.x === selected.x && u.y === selected.y);
  const selectedCity = cities.find(c => c.x === selected.x && c.y === selected.y);
  const researched = TECHS.find(t => t.name === research) ?? TECHS[0];
  const addLog = (message: string) => setLog(old => [`Turn ${turn}: ${message}`, ...old].slice(0, 8));

  const foundCity = () => {
    const settler = units.find(u => u.kind === 'Settler' && u.x === selected.x && u.y === selected.y);
    if (!settler || cities.some(c => Math.abs(c.x - selected.x) + Math.abs(c.y - selected.y) < 3)) return;
    const city: City = { id: nextId, name: ['New Haven', 'Riverside', 'Oakwatch', 'Stoneford', 'Brightwater'][cities.length % 5], x: selected.x, y: selected.y, population: 1, production: 0, queue: ['Warrior'] };
    setCities(old => [...old, city]); setUnits(old => old.filter(u => u.id !== settler.id)); setNextId(nextId + 1);
    addLog(city.name + ' founded. The settlement joins your empire.'); setTab('Cities');
  };

  const moveUnit = (dx: number, dy: number) => {
    if (!selectedUnit || selectedUnit.moves < 1) return;
    const x = selected.x + dx, y = selected.y + dy;
    if (x < 0 || y < 0 || x >= W || y >= H || tiles.find(t => t.x === x && t.y === y)?.terrain === 'water') return;
    if (units.some(u => u.x === x && u.y === y)) { addLog('That tile is occupied by another unit.'); return; }
    setUnits(old => old.map(u => u.id === selectedUnit.id ? { ...u, x, y, moves: u.moves - 1 } : u));
    setSelected({ x, y });
    setTiles(old => old.map(t => Math.abs(t.x - x) + Math.abs(t.y - y) <= 2 ? { ...t, explored: true } : t));
  };

  const endTurn = () => {
    setTurn(t => t + 1); setGold(g => g + 5 + cities.length * 2); setScience(s => s + cities.length * 2);
    setCulture(c => c + Math.max(1, cities.length)); setFoodBank(f => f + cities.reduce((n, city) => n + 2 + city.population, 0));
    setProductionBank(p => p + cities.length * 2);
    setUnits(old => old.map(u => ({ ...u, moves: 2 })));
    setCities(old => old.map(city => ({ ...city, production: city.production + 3, population: city.population + (turn % 5 === 0 ? 1 : 0) })));
    setProgress(p => {
      const next = p + 3 + cities.length;
      if (next >= researched.cost) {
        setUnlocked(prev => prev.includes(research) ? prev : [...prev, research]);
        addLog('Research completed: ' + research + '.');
        return 0;
      }
      return next;
    });
    addLog('Turn completed. Units refreshed; city yields collected.');
  };

  const purchaseUnit = (kind: UnitKind) => {
    if (!selectedCity) { addLog('Select one of your cities first.'); return; }
    const cost = kind === 'Settler' ? 25 : kind === 'Warrior' ? 12 : 10;
    if (productionBank < cost) { addLog('Not enough production stock. End turns to accumulate production.'); return; }
    setProductionBank(p => p - cost);
    setUnits(old => [...old, { id: nextId, kind, x: selectedCity.x, y: selectedCity.y, moves: 2 }]);
    setNextId(id => id + 1); addLog(selectedCity.name + ' trained a ' + kind + '.');
  };

  const resetGame = () => {
    setTurn(1); setGold(45); setScience(3); setCulture(1); setFoodBank(12); setProductionBank(6);
    setTiles(START_TILES); setSelected({ x: 3, y: 4 });
    setUnits([{ id: 1, kind: 'Settler', x: 3, y: 4, moves: 2 }, { id: 2, kind: 'Warrior', x: 4, y: 4, moves: 2 }, { id: 3, kind: 'Scout', x: 2, y: 4, moves: 2 }]);
    setCities([]); setNextId(4); setResearch('Agriculture'); setProgress(0); setUnlocked([]);
    setLog(['Turn 1: New expedition launched.']); setTab('Empire');
  };

  const saveGame = () => {
    try {
      const snapshot = { turn, gold, science, culture, foodBank, productionBank, tiles, selected, units, cities, research, progress, unlocked, nextId };
      const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'redsigen-civilization-save.json'; a.click(); URL.revokeObjectURL(url);
      addLog('Game state exported as JSON save.');
    } catch { addLog('Could not export save in this browser.'); }
  };

  const mapLegend = useMemo(() => Object.entries(TERRAIN) as [Terrain, typeof TERRAIN[Terrain]][], []);

  return (
    <>
      <button className="strategy-launcher" type="button" onClick={() => setOpen(true)}><span>♜</span> Strategy mode</button>
      {open && <div className="strategy-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}>
        <section className="strategy-game" role="dialog" aria-modal="true" aria-labelledby="strategy-title">
          <header className="strategy-topbar">
            <div className="strategy-brand"><span className="strategy-emblem">♜</span><div><strong id="strategy-title">REDSIGEN: AGE OF EMPIRES</strong><small>TURN-BASED 4X STRATEGY · PROTOTYPE</small></div></div>
            <div className="strategy-resources"><span>◈ <b>{gold}</b><small>Gold</small></span><span>✦ <b>{science}</b><small>Science</small></span><span>❖ <b>{culture}</b><small>Culture</small></span><span>♧ <b>{foodBank}</b><small>Food</small></span><span>▧ <b>{productionBank}</b><small>Production</small></span></div>
            <button className="strategy-close" onClick={() => setOpen(false)} aria-label="Close strategy mode">×</button>
          </header>
          <nav className="strategy-menu" aria-label="Strategy game main menu">
            {TABS.map(item => <button type="button" key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}<span>⌄</span></button>)}
            <div className="strategy-menu-right"><button type="button" onClick={() => setMenu(menu === 'help' ? 'game' : 'help')}>Help</button><button type="button" onClick={() => setMenu(menu === 'save' ? 'game' : 'save')}>Game ▾</button></div>
          </nav>
          {menu !== 'game' && <div className="strategy-submenu">
            {menu === 'help' ? <span><b>How to play:</b> Select tiles and units, move units with the directional controls, found a city with a Settler, choose research, then end your turn to collect yields and advance science.</span>
              : <><button onClick={saveGame}>Export save file</button><button onClick={resetGame}>New game / Restart</button><button onClick={() => setMenu('game')}>Close menu</button></>}
          </div>}
          <div className="strategy-body">
            <main className="strategy-map-panel">
              <div className="strategy-map-heading"><div><span className="strategy-kicker">WORLD MAP / EXPLORATION</span><h2>The Known World</h2></div><span className="strategy-turn">TURN {turn} <i>●</i> YOUR EMPIRE</span></div>
              <div className="strategy-map-scroll"><div className="strategy-grid" style={{ gridTemplateColumns: `repeat(${W}, minmax(0, 1fr))` }}>
                {tiles.map(tile => {
                  const unit = units.find(u => u.x === tile.x && u.y === tile.y);
                  const city = cities.find(c => c.x === tile.x && c.y === tile.y);
                  const active = selected.x === tile.x && selected.y === tile.y;
                  const terrain = TERRAIN[tile.terrain];
                  return <button type="button" key={tile.y * W + tile.x} title={`${terrain.label} · Food ${tile.food} · Production ${tile.production}`} aria-label={`Select ${terrain.label} at ${tile.x + 1}, ${tile.y + 1}`} className={`strategy-tile ${active ? 'selected' : ''} ${tile.explored ? '' : 'fog'}`} style={{ backgroundColor: tile.explored ? terrain.color : '#18252c' }} onClick={() => setSelected({ x: tile.x, y: tile.y })}>
                    <span className="strategy-terrain-glyph">{tile.explored ? terrain.glyph : '?'}</span>
                    {city && <span className="strategy-city-token">⌂</span>}
                    {unit && <span className={'strategy-unit-token ' + unit.kind.toLowerCase()}>{unit.kind === 'Settler' ? '♙' : unit.kind === 'Warrior' ? '⚔' : '⚑'}</span>}
                    {active && <span className="strategy-coords">{tile.x + 1},{tile.y + 1}</span>}
                  </button>;
                })}
              </div></div>
              <div className="strategy-map-legend">{mapLegend.map(([key, value]) => <span key={key}><i style={{ background: value.color }} />{value.label}</span>)}</div>
              <div className="strategy-map-actions">
                <div className="strategy-selected-tile"><span className="strategy-kicker">SELECTED TILE</span><strong>{TERRAIN[currentTile.terrain].label}</strong><small>Food +{currentTile.food} · Production +{currentTile.production} · Coordinates {selected.x + 1}, {selected.y + 1}</small></div>
                {selectedUnit ? <div className="strategy-unit-actions"><span><b>{selectedUnit.kind}</b> · {selectedUnit.moves} moves left</span><div className="strategy-directions"><button onClick={() => moveUnit(0,-1)} disabled={selectedUnit.moves < 1}>↑</button><button onClick={() => moveUnit(-1,0)} disabled={selectedUnit.moves < 1}>←</button><button onClick={() => moveUnit(0,1)} disabled={selectedUnit.moves < 1}>↓</button><button onClick={() => moveUnit(1,0)} disabled={selectedUnit.moves < 1}>→</button></div>{selectedUnit.kind === 'Settler' && <button className="strategy-primary" onClick={foundCity}>Found city</button>}</div>
                  : <div className="strategy-unit-actions"><span>{selectedCity ? <b>{selectedCity.name}</b> : 'No unit selected'}</span>{selectedCity && <button className="strategy-primary" onClick={() => purchaseUnit('Warrior')}>Train Warrior · 12</button>}</div>}
              </div>
            </main>
            <aside className="strategy-sidebar">
              {tab === 'Empire' && <><section className="strategy-card"><span className="strategy-kicker">EMPIRE OVERVIEW</span><h3>Your Civilization</h3><div className="strategy-stat-grid"><div><b>{cities.length}</b><small>Cities</small></div><div><b>{units.length}</b><small>Units</small></div><div><b>{tiles.filter(t => t.explored).length}</b><small>Tiles explored</small></div><div><b>{turn}</b><small>Current turn</small></div></div><p>Expand your borders, improve your economy, research technologies, and explore the map.</p></section>
                <section className="strategy-card"><span className="strategy-kicker">ADVISOR / RECENT EVENTS</span>{log.map((line,i) => <p className="strategy-log-line" key={i}>{line}</p>)}</section></>}
              {tab === 'Cities' && <><section className="strategy-card"><span className="strategy-kicker">SETTLEMENT MANAGEMENT</span><h3>City planner</h3>{cities.length === 0 ? <p>Found your first city using a Settler to unlock production and population.</p> : cities.map(city => <div className="strategy-city-row" key={city.id}><b>⌂ {city.name}</b><small>Population {city.population} · Production {city.production}</small><div className="strategy-build-options"><button onClick={() => {setSelected({x:city.x,y:city.y}); setBuildQueue('Warrior');}}>Select city</button><button onClick={() => {setSelected({x:city.x,y:city.y}); purchaseUnit('Settler');}}>Train Settler</button><button onClick={() => {setSelected({x:city.x,y:city.y}); purchaseUnit('Scout');}}>Train Scout</button></div></div>)}</section><section className="strategy-card"><span className="strategy-kicker">CONSTRUCTION QUEUE</span><h3>Production orders</h3><select value={buildQueue} onChange={e => setBuildQueue(e.target.value)}><option>Warrior</option><option>Settler</option><option>Scout</option><option>Granary</option><option>Monument</option></select><p>Current plan: {buildQueue}. Unit production is a prototype action; buildings are listed as future queue items.</p><button className="strategy-primary" onClick={() => purchaseUnit(buildQueue === 'Settler' || buildQueue === 'Scout' ? buildQueue : 'Warrior')}>Produce selected item</button></section></>}
              {tab === 'Research' && <><section className="strategy-card"><span className="strategy-kicker">TECHNOLOGY TREE</span><h3>Scientific advancement</h3><p>Choose a technology. Science progress advances at the end of each turn.</p><label className="strategy-field-label">Active research</label><select value={research} onChange={e => {setResearch(e.target.value);setProgress(0);}}>{TECHS.filter(t => !unlocked.includes(t.name)).map(t => <option key={t.name}>{t.name}</option>)}{unlocked.length === TECHS.length && <option>All technologies completed</option>}</select><div className="strategy-progress"><span style={{ width: Math.min(100, progress / researched.cost * 100) + '%' }} /></div><small>{progress} / {researched.cost} research points</small><p>{researched.desc}</p></section><section className="strategy-card"><span className="strategy-kicker">COMPLETED TECHNOLOGIES</span>{unlocked.length ? unlocked.map(t => <p key={t}>✓ {t}</p>) : <p>No technologies completed yet.</p>}</section></>}
              {tab === 'Military' && <section className="strategy-card"><span className="strategy-kicker">ARMY COMMAND</span><h3>Unit roster</h3>{units.map(unit => <div className="strategy-city-row" key={unit.id}><b>{unit.kind}</b><small>Tile {unit.x + 1}, {unit.y + 1} · {unit.moves} movement</small><button onClick={() => setSelected({x:unit.x,y:unit.y})}>Select unit</button></div>)}<p>Military combat, enemy AI, and tactical battle resolution are planned expansion systems.</p></section>}
              {tab === 'Diplomacy' && <section className="strategy-card"><span className="strategy-kicker">FOREIGN AFFAIRS</span><h3>Diplomacy council</h3><p>No rival civilizations have been discovered yet.</p><div className="strategy-diplomacy"><b>Available actions</b><button disabled>Establish embassy — requires Writing</button><button disabled>Negotiate trade — rival required</button><button disabled>Declare war — rival required</button></div></section>}
              {tab === 'World' && <><section className="strategy-card"><span className="strategy-kicker">WORLD INTELLIGENCE</span><h3>Exploration report</h3><p>Explored {tiles.filter(t => t.explored).length} of {tiles.length} tiles.</p><div className="strategy-progress"><span style={{width: (tiles.filter(t => t.explored).length / tiles.length * 100) + '%'}} /></div><p>Explore with Scouts to reveal terrain and identify good city locations.</p></section><section className="strategy-card"><span className="strategy-kicker">BIOME DISTRIBUTION</span>{mapLegend.map(([key,value]) => <div className="strategy-terrain-row" key={key}><span><i style={{background:value.color}} />{value.label}</span><b>{tiles.filter(t=>t.terrain===key && t.explored).length}</b></div>)}</section></>}
            </aside>
          </div>
          <footer className="strategy-footer"><div><span className="strategy-status-dot" /> TURN {turn} · {cities.length} CITIES · {units.length} UNITS</div><div className="strategy-footer-actions"><button onClick={saveGame}>Save / Export</button><button onClick={resetGame}>Restart</button><button className="strategy-end-turn" onClick={endTurn}>End Turn <span>→</span></button></div></footer>
        </section>
      </div>}
    </>
  );
}
