const { combineStats, addAura, makeAuto } = require('../facilitators.js');
const { gunCalcNames, smshskl, base } = require('../constants.js');
const g = require('../gunvals.js');

const eggnoughtBody = {
    SPEED: base.SPEED * 0.8,
    HEALTH: base.HEALTH * 1.75,
	SHIELD: base.SHIELD * 1.5,
	REGEN: base.REGEN * 1.5,
    FOV: base.FOV,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 1.5,
};
const squarenoughtBody = {
    SPEED: base.SPEED * 0.675,
    HEALTH: base.HEALTH * 2.5,
	SHIELD: base.SHIELD * 2,
	REGEN: base.REGEN * 2,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 2,
};
const trinoughtBody = {
    SPEED: base.SPEED * 0.55,
    HEALTH: base.HEALTH * 3.5,
	SHIELD: base.SHIELD * 2.5,
	REGEN: base.REGEN * 2.5,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 2.5,
};
const pentanoughtBody = {
    SPEED: base.SPEED * 0.425,
    HEALTH: base.HEALTH * 4.25,
	SHIELD: base.SHIELD * 3,
	REGEN: base.REGEN * 3,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 3,
};
const hexnoughtBody = {
    SPEED: base.SPEED * 0.3,
    HEALTH: base.HEALTH * 5,
	SHIELD: base.SHIELD * 3.5,
	REGEN: base.REGEN * 3.5,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 3.5,
};

// Comment out the line below to enable this addon, uncomment it to disable this addon.
return console.log('--- Dreadnoughts v2 addon [dreadv2.js] is disabled. See lines 60-61 to enable it. ---');

// Set the below variable to true to enable hex dreadnought building.
const buildHexnoughts = true;

// Set the below variable to true to enable photosphere with 10 auras instead of 6.
const useOldPhotosphere = false;

// For hexnought merging
const hexnoughtScaleFactor = 0.9;

// Misc
Class.genericDreadnoughtOfficialV2 = {
	PARENT: "genericTank",
	SKILL_CAP: Array(10).fill(smshskl),
	REROOT_UPGRADE_TREE: ["dreadWeaponOfficialV2", "dreadBodyOfficialV2"],
}
Class.genericEggnought = {
	PARENT: "genericDreadnoughtOfficialV2",
	BODY: eggnoughtBody,
	SHAPE: 0,
	COLOR: 'egg',
	SIZE: 16,
	DANGER: 8,
}
Class.genericSquarenought = {
	PARENT: "genericDreadnoughtOfficialV2",
	BODY: squarenoughtBody,
	SHAPE: 4,
	COLOR: 'square',
	SIZE: 20,
	DANGER: 9,
}
Class.genericTrinought = {
	PARENT: "genericDreadnoughtOfficialV2",
	BODY: trinoughtBody,
	SHAPE: 3.5,
	COLOR: 'triangle',
	SIZE: 23,
	DANGER: 10,
}
Class.genericPentanought = {
	PARENT: "genericDreadnoughtOfficialV2",
	BODY: pentanoughtBody,
	SHAPE: 5.5,
	COLOR: 'pentagon',
	SIZE: 25,
	DANGER: 11,
}
Class.genericHexnought = {
	PARENT: "genericDreadnoughtOfficialV2",
	BODY: hexnoughtBody,
	SHAPE: 6,
	COLOR: 'hexagon',
	SIZE: 26,
	DANGER: 12,
}

Class.spamAutoTurret = {
	PARENT: "autoTankGun",
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [22, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.autoTurret, {recoil: 0.2}]),
				TYPE: "bullet",
			},
		},
	],
}
Class.supermissile = {
	PARENT: "bullet",
	LABEL: "Missile",
	INDEPENDENT: true,
	BODY: {
		RANGE: 120,
	},
	GUNS: [
		{
			POSITION: [14, 6, 1, 0, -2, 130, 0],
			PROPERTIES: {
				AUTOFIRE: true,
				SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { recoil: 1.35 }, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }]),
				TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
				STAT_CALCULATOR: gunCalcNames.thruster,
			},
		},
		{
			POSITION: [14, 6, 1, 0, 2, 230, 0],
			PROPERTIES: {
				AUTOFIRE: true,
				SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { recoil: 1.35 }, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }]),
				TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
				STAT_CALCULATOR: gunCalcNames.thruster,
			},
		},
		{
			POSITION: [14, 6, 1, 0, 0, 0, 0.2],
			PROPERTIES: {
				AUTOFIRE: true,
				SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }]),
				TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
			},
		},
	],
};
Class.betadrone = {
	PARENT: "drone",
	TURRETS: [
		{
			POSITION: [10, 0, 0, 180, 0, 1],
			TYPE: ["triangle", {COLOR: -1}],
		},
	]
}

// T0
Class.dreadOfficialV2 = {
	PARENT: "genericEggnought",
	LABEL: "Dreadnought",
	UPGRADE_LABEL: "Dreads V2",
	LEVEL: 90,
	EXTRA_SKILL: 18,
}
Class.dreadWeaponOfficialV2 = {
	LABEL: "",
	COLOR: 6,
	REROOT_UPGRADE_TREE: "dreadWeaponOfficialV2",
}
Class.dreadBodyOfficialV2 = {
	LABEL: "",
	COLOR: 6,
	REROOT_UPGRADE_TREE: "dreadBodyOfficialV2",
}

// T1 Weapons
Class.swordOfficialV2 = {
	PARENT: "genericEggnought",
	LABEL: "Sword",
	GUNS: [],
}
for (let i = 0; i < 2; i++) {
	Class.swordOfficialV2.GUNS.push(
		{
			POSITION: [20, 7, 1, 0, 0, 180*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, {reload: 0.85}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.sword2OfficialV2 = {
	PARENT: "swordOfficialV2",
	BATCH_UPGRADES: true,
}
Class.pacifierOfficialV2 = {
	PARENT: "genericEggnought",
	LABEL: "Pacifier",
	GUNS: [],
}
for (let i = 0; i < 2; i++) {
	Class.pacifierOfficialV2.GUNS.push(
		{
			POSITION: [15, 7, 1, 0, 0, 180*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, {reload: 0.8}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.pacifier2OfficialV2 = {
	PARENT: "pacifierOfficialV2",
	BATCH_UPGRADES: true,
}
Class.peacekeeperOfficialV2 = {
	PARENT: "genericEggnought",
	LABEL: "Peacekeeper",
	GUNS: [],
}
for (let i = 0; i < 2; i++) {
	Class.peacekeeperOfficialV2.GUNS.push(
		{
			POSITION: [17, 9, 1, 0, 0, 180*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, {reload: 1.2, damage: 1.5}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.peacekeeper2OfficialV2 = {
	PARENT: "peacekeeperOfficialV2",
	BATCH_UPGRADES: true,
}
Class.invaderOfficialV2 = {
	PARENT: "genericEggnought",
	LABEL: "Invader",
	GUNS: [],
}
for (let i = 0; i < 2; i++) {
	Class.invaderOfficialV2.GUNS.push(
		{
			POSITION: [5, 9, 1.2, 8, 0, 180*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.overseer, {reload: 0.85}]),
				TYPE: "drone",
				MAX_CHILDREN: 4,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: gunCalcNames.drone,
				WAIT_TO_CYCLE: true,
			},
		},
	)
}
Class.invader2OfficialV2 = {
	PARENT: "invaderOfficialV2",
	BATCH_UPGRADES: true,
}
Class.centaurOfficialV2 = {
	PARENT: "genericEggnought",
	LABEL: "Centaur",
	GUNS: [],
}
for (let i = 0; i < 2; i++) {
	Class.centaurOfficialV2.GUNS.push(
		{
			POSITION: [13, 7, 1, 0, 0, 180*i, 0],
		},
		{
			POSITION: [3, 7, 1.5, 13, 0, 180*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, {health: 2}]),
				TYPE: "trap",
				STAT_CALCULATOR: gunCalcNames.trap,
			},
		},
	)
}
Class.centaur2OfficialV2 = {
	PARENT: "centaurOfficialV2",
	BATCH_UPGRADES: true,
}

// T1 Bodies
Class.byteTurretOfficialV2 = {
	PARENT: "autoTankGun",
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [22, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, {health: 1.2, speed: 0.8}]),
				TYPE: "bullet",
			},
		},
	],
}
Class.byteOfficialV2 = {
	PARENT: "genericEggnought",
	LABEL: "Byte",
	TURRETS: [
		{
			POSITION: [15, 0, 0, 0, 0, 1],
			TYPE: 'egg',
		},
		{
			POSITION: [9, 0, 0, 0, 360, 1],
			TYPE: 'byteTurretOfficialV2',
		},
	],
}
Class.atmosphereAuraOfficialV2 = addAura(1, 1, 0.15);
Class.atmosphereOfficialV2 = {
	PARENT: "genericEggnought",
	LABEL: "Atmosphere",
	TURRETS: [
		{
			POSITION: [14, 0, 0, 0, 0, 1],
			TYPE: 'egg',
		},
		{
			POSITION: [11, 0, 0, 0, 360, 1],
			TYPE: 'atmosphereAuraOfficialV2',
		},
	],
}
Class.juggernautOfficialV2 = {
	PARENT: "genericEggnought",
	LABEL: "Juggernaut",
	BODY: {
		HEALTH: 1.6,
		SHIELD: 1.6,
		REGEN: 1.5,
		SPEED: 0.8,
	},
	TURRETS: [
		{
			POSITION: [15, 0, 0, 0, 0, 1],
			TYPE: 'egg',
		},
		{
			POSITION: [24, 0, 0, 0, 0, 0],
			TYPE: ['egg', {COLOR: 9}]
		},
	],
}

// T2 Weapons
Class.sabreOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Sabre",
	GUNS: [],
}
for (let i = 0; i < 4; i++) {
	Class.sabreOfficialV2.GUNS.push(
		{
			POSITION: [24, 7, 1, 0, 0, 90*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.assassin, {reload: 0.85, density: 1/2}]),
				TYPE: "bullet",
			},
		},
		{
			POSITION: [5, 7, -1.7, 7, 0, 90*i, 0],
		},
	)
}
Class.gladiusOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Gladius",
	GUNS: [],
}
for (let i = 0; i < 4; i++) {
	Class.gladiusOfficialV2.GUNS.push(
		{
			POSITION: [17, 8, 1, 0, 0, 90*i, 0],
		},
		{
			POSITION: [19.5, 5, 1, 0, 0, 90*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, {health: 1.3}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.mediatorOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Mediator",
	GUNS: [],
}
for (let i = 0; i < 4; i++) {
	Class.mediatorOfficialV2.GUNS.push(
		{
			POSITION: [15, 7, 1, 0, 4.25, 90*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, {reload: 0.85}]),
				TYPE: "bullet",
			},
		},
		{
			POSITION: [15, 7, 1, 0, -4.25, 90*i, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, {reload: 0.85}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.negotiatorOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Negotiator",
	GUNS: [],
}
for (let i = 0; i < 4; i++) {
	Class.negotiatorOfficialV2.GUNS.push(
		{
			POSITION: [9, 8, 1.4, 6, 0, 90*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, {size: 0.8, health: 1.3}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.enforcerOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Enforcer",
	GUNS: [],
}
for (let i = 0; i < 4; i++) {
	Class.enforcerOfficialV2.GUNS.push(
		{
			POSITION: [17, 9, 1, 0, 0, 90*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pounder, {reload: 0.9}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.executorOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Executor",
	GUNS: [],
}
for (let i = 0; i < 4; i++) {
	Class.executorOfficialV2.GUNS.push(
		{
			POSITION: [11, 6, 1, 8, 0, 90*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, { speed: 0.5, maxSpeed: 0.5 }, {reload: 0.8}]),
				TYPE: "missile",
				STAT_CALCULATOR: gunCalcNames.sustained,
			},
		},
		{
			POSITION: [17, 9, 1, 0, 0, 90*i, 0],	
		},
	)
}
Class.inquisitorOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Inquisitor",
	GUNS: [],
}
for (let i = 0; i < 4; i++) {
	Class.inquisitorOfficialV2.GUNS.push(
		{
			POSITION: [5, 11, 1.1, 8, 0, 90*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.overseer, {size: 1.5, reload: 0.6}]),
				TYPE: "drone",
				MAX_CHILDREN: 3,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: gunCalcNames.drone,
				WAIT_TO_CYCLE: true,
			},
		},
	)
}
Class.assailantMinionOfficialV2 = {
	PARENT: "minion",
	BODY: {
		SPEED: 0.5,
	},
	SHAPE: 4,
	COLOR: 13,
	GUNS: []
}
for (let i = 0; i < 4; i++) {
	Class.assailantMinionOfficialV2.GUNS.push(
		{
			POSITION: [15, 7.5, 1, 0, 0, 90*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.assassin, g.minionGun]),
				WAIT_TO_CYCLE: true,
				TYPE: "bullet",
			},
		},
	)
}
Class.assailantOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Assailant",
	GUNS: [],
}
for (let i = 0; i < 4; i++) {
	Class.assailantOfficialV2.GUNS.push(
		{
			POSITION: [5, 10, 1, 10.5, 0, 90*i, 0],
		},
		{
			POSITION: [1.5, 11, 1, 15, 0, 90*i, 0],
			PROPERTIES: {
				MAX_CHILDREN: 4,
				SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 0.5}]),
				TYPE: "assailantMinionOfficialV2",
				STAT_CALCULATOR: gunCalcNames.drone,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				MAX_CHILDREN: 2,
			},
		},
		{
			POSITION: [12, 11, 1, 0, 0, 90*i, 0],
		},
	)
}
Class.daemonOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Daemon",
	GUNS: [],
}
for (let i = 0; i < 4; i++) {
	Class.daemonOfficialV2.GUNS.push(
		{
			POSITION: [11.5, 4.5, 1, 0, 4.5, 90*i, 0],
		},
		{
			POSITION: [2, 4.5, 1.7, 11, 4.5, 90*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.twin, {health: 2}]),
				TYPE: "trap",
				STAT_CALCULATOR: gunCalcNames.trap,
			},
		},
		{
			POSITION: [11.5, 4.5, 1, 0, -4.5, 90*i, 0],
		},
		{
			POSITION: [2, 4.5, 1.7, 11, -4.5, 90*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.twin, {health: 2}]),
				TYPE: "trap",
				STAT_CALCULATOR: gunCalcNames.trap,
			},
		},
	)
}
Class.minotaurOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Minotaur",
	GUNS: [],
}
for (let i = 0; i < 4; i++) {
	Class.minotaurOfficialV2.GUNS.push(
		{
			POSITION: [13, 7, 1, 0, 0, 90*i, 0],
		},
		{
			POSITION: [3.75, 7, 1.75, 13, 0, 90*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, {health: 2}]),
				TYPE: "unsetTrap",
				STAT_CALCULATOR: gunCalcNames.block
			},
		},
	)
}

// T2 Bodies
Class.automationOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Automation",
	TURRETS: [
		{
			POSITION: [11, 0, 0, 0, 0, 1],
			TYPE: ["square", {MIRROR_MASTER_ANGLE: true}],
		},
	],
}
for (let i = 0; i < 4; i++) {
	Class.automationOfficialV2.TURRETS.push(
		{
			POSITION: [4, 9, 0, 90*i+45, 180, 1],
			TYPE: "spamAutoTurret",
		},
	)
}
Class.kilobyteTurretOfficialV2 = {
	PARENT: "autoTankGun",
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [26, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.assassin, g.autoTurret, {health: 1.2, speed: 0.8}]),
				TYPE: "bullet",
			},
		},
	],
}
Class.kilobyteOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Kilobyte",
	TURRETS: [
		{
			POSITION: [12, 0, 0, 0, 0, 1],
			TYPE: ["square", {MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [10, 0, 0, 0, 360, 1],
			TYPE: "kilobyteTurretOfficialV2",
		},
	],
}
Class.coronaAuraOfficialV2 = addAura(1.5, 0.8, 0.15);
Class.coronaOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Corona",
	TURRETS: [
		{
			POSITION: [14, 0, 0, 0, 0, 1],
			TYPE: ["square", {MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [11, 0, 0, 0, 360, 1],
			TYPE: "coronaAuraOfficialV2",
		},
	],
}
Class.thermosphereAuraOfficialV2 = addAura(-1, 1.5);
Class.thermosphereOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Thermosphere",
	TURRETS: [
		{
			POSITION: [14, 0, 0, 0, 0, 1],
			TYPE: ["square", {MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [11, 0, 0, 0, 360, 1],
			TYPE: "thermosphereAuraOfficialV2",
		},
	],
}
Class.jumboOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Jumbo",
	BODY: {
		HEALTH: 2.4,
		SHIELD: 2.4,
		REGEN: 2,
		SPEED: 0.65,
	},
	TURRETS: [
		{
			POSITION: [15, 0, 0, 0, 0, 1],
			TYPE: ['square', {MIRROR_MASTER_ANGLE: true}]
		},
		{
			POSITION: [24, 0, 0, 0, 0, 0],
			TYPE: ['square', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
		},
	],
}
Class.colossusTopOfficialV2 = {
	PARENT: "genericSquarenought",
	GUNS: [],
}
for (let i = 0; i < 4; i++) {
	Class.colossusTopOfficialV2.GUNS.push(
		{
			POSITION: [3.5, 17.5, 0.001, 9, 0, 90*i, 0],
			PROPERTIES: {COLOR: 9},
		},
	)
}
Class.colossusBottomOfficialV2 = {
	PARENT: "genericSquarenought",
	GUNS: [],
}
for (let i = 0; i < 4; i++) {
	Class.colossusTopOfficialV2.GUNS.push(
		{
			POSITION: [3.5, 17.5, 0.001, 9, 0, 90*i, 0],
			PROPERTIES: {COLOR: 9},
		},
	)
}
for (let i = 0; i < 4; i++) {
	Class.colossusBottomOfficialV2.GUNS.push(
		{
			POSITION: [4, 17.5, 0.001, 9, 0, 90*i, 0],
			PROPERTIES: {COLOR: 9},
		},
	)
}
Class.colossusOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "colossus",
	BODY: {
		SPEED: 1.75,
		HEALTH: 0.65,
	},
	GUNS: [],
	TURRETS: [
		{
			POSITION: [13, 0, 0, 0, 0, 1],
			TYPE: ['colossusTopOfficialV2', {MIRROR_MASTER_ANGLE: true}]
		},
		{
			POSITION: [20, 0, 0, 0, 0, 0],
			TYPE: ['colossusBottomOfficialV2', {MIRROR_MASTER_ANGLE: true}]
		},
	],
}
// T3 Weapons
Class.bayonetOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Bayonet",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.bayonetOfficialV2.GUNS.push(
		{
			POSITION: [28, 7, 1, 0, 0, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.assassin, g.assassin, {reload: 0.8, density: 2/5}]),
				TYPE: "bullet",
			},
		},
		{
			POSITION: [5, 7, -1.6, 7, 0, 120*i, 0],
		},
	)
}
Class.bladeOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Blade",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.bladeOfficialV2.GUNS.push(
		{
			POSITION: [17, 1, 1, 0, 6, 120*i, 0],
		},
		{
			POSITION: [17, 1, 1, 0, -6, 120*i, 0],
		},
		{
			POSITION: [18, 5, 1, 0, 3, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin, {speed: 0.8, health: 1.5}]),
				TYPE: "bullet",
			},
		},
		{
			POSITION: [18, 5, 1, 0, -3, 120*i, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin, {speed: 0.8, health: 1.5}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.mitigatorOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Mitigator",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.mitigatorOfficialV2.GUNS.push(
		{
			POSITION: [10, 8, 1, 3, 5, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, {reload: 0.85}]),
				TYPE: "bullet",
			},
		},
		{
			POSITION: [10, 8, 1, 3, -5, 120*i, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, {reload: 0.85}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.appeaserOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Appeaser",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.appeaserOfficialV2.GUNS.push(
		{
			POSITION: [7, 11, 1.35, 6, 0, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, {size: 0.8}]),
				TYPE: "bullet",
			},
		},
		{
			POSITION: [7, 10, 1.3, 8, 0, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, {size: 0.8, reload: 0.9}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.suppressorOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Suppressor",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.suppressorOfficialV2.GUNS.push(
		{
			POSITION: [16.5, 11.5, 1, 0, 0, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, {reload: 0.85}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.inhibitorOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Inhibitor",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.inhibitorOfficialV2.GUNS.push(
		{
			POSITION: [10, 14, -0.75, 7, 0, 120*i, 0],
		},
		{
			POSITION: [15, 15, 1, 0, 0, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.skimmer, { speed: 0.5, maxSpeed: 0.5 }, {reload: 0.8}]),
				TYPE: "supermissile",
				STAT_CALCULATOR: gunCalcNames.sustained,
			},
		},
	)
}
Class.infiltratorOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Infiltrator",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.infiltratorOfficialV2.GUNS.push(
		{
			POSITION: [5, 6, 1.4, 6, 5.5, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.overseer, {size: 1.5, reload: 0.6}]),
				TYPE: "drone",
				MAX_CHILDREN: 2,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: gunCalcNames.drone,
				WAIT_TO_CYCLE: true,
			},
		},
		{
			POSITION: [5, 6, 1.4, 6, -5.5, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.overseer, {size: 1.5, reload: 0.6}]),
				TYPE: "drone",
				MAX_CHILDREN: 2,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: gunCalcNames.drone,
				WAIT_TO_CYCLE: true,
			},
		},
		{
			POSITION: [5, 6, 1.4, 8, 0, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.overseer, g.pounder, {size: 2, reload: 0.4}]),
				TYPE: "betadrone",
				MAX_CHILDREN: 2,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: gunCalcNames.drone,
				WAIT_TO_CYCLE: true,
			},
		},
	)
}
Class.aggressorMinionOfficialV2 = {
	PARENT: "minion",
	SHAPE: 3.5,
	COLOR: 2,
	BODY: {
		SPEED: 0.8,
	},
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.aggressorMinionOfficialV2.GUNS.push(
		{
			POSITION: [16, 8.5, 1, 0, 0, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, { speed: 0.93, maxSpeed: 0.93 }, g.minionGun]),
				WAIT_TO_CYCLE: true,
				TYPE: "bullet",
			},
		},
	)
}
Class.aggressorOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Aggressor",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.aggressorOfficialV2.GUNS.push(
		{
			POSITION: [5, 12, 1, 10, 0, 120*i, 0],
		},
		{
			POSITION: [1.5, 13, 1, 15, 0, 120*i, 0],
			PROPERTIES: {
				MAX_CHILDREN: 4,
				SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 0.5}]),
				TYPE: "aggressorMinionOfficialV2",
				STAT_CALCULATOR: gunCalcNames.drone,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				MAX_CHILDREN: 2,
			},
		},
		{
			POSITION: [12, 13, 1, 0, 0, 120*i, 0],
		},
	)
}
Class.hydraOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Hydra",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.hydraOfficialV2.GUNS.push(
		{
			POSITION: [6, 3.5, 1, 4, 8.5, 120*i, 0],
		},
		{
			POSITION: [2, 3.5, 1.8, 10, 8.5, 120*i, 2/3],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pounder, { speed: 1.2 }]),
				TYPE: "trap",
				STAT_CALCULATOR: gunCalcNames.trap,
			},
		},
		{
			POSITION: [6, 3.5, 1, 4, -8.5, 120*i, 0],
		},
		{
			POSITION: [2, 3.5, 1.8, 10, -8.5, 120*i, 1/3],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pounder, { speed: 1.2 }]),
				TYPE: "trap",
				STAT_CALCULATOR: gunCalcNames.trap,
			},
		},
		{
			POSITION: [12, 5, 1, 0, 0, 120*i, 0],
		},
		{
			POSITION: [2.5, 5, 1.7, 12, 0, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.twin, g.pounder, { speed: 1.2 }]),
				TYPE: "unsetTrap",
				STAT_CALCULATOR: gunCalcNames.block
			},
		},
	)
}
Class.beelzebubOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Beelzebub",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.beelzebubOfficialV2.GUNS.push(
		{
			POSITION: [13, 10, 1, 0, 0, 120*i, 0],
		},
		{
			POSITION: [3.5, 10, 1.6, 13, 0, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.pounder, { speed: 1.3, maxSpeed: 1.3 }, {size: 1.2, health: 2}]),
				TYPE: "unsetTrap",
				STAT_CALCULATOR: gunCalcNames.block
			},
		},
	)
}

// T3 Bodies
Class.mechanismOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Mechanism",
	TURRETS: [
		{
			POSITION: [10, 0, 0, 180, 0, 1],
			TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
		},
	],
}
for (let i = 0; i < 3; i++) {
	Class.mechanismOfficialV2.TURRETS.push(
		{
			POSITION: [3.5, 6, 0, 120*i, 180, 1],
			TYPE: "spamAutoTurret",
		},
		{
			POSITION: [3.5, 10, 0, 120*i+60, 180, 1],
			TYPE: "spamAutoTurret",
		},
	)
}
Class.trinoughtBigAura = addAura(2, 1.5);
Class.fusionOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Fusion",
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [9.5, 0, 0, 0, 360, 1],
			TYPE: "trinoughtBigAura",
		},
	],
}
for (let i = 0; i < 3; i++) {
	Class.fusionOfficialV2.TURRETS.push(
		{
			POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
			TYPE: "spamAutoTurret",
		},
	)
}
Class.binaryOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Binary",
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
		},
	],
}
for (let i = 0; i < 3; i++) {
	Class.binaryOfficialV2.TURRETS.push(
		{
			POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
			TYPE: "spamAutoTurret",
		},
	)
}
Class.binaryOfficialV2.TURRETS.push(
	{
		POSITION: [10, 0, 0, 0, 360, 1],
		TYPE: "kilobyteTurretOfficialV2",
	},
)
Class.trinoughtBigHealAura = addAura(-1.5, 1.5);
Class.exosphereOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Exosphere",
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [9.5, 0, 0, 0, 360, 1],
			TYPE: "trinoughtBigHealAura",
		},
	],
}
for (let i = 0; i < 3; i++) {
	Class.exosphereOfficialV2.TURRETS.push(
		{
			POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
			TYPE: "spamAutoTurret",
		},
	)
}
Class.megabyteTurretOfficialV2 = {
	PARENT: "autoTankGun",
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [26, 13, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pounder, g.autoTurret, {health: 1.2, speed: 0.8}]),
				TYPE: "bullet",
			},
		},
	],
}
Class.megabyteOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Megabyte",
	TURRETS: [
		{
			POSITION: [15, 0, 0, 180, 0, 1],
			TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [12, 0, 0, 0, 360, 1],
			TYPE: "megabyteTurretOfficialV2",
		},
	],
}
Class.trinoughtSmallAura = addAura(1, 2.1, 0.15);
Class.trojanOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Trojan",
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
		},
	],
}
for (let i = 0; i < 3; i++) {
	Class.trojanOfficialV2.TURRETS.push(
		{
			POSITION: [3.5, 11, 0, 120*i+60, 360, 1],
			TYPE: "trinoughtSmallAura",
		},
	)
}
Class.trojanOfficialV2.TURRETS.push(
	{
		POSITION: [10, 0, 0, 0, 360, 1],
		TYPE: "kilobyteTurretOfficialV2",
	},
)
Class.trinoughtSmallHealAura = addAura(-2/3, 2.1, 0.15);
Class.hardwareOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Hardware",
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
		},
	],
}
for (let i = 0; i < 3; i++) {
	Class.hardwareOfficialV2.TURRETS.push(
		{
			POSITION: [3.5, 11, 0, 120*i+60, 360, 1],
			TYPE: "trinoughtSmallHealAura",
		},
	)
}
Class.hardwareOfficialV2.TURRETS.push(
	{
		POSITION: [10, 0, 0, 0, 360, 1],
		TYPE: "kilobyteTurretOfficialV2",
	},
)
Class.chromosphereOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Chromosphere",
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [9.5, 0, 0, 0, 360, 1],
			TYPE: "trinoughtBigAura",
		},
	],
}
for (let i = 0; i < 3; i++) {
	Class.chromosphereOfficialV2.TURRETS.push(
		{
			POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
			TYPE: "trinoughtSmallAura",
		},
	)
}
Class.mesosphereOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Mesosphere",
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [9.5, 0, 0, 0, 360, 1],
			TYPE: "trinoughtBigHealAura",
		},
	],
}
for (let i = 0; i < 3; i++) {
	Class.mesosphereOfficialV2.TURRETS.push(
		{
			POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
			TYPE: "trinoughtSmallHealAura",
		},
	)
}
Class.goliathOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Goliath",
	BODY: {
		HEALTH: 3.2,
		SHIELD: 3.2,
		REGEN: 2.5,
		SPEED: 0.5,
	},
	TURRETS: [
		{
			POSITION: [14, 0, 0, 180, 0, 1],
			TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
		},
		{
			POSITION: [24, 0, 0, 180, 0, 0],
			TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
		},
	],
}
Class.planetOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Planet",
	BODY: {
		HEALTH: 2.4,
		SHIELD: 2.4,
		REGEN: 2,
		SPEED: 0.65,
	},
	TURRETS: [
		{
			POSITION: [24, 0, 0, 180, 0, 0],
			TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
		},
		{
			POSITION: [12, 0, 0, 180, 0, 1],
			TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
		}
	],
}
for (let i = 0; i < 3; i++) {
	Class.planetOfficialV2.TURRETS.push(
		{
			POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
			TYPE: "trinoughtSmallAura",
		},
	)
}
Class.moonOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Moon",
	BODY: {
		HEALTH: 2.4,
		SHIELD: 2.4,
		REGEN: 2,
		SPEED: 0.65,
	},
	TURRETS: [
		{
			POSITION: [24, 0, 0, 180, 0, 0],
			TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
		},
		{
			POSITION: [12, 0, 0, 180, 0, 1],
			TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
		}
	],
}
for (let i = 0; i < 3; i++) {
	Class.moonOfficialV2.TURRETS.push(
		{
			POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
			TYPE: "trinoughtSmallHealAura",
		},
	)
}
Class.titanTopOfficialV2 = {
	PARENT: "genericTrinought",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.titanTopOfficialV2.GUNS.push(
		{
			POSITION: [5, 26, 0.001, 8, 0, 120*i, 0],
			PROPERTIES: {COLOR: 9},
		},
	)
}
Class.titanOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Titan",
	BODY: {
		SPEED: 2.15,
		HEALTH: 0.5,
	},
	GUNS: [],
	TURRETS: [
		{
			POSITION: [11, 0, 0, 0, 0, 1],
			TYPE: ["titanTopOfficialV2", {MIRROR_MASTER_ANGLE: true}]
		},
		{
			POSITION: [20, 0, 0, 0, 0, 0],
			TYPE: ["titanTopOfficialV2", {MIRROR_MASTER_ANGLE: true}]
		},
	],
}
Class.sirenOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Siren",
	BODY: {
		SPEED: 1.75,
		HEALTH: 0.65,
	},
	GUNS: [],
	TURRETS: [
		{
			POSITION: [12, 0, 0, 180, 0, 1],
			TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [20, 0, 0, 0, 0, 0],
			TYPE: ["titanTopOfficialV2", {MIRROR_MASTER_ANGLE: true}]
		},
	],
}
for (let i = 0; i < 3; i++) {
	Class.sirenOfficialV2.TURRETS.push(
		{
			POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
			TYPE: "trinoughtSmallAura",
		},
	)
}
Class.harpyOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Harpy",
	BODY: {
		SPEED: 1.75,
		HEALTH: 0.65,
	},
	GUNS: [],
	TURRETS: [
		{
			POSITION: [12, 0, 0, 180, 0, 1],
			TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [20, 0, 0, 0, 0, 0],
			TYPE: ["titanTopOfficialV2", {MIRROR_MASTER_ANGLE: true}]
		},
	],
}
for (let i = 0; i < 3; i++) {
	Class.harpyOfficialV2.TURRETS.push(
		{
			POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
			TYPE: "trinoughtSmallHealAura",
		},
	)
}

// T4 Weapons
Class.javelinOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Javelin",
	GUNS: [],
}
for (let i = 0; i < 5; i++) {
	Class.javelinOfficialV2.GUNS.push(
		{
			POSITION: [28, 7, 1, 0, 0, 72*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.assassin, g.assassin, g.assassin, {reload: 0.8, density: 2/9}]),
				TYPE: "bullet",
			},
		},
		{
			POSITION: [5, 7, -1.6, 7, 0, 72*i, 0],
		},
	)
}
Class.rapierOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Rapier",
	GUNS: [],
}
for (let i = 0; i < 5; i++) {
	Class.rapierOfficialV2.GUNS.push(
		{
			POSITION: [17, 1, 1, 0, 6, 72*i, 0],
		},
		{
			POSITION: [17, 1, 1, 0, -6, 72*i, 0],
		},
		{
			POSITION: [18, 5, 1, 0, 3, 72*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, {speed: 0.8, health: 1.5}]),
				TYPE: "bullet",
			},
		},
		{
			POSITION: [18, 5, 1, 0, -3, 72*i, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, {speed: 0.8, health: 1.5}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.diplomatOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Diplomat",
	GUNS: [],
}
for (let i = 0; i < 5; i++) {
	Class.diplomatOfficialV2.GUNS.push(
		{
			POSITION: [13, 7, 1, 0, 3.25, 72*i, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.spam, g.spam, {size: 0.85}]),
				TYPE: "bullet",
			},
		},
		{
			POSITION: [13, 7, 1, 0, -3.25, 72*i, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.spam, g.spam, {size: 0.85}]),
				TYPE: "bullet",
			},
		},
		{
			POSITION: [15, 7, 1, 0, 0, 72*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.spam, g.spam, {size: 0.85}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.arbitratorOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Arbitrator",
	GUNS: [],
}
for (let i = 0; i < 5; i++) {
	Class.arbitratorOfficialV2.GUNS.push(
		{
			POSITION: [7.5, 10.75, 1.33, 5.5, 0, 72*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.spam, g.spam, {size: 0.7, reload: 1.2}]),
				TYPE: "bullet",
			},
		},
		{
			POSITION: [7.5, 9.5, 1.33, 7.5, 0, 72*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.spam, g.spam, {size: 0.7, reload: 1.1}]),
				TYPE: "bullet",
			},
		},
		{
			POSITION: [7.5, 7.25, 1.25, 9.5, 0, 72*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.spam, g.spam, {size: 0.7, reload: 1}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.retardantOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Retardant",
	GUNS: [],
}
for (let i = 0; i < 5; i++) {
	Class.retardantOfficialV2.GUNS.push(
		{
			POSITION: [17, 12, 1, 0, 0, 72*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator, {reload: 0.9, health: 1.1}]),
				TYPE: "bullet",
			},
		},
	)
}
Class.tyrantOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Tyrant",
	GUNS: [],
}
for (let i = 0; i < 5; i++) {
	Class.tyrantOfficialV2.GUNS.push(
		{
			POSITION: [10, 11, -0.75, 7, 0, 72*i, 0],
		},
		{
			POSITION: [15, 12, 1, 0, 0, 72*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.destroyer, g.artillery, g.skimmer, { speed: 0.5, maxSpeed: 0.5 }, {reload: 0.8}]),
				TYPE: "supermissile",
				STAT_CALCULATOR: gunCalcNames.sustained,
			},
		},
	)
}
Class.raiderOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Raider",
	GUNS: [],
}
for (let i = 0; i < 5; i++) {
	Class.raiderOfficialV2.GUNS.push(
		{
			POSITION: [4, 5, 2.1, 8, 3.25, 72*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.overseer, g.overseer, {size: 1.5, reload: 0.6}]),
				TYPE: ["drone", {COLOR: 5}],
				MAX_CHILDREN: 2,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: gunCalcNames.drone,
				WAIT_TO_CYCLE: true,
			},
		},
		{
			POSITION: [4, 5, 2.1, 8, -3.25, 72*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.overseer, g.overseer, {size: 1.5, reload: 0.6}]),
				TYPE: ["drone", {COLOR: 5}],
				MAX_CHILDREN: 2,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: gunCalcNames.drone,
				WAIT_TO_CYCLE: true,
			},
		},
		{
			POSITION: [6, 6.5, 1.4, 8, 0, 72*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.overseer, g.overseer, g.pounder, {size: 2, reload: 0.4}]),
				TYPE: ["betadrone", {COLOR: 5}],
				MAX_CHILDREN: 2,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: gunCalcNames.drone,
				WAIT_TO_CYCLE: true,
			},
		},
	)
}
Class.gladiatorGenericMinionOfficialV2 = {
	PARENT: "minion",
	BODY: {
		SPEED: 1,
	},
	SHAPE: 3.5,
	COLOR: 5,
	GUNS: [],
}
Class.gladiatorTritankMinionOfficialV2 = {
	PARENT: "gladiatorGenericMinionOfficialV2",
	GUNS: [],
}
Class.gladiatorTritrapMinionOfficialV2 = {
	PARENT: "gladiatorGenericMinionOfficialV2",
	GUNS: [],
}
Class.gladiatorTriswarmMinionOfficialV2 = {
	PARENT: "gladiatorGenericMinionOfficialV2",
	GUNS: [],
}
Class.gladiatorAutoMinionOfficialV2 = makeAuto({
	PARENT: "gladiatorGenericMinionOfficialV2",
}, "Minion", {size: 12, angle: 0});
Class.gladiatorAuraMinionAuraOfficialV2 = addAura(1, 1.2);
Class.gladiatorAuraMinionOfficialV2 = {
	PARENT: "gladiatorGenericMinionOfficialV2",
	TURRETS: [
		{
			POSITION: [12, 0, 0, 0, 360, 1],
			TYPE: "gladiatorAuraMinionAuraOfficialV2",
		}
	]
}
Class.gladiatorHealAuraMinionAuraOfficialV2 = addAura(-2/3, 1.2);
Class.gladiatorHealAuraMinionOfficialV2 = {
	PARENT: "gladiatorGenericMinionOfficialV2",
	TURRETS: [
		{
			POSITION: [12, 0, 0, 0, 360, 1],
			TYPE: "gladiatorHealAuraMinionAuraOfficialV2",
		}
	]
}
for (let i = 0; i < 3; i++) {
	Class.gladiatorTritankMinionOfficialV2.GUNS.push(
		{
			POSITION: [15, 8.5, 1, 0, 0, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, { speed: 0.7, maxSpeed: 0.7 }, g.minionGun]),
				WAIT_TO_CYCLE: true,
				TYPE: ["bullet", {COLOR: 5}],
			},
		},
	);
	Class.gladiatorTritrapMinionOfficialV2.GUNS.push(
		{
			POSITION: [13, 7, 1, 0, 0, 120*i, 0],
		},
		{
			POSITION: [3, 7, 1.7, 13, 0, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.flankGuard, g.minionGun]),
				TYPE: "trap",
				STAT_CALCULATOR: gunCalcNames.trap,
			},
		},
	);
	Class.gladiatorTriswarmMinionOfficialV2.GUNS.push(
		{
			POSITION: [7, 8.5, -1.5, 7, 0, 120*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.swarm, {size: 1.6, range: 0.5}]),
				TYPE: ["swarm", {COLOR: 5}],
				STAT_CALCULATOR: gunCalcNames.swarm,
			},
		},
	);
}
Class.gladiatorOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Gladiator",
	GUNS: [],
}
for (let i = 0; i < 5; i++) {
	Class.gladiatorOfficialV2.GUNS.push(
		{
			POSITION: [4.75, 12, 1, 10, 0, 72*i, 0],
		},
		{
			POSITION: [1.5, 13, 1, 14.75, 0, 72*i, 0],
			PROPERTIES: {
				MAX_CHILDREN: 4,
				SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 0.5}]),
				TYPE: "minion",
				STAT_CALCULATOR: gunCalcNames.drone,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				MAX_CHILDREN: 2,
			},
		},
		{
			POSITION: [12, 13, 1, 0, 0, 72*i, 0],
		},
	)
}
Class.gladiatorOfficialV2.GUNS[1].PROPERTIES.TYPE = "gladiatorTritankMinionOfficialV2";
Class.gladiatorOfficialV2.GUNS[4].PROPERTIES.TYPE = "gladiatorTritrapMinionOfficialV2";
Class.gladiatorOfficialV2.GUNS[7].PROPERTIES.TYPE = "gladiatorTriswarmMinionOfficialV2";
Class.gladiatorOfficialV2.GUNS[10].PROPERTIES.TYPE = "gladiatorAutoMinionOfficialV2";
Class.gladiatorOfficialV2.GUNS[13].PROPERTIES.TYPE = "gladiatorAuraMinionOfficialV2";
Class.cerberusOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Cerberus",
	GUNS: [],
}
for (let i = 0; i < 5; i++) {
	Class.cerberusOfficialV2.GUNS.push(
		{
			POSITION: [12, 4, 1, 0, 2.5, 72*i+10, 0.5],
		},
		{
			POSITION: [1.5, 4, 1.6, 12, 2.5, 72*i+10, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pounder, { speed: 1.2 }]),
				TYPE: "trap",
				STAT_CALCULATOR: gunCalcNames.trap,
			},
		},
		{
			POSITION: [12, 4, 1, 0, -2.5, 72*i-10, 0.5],
		},
		{
			POSITION: [1.5, 4, 1.6, 12, -2.5, 72*i-10, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pounder, { speed: 1.2 }]),
				TYPE: "trap",
				STAT_CALCULATOR: gunCalcNames.trap,
			},
		},
		{
			POSITION: [14, 5.5, 1, 0, 0, 72*i, 0],
		},
		{
			POSITION: [2, 5.5, 1.7, 14, 0, 72*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.twin, g.pounder, { speed: 1.2 }]),
				TYPE: "unsetTrap",
				STAT_CALCULATOR: gunCalcNames.block
			},
		},
	)
}
Class.luciferOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Lucifer",
	GUNS: [],
}
for (let i = 0; i < 5; i++) {
	Class.luciferOfficialV2.GUNS.push(
		{
			POSITION: [13, 10, 1, 0, 0, 72*i, 0],
		},
		{
			POSITION: [3.5, 10, 1.6, 13, 0, 72*i, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.pounder, { speed: 1.3, maxSpeed: 1.3 }, {size: 1.3, health: 2}]),
				TYPE: "unsetTrap",
				STAT_CALCULATOR: gunCalcNames.block
			},
		},
	)
}

// T4 Bodies
Class.skynetOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Skynet",
	TURRETS: [
		{
			POSITION: [12, 0, 0, 180, 0, 1],
			TYPE: ["pentagon", {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
		}
	],
}
for (let i = 0; i < 5; i++) {
	Class.skynetOfficialV2.TURRETS.push(
		{
			POSITION: [3.25, 4.5, 0, 72*i, 180, 1],
			TYPE: "spamAutoTurret",
		},
	)
}
for (let i = 0; i < 5; i++) {
	Class.skynetOfficialV2.TURRETS.push(
		{
			POSITION: [3.25, 8, 0, 72*i+36, 180, 1],
			TYPE: "spamAutoTurret",
		},
	)
}
Class.pentanoughtBigAura = addAura(2.5, 1.45);
Class.supernovaOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Supernova",
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["pentagon", {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [9, 0, 0, 0, 360, 1],
			TYPE: "pentanoughtBigAura",
		},
	],
}
for (let i = 0; i < 5; i++) {
	Class.supernovaOfficialV2.TURRETS.push(
		{
			POSITION: [3.25, 9, 0, 72*i+36, 180, 1],
			TYPE: "spamAutoTurret",
		},
	)
}
Class.cipherOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Cipher",
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["pentagon", {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
		},
	],
}
for (let i = 0; i < 5; i++) {
	Class.cipherOfficialV2.TURRETS.push(
		{
			POSITION: [3.25, 9, 0, 72*i+36, 180, 1],
			TYPE: "spamAutoTurret",
		},
	)
}
Class.cipherOfficialV2.TURRETS.push(
	{
		POSITION: [11.5, 0, 0, 0, 360, 1],
		TYPE: "megabyteTurretOfficialV2",
	},
)
Class.pentanoughtBigHealAura = addAura(-2, 1.45);
Class.interstellarOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Interstellar",
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["pentagon", {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [9.5, 0, 0, 0, 360, 1],
			TYPE: "pentanoughtBigHealAura",
		},
	],
}
for (let i = 0; i < 5; i++) {
	Class.interstellarOfficialV2.TURRETS.push(
		{
			POSITION: [3.25, 9, 0, 72*i+36, 180, 1],
			TYPE: "spamAutoTurret",
		},
	)
}
Class.gigabyteTurretOfficialV2 = {
	PARENT: "autoTankGun",
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [26, 16, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.pounder, g.destroyer, g.autoTurret, {speed: 1.1, health: 0.8}]),
				TYPE: "bullet",
			},
		},
	],
}
Class.gigabyteOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Gigabyte",
	TURRETS: [
		{
			POSITION: [14.5, 0, 0, 180, 0, 1],
			TYPE: ["pentagon", {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [13, 0, 0, 0, 360, 1],
			TYPE: "gigabyteTurretOfficialV2",
		},
	],
}
Class.malwareOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Malware",
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["pentagon", {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
		},
	],
}
Class.pentanoughtSmallAura = addAura(1, 1.6, 0.15);
for (let i = 0; i < 5; i++) {
	Class.malwareOfficialV2.TURRETS.push(
		{
			POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
			TYPE: "pentanoughtSmallAura",
		},
	)
}
Class.malwareOfficialV2.TURRETS.push(
	{
		POSITION: [11.5, 0, 0, 0, 360, 1],
		TYPE: "megabyteTurretOfficialV2",
	},
)
Class.pentanoughtSmallHealAura = addAura(-2/3, 1.6, 0.15);
Class.softwareOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Software",
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["pentagon", {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
		},
	],
}
for (let i = 0; i < 5; i++) {
	Class.softwareOfficialV2.TURRETS.push(
		{
			POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
			TYPE: "pentanoughtSmallHealAura",
		},
	)
}
Class.softwareOfficialV2.TURRETS.push(
	{
		POSITION: [11.5, 0, 0, 0, 360, 1],
		TYPE: "megabyteTurretOfficialV2",
	},
)
if (useOldPhotosphere) {
	Class.photosphereSmallAuraOfficialV2 = addAura(1, 1.85, 0.15);
	Class.photosphereBigAuraOfficialV2 = addAura(1.5, 4);
}
Class.photosphereOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Photosphere",
	TURRETS: [
		{
			POSITION: [12, 0, 0, 180, 0, 1],
			TYPE: ["pentagon", {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
		},
	],
}
if (useOldPhotosphere) {
	for (let i = 0; i < 5; i++) {
		Class.photosphereOfficialV2.TURRETS.push(
			{
				POSITION: [3.5, 8.75, 0, 72*i+36, 360, 1],
				TYPE: "photosphereSmallAuraOfficialV2",
			},
		)
	}
	for (let i = 0; i < 5; i++) {
		Class.photosphereOfficialV2.TURRETS.push(
			{
				POSITION: [3, 4, 0, 72*i, 360, 1],
				TYPE: "photosphereBigAuraOfficialV2",
			},
		)
	}
} else {
	for (let i = 0; i < 5; i++) {
		Class.photosphereOfficialV2.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "pentanoughtSmallAura",
			},
		)
	}
	Class.photosphereOfficialV2.TURRETS.push(
		{
			POSITION: [9, 0, 0, 0, 360, 1],
			TYPE: "pentanoughtBigAura",
		},
	)
}
Class.stratosphereOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Stratosphere",
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["pentagon", {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [9.5, 0, 0, 0, 360, 1],
			TYPE: "pentanoughtBigHealAura",
		},
	],
}
for (let i = 0; i < 5; i++) {
	Class.stratosphereOfficialV2.TURRETS.push(
		{
			POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
			TYPE: "pentanoughtSmallHealAura",
		},
	)
}
Class.behemothOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Behemoth",
	BODY: {
		HEALTH: 4,
		SHIELD: 4,
		REGEN: 2.5,
		SPEED: 0.4,
	},
	TURRETS: [
		{
			POSITION: [15, 0, 0, 180, 0, 1],
			TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [24, 0, 0, 180, 0, 0],
			TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
		},
	],
}
Class.astronomicOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Astronomic",
	BODY: {
		HEALTH: 3.2,
		SHIELD: 3.2,
		REGEN: 2.5,
		SPEED: 0.5,
	},
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["pentagon", {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [24, 0, 0, 180, 0, 0],
			TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
		},
	],
}
for (let i = 0; i < 5; i++) {
	Class.astronomicOfficialV2.TURRETS.push(
		{
			POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
			TYPE: "pentanoughtSmallAura",
		},
	)
}
Class.grandioseOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Grandiose",
	BODY: {
		HEALTH: 3.2,
		SHIELD: 3.2,
		REGEN: 2.5,
		SPEED: 0.5,
	},
	TURRETS: [
		{
			POSITION: [13, 0, 0, 180, 0, 1],
			TYPE: ["pentagon", {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [24, 0, 0, 180, 0, 0],
			TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
		},
	],
}
for (let i = 0; i < 5; i++) {
	Class.grandioseOfficialV2.TURRETS.push(
		{
			POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
			TYPE: "pentanoughtSmallHealAura",
		},
	)
}
Class.pentagonLeviathanTopOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Leviathan",
	MIRROR_MASTER_ANGLE: true,
	GUNS: [],
}
Class.pentagonLeviathanBottomOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Leviathan",
	MIRROR_MASTER_ANGLE: true,
	GUNS: [],
}
for (let i = 0; i < 5; i++) {
	Class.pentagonLeviathanTopOfficialV2.GUNS.push(
		{
			POSITION: [6, 13.5, 0.001, 9, 0, 72*i, 0],
			PROPERTIES: {COLOR: 9},
		},
	);
	Class.pentagonLeviathanBottomOfficialV2.GUNS.push(
		{
			POSITION: [7, 17, 0.001, 9, 0, 72*i, 0],
			PROPERTIES: {COLOR: 9},
		},
	);
}
Class.hexagonLeviathanTopOfficialV2 = {
	PARENT: "genericHexnought",
	LABEL: "Leviathan",
	MIRROR_MASTER_ANGLE: true,
	GUNS: [],
}
Class.hexagonLeviathanBottomOfficialV2 = {
	PARENT: "genericHexnought",
	LABEL: "Leviathan",
	MIRROR_MASTER_ANGLE: true,
	GUNS: [],
}
for (let i = 0; i < 6; i++) {
	Class.hexagonLeviathanTopOfficialV2.GUNS.push(
		{
			POSITION: [6, 10, 0.001, 9.5, 0, 60*i, 0],
			PROPERTIES: {COLOR: 9},
		},
	)
	Class.hexagonLeviathanBottomOfficialV2.GUNS.push(
		{
			POSITION: [7, 13.5, 0.001, 9.5, 0, 60*i, 0],
			PROPERTIES: {COLOR: 9},
		},
	)
}
Class.leviathanOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Leviathan",
	GUNS: [],
	BODY: {
		SPEED: 2.35,
		HEALTH: 0.35,
	},
	TURRETS: [
		{
			POSITION: [12, 0, 0, 0, 0, 1],
			TYPE: ["pentagonLeviathanTopOfficialV2", {COLOR: -1, MIRROR_MASTER_ANGLE: true}]
		},
		{
			POSITION: [20, 0, 0, 0, 0, 0],
			TYPE: ["pentagonLeviathanBottomOfficialV2", {COLOR: -1, MIRROR_MASTER_ANGLE: true}]
		},
	],
}
Class.valrayvnOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Valrayvn",
	GUNS: [],
	BODY: {
		SPEED: 2.15,
		HEALTH: 0.5,
	},
	TURRETS: [
		{
			POSITION: [12, 0, 0, 180, 0, 1],
			TYPE: ["pentagon", {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [20, 0, 0, 0, 0, 0],
			TYPE: ["pentagonLeviathanBottomOfficialV2", {COLOR: -1, MIRROR_MASTER_ANGLE: true}]
		},
	],
}
for (let i = 0; i < 5; i++) {
	Class.valrayvnOfficialV2.TURRETS.push(
		{
			POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
			TYPE: "pentanoughtSmallAura",
		},
	)
}
Class.pegasusOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Pegasus",
	GUNS: [],
	BODY: {
		SPEED: 2.15,
		HEALTH: 0.5,
	},
	TURRETS: [
		{
			POSITION: [12, 0, 0, 180, 0, 1],
			TYPE: ["pentagon", {COLOR: -1, MIRROR_MASTER_ANGLE: true}],
		},
		{
			POSITION: [20, 0, 0, 0, 0, 0],
			TYPE: ["pentagonLeviathanBottomOfficialV2", {COLOR: -1, MIRROR_MASTER_ANGLE: true}]
		},
	],
}
for (let i = 0; i < 5; i++) {
	Class.pegasusOfficialV2.TURRETS.push(
		{
			POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
			TYPE: "pentanoughtSmallHealAura",
		},
	)
}

Class.addons.UPGRADES_TIER_0.push("dreadOfficialV2");
	Class.dreadOfficialV2.UPGRADES_TIER_0 = [
		["sword2OfficialV2", "dreadBodyOfficialV2",],
		["pacifier2OfficialV2", "dreadBodyOfficialV2"],
		["peacekeeper2OfficialV2", "dreadBodyOfficialV2"],
		["invader2OfficialV2", "dreadBodyOfficialV2"],
		["centaur2OfficialV2", "dreadBodyOfficialV2"],
	];

	Class.sword2OfficialV2.UPGRADES_TIER_0 = ["swordOfficialV2"];
	Class.pacifier2OfficialV2.UPGRADES_TIER_0 = ["pacifierOfficialV2"];
	Class.peacekeeper2OfficialV2.UPGRADES_TIER_0 = ["peacekeeperOfficialV2"];
	Class.invader2OfficialV2.UPGRADES_TIER_0 = ["invaderOfficialV2"];
	Class.centaur2OfficialV2.UPGRADES_TIER_0 = ["centaurOfficialV2"];

	Class.dreadWeaponOfficialV2.UPGRADES_TIER_0 = ["swordOfficialV2", "pacifierOfficialV2", "peacekeeperOfficialV2", "invaderOfficialV2", "centaurOfficialV2"];

		Class.swordOfficialV2.UPGRADES_TIER_0 = ["gladiusOfficialV2", "sabreOfficialV2"];
			Class.gladiusOfficialV2.UPGRADES_TIER_0 = ["bladeOfficialV2"];
				Class.bladeOfficialV2.UPGRADES_TIER_0 = ["rapierOfficialV2"];
					Class.rapierOfficialV2.UPGRADES_TIER_0 = [];
			Class.sabreOfficialV2.UPGRADES_TIER_0 = ["bayonetOfficialV2"];
				Class.bayonetOfficialV2.UPGRADES_TIER_0 = ["javelinOfficialV2"];
					Class.javelinOfficialV2.UPGRADES_TIER_0 = [];

		Class.pacifierOfficialV2.UPGRADES_TIER_0 = ["mediatorOfficialV2", "negotiatorOfficialV2"];
			Class.mediatorOfficialV2.UPGRADES_TIER_0 = ["mitigatorOfficialV2"];
				Class.mitigatorOfficialV2.UPGRADES_TIER_0 = ["diplomatOfficialV2"];
					Class.diplomatOfficialV2.UPGRADES_TIER_0 = [];
			Class.negotiatorOfficialV2.UPGRADES_TIER_0 = ["appeaserOfficialV2"];
				Class.appeaserOfficialV2.UPGRADES_TIER_0 = ["arbitratorOfficialV2"];
					Class.arbitratorOfficialV2.UPGRADES_TIER_0 = [];

		Class.peacekeeperOfficialV2.UPGRADES_TIER_0 = ["enforcerOfficialV2", "executorOfficialV2"];
			Class.enforcerOfficialV2.UPGRADES_TIER_0 = ["suppressorOfficialV2"];
				Class.suppressorOfficialV2.UPGRADES_TIER_0 = ["retardantOfficialV2"];
					Class.retardantOfficialV2.UPGRADES_TIER_0 = [];
			Class.executorOfficialV2.UPGRADES_TIER_0 = ["inhibitorOfficialV2"];
				Class.inhibitorOfficialV2.UPGRADES_TIER_0 = ["tyrantOfficialV2"];
					Class.tyrantOfficialV2.UPGRADES_TIER_0 = [];

		Class.invaderOfficialV2.UPGRADES_TIER_0 = ["inquisitorOfficialV2", "assailantOfficialV2"];
			Class.inquisitorOfficialV2.UPGRADES_TIER_0 = ["infiltratorOfficialV2"];
				Class.infiltratorOfficialV2.UPGRADES_TIER_0 = ["raiderOfficialV2"];
					Class.raiderOfficialV2.UPGRADES_TIER_0 = [];
			Class.assailantOfficialV2.UPGRADES_TIER_0 = ["aggressorOfficialV2"];
				Class.aggressorOfficialV2.UPGRADES_TIER_0 = ["gladiatorOfficialV2"];
					Class.gladiatorOfficialV2.UPGRADES_TIER_0 = [];

		Class.centaurOfficialV2.UPGRADES_TIER_0 = ["daemonOfficialV2", "minotaurOfficialV2"];
			Class.daemonOfficialV2.UPGRADES_TIER_0 = ["hydraOfficialV2"];
				Class.hydraOfficialV2.UPGRADES_TIER_0 = ["cerberusOfficialV2"];
					Class.cerberusOfficialV2.UPGRADES_TIER_0 = [];
			Class.minotaurOfficialV2.UPGRADES_TIER_0 = ["beelzebubOfficialV2"];
				Class.beelzebubOfficialV2.UPGRADES_TIER_0 = ["luciferOfficialV2"];
					Class.luciferOfficialV2.UPGRADES_TIER_0 = [];

	Class.dreadBodyOfficialV2.UPGRADES_TIER_0 = ["byteOfficialV2", "atmosphereOfficialV2", "juggernautOfficialV2"];

		Class.byteOfficialV2.UPGRADES_TIER_0 = ["automationOfficialV2", "kilobyteOfficialV2"];

			Class.automationOfficialV2.UPGRADES_TIER_0 = ["mechanismOfficialV2", "fusionOfficialV2", "binaryOfficialV2", "exosphereOfficialV2"];
				Class.mechanismOfficialV2.UPGRADES_TIER_0 = ["skynetOfficialV2"];
					Class.skynetOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("skynetOfficialV2");
				Class.fusionOfficialV2.UPGRADES_TIER_0 = ["supernovaOfficialV2"];
					Class.supernovaOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("supernovaOfficialV2");
				Class.binaryOfficialV2.UPGRADES_TIER_0 = ["cipherOfficialV2"];
					Class.cipherOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("cipherOfficialV2");
				Class.exosphereOfficialV2.UPGRADES_TIER_0 = ["interstellarOfficialV2"];
					Class.interstellarOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("interstellarOfficialV2");

			Class.kilobyteOfficialV2.UPGRADES_TIER_0 = ["megabyteOfficialV2", "binaryOfficialV2", "trojanOfficialV2", "hardwareOfficialV2"];
				Class.megabyteOfficialV2.UPGRADES_TIER_0 = ["gigabyteOfficialV2"];
					Class.gigabyteOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("gigabyteOfficialV2");
				// Class.binaryOfficialV2.UPGRADES_TIER_0 = ["cipherOfficialV2"];
				Class.trojanOfficialV2.UPGRADES_TIER_0 = ["malwareOfficialV2"];
					Class.malwareOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("malwareOfficialV2");
				Class.hardwareOfficialV2.UPGRADES_TIER_0 = ["softwareOfficialV2"];
					Class.softwareOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("softwareOfficialV2");

		Class.atmosphereOfficialV2.UPGRADES_TIER_0 = ["coronaOfficialV2", "thermosphereOfficialV2"];

			Class.coronaOfficialV2.UPGRADES_TIER_0 = ["chromosphereOfficialV2", "fusionOfficialV2", "trojanOfficialV2", "planetOfficialV2"];
				Class.chromosphereOfficialV2.UPGRADES_TIER_0 = ["photosphereOfficialV2"];
					Class.photosphereOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("photosphereOfficialV2");
				// Class.fusionOfficialV2.UPGRADES_TIER_0 = ["supernovaOfficialV2"];
				// Class.trojanOfficialV2.UPGRADES_TIER_0 = ["malwareOfficialV2"];
				Class.planetOfficialV2.UPGRADES_TIER_0 = ["astronomicOfficialV2"];
					Class.astronomicOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("astronomicOfficialV2");

			Class.thermosphereOfficialV2.UPGRADES_TIER_0 = ["mesosphereOfficialV2", "exosphereOfficialV2", "hardwareOfficialV2", "moonOfficialV2"];
				Class.mesosphereOfficialV2.UPGRADES_TIER_0 = ["stratosphereOfficialV2"];
					Class.stratosphereOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("stratosphereOfficialV2");
				// Class.exosphereOfficialV2.UPGRADES_TIER_0 = ["interstellarOfficialV2"];
				// Class.hardwareOfficialV2.UPGRADES_TIER_0 = ["softwareOfficialV2"];
				Class.moonOfficialV2.UPGRADES_TIER_0 = ["grandioseOfficialV2"];
					Class.grandioseOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("grandioseOfficialV2");

		Class.juggernautOfficialV2.UPGRADES_TIER_0 = ["jumboOfficialV2", "colossusOfficialV2"];

			Class.jumboOfficialV2.UPGRADES_TIER_0 = ["goliathOfficialV2", "planetOfficialV2", "moonOfficialV2"];
				Class.goliathOfficialV2.UPGRADES_TIER_0 = ["behemothOfficialV2"];
					Class.behemothOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("behemothOfficialV2");
				// Class.planetOfficialV2.UPGRADES_TIER_0 = ["astronomicOfficialV2"];
				// Class.moonOfficialV2.UPGRADES_TIER_0 = ["grandioseOfficialV2"];

			Class.colossusOfficialV2.UPGRADES_TIER_0 = ["titanOfficialV2", "sirenOfficialV2", "harpyOfficialV2"];
				Class.titanOfficialV2.UPGRADES_TIER_0 = ["leviathanOfficialV2"];
					Class.leviathanOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("leviathanOfficialV2");
				Class.sirenOfficialV2.UPGRADES_TIER_0 = ["valrayvnOfficialV2"];
					Class.valrayvnOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("valrayvnOfficialV2");
				Class.harpyOfficialV2.UPGRADES_TIER_0 = ["pegasusOfficialV2"];
					Class.pegasusOfficialV2.UPGRADES_TIER_0 = makeHexnoughtBodyV2("pegasusOfficialV2");

const hexDreadNames = {
	Javelin: {
		Javelin: 'Javelin',
		Rapier: 'Lance',
		Diplomat: 'Envoy',
		Arbitrator: 'Cutlass',
		Retardant: 'Rebel',
		Tyrant: 'Autocrat',
		Raider: 'Pirate',
		Gladiator: 'Pillager',
		Cerberus: 'Argonaut',
		Lucifer: 'Kitsune',
	},
	Rapier: {
		Rapier: 'Rapier',
		Diplomat: 'Emissary',
		Arbitrator: 'Umpire',
		Retardant: 'Impeder',
		Tyrant: 'Oppressor',
		Raider: 'Bandit',
		Gladiator: 'Bruiser',
		Cerberus: 'Cyclops',
		Lucifer: 'Damocles',
	},
	Diplomat: {
		Diplomat: 'Diplomat',
		Arbitrator: 'Moderator',
		Retardant: 'Insurgent',
		Tyrant: 'Dictator',
		Raider: 'Marauder',
		Gladiator: 'Champion',
		Cerberus: 'Orion',
		Lucifer: 'Manticore',
	},
	Arbitrator: {
		Arbitrator: 'Arbitrator',
		Retardant: 'Extinguisher',
		Tyrant: 'Shogun',
		Raider: 'Buccaneer',
		Gladiator: 'Warrior',
		Cerberus: 'Gorgon',
		Lucifer: 'Keres',
	},
	Retardant: {
		Retardant: 'Retardant',
		Tyrant: 'Anarchist',
		Raider: 'Freebooter',
		Gladiator: 'Combatant',
		Cerberus: 'Gigantes',
		Lucifer: 'Demogorgon',
	},
	Tyrant: {
		Tyrant: 'Tyrant',
		Raider: 'Corsair',
		Gladiator: 'Amazon',
		Cerberus: 'Ouroboros',
		Lucifer: 'Raiju',
	},
	Raider: {
		Raider: 'Raider',
		Gladiator: 'Filibuster',
		Cerberus: 'Wyvern',
		Lucifer: 'Kraken',
	},
	Gladiator: {
		Gladiator: 'Gladiator',
		Cerberus: 'Ogre',
		Lucifer: 'Wendigo',
	},
	Cerberus: {
		Cerberus: 'Cerberus',
		Lucifer: 'Oni',
	},
	Lucifer: {
		Lucifer: 'Lucifer',
	},
};

function mergeHexnoughtWeaponV2(weapon1, weapon2) {
	weapon1 = ensureIsClass(weapon1);
	weapon2 = ensureIsClass(weapon2);

	let PARENT = Class.genericHexnought,
		BODY = JSON.parse(JSON.stringify(PARENT.BODY)),
		GUNS = [],
		gunsOnOneSide = [],
		weapon2GunsOnOneSide = [],
		TURRETS = [];

	// Label
	let name1 = hexDreadNames[weapon1.LABEL][weapon2.LABEL],
		name2 = hexDreadNames[weapon2.LABEL][weapon1.LABEL],
		weaponName = "",
		orientationId = 0;
	if(name1) {
		weaponName = name1;
	} else {
		weaponName = name2,
		orientationId = 1;
	}
	let LABEL = weaponName,
		className = weaponName.toLowerCase() + orientationId + "OfficialV2";
	
	// Guns ----------------------
	if (weapon1.GUNS) gunsOnOneSide.push(...JSON.parse(JSON.stringify(weapon1.GUNS.slice(0, weapon1.GUNS.length / 5))));
	if (weapon2.GUNS) weapon2GunsOnOneSide = JSON.parse(JSON.stringify(weapon2.GUNS.slice(0, weapon2.GUNS.length / 5)));

	for (let g in weapon2GunsOnOneSide) weapon2GunsOnOneSide[g].POSITION[5] += 60;
	gunsOnOneSide.push(...weapon2GunsOnOneSide)

	// Scale to fit size constraints
	for (let g in gunsOnOneSide) {
		gunsOnOneSide[g].POSITION[1] *= hexnoughtScaleFactor ** 2;
		gunsOnOneSide[g].POSITION[4] *= hexnoughtScaleFactor ** 2;
	}

	for (let i = 0; i < 3; i++) {
		for (let g in gunsOnOneSide) {
			let gun = JSON.parse(JSON.stringify(gunsOnOneSide[g]));
			gun.POSITION[5] += 120 * i;
			GUNS.push(gun);
		}
	};

	// Gladiator
	if (weapon1.LABEL == "Gladiator" || weapon2.LABEL == "Gladiator") {
		let droneSpawnerIndex = 0
		for (let g in GUNS) {
			let gun = GUNS[g];
			if (gun.PROPERTIES && gun.PROPERTIES.TYPE == "gladiatorTritankMinionOfficialV2") {
				switch (droneSpawnerIndex) {
					case 1:
						gun.PROPERTIES.TYPE = "gladiatorTritrapMinionOfficialV2";
						break;
					case 2:
						gun.PROPERTIES.TYPE = "gladiatorTriswarmMinionOfficialV2";
						break;
					case 3:
						gun.PROPERTIES.TYPE = "gladiatorAutoMinionOfficialV2";
						break;
					case 4:
						gun.PROPERTIES.TYPE = "gladiatorAuraMinionOfficialV2";
						break;
					case 5:
						gun.PROPERTIES.TYPE = "gladiatorHealAuraMinionOfficialV2";
						break;
				}
				droneSpawnerIndex++;
			}
		}
	}
	
	// Body stat modification
	if (weapon1.BODY) for (let m in weapon1.BODY) BODY[m] *= weapon1.BODY[m];
	if (weapon2.BODY) for (let m in weapon2.BODY) BODY[m] *= weapon2.BODY[m];

	// Smash it together
	Class[className] = {
		PARENT, BODY, LABEL, GUNS, TURRETS,
	};
	return className;
}
function makeHexnoughtBodyV2(body) {
	if (!buildHexnoughts) return [];
	
	body = ensureIsClass(body);

	let PARENT = Class.genericHexnought,
		BODY = {},
		GUNS = [],
		gunsOnOneSide = [],
		TURRETS = [],
		LABEL = body.LABEL;

	// Label
	let className = LABEL.toLowerCase() + "HexOfficialV2";
	
	// Guns ----------------------
	if (body.GUNS) gunsOnOneSide.push(...JSON.parse(JSON.stringify(body.GUNS.slice(0, body.GUNS.length / 5 * 2))));
	for (let g in gunsOnOneSide) {
		gunsOnOneSide[g].POSITION[5] *= 5 / 6;
		gunsOnOneSide[g].POSITION[1] *= hexnoughtScaleFactor ** 3;
		gunsOnOneSide[g].POSITION[4] *= hexnoughtScaleFactor ** 2;
	}

	for (let i = 0; i < 3; i++) {
		for (let g in gunsOnOneSide) {
			let gun = JSON.parse(JSON.stringify(gunsOnOneSide[g]));
			gun.POSITION[5] += 120 * i;
			GUNS.push(gun);
		}
	};
	
	// Turrets --------------------
	let turretRingLoopLength = Math.floor(body.TURRETS.length / 5);

	// Turret adding
	for (let t = 0; t < body.TURRETS.length; t++) {
		let turret = body.TURRETS[t];
		if (turret.TYPE[0].indexOf('pentagon') >= 0) { // Replace pentagons with hexagons
			TURRETS.push(
				{
					POSITION: [turret.POSITION[0], 0, 0, 0, 0, turret.POSITION[5]],
					TYPE: ['hexagon' + turret.TYPE[0].substring(8), turret.TYPE[1]],
				}
			);
		} else if (turret.POSITION[1]) { // Do whole turret loop at once
			for (let i = 0; i < turretRingLoopLength; i++) {
				for (let j = 0; j < 6; j++) {
					turret = body.TURRETS[t + i * 5];
					TURRETS.push(
						{
							POSITION: [turret.POSITION[0] * hexnoughtScaleFactor, turret.POSITION[1] * hexnoughtScaleFactor ** 0.5, turret.POSITION[2], turret.POSITION[3] / 6 * 5 + 60 * j, turret.POSITION[4], turret.POSITION[5]],
							TYPE: turret.TYPE,
						}
					)
				}
			}
			t += 5 * turretRingLoopLength - 1;
		} else { // Centered turrets
			TURRETS.push(
				{
					POSITION: [turret.POSITION[0] * hexnoughtScaleFactor ** 0.5, 0, 0, turret.POSITION[3], turret.POSITION[4], turret.POSITION[5]],
					TYPE: turret.TYPE,
				}
			) 
		}
	}
	
	// Body stat modification
	if (body.BODY) for (let m in body.BODY) BODY[m] = body.BODY[m];

	// Smash it together
	Class[className] = {
		PARENT, BODY, LABEL, GUNS, TURRETS,
	};
	return [className];
}

// Merge hexdreads
const pentanoughtWeapons = ["rapierOfficialV2", "javelinOfficialV2", "diplomatOfficialV2", "arbitratorOfficialV2", "retardantOfficialV2", "tyrantOfficialV2", "raiderOfficialV2", "gladiatorOfficialV2", "cerberusOfficialV2", "luciferOfficialV2"];
if(buildHexnoughts) {
	for (let i of pentanoughtWeapons) {
		for (let j of pentanoughtWeapons) {
			Class[i].UPGRADES_TIER_0.push(mergeHexnoughtWeaponV2(i, j));
		}
	}
}
