const { combineStats, makeAuto, weaponArray, makeTurret } = require('../facilitators.js');
const { smshskl, base, basePolygonDamage, basePolygonHealth } = require('../constants.js');
const g = require('../gunvals.js');
const dreadnoughtBody = {
    SPEED: base.SPEED * 0.5,
    HEALTH: base.HEALTH * 5,
    DAMAGE: base.DAMAGE * 2.5,
    PENETRATION: base.PENETRATION * 2,
    SHIELD: base.SHIELD * 2.5,
    FOV: base.FOV * 1.4,
    DENSITY: base.DENSITY * 6,
	REGEN: base.REGEN,
};
g.dreadv1Generic = {
	damage: 1.35,
	range: 0.8,
	recoil: 0,
}
g.dreadv1Sniper = {
	speed: 1.07,
	maxSpeed: 1.07,
	health: 1.1,
	reload: 1.13,
	density: 1.6,
	pen: 1.05,
	resist: 1.1,
	range: 0.8,
}
g.dreadv1Slow = {
	health: 1.3,
	speed: 0.65,
	maxSpeed: 0.65,
};
g.dreadv1Drone = {
	health: 1.25,
	speed: 0.68,
	maxSpeed: 0.68,
	reload: 0.8,
	size: 1.2,
	recoil: 0,
}
g.dreadv1Trap = {
	range: 0.9,
	shudder: 0.2,
	speed: 1.05,
	reload: 1.6,
	damage: 1.2,
	health: 1.15,
	resist: 1.1,
	size: 1.3,
}

// Comment out the line below to enable this addon, uncomment it to disable this addon.
return console.log('--- Dreadnoughts v1 addon [dreadv1.js] is disabled. See lines 32-33 to enable it. ---');

// Set the below variable to true to enable the Medicare and Medicaid healing bodies.
const enableHealers = true;

// Food
Class.hexagonOfficialV1 = {
	PARENT: 'food',
	COLOR: 'magenta',
	LABEL: "Hexagon",
	BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 600 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        PENETRATION: 1.1,
        SHIELD: 40 * basePolygonHealth,
        ACCELERATION: 0.0025
    },
	VALUE: 21000,
	SHAPE: 6,
	SIZE: 70,
	DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
}
Class.heptagonOfficialV1 = {
	PARENT: 'food',
	COLOR: 'green',
	LABEL: "Heptagon",
	BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 750 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        PENETRATION: 1.1,
        SHIELD: 50 * basePolygonHealth,
        ACCELERATION: 0.0025
    },
	VALUE: 28000,
	SHAPE: 7,
	SIZE: 80,
	DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
}
Class.octagonOfficialV1 = {
	PARENT: 'food',
	COLOR: 'hexagon',
	LABEL: "Octagon",
	BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 900 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        PENETRATION: 1.1,
        SHIELD: 60 * basePolygonHealth,
        ACCELERATION: 0.0025
    },
	VALUE: 35000,
	SHAPE: 8,
	SIZE: 90,
	DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
}
Class.nonagonOfficialV1 = {
	PARENT: 'food',
	COLOR: 'white',
	LABEL: "Nonagon",
	BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 1050 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        PENETRATION: 1.1,
        SHIELD: 70 * basePolygonHealth,
        ACCELERATION: 0.0025
    },
	VALUE: 42000,
	SHAPE: 9,
	SIZE: 100,
	DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
}

// Map elements
function portalRings(color = '#1c3766') {
	return [
		{
			POSITION: [22, 0, 0, 0, 1],
			TYPE: ['portalRing1OfficialV1', {COLOR: color}]
		}, {
			POSITION: [20.5, 0, 0, -45, 1],
			TYPE: ['portalRing2OfficialV1', {COLOR: color}]
		}, {
			POSITION: [20.5, 0, 0, 135, 1],
			TYPE: ['portalRing3OfficialV1', {COLOR: color}]
		}, {
			POSITION: [21.2, 0, 0, 0, 1],
			TYPE: ['portalRing4OfficialV1', {COLOR: color}]
		}
	]
}
Class.portalRing1OfficialV1 = {
	SHAPE: "M -1 0 A 1 1 90 0 0 1 0 L 0.7 0 A 0.7 0.7 90 0 1 -0.7 0 Z M -1 0 A 1 1 90 0 1 1 0 L 0.7 0 A 0.7 0.7 90 0 0 -0.7 0 Z",
	COLOR: "#1c3766",
	BORDERLESS: true,
}
Class.portalRing2OfficialV1 = {
	SHAPE: "M -0.707 0.707 A 1 1 0 0 1 -0.707 -0.707 A 1 1.225 0 0 0 -0.707 0.707 Z",
	COLOR: {BASE: "#1c3766", BRIGHTNESS_SHIFT: 16, SATURATION_SHIFT: 0.7},
	BORDERLESS: true,
}
Class.portalRing3OfficialV1 = {
	SHAPE: "M -0.5 0.866 A 1 1 0 0 1 -0.5 -0.866 A 1 1.1 0 0 0 -0.5 0.866 Z",
	COLOR: {BASE: "#1c3766", BRIGHTNESS_SHIFT: -6, SATURATION_SHIFT: 1.1},
	BORDERLESS: true,
}
Class.portalRing4OfficialV1 = {
	SHAPE: "M -0.92 0 A 0.92 0.92 90 0 0 0.92 0 L 0.84 0 A 0.84 0.84 90 0 1 -0.84 0 Z M -0.92 0 A 0.92 0.92 90 0 1 0.92 0 L 0.84 0 A 0.84 0.84 90 0 0 -0.84 0 Z",
	COLOR: {BASE: "#1c3766", BRIGHTNESS_SHIFT: 7, SATURATION_SHIFT: 0.9},
	BORDERLESS: true,
}
Class.portalOfficialV1 = {
	LABEL: "",
	TYPE: 'portal',
	BODY: {
		HEALTH: 1e10,
		SHIELD: 1e10,
		REGEN: 1e10,
		DAMAGE: 0,
		PENETRATION: 1e10,
		DENSITY: 1e10,
		RANGE: 2000,
	},
	ALWAYS_ACTIVE: true,
	HITS_OWN_TYPE: 'never',
	GIVE_KILL_MESSAGE: false,
	DRAW_HEALTH: false,
	TEAM: TEAM_ROOM,
	COLOR: 'pureBlack',
	FACING_TYPE: 'noFacing',
	SIZE: 33,
	DIE_AT_RANGE: true
}
Class.spikyPortalSpikesOfficialV1 = {
	SHAPE: "",
	INDEPENDENT: true,
	FACING_TYPE: ["spin", {speed: 0.07}],
	GUNS: weaponArray({
		POSITION: [30, 8, 0.001, 0, 0, 0, 0],
		PROPERTIES: {COLOR: 'egg'}
	}, 5),
}
Class.spikyPortalBumpsOfficialV1 = {
	SHAPE: "M 1 0 L 0.666 0.216 L 0.566 0.41 L 0.41 0.566 L 0.309 0.951 L 0 0.7 L -0.215 0.665 L -0.412 0.565 L -0.809 0.588 L -0.666 0.217 L -0.699 0.001 L -0.664 -0.217 L -0.809 -0.588 L -0.412 -0.566 L -0.217 -0.664 L 0.001 -0.699 L 0.309 -0.951 L 0.411 -0.567 L 0.565 -0.412 L 0.665 -0.215 Z",
	COLOR: 'egg',
	INDEPENDENT: true,
	FACING_TYPE: ["spin", {speed: 0.12}],
}
Class.spikyPortalOfficialV1 = {
	PARENT: 'portalOfficialV1',
	TURRETS: [
		{
			POSITION: [26, 0, 0, 0, 0, 0],
			TYPE: "spikyPortalSpikesOfficialV1"
		}, {
			POSITION: [35, 0, 0, 0, 0, 0],
			TYPE: "spikyPortalBumpsOfficialV1"
		}
	],
	PROPS: [
		{
			POSITION: [20, 0, 0, 0, 1],
			TYPE: ['egg', {COLOR: '#212121'}]
		},
		...portalRings('#1c1c1c')
	]
}
Class.bluePortalOfficialV1 = {
	PARENT: 'portalOfficialV1',
	PROPS: [
		{
			POSITION: [20, 0, 0, 0, 1],
			TYPE: ['egg', {COLOR: 'black'}]
		},
		...portalRings()
	]
}
Class.greenPortalOfficialV1 = {
	PARENT: 'portalOfficialV1',
	PROPS: [
		{
			POSITION: [20, 0, 0, 0, 1],
			TYPE: ['egg', {COLOR: 'black'}]
		},
		...portalRings('#1c6620')
	]
}

// Misc
Class.genericDreadnought1 = {
	PARENT: "genericTank",
	BODY: dreadnoughtBody,
	SHAPE: 6,
	COLOR: 'hexagon',
	SIZE: 22.5,
	SKILL_CAP: Array(10).fill(smshskl+3),
	REROOT_UPGRADE_TREE: "dreadOfficialV1",
}
// Turret damage modifiers:
// Automation secondary: 1x
// Automation main: 1.6x
// Mechanism secondary: 1.12x
// Mechanism main: 1.8x
Class.dreadv1BodyTurret = makeTurret({
	GUNS: [{
		POSITION: [22, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 0.7 }, g.turret, { size: 0.8, health: 0.75, speed: 0.4, maxSpeed: 0.4, reload: 0.7 }]),
			TYPE: "bullet"
		}
	}]
}, {limitFov: true, fov: 0.8, independent: true, label: "Turret", extraStats: []})
Class.medicareTurret = {
	PARENT: "genericTank",
	LABEL: "Turret",
	FACING_TYPE: ["spin", {speed: 0.04}],
	INDEPENDENT: true,
	COLOR: 16,
	GUNS: weaponArray([
		{
			POSITION: [8, 9, -0.5, 12.5, 0, 0, 0],
		}, {
			POSITION: [18, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.flankGuard, g.healer]),
				TYPE: "healerBullet",
				AUTOFIRE: true,
			},
		}
	], 3),
	TURRETS: [{
		POSITION: [13, 0, 0, 0, 360, 1],
		TYPE: "healerSymbol",
	}]
}
Class.medicaidTurret = {
	PARENT: "genericTank",
	LABEL: "Turret",
	FACING_TYPE: ["spin", {speed: 0.04}],
	INDEPENDENT: true,
	COLOR: 16,
	GUNS: weaponArray([
		{
			POSITION: [8, 9, -0.5, 12.5, 0, 0, 0],
		}, {
			POSITION: [18, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.flankGuard, g.flankGuard, g.healer]),
				TYPE: "healerBullet",
				AUTOFIRE: true,
			},
		}
	], 5),
	TURRETS: [{
		POSITION: [13, 0, 0, 0, 360, 1],
		TYPE: "healerSymbol",
	}]
}
Class.turretedTrap = makeAuto("trap", "Auto-Trap", {size: 7.5, type: 'droneAutoTurret'});
Class.turretedTrap.BODY.RECOIL_MULTIPLIER = 0;

// T0
Class.dreadOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Dreadnought",
	UPGRADE_LABEL: "Dreads V1",
	EXTRA_SKILL: 18,
}

// T1
Class.swordOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Sword",
	UPGRADE_TOOLTIP: "Snipers",
	GUNS: weaponArray({
		POSITION: [20, 7, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.dreadv1Generic, g.dreadv1Sniper]),
			TYPE: "bullet"
		}
	}, 3)
}

Class.pacifierOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Pacifier",
	UPGRADE_TOOLTIP: "Bullet Spam",
	GUNS: weaponArray({
		POSITION: [15.5, 7.25, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dreadv1Generic, g.dreadv1Slow]),
			TYPE: "bullet"
		}
	}, 3)
}

Class.invaderOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Invader",
	UPGRADE_TOOLTIP: "Drones",
	GUNS: weaponArray({
		POSITION: [5.5, 7.5, 1.3, 7.5, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.dreadv1Drone]),
			TYPE: "drone",
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: "drone",
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 4,
		}
	}, 3)
}

Class.centaurOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Centaur",
	UPGRADE_TOOLTIP: "Traps",
	GUNS: weaponArray([
		{
			POSITION: [13, 7, 1, 0, 0, 0, 0],
		}, {
			POSITION: [3, 7, 1.5, 13, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.dreadv1Generic, g.dreadv1Slow, g.dreadv1Trap]),
				TYPE: ["trap", {HITS_OWN_TYPE: "never"} ],
				STAT_CALCULATOR: "trap",
			},
		}
	], 3)
}

Class.automationOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Automation",
	UPGRADE_TOOLTIP: "Auto Turrets",
	TURRETS: [
		...weaponArray({
			POSITION: [3.5, 8.25, 0, 30, 180, 1],
			TYPE: "dreadv1BodyTurret",
		}, 6),
		{
			POSITION: [9, 0, 0, 0, 360, 1],
			TYPE: ["dreadv1BodyTurret", {GUN_STAT_SCALE: {damage: 1.6}}],
		}
	]
}

Class.juggernautOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Juggernaut",
	UPGRADE_TOOLTIP: "Health Buff",
	BODY: {
		HEALTH: 1.7,
		SHIELD: 2.2,
		REGEN: 1.5,
		SPEED: 1.1,
	},
	TURRETS: [{
		POSITION: [22, 0, 0, 0, 0, 0],
		TYPE: 'hexagon'
	}]
}
Class.medicareOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Medicare",
	UPGRADE_TOOLTIP: "Healing",
	TURRETS: [{
		POSITION: [8, 0, 0, 0, 360, 1],
		TYPE: "medicareTurret",
	}]
}

// T2
Class.sabreOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Sabre",
	UPGRADE_TOOLTIP: "Assassins",
	GUNS: weaponArray([
		{
			POSITION: [27, 7, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.dreadv1Generic, g.dreadv1Sniper]),
				TYPE: "bullet"
			}
		}, {
			POSITION: [3.5, 7, -1.4, 9, 0, 0, 0]
		}
	], 3)
}
Class.gladiusOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Gladius",
	UPGRADE_TOOLTIP: "Rifles",
	GUNS: weaponArray([
		{
			POSITION: [17, 9, 1, 0, 0, 0, 0]
		}, {
			POSITION: [20, 6, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.dreadv1Generic, g.dreadv1Sniper, {damage: 1.05}]),
				TYPE: "bullet"
			}
		}
	], 3)
}

Class.appeaserOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Appeaser",
	UPGRADE_TOOLTIP: "Machine Guns",
	GUNS: weaponArray([
		{
			POSITION: [8.5, 8.875, 1.25, 7, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.dreadv1Generic, g.dreadv1Slow, {health: 1.1, shudder: 1.05, speed: 0.85, maxSpeed: 0.8, range: 0.7, size: 0.75}]),
				TYPE: "bullet"
			}
		}, {
			POSITION: [8.5, 7.875, 1.2, 9, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.dreadv1Generic, g.dreadv1Slow, {health: 1.1, shudder: 1.05, speed: 0.85, maxSpeed: 0.8, range: 0.7, size: 0.75 * 8.5 / 7.5}]),
				TYPE: "bullet"
			}
		}
	], 3)
}
Class.peacekeeperOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Peacekeeper",
	UPGRADE_TOOLTIP: "Heavy Bullets",
	GUNS: weaponArray({
		POSITION: [17.5, 9, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.dreadv1Generic, g.dreadv1Slow, {reload: 1.3, health: 1.3, range: 1.1}]),
			TYPE: "bullet",
		}
	}, 3)
}
Class.diplomatOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Diplomat",
	UPGRADE_TOOLTIP: "Triplets",
	GUNS: weaponArray([
		{
			POSITION: [15.25, 4.75, 1, 0, 3, 0, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.dreadv1Generic, g.dreadv1Slow, {range: 0.9}]),
				TYPE: "bullet"
			}
		}, {
			POSITION: [15.25, 4.75, 1, 0, -3, 0, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.dreadv1Generic, g.dreadv1Slow, {range: 0.9}]),
				TYPE: "bullet"
			}
		}, {
			POSITION: [16.25, 4.75, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.dreadv1Generic, g.dreadv1Slow, {range: 0.9}]),
				TYPE: "bullet"
			}
		}
	], 3)
}

Class.inquisitorOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Inquisitor",
	UPGRADE_TOOLTIP: "Drones",
	GUNS: weaponArray({
		POSITION: [7, 7.5, 1.3, 7.5, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.dreadv1Drone, {speed: 0.95, maxSpeed: 0.95, damage: 0.9, health: 0.92}]),
			TYPE: "drone",
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: "drone",
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 5,
		}
	}, 3)
}
Class.assailantOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Assailant",
	UPGRADE_TOOLTIP: "Minions",
	GUNS: weaponArray([
		{
			POSITION: [14.25, 9, 1, 0, 0, 0, 0],
		}, {
			POSITION: [1.5, 10, 1, 14.25, 0, 0, 0],
			PROPERTIES: {
				MAX_CHILDREN: 4,
				SHOOT_SETTINGS: combineStats([g.factory, g.overseer, g.dreadv1Drone, {damage: 0.6}]),
				TYPE: ["minion", {GUN_STAT_SCALE: {reload: 1.333, health: 0.7, speed: 0.8, maxSpeed: 0.8}}],
				STAT_CALCULATOR: "drone",
				AUTOFIRE: true,
				SYNCS_SKILLS: true
			}
		}, {
			POSITION: [11.5, 10, 1, 0, 0, 0, 0]
		}
	], 3)
}
Class.infiltratorOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Infiltrator",
	UPGRADE_TOOLTIP: "Swarms",
	GUNS: weaponArray([
		{
			POSITION: [7, 6, 0.6, 5.5, 2.8, 0, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.swarm, g.carrier, { reload: 2, speed: 0.5, range: 0.9, health: 0.85}]),
				TYPE: "swarm",
				STAT_CALCULATOR: "swarm"
			}
		}, {
			POSITION: [7, 6, 0.6, 5.5, -2.8, 0, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.swarm, g.carrier, { reload: 2, speed: 0.5, range: 0.9, health: 0.85}]),
				TYPE: "swarm",
				STAT_CALCULATOR: "swarm"
			}
		}, {
			POSITION: [7, 6, 0.6, 8, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.swarm, g.carrier, { reload: 2, speed: 0.5, range: 0.9, health: 0.85}]),
				TYPE: "swarm",
				STAT_CALCULATOR: "swarm"
			}
		}
	], 3)
}

Class.cerberusOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Cerberus",
	UPGRADE_TOOLTIP: "Trap Spam",
	GUNS: weaponArray([
		{
			POSITION: [13.25, 2.25, 1, 0, 4, 0, 0]
		}, {
			POSITION: [1.75, 2.25, 1.7, 13.25, 4, 0, 2/3],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.dreadv1Generic, g.dreadv1Slow, g.dreadv1Trap, { reload: 1.5, health: 0.75, damage: 0.8 }]),
				TYPE: ["trap", {HITS_OWN_TYPE: "never"} ],
				STAT_CALCULATOR: "trap",
			},
		}, {
			POSITION: [13.25, 2.25, 1, 0, -4, 0, 0]
		}, {
			POSITION: [1.75, 2.25, 1.7, 13.25, -4, 0, 1/3],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.dreadv1Generic, g.dreadv1Slow, g.dreadv1Trap, { reload: 1.5, health: 0.75, damage: 0.8 }]),
				TYPE: ["trap", {HITS_OWN_TYPE: "never"} ],
				STAT_CALCULATOR: "trap"
			}
		}, {
			POSITION: [14.75, 3, 1, 0, 0, 0, 0]
		}, {
			POSITION: [2, 3, 1.7, 14.75, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.dreadv1Generic, g.dreadv1Slow, g.dreadv1Trap, { reload: 1.5, health: 0.75, damage: 0.8 }]),
				TYPE: ["trap", {HITS_OWN_TYPE: "never"} ],
				STAT_CALCULATOR: "trap"
			}
		}
	], 3)
}
Class.minotaurOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Minotaur",
	UPGRADE_TOOLTIP: "Blocks",
	GUNS: weaponArray([
		{
			POSITION: [13, 9.5, 1, 0, 0, 0, 0],
		}, {
			POSITION: [3, 9.5, 1.6, 13, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.dreadv1Generic, g.dreadv1Slow, g.dreadv1Trap, { reload: 1.59, range: 1.05, health: 1.55 }]),
				TYPE: ["unsetTrap", {HITS_OWN_TYPE: "never"} ],
				STAT_CALCULATOR: "block"
			}
		}
	], 3)
}
Class.sirenOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Siren",
	GUNS: weaponArray([
		{
			POSITION: [6, 7, -1.5, 7, 0, 0, 0],
		}, {
			POSITION: [3, 7, 1.5, 13, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.dreadv1Generic, g.dreadv1Slow, g.dreadv1Trap]),
				TYPE: ["turretedTrap", {HITS_OWN_TYPE: "never"} ],
				STAT_CALCULATOR: "trap",
			}
		}
	], 3)
}

Class.mechanismOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Mechanism",
	UPGRADE_TOOLTIP: "Auto Turrets",
	TURRETS: [
		...weaponArray({
			POSITION: [4, 8.25, 0, 30, 180, 1],
		TYPE: ["dreadv1BodyTurret", {GUN_STAT_SCALE: {damage: 1.12}}],
		}, 6),
		{
			POSITION: [9.5, 0, 0, 0, 360, 1],
			TYPE: ["dreadv1BodyTurret", {GUN_STAT_SCALE: {damage: 1.8}}],
		}
	]
}

Class.behemothOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Behemoth",
	UPGRADE_TOOLTIP: "Health Buff",
	BODY: {
		HEALTH: 2.3,
		SHIELD: 2.8,
		REGEN: 1.7,
		SPEED: 1.15,
	},
	TURRETS: [{
		POSITION: [23.5, 0, 0, 0, 0, 0],
		TYPE: 'hexagon'
	}]
}
Class.medicaidOfficialV1 = {
	PARENT: "genericDreadnought1",
	LABEL: "Medicaid",
	UPGRADE_TOOLTIP: "Healing",
	TURRETS: [{
		POSITION: [8, 0, 0, 0, 360, 1],
		TYPE: "medicaidTurret",
	}]
}

Class.addons.UPGRADES_TIER_0.push("dreadOfficialV1");
	Class.dreadOfficialV1.UPGRADES_TIER_10 = ["swordOfficialV1", "pacifierOfficialV1", "invaderOfficialV1", "centaurOfficialV1"];
		Class.swordOfficialV1.UPGRADES_TIER_M1 = ["sabreOfficialV1", "gladiusOfficialV1"];
		Class.pacifierOfficialV1.UPGRADES_TIER_M1 = ["appeaserOfficialV1", "peacekeeperOfficialV1", "diplomatOfficialV1"];
		Class.invaderOfficialV1.UPGRADES_TIER_M1 = ["inquisitorOfficialV1", "assailantOfficialV1", "infiltratorOfficialV1"];
		Class.centaurOfficialV1.UPGRADES_TIER_M1 = ["cerberusOfficialV1", "minotaurOfficialV1", "sirenOfficialV1"];
		Class.automationOfficialV1.UPGRADES_TIER_M1 = ["mechanismOfficialV1"];
		Class.juggernautOfficialV1.UPGRADES_TIER_M1 = ["behemothOfficialV1"];
		Class.medicareOfficialV1.UPGRADES_TIER_M1 = ["medicaidOfficialV1"];

const t1Bodies = [ "swordOfficialV1", "pacifierOfficialV1", "invaderOfficialV1", "centaurOfficialV1", "medicareOfficialV1", "automationOfficialV1", "juggernautOfficialV1" ];
if (!enableHealers) {
	t1Bodies.splice(4, 1); // Remove Medicare if healers are disabled
}

// Build both tiers of dreads
for (let primary of Class.dreadOfficialV1.UPGRADES_TIER_10) {
	let primaryName = primary;
	primary = ensureIsClass(primary);
	primary.UPGRADES_TIER_10 = [];

	for (let secondary of t1Bodies) {
		let secondaryName = secondary;
		secondary = ensureIsClass(secondary);

		let GUNS = [],
			TURRETS = [],
			LABEL = primary.LABEL + "-" + secondary.LABEL,
			BODY = JSON.parse(JSON.stringify(dreadnoughtBody)),
			UPGRADE_TOOLTIP = (primary.UPGRADE_TOOLTIP ?? "") + " + " + (secondary.UPGRADE_TOOLTIP ?? "");

		// Label it
		if (primary.LABEL == secondary.LABEL) LABEL = primary.LABEL;
		if (primary.UPGRADE_TOOLTIP == secondary.UPGRADE_TOOLTIP) UPGRADE_TOOLTIP = primary.UPGRADE_TOOLTIP;

		// Guns
		if (primary.GUNS) GUNS.push(...primary.GUNS);
		for (let g in secondary.GUNS) {
			let POSITION = JSON.parse(JSON.stringify(secondary.GUNS[g].POSITION)),
				PROPERTIES = secondary.GUNS[g].PROPERTIES;
			POSITION[5] += 60;
			GUNS.push({ POSITION, PROPERTIES });
		}

		// Turrets
		if (primary.TURRETS) TURRETS.push(...primary.TURRETS);
		if (secondary.TURRETS) TURRETS.push(...secondary.TURRETS);

		// Body
		if (primary.BODY) for (let m in primary.BODY) BODY[m] *= primary.BODY[m];
		if (secondary.BODY) for (let m in secondary.BODY) BODY[m] *= secondary.BODY[m];

		// Definition name
		let definitionName = primaryName + secondaryName;

		// Actually make that guy
		Class[definitionName] = {
			PARENT: "genericDreadnought1",
			UPGRADES_TIER_12: [],
			BODY, LABEL, UPGRADE_TOOLTIP, GUNS, TURRETS,
		};
		Class[primaryName].UPGRADES_TIER_10.push(definitionName);

		// Compile T2
		for (let primary2 of primary.UPGRADES_TIER_M1) {
			let primaryName2 = primary2;
			primary2 = ensureIsClass(primary2);

			for (let secondary2 of secondary.UPGRADES_TIER_M1) {
				let secondaryName = secondary2;
				secondary2 = ensureIsClass(secondary2);

				let GUNS = [],
					TURRETS = [],
					LABEL = primary2.LABEL + "-" + secondary2.LABEL,
					BODY = JSON.parse(JSON.stringify(dreadnoughtBody)),
					UPGRADE_TOOLTIP = (primary2.UPGRADE_TOOLTIP ?? "") + " + " + (secondary2.UPGRADE_TOOLTIP ?? "");

				// Label it
				if (primary2.LABEL == secondary2.LABEL) LABEL = primary2.LABEL;
				if (primary2.UPGRADE_TOOLTIP == secondary2.UPGRADE_TOOLTIP) UPGRADE_TOOLTIP = primary2.UPGRADE_TOOLTIP;

				// Guns
				if (primary2.GUNS) GUNS.push(...primary2.GUNS);
				for (let g in secondary2.GUNS) {
					let POSITION = JSON.parse(JSON.stringify(secondary2.GUNS[g].POSITION)),
						PROPERTIES = secondary2.GUNS[g].PROPERTIES;
					POSITION[5] += 60;
					GUNS.push({ POSITION, PROPERTIES });
				}

				// Turrets
				if (primary2.TURRETS) TURRETS.push(...primary2.TURRETS);
				if (secondary2.TURRETS) TURRETS.push(...secondary2.TURRETS);

				// Body
				if (primary2.BODY) for (let m in primary2.BODY) BODY[m] *= primary2.BODY[m];
				if (secondary2.BODY) for (let m in secondary2.BODY) BODY[m] *= secondary2.BODY[m];

				// Definition name
				let definitionName2 = primaryName2 + secondaryName;

				// Actually make that guy
				Class[definitionName2] = {
					PARENT: "genericDreadnought1",
					BODY, LABEL, UPGRADE_TOOLTIP, GUNS, TURRETS
				};
				Class[definitionName].UPGRADES_TIER_12.push(definitionName2);
			}
		}
	}
}
