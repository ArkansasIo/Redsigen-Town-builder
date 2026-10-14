export type Terrain = 'grass' | 'forest' | 'hill' | 'water' | 'desert' | 'tundra' | 'mountain' | 'marsh';
export type Resource = 'wheat' | 'stone' | 'iron' | 'horses' | 'fish' | 'gems' | null;
export type UnitKind = 'Settler' | 'Warrior' | 'Scout' | 'Builder' | 'Archer' | 'Spearman' | 'Knight' | 'Galley';
export type Improvement = 'Farm' | 'Mine' | 'Lumber Mill' | 'Pasture' | 'Fishing Boats' | 'Road' | 'Fort';
export type Building = 'Monument' | 'Granary' | 'Library' | 'Barracks' | 'Walls' | 'Market' | 'Workshop' | 'Harbor' | 'University' | 'Temple';
export type ProductionKind = UnitKind | Building;
export type VictoryType = 'Science' | 'Culture' | 'Domination' | 'Diplomacy';
export type Tile = { x:number; y:number; terrain:Terrain; explored:boolean; resource:Resource; improvement:Improvement|null; owner:number|null };
export type Unit = { id:number; civ:number; kind:UnitKind; x:number; y:number; moves:number; hp:number; level:number; fortified:boolean };
export type City = { id:number; civ:number; name:string; x:number; y:number; population:number; food:number; production:number; queue:ProductionKind[]; buildings:Building[]; hp:number; border:number; worked:number[] };
export type Civilization = { id:number; name:string; adjective:string; color:string; alive:boolean; gold:number; science:number; culture:number; faith:number; score:number; government:string; policy:string; relations:Record<number,number>; warWith:number[]; met:boolean };
export type Tech = { id:string; name:string; era:string; cost:number; prerequisites:string[]; unlocks:string[]; description:string };
export type GameState = { version:number; seed:number; turn:number; activeCiv:number; width:number; height:number; tiles:Tile[]; units:Unit[]; cities:City[]; civs:Civilization[]; nextId:number; techs:string[]; currentResearch:string; researchProgress:number; selected:{x:number;y:number}; log:string[]; policies:string[]; victory:VictoryType|null; gameOver:boolean; difficulty:string };
export const TECHS:Tech[] = [
 {id:'pottery',name:'Pottery',era:'Ancient',cost:10,prerequisites:[],unlocks:['Granary'],description:'Store food and support city growth.'},
 {id:'animal-husbandry',name:'Animal Husbandry',era:'Ancient',cost:12,prerequisites:[],unlocks:['Pasture','Horses'],description:'Domesticate animals and reveal horse resources.'},
 {id:'mining',name:'Mining',era:'Ancient',cost:12,prerequisites:[],unlocks:['Mine','Stone','Iron'],description:'Extract stone and strategic ores.'},
 {id:'writing',name:'Writing',era:'Ancient',cost:16,prerequisites:['pottery'],unlocks:['Library','Embassy'],description:'Formal scholarship and diplomatic missions.'},
 {id:'archery',name:'Archery',era:'Ancient',cost:15,prerequisites:[],unlocks:['Archer'],description:'Train ranged defensive units.'},
 {id:'bronze-working',name:'Bronze Working',era:'Ancient',cost:18,prerequisites:['mining'],unlocks:['Spearman','Barracks'],description:'Professional infantry and military training.'},
 {id:'masonry',name:'Masonry',era:'Ancient',cost:18,prerequisites:['mining'],unlocks:['Walls'],description:'Build durable city defenses.'},
 {id:'currency',name:'Currency',era:'Classical',cost:24,prerequisites:['writing'],unlocks:['Market','Trade'],description:'Formalize markets and trade routes.'},
 {id:'engineering',name:'Engineering',era:'Classical',cost:28,prerequisites:['masonry'],unlocks:['Workshop','Road'],description:'Improve infrastructure and production.'},
 {id:'education',name:'Education',era:'Medieval',cost:36,prerequisites:['writing','currency'],unlocks:['University'],description:'Multiply scientific output.'},
 {id:'horseback-riding',name:'Horseback Riding',era:'Classical',cost:26,prerequisites:['animal-husbandry'],unlocks:['Knight'],description:'Deploy fast mounted units.'},
 {id:'sailing',name:'Sailing',era:'Ancient',cost:16,prerequisites:[],unlocks:['Galley','Fishing Boats'],description:'Explore coasts and harvest marine resources.'},
 {id:'theology',name:'Theology',era:'Classical',cost:26,prerequisites:['writing'],unlocks:['Temple','Faith'],description:'Develop faith and cultural influence.'},
 {id:'printing',name:'Printing',era:'Renaissance',cost:48,prerequisites:['education'],unlocks:['Culture victory progress'],description:'Spread ideas and cultural influence.'},
 {id:'scientific-theory',name:'Scientific Theory',era:'Industrial',cost:65,prerequisites:['education','engineering'],unlocks:['Science victory progress'],description:'Unlock the path to scientific supremacy.'}
];
export const UNIT_DATA:Record<UnitKind,{cost:number;strength:number;moves:number;hp:number;requires:string[];domain:'land'|'sea'}> = {
 Settler:{cost:30,strength:0,moves:2,hp:1,requires:[],domain:'land'}, Warrior:{cost:16,strength:12,moves:2,hp:100,requires:[],domain:'land'},
 Scout:{cost:12,strength:5,moves:3,hp:70,requires:[],domain:'land'}, Builder:{cost:14,strength:0,moves:2,hp:60,requires:[],domain:'land'},
 Archer:{cost:22,strength:10,moves:2,hp:75,requires:['archery'],domain:'land'}, Spearman:{cost:24,strength:18,moves:2,hp:100,requires:['bronze-working'],domain:'land'},
 Knight:{cost:38,strength:28,moves:3,hp:120,requires:['horseback-riding'],domain:'land'}, Galley:{cost:28,strength:12,moves:3,hp:80,requires:['sailing'],domain:'sea'}
};
export const BUILDING_DATA:Record<Building,{cost:number;requires:string[];description:string}> = {
 Monument:{cost:16,requires:[],description:'+2 culture per turn'}, Granary:{cost:18,requires:['pottery'],description:'+3 food per turn'},
 Library:{cost:24,requires:['writing'],description:'+3 science per turn'}, Barracks:{cost:22,requires:['bronze-working'],description:'New units start with veteran training'},
 Walls:{cost:24,requires:['masonry'],description:'Increase city defense and siege resistance'}, Market:{cost:26,requires:['currency'],description:'+4 gold per turn'},
 Workshop:{cost:28,requires:['engineering'],description:'+3 production per turn'}, Harbor:{cost:30,requires:['sailing'],description:'Coastal trade and naval support'},
 University:{cost:40,requires:['education'],description:'+6 science per turn'}, Temple:{cost:24,requires:['theology'],description:'+3 faith per turn'}
};
const TERRAIN_DATA:Record<Terrain,{food:number;production:number;gold:number;color:string;glyph:string;name:string}> = {
 grass:{food:2,production:1,gold:0,color:'#6d9658',glyph:'♧',name:'Grassland'},forest:{food:1,production:2,gold:0,color:'#315f45',glyph:'♠',name:'Forest'},
 hill:{food:0,production:3,gold:0,color:'#9a8a68',glyph:'▲',name:'Hills'},water:{food:1,production:0,gold:1,color:'#316b88',glyph:'≈',name:'Coast'},
 desert:{food:0,production:1,gold:1,color:'#c5a66d',glyph:'·',name:'Desert'},tundra:{food:1,production:1,gold:0,color:'#a4b5b0',glyph:'❄',name:'Tundra'},
 mountain:{food:0,production:0,gold:0,color:'#777b82',glyph:'⛰',name:'Mountain'},marsh:{food:2,production:0,gold:0,color:'#537a69',glyph:'♨',name:'Marsh'}
};
export const terrainInfo = TERRAIN_DATA;
const NAMES = ['Alderfall','Brightwater','Stonehaven','New Meridian','Oakwatch','Goldcrest','Riversmeet','Westreach','Highgarden','Dawnport','Ironford','Silverplain'];
const CIVS = [
 {name:'The Meridian League',adjective:'Meridian',color:'#d5b46a'},
 {name:'The Verdant Compact',adjective:'Verdant',color:'#78b77d'},
 {name:'The Azure Dominion',adjective:'Azure',color:'#78aee0'},
 {name:'The Ember Crown',adjective:'Ember',color:'#d98a69'}
];
function rand(seed:number){let t=seed+0x6D2B79F5;return ()=>{t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
export function createGame(seed=Math.floor(Math.random()*999999),difficulty='Prince'):GameState {
 const random=rand(seed),width=16,height=12;
 const tiles:Tile[]=Array.from({length:width*height},(_,i)=>{
  const x=i%width,y=Math.floor(i/width),edge=x===0||y===0||x===width-1||y===height-1;
  const n=random(); const terrain:Terrain=edge&&n<.72?'water':n<.10?'mountain':n<.22?'forest':n<.34?'hill':n<.43?'desert':n<.50?'tundra':n<.57?'marsh':'grass';
  const resource:Resource= random()<.13 ? (terrain==='water'?'fish':terrain==='hill'?'iron':terrain==='desert'?'gems':terrain==='grass'?'wheat':terrain==='forest'?'stone':'horses') : null;
  return {x,y,terrain,explored:Math.abs(x-4)+Math.abs(y-6)<5,resource,improvement:null,owner:null};
 });
 // Ensure a navigable starting region and a safe starting tile.
 for(let y=4;y<=8;y++)for(let x=2;x<=6;x++){const t=tiles[y*width+x];if(t.terrain==='water'||t.terrain==='mountain')t.terrain='grass';}
 const civs:Civilization[]=CIVS.map((c,id)=>({id,name:c.name,adjective:c.adjective,color:c.color,alive:true,gold:id===0?65:45,science:id===0?0:0,culture:0,faith:0,score:0,government:'Chiefdom',policy:'Tradition',relations:{},warWith:[],met:id===0}));
 const units:Unit[]=[
  {id:1,civ:0,kind:'Settler',x:4,y:6,moves:2,hp:100,level:0,fortified:false},
  {id:2,civ:0,kind:'Warrior',x:5,y:6,moves:2,hp:100,level:0,fortified:false},
  {id:3,civ:0,kind:'Scout',x:3,y:6,moves:3,hp:70,level:0,fortified:false}
 ];
 return {version:1,seed,turn:1,activeCiv:0,width,height,tiles,units,cities:[],civs,nextId:4,techs:[],currentResearch:'pottery',researchProgress:0,selected:{x:4,y:6},log:['Turn 1: The expedition enters an uncharted continent.','Objective: settle, research, explore, and build a civilization.'],policies:['Tradition'],victory:null,gameOver:false,difficulty};
}
export function tileAt(g:GameState,x:number,y:number){return g.tiles.find(t=>t.x===x&&t.y===y);}
export function unitAt(g:GameState,x:number,y:number,civ?:number){return g.units.find(u=>u.x===x&&u.y===y&&(civ===undefined||u.civ===civ));}
export function cityAt(g:GameState,x:number,y:number,civ?:number){return g.cities.find(c=>c.x===x&&c.y===y&&(civ===undefined||c.civ===civ));}
export function cityYield(g:GameState,city:City){const t=tileAt(g,city.x,city.y)!;let food=2+TERRAIN_DATA[t.terrain].food,production=1+TERRAIN_DATA[t.terrain].production,gold=1+TERRAIN_DATA[t.terrain].gold,science=1,culture=0,faith=0;
 for(const b of city.buildings){if(b==='Granary')food+=3;if(b==='Library')science+=3;if(b==='University')science+=6;if(b==='Monument')culture+=2;if(b==='Market')gold+=4;if(b==='Workshop')production+=3;if(b==='Temple')faith+=3;}
 return {food,production,gold,science,culture,faith};}
function addLog(g:GameState,message:string){g.log=[`Turn ${g.turn}: ${message}`,...g.log].slice(0,10);}
export function moveUnit(g:GameState,id:number,dx:number,dy:number):GameState {
 const n=structuredClone(g),u=n.units.find(x=>x.id===id);if(!u||u.civ!==n.activeCiv||u.moves<=0||n.gameOver)return g;
 const x=u.x+dx,y=u.y+dy,t=tileAt(n,x,y);if(!t||t.terrain==='mountain'||(t.terrain==='water'&&UNIT_DATA[u.kind].domain!=='sea'))return g;
 const blocker=unitAt(n,x,y);if(blocker){if(blocker.civ!==u.civ&&n.civs[u.civ].warWith.includes(blocker.civ))return attackUnit(n,u.id,blocker.id);addLog(n,'The destination is occupied.');return n;}
 u.x=x;u.y=y;u.moves--;u.fortified=false;
 for(const q of n.tiles)if(Math.abs(q.x-x)+Math.abs(q.y-y)<=2)q.explored=true;
 const rival=n.civs.find(c=>c.id!==u.civ&&c.alive&&n.units.some(v=>v.civ===c.id&&Math.abs(v.x-x)+Math.abs(v.y-y)<=2));
 if(rival&&!rival.met){rival.met=true;n.civs[u.civ].relations[rival.id]=0;rival.relations[u.civ]=0;addLog(n,`Contact established with ${rival.name}.`);}
 n.selected={x,y};return n;
}
export function foundCity(g:GameState,id:number):GameState{
 const n=structuredClone(g),u=n.units.find(v=>v.id===id);if(!u||u.kind!=='Settler'||u.civ!==0)return g;
 const t=tileAt(n,u.x,u.y);if(!t||t.terrain==='water'||t.terrain==='mountain'||cityAt(n,u.x,u.y))return g;
 if(n.cities.some(c=>c.civ===0&&Math.abs(c.x-u.x)+Math.abs(c.y-u.y)<3)){addLog(n,'Choose a site at least three tiles from another city.');return n;}
 const name=NAMES[n.cities.filter(c=>c.civ===0).length%NAMES.length],idNew=n.nextId++;
 n.cities.push({id:idNew,civ:0,name,x:u.x,y:u.y,population:1,food:0,production:0,queue:['Warrior'],buildings:[],hp:100,border:1,worked:[]});
 n.units=n.units.filter(v=>v.id!==id);t.owner=0;addLog(n,`${name} founded. Its first production order is a Warrior.`);n.selected={x:u.x,y:u.y};return n;
}
export function attackUnit(g:GameState,attackerId:number,defenderId:number):GameState{
 const n=structuredClone(g),a=n.units.find(u=>u.id===attackerId),d=n.units.find(u=>u.id===defenderId);if(!a||!d||a.civ!==0||a.moves<=0||UNIT_DATA[a.kind].strength<=0)return g;
 if(a.civ!==d.civ&&!n.civs[a.civ].warWith.includes(d.civ)){addLog(n,'Declare war before attacking this civilization.');return n;}
 const terrain=tileAt(n,d.x,d.y)?.terrain,defense=(terrain==='forest'||terrain==='hill'?1.25:1)*(d.fortified?1.25:1);
 const attack=UNIT_DATA[a.kind].strength*(1+a.level*.1),defend=UNIT_DATA[d.kind].strength*defense;
 d.hp=Math.max(0,d.hp-Math.max(8,Math.round(30*attack/Math.max(1,defend))));a.hp=Math.max(0,a.hp-Math.max(5,Math.round(20*defend/Math.max(1,attack))));a.moves=0;
 addLog(n,`${a.kind} attacks ${d.kind}; damage resolved by unit strength and terrain.`);
 if(d.hp<=0){n.units=n.units.filter(u=>u.id!==d.id);if(d.kind==='Settler')addLog(n,'A captured expedition has been lost.');}
 if(a.hp<=0)n.units=n.units.filter(u=>u.id!==a.id);
 return n;
}
export function declareWar(g:GameState,civId:number):GameState{const n=structuredClone(g),a=n.civs[0],b=n.civs[civId];if(!b||civId===0||!b.alive)return g;if(!a.warWith.includes(civId))a.warWith.push(civId);if(!b.warWith.includes(0))b.warWith.push(0);a.relations[civId]=-100;b.relations[0]=-100;addLog(n,`War declared against ${b.name}.`);return n;}
export function changeRelation(g:GameState,civId:number,action:'embassy'|'trade'|'peace'|'gift'):GameState{
 const n=structuredClone(g),me=n.civs[0],other=n.civs[civId];if(!other||!other.alive||!other.met)return g;
 if(action==='embassy'){if(!n.techs.includes('writing')){addLog(n,'Writing is required to establish an embassy.');return n;}if(me.gold<15){addLog(n,'An embassy requires 15 gold.');return n;}me.gold-=15;other.relations[0]=(other.relations[0]??0)+8;me.relations[civId]=(me.relations[civId]??0)+8;addLog(n,`Embassy established with ${other.name}.`);}
 if(action==='trade'){if(!n.techs.includes('currency')){addLog(n,'Currency is required for trade agreements.');return n;}if(me.gold<10){addLog(n,'A trade mission costs 10 gold.');return n;}me.gold-=10;me.relations[civId]=(me.relations[civId]??0)+5;other.relations[0]=(other.relations[0]??0)+5;me.gold+=22;addLog(n,`Trade mission with ${other.name} returned 22 gold.`);}
 if(action==='gift'){if(me.gold<20){addLog(n,'You need 20 gold to send a gift.');return n;}me.gold-=20;me.relations[civId]=(me.relations[civId]??0)+12;other.relations[0]=(other.relations[0]??0)+12;addLog(n,`Gift delivered to ${other.name}; relations improved.`);}
 if(action==='peace'){me.warWith=me.warWith.filter(id=>id!==civId);other.warWith=other.warWith.filter(id=>id!==0);me.relations[civId]=(me.relations[civId]??0)+25;other.relations[0]=(other.relations[0]??0)+25;addLog(n,`Peace treaty signed with ${other.name}.`);}
 return n;
}
export function orderProduction(g:GameState,cityId:number,item:ProductionKind):GameState{
 const n=structuredClone(g),c=n.cities.find(x=>x.id===cityId&&x.civ===0);if(!c)return g;
 if(item in UNIT_DATA){const u=item as UnitKind;const d=UNIT_DATA[u];if(!d.requires.every(r=>n.techs.includes(r))){addLog(n,`Research required to train ${u}.`);return n;}}
 else {const b=item as Building,d=BUILDING_DATA[b];if(!d||!d.requires.every(r=>n.techs.includes(r))){addLog(n,`Required technology missing for ${item}.`);return n;}if(c.buildings.includes(b)){addLog(n,`${c.name} already has ${b}.`);return n;}}
 if(c.queue.length>=5){addLog(n,'Production queue is full (maximum five orders).');return n;}
 c.queue.push(item);addLog(n,`${item} added to ${c.name}'s production queue.`);return n;
}
export function improveTile(g:GameState,unitId:number,improvement:Improvement):GameState{
 const n=structuredClone(g),u=n.units.find(v=>v.id===unitId&&v.civ===0),t=u?tileAt(n,u.x,u.y):null;if(!u||u.kind!=='Builder'||!t)return g;
 if(t.terrain==='water'&&improvement!=='Fishing Boats'&&improvement!=='Road') {addLog(n,'That improvement cannot be built on water.');return n;}
 if(t.terrain!=='water'&&improvement==='Fishing Boats'){addLog(n,'Fishing boats require coastal water.');return n;}
 if(t.terrain==='mountain'||t.improvement){addLog(n,'This tile cannot accept that improvement.');return n;}
 if(improvement==='Farm'&&t.terrain!=='grass'&&t.terrain!=='marsh'){addLog(n,'Farms require grassland or marsh.');return n;}
 if(improvement==='Mine'&&t.terrain!=='hill'){addLog(n,'Mines require hills.');return n;}
 if(improvement==='Pasture'&&t.resource!=='horses'){addLog(n,'Pastures require a horse resource.');return n;}
 if(improvement==='Fishing Boats'&&t.resource!=='fish'){addLog(n,'Fishing boats require a fish resource.');return n;}
 t.improvement=improvement;u.moves=0;addLog(n,`${improvement} completed at ${t.x+1}, ${t.y+1}.`);return n;
}
export function researchTech(g:GameState,id:string):GameState{const n=structuredClone(g),t=TECHS.find(v=>v.id===id);if(!t||n.techs.includes(id)||!t.prerequisites.every(r=>n.techs.includes(r))){addLog(n,'That technology is already researched or its prerequisites are missing.');return n;}n.currentResearch=id;n.researchProgress=0;addLog(n,`Research focus changed to ${t.name}.`);return n;}
function finishProduction(n:GameState,c:City,item:ProductionKind){
 if(item in UNIT_DATA){const k=item as UnitKind,spot=[{x:c.x,y:c.y},{x:c.x+1,y:c.y},{x:c.x-1,y:c.y},{x:c.x,y:c.y+1},{x:c.x,y:c.y-1}].find(p=>tileAt(n,p.x,p.y)&&!unitAt(n,p.x,p.y)&&tileAt(n,p.x,p.y)!.terrain!=='water'&&tileAt(n,p.x,p.y)!.terrain!=='mountain');
  if(!spot){addLog(n,`${c.name} could not deploy ${k}: nearby tiles are blocked.`);return;}
  n.units.push({id:n.nextId++,civ:c.civ,kind:k,x:spot.x,y:spot.y,moves:UNIT_DATA[k].moves,hp:UNIT_DATA[k].hp,level:c.buildings.includes('Barracks')?1:0,fortified:false});if(k==='Settler')c.population=Math.max(1,c.population-1);addLog(n,`${c.name} completed ${k}.`);
 }else{const b=item as Building;if(!c.buildings.includes(b)){c.buildings.push(b);addLog(n,`${c.name} completed ${b}.`);}}
}
export function endTurn(g:GameState):GameState{
 const n=structuredClone(g);if(n.gameOver)return g;
 const me=n.civs[0],cities=n.cities.filter(c=>c.civ===0);
 for(const c of cities){
  const y=cityYield(n,c);me.gold+=y.gold;me.science+=y.science;me.culture+=y.culture;me.faith+=y.faith;c.food+=y.food;c.production+=y.production;
  if(c.food>=c.population*8){c.food-=c.population*8;c.population++;c.border=Math.min(5,c.border+1);addLog(n,`${c.name} grew to population ${c.population}.`);}
  const item=c.queue[0];if(item){const cost=item in UNIT_DATA?UNIT_DATA[item as UnitKind].cost:BUILDING_DATA[item as Building].cost;if(c.production>=cost){c.production-=cost;c.queue.shift();finishProduction(n,c,item);}}
  for(const t of n.tiles)if(Math.abs(t.x-c.x)+Math.abs(t.y-c.y)<=c.border&&t.owner===null)t.owner=0;
 }
 const tech=TECHS.find(t=>t.id===n.currentResearch);
 if(tech&&!n.techs.includes(tech.id)&&tech.prerequisites.every(p=>n.techs.includes(p))){n.researchProgress+=Math.max(1,Math.floor(me.science/3)+cities.length);if(n.researchProgress>=tech.cost){n.techs.push(tech.id);n.researchProgress=0;addLog(n,`Technology discovered: ${tech.name}.`);const next=TECHS.find(t=>!n.techs.includes(t.id)&&t.prerequisites.every(p=>n.techs.includes(p)));if(next)n.currentResearch=next.id;}}
 me.gold+=Math.max(1,Math.floor(me.culture/10));me.score=cities.reduce((s,c)=>s+c.population*10+c.buildings.length*5,0)+n.techs.length*12+n.units.length*3;
 // Rival AI: expand, improve relations, build armies and found cities on turns.
 if(n.turn%4===0){const rivals=n.civs.filter(c=>c.id!==0&&c.alive);for(const rival of rivals){const owned=n.cities.filter(c=>c.civ===rival.id);if(owned.length===0){const settler=n.units.find(u=>u.civ===rival.id&&u.kind==='Settler');if(settler){const site=n.tiles.find(t=>t.terrain==='grass'&&!cityAt(n,t.x,t.y)&&!unitAt(n,t.x,t.y));if(site){settler.x=site.x;settler.y=site.y;n.cities.push({id:n.nextId++,civ:rival.id,name:NAMES[(rival.id*3+n.turn)%NAMES.length],x:site.x,y:site.y,population:1,food:0,production:0,queue:['Warrior'],buildings:[],hp:100,border:1,worked:[]});n.units=n.units.filter(u=>u.id!==settler.id);site.owner=rival.id;addLog(n,`${rival.name} founded a settlement.`);}}}
   const ownArmy=n.units.filter(u=>u.civ===rival.id);if(ownArmy.length<2){const home=n.cities.find(c=>c.civ===rival.id);if(home)n.units.push({id:n.nextId++,civ:rival.id,kind:'Warrior',x:home.x,y:home.y+1,moves:2,hp:100,level:0,fortified:false});}
   if(!rival.met&&n.turn>=3)rival.met=true;
  }}
 // Barbarian raiders pressure the frontier, without overwhelming the starting area.
 if(n.turn%5===0){const frontier=n.tiles.find(t=>t.explored&&t.terrain==='forest'&&!unitAt(n,t.x,t.y)&&!cityAt(n,t.x,t.y));if(frontier){n.units.push({id:n.nextId++,civ:4,kind:'Warrior',x:frontier.x,y:frontier.y,moves:2,hp:80,level:0,fortified:false});addLog(n,'Barbarian raiders spotted near the frontier.');}}
 n.turn++;n.units=n.units.map(u=>({...u,moves:u.civ===0?UNIT_DATA[u.kind].moves:2,fortified:u.fortified||false}));
 for(const t of n.tiles)if(Math.abs(t.x-4)+Math.abs(t.y-6)<=2)t.explored=true;
 if(cities.length>=4&&n.techs.includes('scientific-theory')){n.victory='Science';n.gameOver=true;addLog(n,'SCIENCE VICTORY: your civilization has entered a new age.');}
 if(me.culture>=1000){n.victory='Culture';n.gameOver=true;addLog(n,'CULTURE VICTORY: your legacy is known across the world.');}
 if(n.cities.length>0&&n.cities.every(c=>c.civ===0)){n.victory='Domination';n.gameOver=true;addLog(n,'DOMINATION VICTORY: all rival capitals have fallen.');}
 return n;
}
export function setGovernment(g:GameState,government:string,policy:string):GameState{const n=structuredClone(g);const choices=['Chiefdom','Republic','Monarchy','Merchant Republic','Democracy'];if(!choices.includes(government)){return g;}if(government!=='Chiefdom'&&!n.techs.includes('writing')){addLog(n,'Research Writing before adopting a formal government.');return n;}n.civs[0].government=government;n.civs[0].policy=policy;n.policies=[policy];addLog(n,`Government changed to ${government}; policy is ${policy}.`);return n;}
export function loadGame(raw:string):GameState{const data=JSON.parse(raw) as GameState;if(data.version!==1||!Array.isArray(data.tiles)||!Array.isArray(data.units)||!Array.isArray(data.cities)||!Array.isArray(data.civs))throw new Error('This is not a supported Redsigen save file.');if(data.width<1||data.height<1||data.tiles.length!==data.width*data.height)throw new Error('Save map dimensions are invalid.');return data;}
