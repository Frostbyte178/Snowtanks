const { weaponArray } = require('../../facilitators.js');
const g = require('../../gunvals.js');
const { 
	addSniper, addAssassin, addRifle, addHunter, addHeavySniper, addRailgun, 
	addNormal, addSpam, addGunner, 
	addHeavy, addLauncher, addShotgun, addTwister, 
	addDrone, addMinion, addAutoDrone, addHoncho, addSwarm, 
	addTrap, addAutoTrap, addAuraTrap, 
	addTrinoughtAuraRing, addTrinoughtTurretRing, addPentanoughtAuraRing, addPentanoughtTurretRing,
	mergeHexnoughtWeaponV2, makeHexnoughtBodyV2, setGladiatorMinion
} = require('./snowDreadsFacilitators.js');
const {
	enableSnowDreads,
	buildHexnoughts, useOldPhotosphere,
	hpBuffBodyStats, speedBuffBodyStats, shieldBuffBodyStats,
	pentanoughtWeapons,
} = require('./snowDreadsConstants.js');
require('./snowDreadsMisc.js');

// Navigate to [snowDreadsConstants.js] and the "enableSnowDreads" variable to enable/disable this addon.
if (!enableSnowDreads) {
	return console.log('--- Snowdreads addon [snowDreads.js] is disabled. ---');
}

// T0
Class.dreadSnowdread = {
	PARENT: "genericEggnoughtSnowdread",
	LABEL: "Dreadnought",
	UPGRADE_LABEL: "Snowdreads",
	UPGRADE_TOOLTIP: "The explosions of gunfire pierce\nthrough the quiet drifting of snow.",
	UPGRADE_COLOR: "aqua",
	LEVEL: 90,
	EXTRA_SKILL: 18,
	PROPS: [
		{
			POSITION: [15, 0, 0, 0, 1],
			TYPE: 'egg',
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "eggBaseDeco",
		},
	]
}
Class.dreadWeaponSnowdread = {
	LABEL: "",
	COLOR: 6,
	REROOT_UPGRADE_TREE: "dreadWeaponSnowdread",
}
Class.dreadBodySnowdread = {
	LABEL: "",
	COLOR: 6,
	REROOT_UPGRADE_TREE: "dreadBodySnowdread",
	PROPS: [
		{
			POSITION: [15, 0, 0, 0, 1],
			TYPE: 'egg',
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "eggBaseDeco",
		},
	]
}

// T1 Weapons
Class.swordSnowdread = {
	PARENT: "genericEggnoughtSnowdread",
	LABEL: "Sword",
	UPGRADE_TOOLTIP: "Snipers",
	GUNS: weaponArray(
		addSniper({length: 20, width: 7}, 0, [g.basic, g.sniper, g.assassin, {reload: 0.85}])
	, 2),
}
Class.sword2Snowdread = {
	PARENT: "swordSnowdread",
	BATCH_UPGRADES: true,
}
Class.pacifierSnowdread = {
	PARENT: "genericEggnoughtSnowdread",
	LABEL: "Pacifier",
	UPGRADE_TOOLTIP: "Bullet Spam",
	GUNS: weaponArray(
		addNormal({length: 15, width: 7.5}, 0, [g.basic, {reload: 0.8}])
	, 2),
}
Class.pacifier2Snowdread = {
	PARENT: "pacifierSnowdread",
	BATCH_UPGRADES: true,
}
Class.peacekeeperSnowdread = {
	PARENT: "genericEggnoughtSnowdread",
	LABEL: "Peacekeeper",
	UPGRADE_TOOLTIP: "Heavy Bullets",
	GUNS: weaponArray(
		addHeavy({length: 17, width: 9}, 0, [g.basic, {reload: 1.2, damage: 1.5}])
	, 2),
}
Class.peacekeeper2Snowdread = {
	PARENT: "peacekeeperSnowdread",
	BATCH_UPGRADES: true,
}
Class.invaderSnowdread = {
	PARENT: "genericEggnoughtSnowdread",
	LABEL: "Invader",
	UPGRADE_TOOLTIP: "Drones",
	GUNS: weaponArray(
		addDrone({length: 5, width: 9}, 0, [g.drone, g.overseer, {reload: 0.85}])
	, 2),
}
Class.invader2Snowdread = {
	PARENT: "invaderSnowdread",
	BATCH_UPGRADES: true,
}
Class.centaurSnowdread = {
	PARENT: "genericEggnoughtSnowdread",
	LABEL: "Centaur",
	UPGRADE_TOOLTIP: "Traps",
	GUNS: weaponArray(
		addTrap({length: 13, length2: 3, width: 7}, 0, [g.trap, {reload: 2, health: 4, range: 0.75}])
	, 2),
}
Class.centaur2Snowdread = {
	PARENT: "centaurSnowdread",
	BATCH_UPGRADES: true,
}

// T1 Bodies
Class.byteSnowdread = {
	PARENT: "genericEggnoughtSnowdread",
	LABEL: "Byte",
	UPGRADE_TOOLTIP: "Auto Turret",
	TURRETS: [
		{
			POSITION: [9, 0, 0, 0, 360, 2],
			TYPE: 'byteTurretSnowdread',
		},
	],
	PROPS: [
		{
			POSITION: [15, 0, 0, 0, 1],
			TYPE: 'egg',
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "eggBaseDeco",
		}, 
	]
}
Class.showerSnowdread = { // Drones
	PARENT: "genericEggnoughtSnowdread",
	LABEL: "Shower",
	UPGRADE_TOOLTIP: "Drone Turret",
	BODY: {
		SPEED: 0.93,
		FOV: 1.1,
	},
	TURRETS: [
		{
			POSITION: [10, 0, 0, 0, 360, 2],
			TYPE: "showerTurretSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [15, 0, 0, 0, 1],
			TYPE: 'egg',
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "eggBaseDeco",
		}, 
	]
}
Class.atmosphereSnowdread = {
	PARENT: "genericEggnoughtSnowdread",
	LABEL: "Atmosphere",
	UPGRADE_TOOLTIP: "Damage Aura",
	TURRETS: [
		{
			POSITION: [11, 0, 0, 0, 360, 2],
			TYPE: 'atmosphereAuraSnowdread',
		},
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 0, 1],
			TYPE: 'egg',
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "eggBaseDeco",
		}, 
	]
}
Class.juggernautSnowdread = {
	PARENT: "genericEggnoughtSnowdread",
	LABEL: "Juggernaut",
	UPGRADE_TOOLTIP: "Health Buff",
	BODY: hpBuffBodyStats[0],
	PROPS: [
		{
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "eggBaseDeco",
		}, {
			POSITION: [13, 0, 0, 0, 1],
			TYPE: ['egg', {COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 5}, BORDERLESS: true}],
		}, {
			POSITION: [6.5, 0, 0, 0, 1],
			TYPE: ['hexagon', {COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 15}, BORDERLESS: true}],
		}, {
			POSITION: [24, 0, 0, 0, 0],
			TYPE: ['egg', {COLOR: 9}]
		},
	]
}
Class.spotterSnowdread = { // FOV
	PARENT: "genericEggnoughtSnowdread",
	LABEL: "Spotter",
	UPGRADE_TOOLTIP: "FOV Boost",
	BODY: {
		FOV: 1.1,
	},
	TURRETS: [
		{
			POSITION: [13, 0, 0, 0, 360, 2],
			TYPE: 'spotterRadarSnowdread',
		},
	],
	PROPS: [
		{
			POSITION: [15, 0, 0, 0, 1],
			TYPE: 'egg',
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "eggBaseDeco",
		}, {
			POSITION: [9, 0, 0, 0, 1],
			TYPE: 'egg',
		}
	]
}

// T2 Weapons
Class.gladiusSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Gladius",
	UPGRADE_TOOLTIP: "Rifles",
	GUNS: weaponArray(
		addRifle({length: 19.5, width: 5}, 5, [g.basic, g.sniper, g.rifle, {health: 1.3}])
	, 4)
}
Class.sabreSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Sabre",
	UPGRADE_TOOLTIP: "Assassins",
	GUNS: weaponArray(
		addAssassin({length: 24, width: 6.5, x: 7}, 15, [g.basic, g.sniper, g.assassin, g.assassin, {reload: 0.85}])
	, 4)
}
Class.slingSnowdread = { // hunter
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Sling",
	UPGRADE_TOOLTIP: "Hunters",
	CONTROLLERS: [["zoom", { distance: 300 }]],
	TOOLTIP: "Hold right click to zoom.",
	GUNS: weaponArray(
		addHunter({length: 17, width: 9}, -5, [g.basic, g.sniper, g.hunter, {health: 1.1, speed: 1.05}])
	, 4)
}
Class.catapultSnowdread = { // mega-sniper
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Catapult",
	UPGRADE_TOOLTIP: "Mega-Snipers",
	GUNS: weaponArray(
		addHeavySniper({length: 22, width: 8.5, x: 7.5}, -2.5, [g.basic, g.sniper, g.predator, g.predator, g.predator, {speed: 0.93, maxSpeed: 0.93, reload: 1.333, size: 2}])
	, 4)
}
Class.dartSnowdread = { // railgun
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Dart",
	UPGRADE_TOOLTIP: "Railguns",
	GUNS: weaponArray(
		addRailgun({length: 25, width: 4, x: 7}, -2.5, [g.basic, g.sniper, g.sniper, g.sniper, g.pounder, {reload: 1.5}])
	, 4)
}
Class.mediatorSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Mediator",
	UPGRADE_TOOLTIP: "Twins",
	GUNS: weaponArray([
		...addNormal({length: 15, width: 6.5, y: 4,  delay: 0  }, 15, [g.basic, g.twin, {reload: 0.85}]),
		...addNormal({length: 15, width: 6.5, y: -4, delay: 0.5}, 15, [g.basic, g.twin, {reload: 0.85}]),
	], 4)
}
Class.negotiatorSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Negotiator",
	UPGRADE_TOOLTIP: "Machine Guns",
	GUNS: weaponArray(
		addNormal({length: 9, width: 8, aspect: 1.4, x: 6}, 12.5, [g.basic, g.machineGun, {size: 0.8, health: 1.3}])
	, 4)
}
Class.melderSnowdread = { // all auto
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Melder",
	UPGRADE_TOOLTIP: "All Autos",
	TURRETS: weaponArray({
		POSITION: [10, 9, 0, 0, 195, 0],
		TYPE: 'melderAutoSnowdread',
	}, 4)
}
Class.crackerSnowdread = { // ultra bullet spam
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Cracker",
	UPGRADE_TOOLTIP: "Miniguns",
	GUNS: weaponArray([
		...addSpam({length: 19, width: 7, delay: 0  }, 0, [g.basic, g.minigun, {reload: 0.85}]),
		...addSpam({length: 17, width: 7, delay: 1/3}, 0, [g.basic, g.minigun, {reload: 0.85}]),
		...addSpam({length: 15, width: 7, delay: 2/3}, 0, [g.basic, g.minigun, {reload: 0.85}]),
	], 4)
}
Class.grabberSnowdread = { // spread
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Grabber",
	UPGRADE_TOOLTIP: "Triple Shots",
	GUNS: weaponArray([
		...addNormal({length: 16, width: 3.75, y: -1.5, angle: -15, delay: 0.5}, 15, [g.basic, g.twin, g.tripleShot, {size: 0.95, reload: 0.95, health: 1}]),
		...addNormal({length: 16, width: 3.75, y: 1.5,  angle: 15,  delay: 0.5}, 15, [g.basic, g.twin, g.tripleShot, {size: 0.95, reload: 0.95, health: 1}]),
		...addNormal({length: 18, width: 6.75, y: 0,    angle: 0,   delay: 0  }, 15, [g.basic, g.twin, g.tripleShot, {size: 0.95, reload: 0.95, health: 1.35}]),
	], 4)
}
Class.enforcerSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Enforcer",
	UPGRADE_TOOLTIP: "Heavy Bullets",
	GUNS: weaponArray(
		addHeavy({length: 17, width: 9}, 7.5, [g.basic, g.pounder, {reload: 0.9}])
	, 4)
}
Class.executorSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Executor",
	UPGRADE_TOOLTIP: "Launchers",
	GUNS: weaponArray(
		addLauncher({length: 17, width: 9}, -2.5, [g.basic, g.pounder, g.artillery, {size: 0.9, speed: 0.5, maxSpeed: 0.4, reload: 0.8}])
	, 4)
}
Class.doserSnowdread = { // shotgun
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Doser",
	UPGRADE_TOOLTIP: "Shotguns",
	GUNS: weaponArray(
		addShotgun({length: 20, width: 10, x: 6}, 7.5, [
			{l: 15, w: 3, y: -3},
			{l: 14, w: 3, y: 3},
			{l: 17, w: 4, y: 0},
			{l: 13, w: 4, y: -1},
			{l: 12, w: 4, y: 1},
		], [g.basic, g.machineGun, g.shotgun, {health: 1.5, damage: 1.5}])
	, 4)
}
Class.swirlSnowdread = { // twister
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Swirl",
	UPGRADE_TOOLTIP: "Twisters",
	GUNS: weaponArray(
		addTwister({length: 16, width: 8.5}, 2.5, [g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, {speed: 1.3, maxSpeed: 1.3, reload: 1.333}], "swirlMissileSnowdread")
	, 4)
}
Class.pelterSnowdread = { // artillery
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Pelter",
	UPGRADE_TOOLTIP: "Artillery",
	GUNS: weaponArray([
		...addGunner({length: 15, width: 3, y: -3.5, angle: -7, delay: 0.25}, 0, [g.basic, g.pelleter, g.artillery, {health: 1.1}]),
		...addGunner({length: 15, width: 3, y: 3.5,  angle: 7,  delay: 0.75}, 0, [g.basic, g.pelleter, g.artillery, {health: 1.1}]),
		...addHeavy({length: 17, width: 8}, 7.5, [g.basic, g.pounder, g.artillery, {health: 1.1}]),
	], 4)
}
Class.inquisitorSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Inquisitor",
	UPGRADE_TOOLTIP: "Drones",
	GUNS: weaponArray(
		addDrone({length: 5, width: 10, aspect: 1.1, x: 8}, -2.5, [g.drone, g.overseer, g.overseer, {size: 1.5, reload: 0.6}], 3)
	, 4)
}
Class.assailantSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Assailant",
	UPGRADE_TOOLTIP: "Minions",
	GUNS: weaponArray(
		addMinion({length: 12, gap: 3, width: 11}, 2.5, [g.factory, {size: 0.9, reload: 0.5}])
	, 4)
}
Class.radiationSnowdread = { // auto-drones
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Radiation",
	UPGRADE_TOOLTIP: "Auto-Drones",
	GUNS: weaponArray(
		addAutoDrone({length: 6, width: 10}, 0, [g.drone, g.overseer, {reload: 0.8}], 3)
	, 4)
}
Class.boxerSnowdread = { // honcho
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Boxer",
	UPGRADE_TOOLTIP: "Heavy Drones",
	GUNS: weaponArray([
		...addHoncho({length: 5, width: 9, aspect: 1.5, angle: 0,  x: 8}, -2.5, [g.drone, g.overseer, g.overseer, g.honcho], 2),
		...addHoncho({length: 5, width: 9, aspect: 1.5, angle: 90, x: 8}, -2.5, [g.drone, g.overseer, g.overseer, g.honcho], 1),
	], 2)
}
Class.disablerSnowdread = { // swarms
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Disabler",
	UPGRADE_TOOLTIP: "Swarms",
	GUNS: weaponArray([
		...addSwarm({length: 7, width: 7, x: 6, y: 3.5,  delay: 0  }, 0, [g.swarm, g.overseer, g.overseer, {reload: 1.5}]),
		...addSwarm({length: 7, width: 7, x: 6, y: -3.5, delay: 0.5}, 0, [g.swarm, g.overseer, g.overseer, {reload: 1.5}]),
	], 4)
}
Class.daemonSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Daemon",
	UPGRADE_TOOLTIP: "Trap Spam",
	GUNS: weaponArray([
		...addTrap({length: 11.5, length2: 2, width: 4.5, aspect: 1.7, y: 4.5 }, 10, [g.trap, g.twin, {reload: 2, health: 3.5}]),
		...addTrap({length: 11.5, length2: 2, width: 4.5, aspect: 1.7, y: -4.5}, 10, [g.trap, g.twin, {reload: 2, health: 3.5}]),
	], 4)
}
Class.minotaurSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Minotaur",
	UPGRADE_TOOLTIP: "Blocks",
	GUNS: weaponArray(
		addTrap({length: 13, length2: 3.75, width: 7, aspect: 1.75}, 7.5, [g.trap, g.setTrap, {reload: 2, health: 2}], true)
	, 4)
}
Class.cleanerSnowdread = { // auto-traps
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Cleaner",
	UPGRADE_TOOLTIP: "Auto-Traps",
	GUNS: weaponArray(
		addAutoTrap({length: 15, width: 6, aspect: 1.7}, 5, [g.trap, {health: 1.2, reload: 1.15, speed: 0.8}], 7)
	, 4)
}
Class.shadeSnowdread = { // aura-traps
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Shade",
	UPGRADE_TOOLTIP: "Aura-Traps",
	GUNS: weaponArray(
		addAuraTrap({length: 14, length2: 3, width: 7, aspect: 1.6, x: 8}, 5, [g.trap, g.hexaTrapper, {shudder: 0.6, health: 1.25}], 100)
	, 4)
}
Class.screwdriverSnowdread = { // trap + gun
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Screwdriver",
	UPGRADE_TOOLTIP: "Traps + Bullets",
	GUNS: weaponArray([
		...addNormal({length: 19, width: 7}, 10, [g.basic, g.flankGuard], false),
		...addTrap({length: 13, length2: 3.75, width: 7, aspect: 1.75}, 10, [g.trap, g.hexaTrapper]),
	], 4)
}

// T2 Bodies
Class.automationSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Automation",
	UPGRADE_TOOLTIP: "Small Auto Turrets",
	TURRETS: weaponArray({
		POSITION: [4, 9, 0, 45, 200, 2],
		TYPE: "spamAutoTurretSnowdread",
	}, 4),
	PROPS: [
		{
			POSITION: [11, 0, 0, 0, 1],
			TYPE: ["square", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "squareBaseDeco",
		}, {
			POSITION: [8, 0, 0, 0, 1],
			TYPE: ["square", {BORDERLESS: true, COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 15}}],
		},
	],
}
Class.kilobyteSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Kilobyte",
	UPGRADE_TOOLTIP: "Heavy Auto Turret",
	TURRETS: [
		{
			POSITION: [10, 0, 0, 0, 360, 2],
			TYPE: "kilobyteTurretSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [12, 0, 0, 0, 1],
			TYPE: ["square", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "squareBaseDeco",
		}, 
	],
}
Class.lighterSnowdread = { // Flamethrower
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Lighter",
	UPGRADE_TOOLTIP: "Flamethrower",
	TURRETS: [
		{
			POSITION: [9, 0, 0, 0, 360, 2],
			TYPE: 'lighterTurretSnowdread',
		}
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 0, 1],
			TYPE: ["square", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "squareBaseDeco",
		}
	]
}
Class.stormSnowdread = { // Drones
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Storm",
	UPGRADE_TOOLTIP: "Drone Turret",
	BODY: {
		SPEED: 0.93,
		FOV: 1.1,
	},
	TURRETS: [
		{
			POSITION: [10, 0, 0, 0, 360, 2],
			TYPE: 'stormTurretSnowdread',
		}
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 0, 1],
			TYPE: ["square", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "squareBaseDeco",
		}
	]
}
Class.coronaSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Corona",
	UPGRADE_TOOLTIP: "Damage Aura",
	TURRETS: [
		{
			POSITION: [11, 0, 0, 0, 360, 2],
			TYPE: "coronaAuraSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 0, 1],
			TYPE: ["square", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "squareBaseDeco",
		}, 
	]
}
Class.thermosphereSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Thermosphere",
	UPGRADE_TOOLTIP: "Healing Aura",
	TURRETS: [
		{
			POSITION: [11, 0, 0, 0, 360, 2],
			TYPE: "thermosphereAuraSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 0, 1],
			TYPE: ["square", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "squareBaseDeco",
		}
	]
}
Class.jumboSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Jumbo",
	UPGRADE_TOOLTIP: "Health Buff",
	BODY: hpBuffBodyStats[1],
	PROPS: [
		{
			POSITION: [13, 0, 0, 0, 1],
			TYPE: ['square', {COLOR: 9}]
		}, {
			POSITION: [7, 0, 0, 0, 1],
			TYPE: ['octogon', {COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10}, BORDERLESS: true}]
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "squareBaseDeco",
		}, {
			POSITION: [24, 0, 0, 0, -1],
			TYPE: ['square', {COLOR: 9}]
		},
	],
}
Class.colossusSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Colossus",
	UPGRADE_TOOLTIP: "Speed Buff",
	BODY: speedBuffBodyStats[0],
	PROPS: [
		{
			POSITION: [13, 0, 0, 0, 1],
			TYPE: 'colossusTopSnowdread',
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "squareBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: 'colossusBottomSnowdread',
		},
	],
}
Class.brassSnowdread = { // Shield buff
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Brass",
	UPGRADE_TOOLTIP: "Shield Buff",
	BODY: shieldBuffBodyStats[0],
	PROPS: [
		{
			POSITION: [7, 0, 0, 0, 1],
			TYPE: "brassTopSnowdread",
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "squareBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "brassBottomSnowdread",
		}
	],
}
Class.spySnowdread = { // FOV
	PARENT: "genericSquarenoughtSnowdread",
	LABEL: "Spy",
	UPGRADE_TOOLTIP: "FOV Boost",
	BODY: {
		FOV: 1.2,
		SPEED: 0.95,
	},
	TURRETS: [
		{
			POSITION: [13, 0, 0, 0, 360, 2],
			TYPE: 'spyRadarSnowdread',
		}
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 0, 1],
			TYPE: ['square', {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}]
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "squareBaseDeco",
		}, {
			POSITION: [10.5, 0, 0, 0, 1],
			TYPE: ['egg', {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}}]
		}, {
			POSITION: [7.5, 0, 0, 0, 1],
			TYPE: ['egg', {COLOR: -1}]
		}
	]
}

// T3 Weapons
Class.bladeSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Blade",
	UPGRADE_TOOLTIP: "Muskets",
	GUNS: weaponArray(
		addRifle({length: 18, width: 5}, 0, [g.basic, g.sniper, g.rifle, g.twin, {speed: 0.8, health: 1.5}], true)
	, 3)
}
Class.bayonetSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Bayonet",
	UPGRADE_TOOLTIP: "Assassins",
	GUNS: weaponArray(
		addAssassin({length: 28, width: 6.5, x: 7}, 7.5, [g.basic, g.sniper, g.assassin, g.assassin, g.assassin, {reload: 0.8, density: 0.4}])
	, 3)
}
Class.atlatlSnowdread = { // hunter
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Atlatl",
	UPGRADE_TOOLTIP: "X-Hunters",
	CONTROLLERS: [["zoom", { distance: 500 }]],
	TOOLTIP: "Hold right click to zoom.",
	GUNS: weaponArray([
		...addHunter({length: 18, width: 9}, -5, [g.basic, g.sniper, g.assassin, g.hunter, {health: 1.1}]),
		{
			POSITION: [5, 9, -1.6, 6, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -20, SATURATION_SHIFT: 0.5 } },
		}, {
			POSITION: [5, 7.5, -1.6, 4.5, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 10 } },
		},
	], 3)
}
Class.ballistaSnowdread = { // mega-sniper
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Ballista",
	UPGRADE_TOOLTIP: "Mega-Snipers",
	GUNS: weaponArray(
		addHeavySniper({length: 23.5, width: 9.5, x: 6.5}, -2.5, [g.basic, g.sniper, g.predator, g.predator, g.predator, {speed: 0.93, maxSpeed: 0.93, reload: 1.7, health: 1.2, size: 2}])
	, 3)
}
Class.barbSnowdread = { // railgun
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Barb",
	UPGRADE_TOOLTIP: "Railguns",
	GUNS: weaponArray(
		addRailgun({length: 26.5, width: 4, x: 7}, 0, [g.basic, g.sniper, g.sniper, g.sniper, g.pounder, {reload: 1.5, damage: 1.2}])
	, 3)
}
Class.mitigatorSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Mitigator",
	UPGRADE_TOOLTIP: "Twins",
	GUNS: weaponArray([
		...addNormal({length: 10, width: 7.25, x: 3, y: 4.5,  delay: 0  }, 5, [g.basic, {reload: 0.85}]),
		...addNormal({length: 10, width: 7.25, x: 3, y: -4.5, delay: 0.5}, 5, [g.basic, {reload: 0.85}]),
	], 3)
}
Class.appeaserSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Appeaser",
	UPGRADE_TOOLTIP: "Machine Guns",
	GUNS: weaponArray([
		...addNormal({length: 7, width: 10, aspect: 1.35, x: 6}, 7.5, [g.basic, g.machineGun, {size: 0.8}], false),
		...addNormal({length: 7, width: 9,  aspect: 1.3,  x: 8}, 7.5, [g.basic, g.machineGun, {size: 0.8, reload: 0.9}]),
	], 3)
}
Class.amalgamSnowdread = { // all auto
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Amalgam",
	UPGRADE_TOOLTIP: "All Autos",
	TOOLTIP: "Reverse tank to focus more fire.",
	TURRETS: weaponArray({
		POSITION: [11, 7, 0, 0, 190, 0],
		TYPE: 'amalgamAutoSnowdread',
	}, 3)
}
Class.breakerSnowdread = { // ultra bullet spam
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Breaker",
	UPGRADE_TOOLTIP: "Nailguns",
	GUNS: weaponArray([
		...addSpam({length: 17.5, width: 2.75, y: -3, delay: 1/3}, 0, [g.basic, g.pelleter, g.power, g.nailgun, {speed: 1.05, maxSpeed: 1.05}]),
		...addSpam({length: 17.5, width: 2.75, y: 3,  delay: 2/3}, 0, [g.basic, g.pelleter, g.power, g.nailgun, {speed: 1.05, maxSpeed: 1.05}]),
		...addSpam({length: 20,   width: 3.25, y: 0,  delay: 0  }, 0, [g.basic, g.pelleter, g.power, g.nailgun, {speed: 1.05, maxSpeed: 1.05, size: 2.75/3.25}]),
		{
			POSITION: [10, 8.5, 0.6, 4, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 10 } },
		}, {
			POSITION: [5.5, 9, -1.8, 5.5, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.7 }, },
		}, {
			POSITION: [5.5, 7.5, -1.8, 4, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 10 } },
		},
	], 3)
}
Class.clasperSnowdread = { // spread
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Clasper",
	UPGRADE_TOOLTIP: "Penta Shots",
	GUNS: weaponArray([
		...addNormal({length: 15.5, width: 7, y: -1.5, angle: -15, delay: 0.5}, 7.5, [g.basic, g.twin, g.tripleShot, {size: 0.95, reload: 1.15, health: 1.35}]),
		...addNormal({length: 15.5, width: 7, y: 1.5,  angle: 15,  delay: 0.5}, 7.5, [g.basic, g.twin, g.tripleShot, {size: 0.95, reload: 1.15, health: 1.35}]),
		...addNormal({length: 17.5, width: 7, y: 0,    angle: 0,   delay: 0  }, 7.5, [g.basic, g.twin, g.tripleShot, {size: 0.95, reload: 1.15, health: 1.35}]),
	], 3)
}
Class.suppressorSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Suppressor",
	UPGRADE_TOOLTIP: "Destroyers",
	GUNS: weaponArray(
		addHeavy({length: 16.5, width: 10.5}, 0, [g.basic, g.pounder, g.destroyer, {reload: 0.85}])
	, 3)
}
Class.inhibitorSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Inhibitor",
	UPGRADE_TOOLTIP: "Skimmers",
	GUNS: weaponArray(
		addLauncher({length: 15, width: 11.5}, -5, [g.basic, g.pounder, g.artillery, g.skimmer, {size: 0.9, reload: 1.5}], true, "superMissileSnowdread")
	, 3)
}
Class.tranquilizerSnowdread = { // shotgun
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Tranquilizer",
	UPGRADE_TOOLTIP: "Shotguns",
	GUNS: weaponArray(
		addShotgun({length: 19.5, width: 11, x: 5}, 0, [
			{l: 15, w: 3, y: -3},
			{l: 15, w: 3, y: 3},
			{l: 17, w: 4, y: 0},
			{l: 13, w: 4, y: -1},
			{l: 12, w: 5, y: 1},
			{l: 12, w: 5, y: 0},
		], [g.basic, g.machineGun, g.shotgun, {health: 1.5, damage: 1.5}])
	, 3)
}
Class.spiralSnowdread = { // twister
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Spiral",
	UPGRADE_TOOLTIP: "Twisters",
	GUNS: weaponArray(
		addTwister({length: 17, width: 9.5, aspect: -1.25}, -5, [g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, {speed: 1.55, maxSpeed: 1.3, reload: 1.333}], "spiralMissileSnowdread")
	, 3)
}
Class.shellerSnowdread = { // artillery
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Sheller",
	UPGRADE_TOOLTIP: "Mortars",
	GUNS: weaponArray([
		...addGunner({length: 12.5, width: 3, y: -6, angle: -7, delay: 0.6}, -5, [g.basic, g.pelleter, g.artillery]),
		...addGunner({length: 12.5, width: 3, y: 6,  angle: 7,  delay: 0.8}, -5, [g.basic, g.pelleter, g.artillery]),
		...addGunner({length: 15.5, width: 3, y: -4, angle: -7, delay: 0.2}, -5, [g.basic, g.pelleter, g.artillery]),
		...addGunner({length: 15.5, width: 3, y: 4,  angle: 7,  delay: 0.4}, -5, [g.basic, g.pelleter, g.artillery]),
		...addHeavy({length: 17.5, width: 9, angle: 0}, 0, [g.basic, g.destroyer, g.artillery])
	], 3)
}
Class.infiltratorSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Infiltrator",
	UPGRADE_TOOLTIP: "Drones",
	GUNS: weaponArray([
		...addDrone({length: 5, width: 6, aspect: 1.4, x: 6, y: 5.5 }, -5, [g.drone, g.overseer, g.overseer, {size: 1.5, reload: 0.6}], 2),
		...addDrone({length: 5, width: 6, aspect: 1.4, x: 6, y: -5.5}, -5, [g.drone, g.overseer, g.overseer, {size: 1.5, reload: 0.6}], 2),
		...addDrone({length: 5, width: 6, aspect: 1.4, x: 8, y: 0   }, -5, [g.drone, g.overseer, g.overseer, g.pounder, {size: 2, reload: 0.4}], 2, "betadrone"),
	], 3)
}
Class.aggressorSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Aggressor",
	UPGRADE_TOOLTIP: "Minions",
	GUNS: weaponArray(
		addMinion({length: 12, gap: 3, width: 12}, 0, [g.factory, {size: 0.9, reload: 0.5}], "aggressorMinionSnowdread", 2)
	, 3)
}
Class.haloSnowdread = { // auto-drones
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Halo",
	UPGRADE_TOOLTIP: "Auto-Drones",
	GUNS: weaponArray(
		addAutoDrone({length: 5, width: 12.5, aspect: 1.2, x: 8}, -7.5, [g.drone, g.overseer, {reload: 1.2, size: 0.8, speed: 1.15, maxSpeed: 1.15}], 4)
	, 3)
}
Class.sluggerSnowdread = { // honcho
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Slugger",
	UPGRADE_TOOLTIP: "Heavy Drones",
	GUNS: weaponArray(
		addHoncho({length: 5, width: 10.5, aspect: 1.5, x: 8}, -7.5, [g.drone, g.overseer, g.honcho, {maxSpeed: 0.9, size: 0.75}], 2)
	, 3)
}
Class.debilitatorSnowdread = { // swarms
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Debilitator",
	UPGRADE_TOOLTIP: "Swarms",
	GUNS: weaponArray([
		...addSwarm({length: 7, width: 8, aspect: 0.6, x: 6, y: 4,  delay: 0  }, 0, [g.swarm, g.flankGuard, {reload: 1.3}]),
		...addSwarm({length: 7, width: 8, aspect: 0.6, x: 6, y: -4, delay: 0.5}, 0, [g.swarm, g.flankGuard, {reload: 1.3}]),
		{
			POSITION: [2.5, 12, 0.85, 8, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5}},
		},
	], 3)
}
Class.hydraSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Hydra",
	UPGRADE_TOOLTIP: "Trap Spam",
	GUNS: weaponArray([
		...addTrap({length: 6,  length2: 2,   width: 3.5, aspect: 1.8, x: 4, y: 7.5,  delay: 2/3}, 2.5, [g.trap, g.twin, g.pounder, {speed: 1.2}]),
		...addTrap({length: 6,  length2: 2,   width: 3.5, aspect: 1.8, x: 4, y: -7.5, delay: 1/3}, 2.5, [g.trap, g.twin, g.pounder, {speed: 1.2}]),
		...addTrap({length: 12, length2: 2.5, width: 5,   aspect: 1.7, x: 0, y: 0,    delay: 0  }, 2.5, [g.trap, g.setTrap, g.twin, g.pounder, {speed: 1.2, reload: 1/1.1}], true),
	], 3)
}
Class.beelzebubSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Beelzebub",
	UPGRADE_TOOLTIP: "Blocks",
	GUNS: weaponArray(
		addTrap({length: 12.5, length2: 3.5, width: 9, aspect: 1.6}, 0, [g.trap, g.setTrap, g.pounder, {speed: 1.3, maxSpeed: 1.3, size: 1.2, health: 2}], true)
	, 3)
}
Class.sweeperSnowdread = { // auto-traps
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Sweeper",
	UPGRADE_TOOLTIP: "Auto-Boxes",
	GUNS: weaponArray(
		addAutoTrap({length: 15.5, length2: 2, width: 9.5, aspect: 1.3}, -2.5, [g.trap, g.setTrap, {reload: 2.25}], 4, true)
	, 3)
}
Class.aegisSnowdread = { // aura-traps
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Aegis",
	UPGRADE_TOOLTIP: "Aura-Boxes",
	GUNS: weaponArray(
		addAuraTrap({length: 14, length2: 3, width: 9.5, aspect: 1.45, x: 7}, 0, [g.trap, g.setTrap, g.hexaTrapper, {reload: 1.85, range: 1.4, health: 2.4}], 6, true)
	, 3)
}
Class.drillSnowdread = { // trap + gun
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Drill",
	UPGRADE_TOOLTIP: "Blocks + Bullets",
	GUNS: weaponArray([
		...addNormal({length: 18, width: 7}, 2.5, [g.basic, g.flankGuard]),
		...addTrap({length: 12, length2: 3, width: 8.5, aspect: 1.4}, 2.5, [g.trap, g.setTrap, g.hexaTrapper, {size: 0.85}], true)
	], 3)
}

// T3 Bodies
Class.mechanismSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Mechanism",
	UPGRADE_TOOLTIP: "Small Auto Spam",
	TURRETS: weaponArray([
		{
			POSITION: [3.5, 6, 0, 0, 180, 2],
			TYPE: "spamAutoTurretSnowdread",
		}, {
			POSITION: [3.5, 10, 0, 60, 200, 2],
			TYPE: "spamAutoTurretSnowdread",
		},
	], 3),
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	],
}
Class.fusionSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Fusion",
	UPGRADE_TOOLTIP: "Damage Aura + Small Autos",
	TURRETS: [
		...addTrinoughtTurretRing(),
		{
			POSITION: [9.5, 0, 0, 0, 360, 2],
			TYPE: "trinoughtBigAuraSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [15, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	]
}
Class.binarySnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Binary",
	UPGRADE_TOOLTIP: "Heavy Auto + Small Autos",
	TURRETS: [
		...addTrinoughtTurretRing(),
		{
			POSITION: [10, 0, 0, 0, 360, 2],
			TYPE: "kilobyteTurretSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [15, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	]
}
Class.exosphereSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Exosphere",
	UPGRADE_TOOLTIP: "Healing Aura + Small Autos",
	TURRETS: [
		...addTrinoughtTurretRing(),
		{
			POSITION: [9.5, 0, 0, 0, 360, 2],
			TYPE: "trinoughtBigHealAuraSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [15, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	]
}
Class.megabyteSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Megabyte",
	UPGRADE_TOOLTIP: "Heavy Auto Turret",
	TURRETS: [
		{
			POSITION: [11, 0, 0, 0, 360, 2],
			TYPE: "megabyteTurretSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [15, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	]
}
Class.trojanSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Trojan",
	UPGRADE_TOOLTIP: "Heavy Auto + Damage Auras",
	TURRETS: [
		...addTrinoughtAuraRing(),
		{
			POSITION: [10, 0, 0, 0, 360, 2],
			TYPE: "kilobyteTurretSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	]
}
Class.hardwareSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Hardware",
	UPGRADE_TOOLTIP: "Heavy Auto + Healing Auras",
	TURRETS: [
		...addTrinoughtAuraRing(true),
		{
			POSITION: [10, 0, 0, 0, 360, 2],
			TYPE: "kilobyteTurretSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	]
}
Class.burnerSnowdread = { // Flamethrower
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Burner",
	UPGRADE_TOOLTIP: "Flamethrower",
	TURRETS: [
		{
			POSITION: [9, 0, 0, 0, 360, 2],
			TYPE: 'burnerTurretSnowdread',
		}
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	]
}
Class.tempestSnowdread = { // Drones
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Tempest",
	UPGRADE_TOOLTIP: "Drone Turret",
	BODY: {
		SPEED: 0.93,
		FOV: 1.1,
	},
	TURRETS: [
		{
			POSITION: [10, 0, 0, 0, 360, 2],
			TYPE: 'tempestTurretSnowdread',
		},
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	]
}
Class.chromosphereSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Chromosphere",
	UPGRADE_TOOLTIP: "Damage Auras",
	TURRETS: [
		...addTrinoughtAuraRing(),
		{
			POSITION: [9.5, 0, 0, 0, 360, 2],
			TYPE: "trinoughtBigAuraSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	]
}
Class.mesosphereSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Mesosphere",
	UPGRADE_TOOLTIP: "Healing Auras",
	TURRETS: [
		...addTrinoughtAuraRing(true),
		{
			POSITION: [9.5, 0, 0, 0, 360, 2],
			TYPE: "trinoughtBigHealAuraSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	]
}
Class.goliathSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Goliath",
	UPGRADE_TOOLTIP: "Health Buff",
	BODY: hpBuffBodyStats[2],
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ['triangle', {COLOR: 9}]
		}, {
			POSITION: [24, 0, 0, 180, -1],
			TYPE: ['triangle', {COLOR: 9}]
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	],
}
Class.planetSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Planet",
	UPGRADE_TOOLTIP: "Health Buff + Damage Auras",
	BODY: hpBuffBodyStats[1],
	TURRETS: addTrinoughtAuraRing(),
	PROPS: [
		{
			POSITION: [24, 0, 0, 180, -1],
			TYPE: ['triangle', {COLOR: 9}]
		}, {
			POSITION: [13, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	]
}
Class.moonSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Moon",
	UPGRADE_TOOLTIP: "Health Buff + Healing Auras",
	BODY: hpBuffBodyStats[1],
	TURRETS: addTrinoughtAuraRing(true),
	PROPS: [
		{
			POSITION: [24, 0, 0, 180, -1],
			TYPE: ['triangle', {COLOR: 9}]
		}, {
			POSITION: [13, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	]
}
Class.burgSnowdread = { // HP + auto spam
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Burg",
	UPGRADE_TOOLTIP: "Health Buff + Small Autos",
	BODY: hpBuffBodyStats[1],
	TURRETS: addTrinoughtTurretRing(),
	PROPS: [
		{
			POSITION: [24, 0, 0, 180, -1],
			TYPE: ['triangle', {COLOR: 9}]
		}, {
			POSITION: [13, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		},
	]
}
Class.titanSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Titan",
	UPGRADE_TOOLTIP: "Speed Buff",
	BODY: speedBuffBodyStats[1],
	PROPS: [
		{
			POSITION: [11, 0, 0, 0, 1],
			TYPE: "titanTopSnowdread"
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "titanTopSnowdread"
		},
	],
}
Class.sirenSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Siren",
	UPGRADE_TOOLTIP: "Speed Buff + Damage Auras",
	BODY: speedBuffBodyStats[0],
	TURRETS: addTrinoughtAuraRing(),
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "titanTopSnowdread"
		},
	]
}
Class.harpySnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Harpy",
	UPGRADE_TOOLTIP: "Speed Buff + Healing Auras",
	BODY: speedBuffBodyStats[0],
	TURRETS: addTrinoughtAuraRing(true),
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "titanTopSnowdread"
		},
	]
}
Class.batonSnowdread = { // Speed + auto spam
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Baton",
	UPGRADE_TOOLTIP: "Speed Buff + Small Autos",
	BODY: speedBuffBodyStats[0],
	TURRETS: addTrinoughtTurretRing(),
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "titanTopSnowdread"
		},
	]
}
Class.armadaSnowdread = { // Speed + HP
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Armada",
	UPGRADE_TOOLTIP: "Speed Buff + Health Buff",
	BODY: {
		HEALTH: 1.55, 
		SPEED: 1.85,
		SHIELD: 1.4, 
		REGEN: 1.3,
	},
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ['triangle', {COLOR: 9}]
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "titanTopSnowdread"
		},
	],
}
Class.steelSnowdread = { // Shield buff
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Steel",
	UPGRADE_TOOLTIP: "Shield Buff",
	BODY: shieldBuffBodyStats[1],
	PROPS: [
		{
			POSITION: [9, 0, 0, 0, 1],
			TYPE: "steelTopSnowdread",
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "steelBottomSnowdread",
		}
	],
}
Class.flintSnowdread = { // Shield buff + auras
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Flint",
	UPGRADE_TOOLTIP: "Shielf Buff + Damage Auras",
	BODY: shieldBuffBodyStats[0],
	TURRETS: addTrinoughtAuraRing(),
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "steelBottomSnowdread",
		}
	],
}
Class.martensiteSnowdread = { // Shield buff + heal auras
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Martensite",
	UPGRADE_TOOLTIP: "Shield Buff + Healing Auras",
	BODY: shieldBuffBodyStats[0],
	TURRETS: addTrinoughtAuraRing(true),
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "steelBottomSnowdread",
		}
	],
}
Class.ceramicSnowdread = { // Shield buff + auto spam
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Ceramic",
	UPGRADE_TOOLTIP: "Shielf Buff + Small Autos",
	BODY: shieldBuffBodyStats[0],
	TURRETS: addTrinoughtTurretRing(),
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "steelBottomSnowdread",
		}
	],
}
Class.tungstenSnowdread = { // Speed + shield
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Tungsten",
	UPGRADE_TOOLTIP: "Speed Buff + Shield Buff",
	BODY: {
		HEALTH: 0.95, 
		SPEED: 1.8,
		SHIELD: 1.35, 
		REGEN: 1.35,
	},
	PROPS: [
		{
			POSITION: [9, 0, 0, 0, 1],
			TYPE: "steelTopSnowdread",
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "titanTopSnowdread",
		}
	],
}
Class.diamondSnowdread = { // Shield + HP
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Diamond",
	UPGRADE_TOOLTIP: "HP Buff + Shield Buff",
	BODY: {
		HEALTH: 1.6,
		SPEED: 1.4,
		SHIELD: 1.9,
		REGEN: 1.6,
	},
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ['triangle', {COLOR: 9}]
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "steelBottomSnowdread",
		}
	],
}
Class.monitorSnowdread = { // FOV
	PARENT: "genericTrinoughtSnowdread",
	LABEL: "Monitor",
	UPGRADE_TOOLTIP: "FOV Boost",
	BODY: {
		FOV: 1.3,
		SPEED: 0.9,
	},
	TURRETS: [
		{
			POSITION: [15, 0, 0, 0, 360, 2],
			TYPE: 'monitorRadarSnowdread'
		}
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ['triangle', {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "triangleBaseDeco",
		}, {
			POSITION: [9, 0, 0, 0, 1],
			TYPE: ['egg', {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5}}]
		}, {
			POSITION: [7, 0, 0, 0, 1],
			TYPE: ['egg', {COLOR: -1}]
		},
	]
}

// T4 Weapons
Class.rapierSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Rapier",
	UPGRADE_TOOLTIP: "Muskets",
	GUNS: weaponArray(
		addRifle({length: 18, width: 4.5}, 2.5, [g.basic, g.sniper, g.rifle, {speed: 0.8, health: 1.5}], true)
	, 5)
}
Class.javelinSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Javelin",
	UPGRADE_TOOLTIP: "Assassins",
	GUNS: weaponArray(
		addAssassin({length: 28, width: 6.5, x: 8}, 7.5, [g.basic, g.sniper, g.assassin, g.assassin, g.assassin, g.assassin, {reload: 0.8, density: 2/9, speed: 0.8, maxSpeed: 0.8, health: 1.25}])
	, 5)
}
Class.javelinSnowdreadHex = { // exception
	GUNS: weaponArray(
		addAssassin({length: 26, width: 5.5, x: 8}, 7.5, [g.basic, g.sniper, g.assassin, g.assassin, g.assassin, g.assassin, {reload: 0.8, density: 2/9, speed: 0.8, maxSpeed: 0.8, health: 1.25}])
	, 5)
}
Class.woomeraSnowdread = { // hunter
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Woomera",
	UPGRADE_TOOLTIP: "X-Predators",
	CONTROLLERS: [["zoom", { distance: 450 }]],
	TOOLTIP: "Hold right click to zoom.",
	GUNS: weaponArray([
		...addHunter({length: 19, width: 8.5, dimensionDiff: 2, barrelCount: 3}, -5, [g.basic, g.sniper, g.assassin, g.hunter, g.predator, {health: 1.1}]),
		{
			POSITION: [5, 9.5, -1.6, 7.5, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -15, SATURATION_SHIFT: 0.5 }, },
		}, {
			POSITION: [5, 8, -1.6, 6, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 15 } },
		},
	], 5)
}
Class.woomeraSnowdreadHex = { // exception
	GUNS: weaponArray([
		...addHunter({length: 18, width: 6.75, dimensionDiff: 1.7, barrelCount: 3}, -5, [g.basic, g.sniper, g.assassin, g.hunter, g.predator, {health: 1.1}]),
		{
			POSITION: [5, 7.5, -1.6, 7.5, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -15, SATURATION_SHIFT: 0.5 }, },
		}, {
			POSITION: [5, 6.5, -1.6, 6, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 15 } },
		},
	], 5)
}
Class.trebuchetSnowdread = { // mega-sniper
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Trebuchet",
	UPGRADE_TOOLTIP: "Mega-Snipers",
	GUNS: weaponArray(
		addHeavySniper({length: 24, width: 9, x: 8.5}, -2.5, [g.basic, g.sniper, g.predator, g.predator, g.predator, g.predator, {speed: 0.93, maxSpeed: 0.93, reload: 1.7, health: 1.4, size: 2}])
	, 5)
}
Class.trebuchetSnowdreadHex = { // exception
	GUNS: weaponArray(
		addHeavySniper({length: 22.5, width: 7.2, x: 8.5}, -2.5, [g.basic, g.sniper, g.predator, g.predator, g.predator, g.predator, {speed: 0.93, maxSpeed: 0.93, reload: 1.7, health: 1.4, size: 2}])
	, 5)
}
Class.boltSnowdread = { // railgun
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Bolt",
	UPGRADE_TOOLTIP: "Railguns",
	GUNS: weaponArray(
		addRailgun({length: 28.5, width: 4, x: 8}, -2.5, [g.basic, g.sniper, g.sniper, g.sniper, g.pounder, {reload: 1.5, damage: 1.2, speed: 1.2, maxSpeed: 1.2}])
	, 5)
}
Class.diplomatSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Diplomat",
	UPGRADE_TOOLTIP: "Triplets",
	GUNS: weaponArray([
		...addNormal({length: 14, width: 7, y: 3.15,  delay: 0.5}, 10, [g.basic, g.spam, g.spam, {size: 0.85}]),
		...addNormal({length: 14, width: 7, y: -3.15, delay: 0.5}, 10, [g.basic, g.spam, g.spam, {size: 0.85}]),
		...addNormal({length: 16, width: 7, y: 0,     delay: 0  }, 10, [g.basic, g.spam, g.spam, {size: 0.85}]),
	], 5)
}
Class.arbitratorSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Arbitrator",
	UPGRADE_TOOLTIP: "Machine Guns",
	GUNS: weaponArray([
		...addNormal({length: 8, width: 10.75, aspect: 1.33, x: 5.5}, 10, [g.basic, g.machineGun, g.spam, g.spam, {size: 0.7,  reload: 1.2}], false),
		...addNormal({length: 8, width: 9.5,   aspect: 1.33, x: 7.5}, 10, [g.basic, g.machineGun, g.spam, g.spam, {size: 0.65, reload: 1.1}]),
		...addNormal({length: 8, width: 7.25,  aspect: 1.25, x: 9.5}, 10, [g.basic, g.machineGun, g.spam, g.spam, {size: 0.6,  reload: 1  }]),
	], 5)
}
Class.dissolverSnowdread = { // all auto
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Dissolver",
	UPGRADE_TOOLTIP: "All Autos",
	TURRETS: weaponArray([{
		POSITION: [9, 10, 0, 0, 200, 0],
		TYPE: 'dissolverAutoSnowdread',
	}], 5)
}
Class.eroderSnowdread = { // ultra bullet spam
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Eroder",
	UPGRADE_TOOLTIP: "Rimflaks",
	GUNS: weaponArray([
		...addSpam({length: 14.5, width: 4, y: 4.5,  delay: 0   }, 0, [g.basic, g.minigun, {health: 1.1}]),
		...addSpam({length: 12.5, width: 4, y: 4.5,  delay: 0.5 }, 0, [g.basic, g.minigun, {health: 1.1}]),
		...addSpam({length: 14.5, width: 4, y: -4.5, delay: 0.25}, 0, [g.basic, g.minigun, {health: 1.1}]),
		...addSpam({length: 12.5, width: 4, y: -4.5, delay: 0.75}, 0, [g.basic, g.minigun, {health: 1.1}]),
		...addGunner({length: 19, width: 1.6, y: -2, delay: 0  }, 0, [g.basic, g.pelleter, g.twin, g.power, {speed: 0.7, maxSpeed: 0.7}]),
		...addGunner({length: 19, width: 1.6, y: 2,  delay: 0.5}, 0, [g.basic, g.pelleter, g.twin, g.power, {speed: 0.7, maxSpeed: 0.7}]),
		{
			POSITION: [14, 7.5, 1, 0, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -15, SATURATION_SHIFT: 0.5 }, },
		}, {
			POSITION: [13, 6, 1, 0, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 5 } },
		},
	], 5)
}
Class.gripperSnowdread = { // spread
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Gripper",
	UPGRADE_TOOLTIP: "Crowbars",
	GUNS: weaponArray([
		...addNormal({length: 15.5, width: 6,    y: -0.5, angle: -13, delay: 0.5}, 10, [g.basic, g.twin, g.tripleShot, {size: 0.95, reload: 1.35, health: 1.8}]),
		...addNormal({length: 15.5, width: 6,    y: 0.5,  angle: 13,  delay: 0.5}, 10, [g.basic, g.twin, g.tripleShot, {size: 0.95, reload: 1.35, health: 1.8}]),
		...addNormal({length: 17.5, width: 6.25, y: 0,    angle: 0,   delay: 0  }, 10, [g.basic, g.twin, g.tripleShot, {size: 0.95, reload: 1.35, health: 1.8}]),
	], 5)
}
Class.retardantSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Retardant",
	UPGRADE_TOOLTIP: "Destroyers",
	GUNS: weaponArray(
		addHeavy({length: 17, width: 10}, 2.5, [g.basic, g.pounder, g.destroyer, g.annihilator, {reload: 0.9, health: 1.5}])
	, 5)
}
Class.tyrantSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Tyrant",
	UPGRADE_TOOLTIP: "Skimmers",
	GUNS: weaponArray(
		addLauncher({length: 15, width: 11}, 0, [g.basic, g.pounder, g.artillery, g.skimmer, {size: 0.9, damage: 1.2, reload: 1.5}], true, "superMissileSnowdread")
	, 5)
}
Class.anesthesiologistSnowdread = { // shotgun
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Anesthesiologist",
	UPGRADE_TOOLTIP: "Shotguns",
	GUNS: weaponArray(
		addShotgun({length: 20.5, width: 11, x: 7.5}, 5, [
			{l: 15, w: 4, y: -3},
			{l: 15, w: 4, y: 3},
			{l: 17, w: 5, y: 0},
			{l: 13, w: 5, y: -2},
			{l: 12, w: 1.5, y: -1, small: true},
			{l: 12, w: 2, y: 1, small: true},
			{l: 12, w: 2, y: 2, small: true},
		], [g.basic, g.machineGun, g.shotgun, {reload: 1.2, health: 1.8, damage: 1.1, speed: 0.85, maxSpeed: 0.85}], [g.basic, g.machineGun, g.shotgun, {speed: 1.55, maxSpeed: 1.3, reload: 1.2, damage: 0.9}])
	, 5)
}
Class.helixSnowdread = { // twister
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Helix",
	UPGRADE_TOOLTIP: "Twisters",
	GUNS: weaponArray(
		addTwister({length: 17, width: 8.5}, 0, [g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, {speed: 1.9, maxSpeed: 1.3, reload: 1.333}], "spiralMissileSnowdread")
	, 5)
}
Class.bombardmentSnowdread = { // artillery
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Bombardment",
	UPGRADE_TOOLTIP: "Mortars",
	GUNS: weaponArray([
		...addGunner({length: 14,   width: 2, y: -4.25, angle: -7, delay: 0.6}, 0, [g.basic, g.pelleter, g.artillery]),
		...addGunner({length: 14,   width: 2, y: 4.25,  angle: 7,  delay: 0.8}, 0, [g.basic, g.pelleter, g.artillery]),
		...addGunner({length: 15.5, width: 2, y: -2.5,  angle: -7, delay: 0.2}, 0, [g.basic, g.pelleter, g.artillery]),
		...addGunner({length: 15.5, width: 2, y: 2.5,   angle: 7,  delay: 0.4}, 0, [g.basic, g.pelleter, g.artillery]),
		...addHeavy({length: 17.5, width: 8}, 2.5, [g.basic, g.destroyer, g.artillery, {speed: 1.1, maxSpeed: 1.1}])
	], 5)
}
Class.raiderSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Raider",
	UPGRADE_TOOLTIP: "Drones",
	GUNS: weaponArray([
		...addDrone({length: 4, width: 5,   aspect: 2.1, x: 9, y: 3.25 }, 0, [g.drone, g.overseer, g.overseer, g.overseer, {size: 1.5, reload: 0.6}], 2, "drone"),
		...addDrone({length: 4, width: 5,   aspect: 2.1, x: 9, y: -3.25}, 0, [g.drone, g.overseer, g.overseer, g.overseer, {size: 1.5, reload: 0.6}], 2, "drone"),
		...addDrone({length: 6, width: 6.5, aspect: 1.4, x: 9, y: 0    }, 0, [g.drone, g.overseer, g.overseer, g.overseer, g.pounder, {size: 2, reload: 0.4}], 2, "betadrone"),
	], 5)
}
Class.gladiatorSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Gladiator",
	UPGRADE_TOOLTIP: "Minions",
	GUNS: weaponArray(
		addMinion({length: 13, width: 11, gap: 2.75}, 0, [g.factory, {size: 0.9, reload: 0.5}], "minion", 2)
	, 5),
}
let minionIndex = 0;
for (let gun of Class.gladiatorSnowdread.GUNS) {
	minionIndex = setGladiatorMinion(gun, minionIndex);
}
Class.starlightSnowdread = { // auto-drones
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Starlight",
	UPGRADE_TOOLTIP: "Auto-Drones",
	GUNS: weaponArray(
		addAutoDrone({length: 5, width: 9.5, aspect: 1.2, x: 9}, 0, [g.drone, g.overseer, {reload: 1.5, speed: 1.15, maxSpeed: 1.15}], 5)
	, 5)
}
Class.bruiserSnowdread = { // honcho
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Bruiser",
	UPGRADE_TOOLTIP: "Heavy Drones",
	GUNS: weaponArray(
		addHoncho({length: 5, width: 8, aspect: 1.5, x: 9}, -2.5, [g.drone, g.overseer, g.overseer, g.honcho, {maxSpeed: 0.85}], 2)
	, 5)
}
Class.incapacitatorSnowdread = { // swarms
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Incapacitator",
	UPGRADE_TOOLTIP: "Swarms",
	GUNS: weaponArray([
		...addSwarm({length: 6, width: 6, x: 8, y: 3.25,  delay: 0  }, 0, [g.swarm, g.flankGuard, g.flankGuard, {maxSpeed: 1.2}]),
		...addSwarm({length: 6, width: 6, x: 8, y: -3.25, delay: 0.5}, 0, [g.swarm, g.flankGuard, g.flankGuard, {maxSpeed: 1.2}]),
		{
			POSITION: [3, 9, 0.85, 9, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5}},
		},
	], 5)
}
Class.cerberusSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Cerberus",
	UPGRADE_TOOLTIP: "Trap Spam",
	GUNS: weaponArray([
		...addTrap({length: 13, length2: 1.5, width: 4, aspect: 1.6, y: 2,  angle: 10,  delay: 0.5}, 2.5, [g.trap, g.pounder, {speed: 1.2, reload: 1.09}]),
		...addTrap({length: 13, length2: 1.5, width: 4, aspect: 1.6, y: -2, angle: -10, delay: 0.5}, 2.5, [g.trap, g.pounder, {speed: 1.2, reload: 1.09}]),
		...addTrap({length: 15, length2: 2, width: 5.5, aspect: 1.7, y: 0,  angle: 0,   delay: 0  }, 2.5, [g.trap, g.setTrap, g.pounder, {speed: 1.2, reload: 1.09}], true),
	], 5)
}
Class.luciferSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Lucifer",
	UPGRADE_TOOLTIP: "Blocks",
	GUNS: weaponArray(
		addTrap({length: 13.5, length2: 3.5, width: 8}, 0, [g.trap, g.setTrap, g.pounder, {speed: 1.3, maxSpeed: 1.3, size: 1.3, health: 2}], true)
	, 5)
}
Class.sterilizerSnowdread = { // auto-traps
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Sterilizer",
	UPGRADE_TOOLTIP: "Auto-Blocks",
	GUNS: weaponArray(
		addAutoTrap({length: 16.5, length2: 2, width: 9, aspect: 1.3}, 0, [g.trap, g.setTrap, {reload: 2.667}], 4, true)
	, 5)
}
Class.hielamanSnowdread = { // aura-traps
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Hielaman",
	UPGRADE_TOOLTIP: "Aura-Traps",
	GUNS: weaponArray(
		addAuraTrap({length: 15, length2: 3, width: 9, aspect: 1.5, x: 8}, 0, [g.trap, g.setTrap, g.hexaTrapper, {reload: 2.4, range: 1.6, health: 2.4}], 5, true)
	, 5)
}
Class.jackhammerSnowdread = { // trap + gun
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Jackhammer",
	UPGRADE_TOOLTIP: "Blocks + Bullets",
	GUNS: weaponArray([
		...addNormal({length: 19, width: 6.75}, 10),
		...addTrap({length: 13, length2: 3, width: 7.75, aspect: 1.4}, 2.5, [g.trap, g.setTrap, g.hexaTrapper], true)
	], 5)
}
Class.jackhammerSnowdreadHex = { // exception
	GUNS: weaponArray([
		...addNormal({length: 17.5, width: 5.25}, 10),
		...addTrap({length: 12.5, length2: 2.75, width: 6.75, aspect: 1.3}, 2.5, [g.trap, g.setTrap, g.hexaTrapper], true)
	], 5)
}

// T4 Bodies
Class.skynetSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Skynet",
	UPGRADE_TOOLTIP: "Small Auto Spam",
	TURRETS: weaponArray([
		{
			POSITION: [3.25, 4.5, 0, 0, 200, 2],
			TYPE: "spamAutoTurretSnowdread",
		}, {
			POSITION: [3.25, 8, 0, 36, 200, 2],
			TYPE: "spamAutoTurretSnowdread",
		}
	], 5),
	PROPS: [
		{
			POSITION: [11, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		},
	],
}
Class.supernovaSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Supernova",
	UPGRADE_TOOLTIP: "Damage Aura + Small Autos",
	TURRETS: [
		...addPentanoughtTurretRing(),
		{
			POSITION: [9, 0, 0, 0, 360, 2],
			TYPE: "pentanoughtBigAuraSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [12, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		},
	]
}
Class.cipherSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Cipher",
	UPGRADE_TOOLTIP: "Heavy Auto + Small Autos",
	TURRETS: [
		...addPentanoughtTurretRing(),
		{
			POSITION: [11.5, 0, 0, 0, 360, 2],
			TYPE: "megabyteTurretSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		},
	]
}
Class.interstellarSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Interstellar",
	UPGRADE_TOOLTIP: "Healing Aura + Small Autos",
	TURRETS: [
		{
			POSITION: [9.5, 0, 0, 0, 360, 2],
			TYPE: "pentanoughtBigHealAuraSnowdread",
		},
		...addPentanoughtTurretRing(),
	],
	PROPS: [
		{
			POSITION: [12, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		},
	]
}
Class.gigabyteSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Gigabyte",
	UPGRADE_TOOLTIP: "Heavy Auto Turret",
	TURRETS: [
		{
			POSITION: [11.5, 0, 0, 0, 360, 2],
			TYPE: "gigabyteTurretSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [13.5, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		},
	]
}
Class.malwareSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Malware",
	UPGRADE_TOOLTIP: "Heavy Auto + Damage Auras",
	TURRETS: [
		...addPentanoughtAuraRing(),
		{
			POSITION: [11.5, 0, 0, 0, 360, 2],
			TYPE: "megabyteTurretSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		},
	]
}
Class.softwareSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Software",
	UPGRADE_TOOLTIP: "Heavy Auto + Healing Auras",
	TURRETS: [
		...addPentanoughtAuraRing(true),
		{
			POSITION: [11.5, 0, 0, 0, 360, 2],
			TYPE: "megabyteTurretSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		},
	]
}
Class.roasterSnowdread = { // Flamethrower
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Roaster",
	UPGRADE_TOOLTIP: "Flamethrower",
	TURRETS: [
		{
			POSITION: [10, 0, 0, 0, 360, 2],
			TYPE: 'roasterTurretSnowdread'
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		},
	]
}
Class.monsoonSnowdread = { // Drones
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Monsoon",
	UPGRADE_TOOLTIP: "Drone Turret",
	BODY: {
		SPEED: 0.93,
		FOV: 1.1,
	},
	TURRETS: [
		{
			POSITION: [10.5, 0, 0, 0, 360, 2],
			TYPE: 'monsoonTurretSnowdread'
		},
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		},
	]
}
Class.photosphereSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Photosphere",
	UPGRADE_TOOLTIP: "Damage Auras",
	TURRETS: [],
	PROPS: [
		{
			POSITION: [12, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		},
	]
}
if (useOldPhotosphere) {
	for (let i = 0; i < 5; i++) {
		let theta = (72 * i + 36) * Math.PI / 180;
		Class.photosphereSnowdread.TURRETS.push(
			{
				POSITION: [3.5, 8.75 * Math.cos(theta), 8.75 * Math.sin(theta), 0, 360, 2],
				TYPE: "photosphereSmallAuraSnowdread",
			},
		)
	}
	for (let i = 0; i < 5; i++) {
		let theta = (72 * i) * Math.PI / 180;
		Class.photosphereSnowdread.TURRETS.push(
			{
				POSITION: [3, 4 * Math.cos(theta), 4 * Math.sin(theta), 0, 360, 2],
				TYPE: "photosphereBigAuraSnowdread",
			},
		)
	}
} else {
	Class.photosphereSnowdread.TURRETS.push(
		...addPentanoughtAuraRing(),
		{
			POSITION: [9, 0, 0, 0, 360, 2],
			TYPE: "pentanoughtBigAuraSnowdread",
		},
	)
}
Class.stratosphereSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Stratosphere",
	UPGRADE_TOOLTIP: "Healing Auras",
	TURRETS: [
		...addPentanoughtAuraRing(true),
		{
			POSITION: [9.5, 0, 0, 0, 360, 2],
			TYPE: "pentanoughtBigHealAuraSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [12, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		},
	]
}
Class.behemothSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Behemoth",
	UPGRADE_TOOLTIP: "Health Buff",
	BODY: hpBuffBodyStats[3],
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: 9}],
		}, {
			POSITION: [7.5, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10}, BORDERLESS: true}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		}, {
			POSITION: [24, 0, 0, 180, -1],
			TYPE: ["pentagon", {COLOR: 9}],
		},
	],
}
Class.astronomicSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Astronomic",
	UPGRADE_TOOLTIP: "Health Buff + Damage Auras",
	BODY: hpBuffBodyStats[2],
	TURRETS: addPentanoughtAuraRing(),
	PROPS: [
		{
			POSITION: [12, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [7.5, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10}}],
		}, {
			POSITION: [24, 0, 0, 180, -1],
			TYPE: ["pentagon", {COLOR: 9}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		},
	]
}
Class.grandioseSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Grandiose",
	UPGRADE_TOOLTIP: "Health Buff + Healing Auras",
	BODY: hpBuffBodyStats[2],
	TURRETS: addPentanoughtAuraRing(true),
	PROPS: [
		{
			POSITION: [12, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [7.5, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10}}],
		}, {
			POSITION: [24, 0, 0, 180, -1],
			TYPE: ["pentagon", {COLOR: 9}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		},
	]
}
Class.bunkerSnowdread = { // HP + auto spam
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Bunker",
	UPGRADE_TOOLTIP: "Health Buff + Small Autos",
	BODY: hpBuffBodyStats[2],
	TURRETS: addPentanoughtTurretRing(),
	PROPS: [
		{
			POSITION: [12, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [7.5, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10}}],
		}, {
			POSITION: [24, 0, 0, 180, -1],
			TYPE: ["pentagon", {COLOR: 9}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		},
	]
}
Class.leviathanSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Leviathan",
	UPGRADE_TOOLTIP: "Speed Buff",
	BODY: speedBuffBodyStats[2],
	PROPS: [
		{
			POSITION: [12, 0, 0, 0, 1],
			TYPE: "pentagonLeviathanTopSnowdread"
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "pentagonLeviathanBottomSnowdread"
		},
	],
}
Class.valrayvnSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Valrayvn",
	UPGRADE_TOOLTIP: "Speed Buff + Damage Auras",
	BODY: speedBuffBodyStats[1],
	TURRETS: addPentanoughtAuraRing(),
	PROPS: [
		{
			POSITION: [12, 0, 0, 0, 1],
			TYPE: "pentagonLeviathanTop2Snowdread"
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "pentagonLeviathanBottomSnowdread"
		},
	],
}
Class.pegasusSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Pegasus",
	UPGRADE_TOOLTIP: "Speed Buff + Healing Auras",
	BODY: speedBuffBodyStats[1],
	TURRETS: addPentanoughtAuraRing(true),
	PROPS: [
		{
			POSITION: [12, 0, 0, 0, 1],
			TYPE: "pentagonLeviathanTop2Snowdread"
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "pentagonLeviathanBottomSnowdread"
		},
	],
}
Class.maceSnowdread = { // Speed + auto spam
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Mace",
	UPGRADE_TOOLTIP: "Speed Buff + Small Autos",
	BODY: speedBuffBodyStats[1],
	TURRETS: addPentanoughtTurretRing(),
	PROPS: [
		{
			POSITION: [12, 0, 0, 0, 1],
			TYPE: "pentagonLeviathanTop2Snowdread"
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "pentagonLeviathanBottomSnowdread"
		},
	],
}
Class.battalionSnowdread = { // Speed + HP
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Battalion",
	UPGRADE_TOOLTIP: "Speed Buff + Health Buff",
	BODY: {
		HEALTH: 1.75, 
		SPEED: 2.05,
		SHIELD: 1.6, 
		REGEN: 1.5, 
	},
	PROPS: [
		{
			POSITION: [14, 0, 0, 0, 1],
			TYPE: ["pentagonLeviathanTop3Snowdread", {COLOR: 9}],
		}, {
			POSITION: [7.5, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10}, BORDERLESS: true}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "pentagonLeviathanBottomSnowdread"
		},
	],
}
Class.titaniumSnowdread = { // Shield buff
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Titanium",
	UPGRADE_TOOLTIP: "Shield Buff",
	BODY: shieldBuffBodyStats[2],
	PROPS: [
		{
			POSITION: [6.5, 0, 0, 0, 1],
			TYPE: "pentagonTitaniumTopSnowdread",
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "pentagonTitaniumBottomSnowdread",
		},
	],
}
Class.obsidianSnowdread = { // Shield buff + auras
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Obsidian",
	UPGRADE_TOOLTIP: "Shield buff + Damage Auras",
	BODY: shieldBuffBodyStats[1],
	TURRETS: addPentanoughtAuraRing(),
	PROPS: [
		{
			POSITION: [10.5, 0, 0, 180, 1],
			TYPE: "pentagonTitaniumTop2Snowdread",
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "pentagonTitaniumBottomSnowdread",
		},
	]
}
Class.austeniteSnowdread = { // Shield buff + heal auras
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Austenite",
	UPGRADE_TOOLTIP: "Shield buff + Healing Auras",
	BODY: shieldBuffBodyStats[1],
	TURRETS: addPentanoughtAuraRing(true),
	PROPS: [
		{
			POSITION: [10.5, 0, 0, 180, 1],
			TYPE: "pentagonTitaniumTop2Snowdread",
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "pentagonTitaniumBottomSnowdread",
		},
	]
}
Class.carbideSnowdread = { // Shield buff + auto spam
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Carbide",
	UPGRADE_TOOLTIP: "Shield buff + Small Autos",
	BODY: shieldBuffBodyStats[1],
	TURRETS: addPentanoughtTurretRing(),
	PROPS: [
		{
			POSITION: [10.5, 0, 0, 180, 1],
			TYPE: "pentagonTitaniumTop2Snowdread",
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "pentagonTitaniumBottomSnowdread",
		},
	]
}
Class.osmiumSnowdread = { // Speed + shield
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Osmium",
	UPGRADE_TOOLTIP: "Speed Buff + Shield Buff",
	BODY: {
		HEALTH: 1, 
		SPEED: 2,
		SHIELD: 1.75, 
		REGEN: 1.4,
	},
	PROPS: [
		{
			POSITION: [6.5, 0, 0, 0, 1],
			TYPE: "pentagonTitaniumTopSnowdread",
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "pentagonLeviathanBottomSnowdread",
		},
	]
}
Class.grapheneSnowdread = { // Shield + HP
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Graphene",
	UPGRADE_TOOLTIP: "HP Buff + Shield Buff",
	BODY: {
		HEALTH: 1.85,
		SPEED: 1.55,
		SHIELD: 2.25,
		REGEN: 1.75,
	},
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: 9}],
		}, {
			POSITION: [9.5, 0, 0, 180, 1],
			TYPE: ["pentagonTitaniumTop2Snowdread", {BORDERLESS: true}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		}, {
			POSITION: [20, 0, 0, 0, -1],
			TYPE: "pentagonTitaniumBottomSnowdread",
		},
	]
}
Class.trackerSnowdread = { // FOV
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Tracker",
	UPGRADE_TOOLTIP: "FOV Boost",
	BODY: {
		FOV: 1.4,
		SPEED: 0.85
	},
	TURRETS: [
		{
			POSITION: [14.5, 0, 0, 0, 360, 2],
			TYPE: 'trackerRadarSnowdread'
		},
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5}}],
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "pentagonBaseDeco",
		}, {
			POSITION: [10.5, 0, 0, 180, 1],
			TYPE: ["egg", {COLOR: 17}],
		}, {
			POSITION: [8, 0, 0, 180, 1],
			TYPE: ["egg", {COLOR: -1}],
		}, 
	]
}

Class.addons.UPGRADES_TIER_0.push("dreadSnowdread");
	Class.dreadSnowdread.UPGRADES_TIER_0 = [
		["sword2Snowdread", "dreadBodySnowdread",],
		["pacifier2Snowdread", "dreadBodySnowdread"],
		["peacekeeper2Snowdread", "dreadBodySnowdread"],
		["invader2Snowdread", "dreadBodySnowdread"],
		["centaur2Snowdread", "dreadBodySnowdread"],
	];

	Class.sword2Snowdread.UPGRADES_TIER_0 = ["swordSnowdread"];
	Class.pacifier2Snowdread.UPGRADES_TIER_0 = ["pacifierSnowdread"];
	Class.peacekeeper2Snowdread.UPGRADES_TIER_0 = ["peacekeeperSnowdread"];
	Class.invader2Snowdread.UPGRADES_TIER_0 = ["invaderSnowdread"];
	Class.centaur2Snowdread.UPGRADES_TIER_0 = ["centaurSnowdread"];

	Class.dreadWeaponSnowdread.UPGRADES_TIER_0 = ["swordSnowdread", "pacifierSnowdread", "peacekeeperSnowdread", "invaderSnowdread", "centaurSnowdread"];

		Class.swordSnowdread.UPGRADES_TIER_0 = ["gladiusSnowdread", "sabreSnowdread", "slingSnowdread", "catapultSnowdread", "dartSnowdread"];
			Class.gladiusSnowdread.UPGRADES_TIER_0 = ["bladeSnowdread"];
				Class.bladeSnowdread.UPGRADES_TIER_0 = ["rapierSnowdread"];
			Class.sabreSnowdread.UPGRADES_TIER_0 = ["bayonetSnowdread"];
				Class.bayonetSnowdread.UPGRADES_TIER_0 = ["javelinSnowdread"];
			Class.slingSnowdread.UPGRADES_TIER_0 = ["atlatlSnowdread"];
				Class.atlatlSnowdread.UPGRADES_TIER_0 = ["woomeraSnowdread"];
			Class.catapultSnowdread.UPGRADES_TIER_0 = ["ballistaSnowdread"];
				Class.ballistaSnowdread.UPGRADES_TIER_0 = ["trebuchetSnowdread"];
			Class.dartSnowdread.UPGRADES_TIER_0 = ["barbSnowdread"];
				Class.barbSnowdread.UPGRADES_TIER_0 = ["boltSnowdread"];

		Class.pacifierSnowdread.UPGRADES_TIER_0 = ["mediatorSnowdread", "negotiatorSnowdread", "melderSnowdread", "crackerSnowdread", "grabberSnowdread"];
			Class.mediatorSnowdread.UPGRADES_TIER_0 = ["mitigatorSnowdread"];
				Class.mitigatorSnowdread.UPGRADES_TIER_0 = ["diplomatSnowdread"];
			Class.negotiatorSnowdread.UPGRADES_TIER_0 = ["appeaserSnowdread"];
				Class.appeaserSnowdread.UPGRADES_TIER_0 = ["arbitratorSnowdread"];
			Class.melderSnowdread.UPGRADES_TIER_0 = ["amalgamSnowdread"];
				Class.amalgamSnowdread.UPGRADES_TIER_0 = ["dissolverSnowdread"];
			Class.crackerSnowdread.UPGRADES_TIER_0 = ["breakerSnowdread"];
				Class.breakerSnowdread.UPGRADES_TIER_0 = ["eroderSnowdread"];
			Class.grabberSnowdread.UPGRADES_TIER_0 = ["clasperSnowdread"];
				Class.clasperSnowdread.UPGRADES_TIER_0 = ["gripperSnowdread"];

		Class.peacekeeperSnowdread.UPGRADES_TIER_0 = ["enforcerSnowdread", "executorSnowdread", "doserSnowdread", "swirlSnowdread", "pelterSnowdread"];
			Class.enforcerSnowdread.UPGRADES_TIER_0 = ["suppressorSnowdread"];
				Class.suppressorSnowdread.UPGRADES_TIER_0 = ["retardantSnowdread"];
			Class.executorSnowdread.UPGRADES_TIER_0 = ["inhibitorSnowdread"];
				Class.inhibitorSnowdread.UPGRADES_TIER_0 = ["tyrantSnowdread"];
			Class.doserSnowdread.UPGRADES_TIER_0 = ["tranquilizerSnowdread"];
				Class.tranquilizerSnowdread.UPGRADES_TIER_0 = ["anesthesiologistSnowdread"];
			Class.swirlSnowdread.UPGRADES_TIER_0 = ["spiralSnowdread"];
				Class.spiralSnowdread.UPGRADES_TIER_0 = ["helixSnowdread"];
			Class.pelterSnowdread.UPGRADES_TIER_0 = ["shellerSnowdread"];
				Class.shellerSnowdread.UPGRADES_TIER_0 = ["bombardmentSnowdread"];

		Class.invaderSnowdread.UPGRADES_TIER_0 = ["inquisitorSnowdread", "assailantSnowdread", "radiationSnowdread", "boxerSnowdread", "disablerSnowdread"];
			Class.inquisitorSnowdread.UPGRADES_TIER_0 = ["infiltratorSnowdread"];
				Class.infiltratorSnowdread.UPGRADES_TIER_0 = ["raiderSnowdread"];
			Class.assailantSnowdread.UPGRADES_TIER_0 = ["aggressorSnowdread"];
				Class.aggressorSnowdread.UPGRADES_TIER_0 = ["gladiatorSnowdread"];
			Class.radiationSnowdread.UPGRADES_TIER_0 = ["haloSnowdread"];
				Class.haloSnowdread.UPGRADES_TIER_0 = ["starlightSnowdread"];
			Class.boxerSnowdread.UPGRADES_TIER_0 = ["sluggerSnowdread"];
				Class.sluggerSnowdread.UPGRADES_TIER_0 = ["bruiserSnowdread"];
			Class.disablerSnowdread.UPGRADES_TIER_0 = ["debilitatorSnowdread"];
				Class.debilitatorSnowdread.UPGRADES_TIER_0 = ["incapacitatorSnowdread"];

		Class.centaurSnowdread.UPGRADES_TIER_0 = ["daemonSnowdread", "minotaurSnowdread", "cleanerSnowdread", "shadeSnowdread", "screwdriverSnowdread"];
			Class.daemonSnowdread.UPGRADES_TIER_0 = ["hydraSnowdread"];
				Class.hydraSnowdread.UPGRADES_TIER_0 = ["cerberusSnowdread"];
			Class.minotaurSnowdread.UPGRADES_TIER_0 = ["beelzebubSnowdread"];
				Class.beelzebubSnowdread.UPGRADES_TIER_0 = ["luciferSnowdread"];
			Class.cleanerSnowdread.UPGRADES_TIER_0 = ["sweeperSnowdread"];
				Class.sweeperSnowdread.UPGRADES_TIER_0 = ["sterilizerSnowdread"];
			Class.shadeSnowdread.UPGRADES_TIER_0 = ["aegisSnowdread"];
				Class.aegisSnowdread.UPGRADES_TIER_0 = ["hielamanSnowdread"];
			Class.screwdriverSnowdread.UPGRADES_TIER_0 = ["drillSnowdread"];
				Class.drillSnowdread.UPGRADES_TIER_0 = ["jackhammerSnowdread"];

	Class.dreadBodySnowdread.UPGRADES_TIER_0 = ["byteSnowdread", "showerSnowdread", "atmosphereSnowdread", "juggernautSnowdread", "spotterSnowdread"];

		Class.byteSnowdread.UPGRADES_TIER_0 = ["automationSnowdread", "kilobyteSnowdread", "lighterSnowdread"];

			Class.automationSnowdread.UPGRADES_TIER_0 = ["mechanismSnowdread", "fusionSnowdread", "binarySnowdread", "exosphereSnowdread", "burgSnowdread", "batonSnowdread"];
				Class.mechanismSnowdread.UPGRADES_TIER_0 = ["skynetSnowdread"];
					Class.skynetSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("skynetSnowdread");
				Class.fusionSnowdread.UPGRADES_TIER_0 = ["supernovaSnowdread"];
					Class.supernovaSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("supernovaSnowdread");
				Class.binarySnowdread.UPGRADES_TIER_0 = ["cipherSnowdread"];
					Class.cipherSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("cipherSnowdread");
				Class.exosphereSnowdread.UPGRADES_TIER_0 = ["interstellarSnowdread"];
					Class.interstellarSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("interstellarSnowdread");
				Class.burgSnowdread.UPGRADES_TIER_0 = ["bunkerSnowdread"];
					Class.bunkerSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("bunkerSnowdread");
				Class.batonSnowdread.UPGRADES_TIER_0 = ["maceSnowdread"];
					Class.maceSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("maceSnowdread");

			Class.kilobyteSnowdread.UPGRADES_TIER_0 = ["megabyteSnowdread", "binarySnowdread", "trojanSnowdread", "hardwareSnowdread"];
				Class.megabyteSnowdread.UPGRADES_TIER_0 = ["gigabyteSnowdread"];
					Class.gigabyteSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("gigabyteSnowdread");
				// Class.binarySnowdread.UPGRADES_TIER_0 = ["cipherSnowdread"];
				Class.trojanSnowdread.UPGRADES_TIER_0 = ["malwareSnowdread"];
					Class.malwareSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("malwareSnowdread");
				Class.hardwareSnowdread.UPGRADES_TIER_0 = ["softwareSnowdread"];
					Class.softwareSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("softwareSnowdread");
				
			Class.lighterSnowdread.UPGRADES_TIER_0 = ["burnerSnowdread"];
				Class.burnerSnowdread.UPGRADES_TIER_0 = ["roasterSnowdread"];
					Class.roasterSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("roasterSnowdread");

		Class.showerSnowdread.UPGRADES_TIER_0 = ["stormSnowdread"];
			Class.stormSnowdread.UPGRADES_TIER_0 = ["tempestSnowdread"];
				Class.tempestSnowdread.UPGRADES_TIER_0 = ["monsoonSnowdread"];
					Class.monsoonSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("monsoonSnowdread");

		Class.atmosphereSnowdread.UPGRADES_TIER_0 = ["coronaSnowdread", "thermosphereSnowdread"];

			Class.coronaSnowdread.UPGRADES_TIER_0 = ["chromosphereSnowdread", "fusionSnowdread", "trojanSnowdread", "planetSnowdread", "sirenSnowdread", "flintSnowdread"];
				Class.chromosphereSnowdread.UPGRADES_TIER_0 = ["photosphereSnowdread"];
					Class.photosphereSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("photosphereSnowdread");
				// Class.fusionSnowdread.UPGRADES_TIER_0 = ["supernovaSnowdread"];
				// Class.trojanSnowdread.UPGRADES_TIER_0 = ["malwareSnowdread"];
				Class.planetSnowdread.UPGRADES_TIER_0 = ["astronomicSnowdread"];
					Class.astronomicSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("astronomicSnowdread");
				Class.sirenSnowdread.UPGRADES_TIER_0 = ["valrayvnSnowdread"];
					Class.valrayvnSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("valrayvnSnowdread");
				Class.flintSnowdread.UPGRADES_TIER_0 = ["obsidianSnowdread"];
					Class.obsidianSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("obsidianSnowdread");

			Class.thermosphereSnowdread.UPGRADES_TIER_0 = ["mesosphereSnowdread", "exosphereSnowdread", "hardwareSnowdread", "moonSnowdread", "harpySnowdread", "martensiteSnowdread"];
				Class.mesosphereSnowdread.UPGRADES_TIER_0 = ["stratosphereSnowdread"];
					Class.stratosphereSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("stratosphereSnowdread");
				// Class.exosphereSnowdread.UPGRADES_TIER_0 = ["interstellarSnowdread"];
				// Class.hardwareSnowdread.UPGRADES_TIER_0 = ["softwareSnowdread"];
				Class.moonSnowdread.UPGRADES_TIER_0 = ["grandioseSnowdread"];
					Class.grandioseSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("grandioseSnowdread");
				Class.harpySnowdread.UPGRADES_TIER_0 = ["pegasusSnowdread"];
					Class.pegasusSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("pegasusSnowdread");
				Class.martensiteSnowdread.UPGRADES_TIER_0 = ["austeniteSnowdread"];
					Class.austeniteSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("austeniteSnowdread");

		Class.juggernautSnowdread.UPGRADES_TIER_0 = ["jumboSnowdread", "colossusSnowdread", "brassSnowdread"];

			Class.jumboSnowdread.UPGRADES_TIER_0 = ["goliathSnowdread", "planetSnowdread", "moonSnowdread", "burgSnowdread", "armadaSnowdread", "diamondSnowdread"];
				Class.goliathSnowdread.UPGRADES_TIER_0 = ["behemothSnowdread"];
					Class.behemothSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("behemothSnowdread");
				// Class.planetSnowdread.UPGRADES_TIER_0 = ["astronomicSnowdread"];
				// Class.moonSnowdread.UPGRADES_TIER_0 = ["grandioseSnowdread"];
				// Class.burgSnowdread.UPGRADES_TIER_0 = ["bunkerSnowdread"];
				Class.armadaSnowdread.UPGRADES_TIER_0 = ["battalionSnowdread"];
					Class.battalionSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("battalionSnowdread");
				Class.diamondSnowdread.UPGRADES_TIER_0 = ["grapheneSnowdread"];
					Class.grapheneSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("grapheneSnowdread");

			Class.colossusSnowdread.UPGRADES_TIER_0 = ["titanSnowdread", "sirenSnowdread", "harpySnowdread", "batonSnowdread", "armadaSnowdread", "tungstenSnowdread"];
				Class.titanSnowdread.UPGRADES_TIER_0 = ["leviathanSnowdread"];
					Class.leviathanSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("leviathanSnowdread");
				// Class.sirenSnowdread.UPGRADES_TIER_0 = ["valrayvnSnowdread"];
				// Class.harpySnowdread.UPGRADES_TIER_0 = ["pegasusSnowdread"];
				// Class.batonSnowdread.UPGRADES_TIER_0 = ["maceSnowdread"];
				// Class.armadaSnowdread.UPGRADES_TIER_0 = ["battalionSnowdread"];
				Class.tungstenSnowdread.UPGRADES_TIER_0 = ["osmiumSnowdread"];
					Class.osmiumSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("osmiumSnowdread");

			Class.brassSnowdread.UPGRADES_TIER_0 = ["steelSnowdread", "flintSnowdread", "martensiteSnowdread", "ceramicSnowdread", "diamondSnowdread", "tungstenSnowdread"];
				Class.steelSnowdread.UPGRADES_TIER_0 = ["titaniumSnowdread"];
					Class.titaniumSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("titaniumSnowdread");
				// Class.flintSnowdread.UPGRADES_TIER_0 = ["obsidianSnowdread"];
				// Class.martensiteSnowdread.UPGRADES_TIER_0 = ["austeniteSnowdread"];
				Class.ceramicSnowdread.UPGRADES_TIER_0 = ["carbideSnowdread"];
					Class.carbideSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("carbideSnowdread");
				// Class.diamondSnowdread.UPGRADES_TIER_0 = ["grapheneSnowdread"];
				// Class.tungstenSnowdread.UPGRADES_TIER_0 = ["osmiumSnowdread"];

		Class.spotterSnowdread.UPGRADES_TIER_0 = ["spySnowdread"];
			Class.spySnowdread.UPGRADES_TIER_0 = ["monitorSnowdread"];
				Class.monitorSnowdread.UPGRADES_TIER_0 = ["trackerSnowdread"];
					Class.trackerSnowdread.UPGRADES_TIER_0 = makeHexnoughtBodyV2("trackerSnowdread");

// Merge hexdreads
if(buildHexnoughts) {
	for (let i of pentanoughtWeapons) {
		for (let j of pentanoughtWeapons) {
			util.forcePush(Class[i], 'UPGRADES_TIER_0', mergeHexnoughtWeaponV2(i, j));
		}
	}
}
