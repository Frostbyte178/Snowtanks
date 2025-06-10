const { combineStats, menu, addAura: addAuraOld, weaponArray } = require('../../facilitators.js');
const { smshskl } = require('../../constants.js');
const g = require('../../gunvals.js');
const { eggnoughtBody, squarenoughtBody, trinoughtBody, pentanoughtBody, hexnoughtBody } = require('./snowDreadsConstants.js');
const { addGunner, addDroneOnAuto, addAura: addAuraNew } = require('./snowDreadsFacilitators.js');
const { enableSnowDreads } = require('./snowDreadsConstants.js');
require('../snowTesting.js');

// Navigate to [snowDreadsConstants.js] and the "enableSnowDreads" variable to enable/disable this addon.
if (!enableSnowDreads) {
	return console.log('--- Snowdreads misc addon [snowDreadsMisc.js] is disabled. ---');
}

// Generics
Class.genericDreadnoughtSnowdread = {
	PARENT: "genericTank",
	SKILL_CAP: Array(10).fill(smshskl),
	REROOT_UPGRADE_TREE: ["dreadWeaponSnowdread", "dreadBodySnowdread"],
}
Class.genericEggnoughtSnowdread = {
	PARENT: "genericDreadnoughtSnowdread",
	BODY: eggnoughtBody,
	SHAPE: 0,
	COLOR: 'egg',
	SIZE: 16,
	DANGER: 8,
}
Class.genericSquarenoughtSnowdread = {
	PARENT: "genericDreadnoughtSnowdread",
	BODY: squarenoughtBody,
	SHAPE: 4,
	COLOR: 'square',
	SIZE: 20,
	DANGER: 9,
}
Class.genericTrinoughtSnowdread = {
	PARENT: "genericDreadnoughtSnowdread",
	BODY: trinoughtBody,
	SHAPE: 3.5,
	COLOR: 'triangle',
	SIZE: 23,
	DANGER: 10,
}
Class.genericPentanoughtSnowdread = {
	PARENT: "genericDreadnoughtSnowdread",
	BODY: pentanoughtBody,
	SHAPE: 5.5,
	COLOR: 'pentagon',
	SIZE: 25,
	DANGER: 11,
}
Class.genericHexnoughtSnowdread = {
	PARENT: "genericDreadnoughtSnowdread",
	BODY: hexnoughtBody,
	SHAPE: 6,
	COLOR: 'hexagon',
	SIZE: 26,
	DANGER: 12,
}
Class.gladiatorGenericMinionSnowdread = {
	PARENT: "minion",
	BODY: { SPEED: 2 },
	SHAPE: 3.5,
	GUNS: [],
	PROPS: [
		{
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "aggressorMinionTopSnowdread"
		}
	]
}

// Projectile turrets
Class.droneAutoTurretSnowdread = {
	PARENT: 'autoTurret',
	CONTROLLERS: ['nearestDifferentMaster'],
	INDEPENDENT: true,
	COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -12.5, SATURATION_SHIFT: 0.8},
	GUNS: [
		{
			POSITION: [22, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, g.overdrive]),
				TYPE: "bullet",
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -5, SATURATION_SHIFT: 0.8},
			},
		},
	]
}
Class.trapAutoTurret = {
	PARENT: "spamAutoTurretSnowdread",
	GUNS: [
		{
			POSITION: [22, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.turret, g.overdrive, {recoil: 0}]),
				TYPE: "bullet",
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.6}
			},
		},
	],
}
Class.pillboxTurretWeakSnowdread = {
	PARENT: "spamAutoTurretSnowdread",
	LABEL: "",
	BODY: {
		FOV: 2,
	},
	HAS_NO_RECOIL: true,
	GUNS: [
		{
			POSITION: [17, 15, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.minionGun, g.turret, g.power, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: {BASE: 17, BRIGHTNESS_SHIFT: -7.5}
			},
		}, {
			POSITION: [22, 11, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.minionGun, g.turret, g.power, g.autoTurret, {density: 0.1},]),
				TYPE: "bullet",
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.6}
			},
		}, {
			POSITION: [14, 13, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.minionGun, g.turret, g.power, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5}
			},
		},
	],
}
Class.pillboxTurretSnowdread = {
	PARENT: "spamAutoTurretSnowdread",
	LABEL: "",
	BODY: {
		FOV: 2,
	},
	HAS_NO_RECOIL: true,
	GUNS: [
		{
			POSITION: [17, 15, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.turret, g.power, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: {BASE: 17, BRIGHTNESS_SHIFT: -7.5}
			},
		}, {
			POSITION: [22, 11, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.turret, g.power, g.autoTurret, {density: 0.1}]),
				TYPE: "bullet",
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.6}
			},
		}, {
			POSITION: [14, 13, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.turret, g.power, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5}
			},
		},
	],
}

// Dread weapon turrets
Class.melderAutoSnowdread = {
	PARENT: 'autoTankGun',
	COLOR:  {BASE: 17, BRIGHTNESS_SHIFT: 10},
	GUNS: [
		{
			POSITION: [18, 12, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret, {reload: 1.1, recoil: 0.65}, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 5 },
			},
		}, { // Main gun
			POSITION: [22, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret, {reload: 1.1, recoil: 0.65}]),
				TYPE: "bullet",
				COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -7.5, SATURATION_SHIFT: 0.65 },
			},
		}, {
			POSITION: [18.5, 6.5, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret, {reload: 1.1, recoil: 0.65}, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -2.5, SATURATION_SHIFT: 0.75 },
				BORDERLESS: true,
			},
		}, {
			POSITION: [14.5, 2, 1, 0, 5, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret, {reload: 1.1, recoil: 0.65}, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 15 },
			},
		}, {
			POSITION: [14.5, 2, 1, 0, -5, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret, {reload: 1.1, recoil: 0.65}, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 15 },
			},
		},
	],
	PROPS: [
		{
			POSITION: [14.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -7.5, SATURATION_SHIFT: 0.5 } }],
		}, {
			POSITION: [8, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1 } }]
		},
	]
}
Class.amalgamAutoSnowdread = {
	PARENT: 'autoTankGun',
	COLOR:  {BASE: 17, BRIGHTNESS_SHIFT: 10},
	BODY: {FOV: 2},
	GUNS: [
		...addGunner({length: 17, width: 4, y: -3.5, delay: 1/3}, 0, [g.basic, g.autoTurret, g.pelleter, g.power, g.twin, g.tripleShot, {recoil: 2}]),
		...addGunner({length: 17, width: 4, y: 3.5,  delay: 2/3}, 0, [g.basic, g.autoTurret, g.pelleter, g.power, g.twin, g.tripleShot, {recoil: 2}]),
		...addGunner({length: 19, width: 4, y: 0,    delay: 0  }, 0, [g.basic, g.autoTurret, g.pelleter, g.power, g.twin, g.tripleShot, {recoil: 2}]),
		{
			POSITION: [7, 11, -1.3, 5, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -15, SATURATION_SHIFT: 0.5 } },
		}, {
			POSITION: [7, 11 - 1.5, -1.3, 3.5, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 10 } },
		},
	],
	PROPS: [
		{
			POSITION: [15.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -15, SATURATION_SHIFT: 0.5 } }],
		}, {
			POSITION: [9.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1 } }]
		},
	]
}
Class.dissolverAutoSnowdread = {
	PARENT: 'autoTankGun',
	COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 10},
	BODY: {FOV: 5},
	GUNS: [
		...addGunner({length: 25.5, width: 5, y: -3.5, delay: 0 }, 0, [g.basic, g.sniper, g.assassin, g.flankGuard, g.flankGuard, g.autoTurret, {recoil: 0.6}]),
		...addGunner({length: 25.5, width: 5, y: 3.5, delay: 0.5}, 0, [g.basic, g.sniper, g.assassin, g.flankGuard, g.flankGuard, g.autoTurret, {recoil: 0.6}]),
		{
			POSITION: [7, 13, -1.3, 6, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -15, SATURATION_SHIFT: 0.5 }, },
		}, {
			POSITION: [7, 11, -1.3, 4.5, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 10 } },
		},
	],
	PROPS: [
		{
			POSITION: [15.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -7.5, SATURATION_SHIFT: 0.5 } }],
		}, {
			POSITION: [10, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1 } }]
		},
	]
}

Class.grabberTurretSnowdread = {
	PARENT: "spamAutoTurretSnowdread",
	GUNS: [
		{
			POSITION: [17, 14, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.flankGuard, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: {BASE: 17, BRIGHTNESS_SHIFT: -7.5}
			},
		}, {
			POSITION: [22, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.flankGuard, g.autoTurret, {recoil: 0.2}]),
				TYPE: "bullet",
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.6}
			},
		}, {
			POSITION: [14, 12, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.flankGuard, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5}
			},
		},
	],
}
Class.clasperTurretSnowdread = {
	PARENT: "spamAutoTurretSnowdread",
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [14, 15, -1.2, 0, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 10 } },
		},
		...addGunner({length: 16, width: 4, y: -4}, 0, [g.basic, g.autoTurret, g.pelleter, g.twin, g.power, g.flankGuard, g.flankGuard, {speed: 0.7, maxSpeed: 0.7, recoil: 0.25}]),
		...addGunner({length: 16, width: 4, y: 4, delay: 0.5}, 0, [g.basic, g.autoTurret, g.pelleter, g.twin, g.power, g.flankGuard, g.flankGuard, {speed: 0.7, maxSpeed: 0.7, recoil: 0.25}]),
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 0, 1],
			TYPE: ["egg", {COLOR: -1}],
		},
	],
}
Class.gripperTurretSnowdread = {
	PARENT: "spamAutoTurretSnowdread",
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [15, 14, -1.4, 0, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.6 } },
		},
		...addGunner({length: 23, width: 13}, -2.5, [g.basic, g.pounder, g.flankGuard, g.flankGuard, g.autoTurret, {reload: 0.9, recoil: 0.25}])
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 0, 1],
			TYPE: ["egg", {COLOR: -1}],
		},
	],
}

// Dread body turrets
Class.spamAutoTurretSnowdread = {
	PARENT: "autoTankGun",
	INDEPENDENT: true,
	COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 2.5},
	GUNS: [
		{
			POSITION: [17, 14, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: {BASE: 17, BRIGHTNESS_SHIFT: -2.5}
			},
		}, {
			POSITION: [22, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.autoTurret, {recoil: 0.2}]),
				TYPE: "bullet",
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.6}
			},
		}, {
			POSITION: [14, 12, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 10}
			},
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 0, 1],
			TYPE: ["egg", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 2.5, SATURATION_SHIFT: 0.85}, BORDERLESS: true}],
		},
	],
}

Class.byteTurretSnowdread = {
	PARENT: "genericTank",
	CONTROLLERS: ["nearestDifferentMaster"],
	INDEPENDENT: true,
	COLOR: {
		BASE: 6,
		BRIGHTNESS_SHIFT: -20,
		SATURATION_SHIFT: 0.5,
	},
	GUNS: [
		{
			POSITION: [18, 12, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 5 },
			},
		}, { // Main gun
			POSITION: [22, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret]),
				TYPE: "bullet",
				COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -20, SATURATION_SHIFT: 0.5 },
			},
		}, {
			POSITION: [18.5, 6.5, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.5 },
				BORDERLESS: true,
			},
		}, {
			POSITION: [14.5, 2, 1, 0, 5, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 15 },
			},
		}, {
			POSITION: [14.5, 2, 1, 0, -5, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 15 },
			},
		}, {
			POSITION: [10, 6, 0.5, 0, 0, 123, 0],
			PROPERTIES: { 
				COLOR: 17,
				DRAW_ABOVE: true,
			}
		}, {
			POSITION: [10, 6, 0.5, 0, 0, -123, 0],
			PROPERTIES: { 
				COLOR: 17,
				DRAW_ABOVE: true,
			}
		}
	],
	PROPS: [
		{
			POSITION: [14.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -20, SATURATION_SHIFT: 0.5 } }],
		}, {
			POSITION: [8, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1 } }]
		},
	]
}
Class.kilobyteTurretSnowdread = {
	PARENT: "genericTank",
	CONTROLLERS: ["nearestDifferentMaster"],
	INDEPENDENT: true,
	COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -5, SATURATION_SHIFT: 0.65 },
	GUNS: [
		{
			POSITION: [21, 12, -1.4, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.assassin, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 5 },
			},
		}, { // Main gun
			POSITION: [26, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.assassin, g.autoTurret, {health: 1.2, speed: 0.8}]),
				TYPE: "heavyBulletSnowdread",
				COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -7.5, SATURATION_SHIFT: 0.8 },
			},
		}, {
			POSITION: [21.5, 6.5, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.assassin, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: -1, SATURATION_SHIFT: 0.75 },
				BORDERLESS: true,
			},
		}, {
			POSITION: [16.5, 2, -1.35, 0, 5.1, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.assassin, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 12.5 },
			},
		}, {
			POSITION: [16.5, 2, -1.35, 0, -5.1, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.assassin, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 12.5 },
			},
		}, {
			POSITION: [10, 8, 0.5, 0, 0, 73, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}, DRAW_ABOVE: true }
		}, {
			POSITION: [10, 8, 0.5, 0, 0, -73, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}, DRAW_ABOVE: true }
		}, {
			POSITION: [10, 8, 0.5, 0, 0, 180, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}, DRAW_ABOVE: true }
		}
	],
	PROPS: [
		{
			POSITION: [14.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 10 } }],
		}, {
			POSITION: [8, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: 2.5, SATURATION_SHIFT: 0.8 } }]
		},
	]
}
Class.megabyteTurretSnowdread = {
	PARENT: "genericTank",
	CONTROLLERS: ["nearestDifferentMaster"],
	INDEPENDENT: true,
	COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.65 },
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [21, 13.5, -1.4, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pounder, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 5 },
			},
		}, { // Main gun
			POSITION: [26, 12, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pounder, g.autoTurret, {health: 1.2, speed: 0.8}]),
				TYPE: "heavyBulletSnowdread",
				COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -15, SATURATION_SHIFT: 0.65 },
			},
		}, {
			POSITION: [21.5, 7, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pounder, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -7.5, SATURATION_SHIFT: 0.75 },
				BORDERLESS: true,
			},
		}, {
			POSITION: [16.5, 2.6, -1.6, 0, 5.6, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pounder, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 15 },
			},
		}, {
			POSITION: [16.5, 2.6, -1.6, 0, -5.6, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pounder, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 15 },
			},
		}, {
			POSITION: [10, 8.5, 0.5, 0, 0, 60, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}, DRAW_ABOVE: true }
		}, {
			POSITION: [10, 8.5, 0.5, 0, 0, -60, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}, DRAW_ABOVE: true }
		}, {
			POSITION: [10, 8.5, 0.5, 0, 0, 140, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}, DRAW_ABOVE: true }
		}, {
			POSITION: [10, 8.5, 0.5, 0, 0, -140, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}, DRAW_ABOVE: true }
		}
	],
	PROPS: [
		{
			POSITION: [14.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 10 } }],
		}, {
			POSITION: [8.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -5, SATURATION_SHIFT: 0.6 } }]
		},
	]
}
Class.gigabyteTurretSnowdread = {
	PARENT: "genericTank",
	CONTROLLERS: ["nearestDifferentMaster"],
	INDEPENDENT: true,
	COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 5 },
	GUNS: [
		{
			POSITION: [14, 8, 0.001, -2, -10.5, 140, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: 15, SATURATION_SHIFT: 1.2 } },
		}, {
			POSITION: [14, 8, 0.001, -2, 10.5, -140, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: 15, SATURATION_SHIFT: 1.2 } },
		}, {
			POSITION: [21, 15, 1.3, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.pounder, g.destroyer, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 2.5 },
			},
		}, { // Main gun
			POSITION: [26, 15, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.pounder, g.destroyer, g.autoTurret, {speed: 1.25, health: 0.7}]),
				TYPE: "heavyBulletSnowdread",
				COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.6 },
			},
		}, {
			POSITION: [21.5, 9, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.pounder, g.destroyer, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -2.5, SATURATION_SHIFT: 0.7 },
				BORDERLESS: true,
			},
		}, {
			POSITION: [16.5, 3, -1.6, 0, 5.6, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.pounder, g.destroyer, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 12.5 },
			},
		}, {
			POSITION: [16.5, 3, -1.6, 0, -5.6, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.pounder, g.destroyer, g.autoTurret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 12.5 },
			},
		}, {
			POSITION: [10, 9, 0.5, 0, 0, 60, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 10}, DRAW_ABOVE: true }
		}, {
			POSITION: [10, 9, 0.5, 0, 0, -60, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 10}, DRAW_ABOVE: true }
		}, {
			POSITION: [10, 9, 0.5, 0, 0, 145, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 10}, DRAW_ABOVE: true }
		}, {
			POSITION: [10, 9, 0.5, 0, 0, -145, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 10}, DRAW_ABOVE: true }
		}
	],
	PROPS: [
		{
			POSITION: [14.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -5, SATURATION_SHIFT: 0.6 } }],
		}, {
			POSITION: [9.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: 5, SATURATION_SHIFT: 0.8 } }]
		},
	]
}

Class.lighterTurretSnowdread = {
	PARENT: 'genericTank',
	COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -2.5, SATURATION_SHIFT: 0.75},
	BODY: {FOV: 5},
	CONTROLLERS: ['nearestDifferentMaster'],
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [14.5, 15, 0.8, 0, 0, 180, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -5, SATURATION_SHIFT: 0.8}},
		}, {
			POSITION: [16.5, 7, 1, 0, 0, 180, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 2.5}},
		}, {
			POSITION: [14, 2, 1, 0, 7, 0, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 10}},
		}, {
			POSITION: [14, 2, 1, 0, -7, 0, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 10}},
		}, {
			POSITION: [22, 7, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.flame]),
				TYPE: 'growBullet',
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -5, SATURATION_SHIFT: 0.8},
			}
		}, {
			POSITION: [19.5, 5.5, 0.8, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.flame, g.fake]),
				TYPE: 'bullet',
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 2.5, SATURATION_SHIFT: 0.7},
				BORDERLESS: true,
			}
		}, {
			POSITION: [13, 8, -1.3, 0, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5}},
		}, {
			POSITION: [10, 8.5, 0.5, 0, 0, 100, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 2.5}, DRAW_ABOVE: true }
		}, {
			POSITION: [10, 8.5, 0.5, 0, 0, -100, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 2.5}, DRAW_ABOVE: true }
		}
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 7.5 } }],
		}, {
			POSITION: [9, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: 5, SATURATION_SHIFT: 0.85 } }]
		},
	]
}
Class.burnerTurretSnowdread = {
	PARENT: 'genericTank',
	COLOR: -1,
	CONTROLLERS: ['nearestDifferentMaster'],
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [15, 12, 0.8, 0, 0, 140, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -5, SATURATION_SHIFT: 0.8}},
		}, {
			POSITION: [16.5, 6, 1, 0, 0, 140, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5}}
		}, {
			POSITION: [15, 12, 0.8, 0, 0, -140, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -5, SATURATION_SHIFT: 0.8}},
		}, {
			POSITION: [16.5, 6, 1, 0, 0, -140, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5}}
		}, {
			POSITION: [17, 2, 1, 0, 6.75, 2, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 12.5}}
		}, {
			POSITION: [17, 2, 1, 0, -6.75, -2, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 12.5}}
		}, {
			POSITION: [24, 7.75, 1.25, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.flame, {speed: 1.3, maxSpeed: 1.3}]),
				TYPE: 'growBullet',
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -5, SATURATION_SHIFT: 0.85},
			}
		}, {
			POSITION: [21.5, 5.75, 1.3, 0, 0, 0, 0],
			PROPERTIES: { 
				SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.flame, g.fake]),
				TYPE: 'bullet',
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 2.5, SATURATION_SHIFT: 0.8}, 
				BORDERLESS: true 
			}
		}, {
			POSITION: [14, 8.5, -1.4, 0, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5}}
		}, {
			POSITION: [10, 8.5, 0.5, 0, 0, 75, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}, DRAW_ABOVE: true }
		}, {
			POSITION: [10, 8.5, 0.5, 0, 0, -75, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}, DRAW_ABOVE: true }
		}, {
			POSITION: [10, 8.5, 0.5, 0, 0, 180, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}, DRAW_ABOVE: true }
		}
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 7.5 } }],
		}, {
			POSITION: [8.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, SATURATION_SHIFT: 0.8 } }]
		},
	]
}
Class.roasterTurretSnowdread = {
	PARENT: 'genericTank',
	COLOR: -1,
	CONTROLLERS: ['nearestDifferentMaster'],
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [8, 14, -1.15, 5.5, 0, 180, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -7.5, SATURATION_SHIFT: 0.7}},
		}, {
			POSITION: [15, 7, 1.5, 0, 0, 180, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}},
		}, {
			POSITION: [3.5, 8, 0.8, 8.5, 0, 180, 0],
			PROPERTIES: {COLOR: 17},
		}, {
			POSITION: [17, 2, 1, 0, 7.25, 4, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 2.5}}
		}, {
			POSITION: [17, 2, 1, 0, -7.25, -4, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 2.5}}
		}, {
			POSITION: [16, 7.75, 1.7, 8, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.machineGun, g.flame, {spray: 0.6, speed: 1.2, maxSpeed: 1.2}]),
				TYPE: 'growBullet',
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -7.5, SATURATION_SHIFT: 0.8},
			}
		}, {
			POSITION: [13, 5.5, 1.7, 8, 0, 0, 0],
			PROPERTIES: { 
				SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.machineGun, g.flame, g.fake]),
				TYPE: 'bullet',
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 0, SATURATION_SHIFT: 0.75}, 
				BORDERLESS: true 
			}
		}, {
			POSITION: [16.5, 10.5, 0.001, 0, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 2.5}}
		}, {
			POSITION: [12, 10.5, -1.4, 0, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5}}
		}, {
			POSITION: [10, 8.5, 0.5, 0, 0, 70, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 2.5}, DRAW_ABOVE: true }
		}, {
			POSITION: [10, 8.5, 0.5, 0, 0, -70, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 2.5}, DRAW_ABOVE: true }
		}, {
			POSITION: [10, 8.5, 0.5, 0, 0, 180, 0],
			PROPERTIES: { COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 2.5}, DRAW_ABOVE: true }
		}
	],
	PROPS: [
		{
			POSITION: [14.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 10 } }],
		}, {
			POSITION: [9, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: 5, SATURATION_SHIFT: 0.75 } }]
		},
	]
}

Class.showerTurretSnowdread = {
	PARENT: "genericTank",
	LABEL: "",
	BODY: { FOV: 1.5 },
	FACING_TYPE: ["spin", {speed: 0.04}],
	COLOR: {
		BASE: 6,
		BRIGHTNESS_SHIFT: -20,
		SATURATION_SHIFT: 0.5,
	},
	MAX_CHILDREN: 4,
	GUNS: weaponArray(
		addDroneOnAuto({length: 6, width: 10.5, x: 8}, 0, [g.drone, g.overseer, {size: 1.3}])
	, 2),
	PROPS: [
		{
			POSITION: [14.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -20, SATURATION_SHIFT: 0.5 } }],
		}, {
			POSITION: [8, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1 } }]
		},
	]
}
Class.stormTurretSnowdread = {
	PARENT: 'genericTank',
	LABEL: "",
	BODY: { FOV: 1.5 },
	FACING_TYPE: ["spin", {speed: 0.04}],
	COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5},
	MAX_CHILDREN: 6,
	GUNS: weaponArray(
		addDroneOnAuto({length: 6, width: 12, x: 8}, 12.5, [g.drone, {size: 1.25}])
	, 2),
	PROPS: [
		{
			POSITION: [14, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.6 } }],
		}, {
			POSITION: [8.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1 } }]
		},
	]
}
Class.tempestTurretSnowdread = {
	PARENT: 'genericTank',
	LABEL: "",
	BODY: { FOV: 1.5 },
	FACING_TYPE: ["spin", {speed: 0.04}],
	COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5},
	MAX_CHILDREN: 9,
	GUNS: weaponArray(
		addDroneOnAuto({length: 6, width: 12, x: 8, aspect: 1.2}, 7.5, [g.drone, g.overseer, {size: 1.25}])
	, 3),
	PROPS: [
		{
			POSITION: [14, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -15, SATURATION_SHIFT: 0.6 } }],
		}, {
			POSITION: [8.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1 } }]
		},
	]
}
Class.monsoonTurretSnowdread = {
	PARENT: 'genericTank',
	LABEL: "",
	BODY: { FOV: 1.5 },
	FACING_TYPE: ["spin", {speed: 0.04}],
	COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5},
	MAX_CHILDREN: 9,
	GUNS: weaponArray(
		addDroneOnAuto({length: 6.5, width: 12.5, aspect: 1.2, x: 7.5}, 10, [g.drone, {size: 1.35, health: 1.1}])
	, 3),
	PROPS: [
		{
			POSITION: [14, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -15, SATURATION_SHIFT: 0.6 } }],
		}, {
			POSITION: [9.5, 0, 0, 0, 1],
			TYPE: ["egg", { COLOR: { BASE: -1 } }]
		},
	]
}

// FPS testing
Class.auraBenchmark1 = {
	PARENT: 'genericTank',
	LABEL: "Basic Aura Benchmark",
	UPGRADE_TOOLTIP: "169 Basic Dread v2 Auras",
	TURRETS: []
}
Class.auraBenchmark2 = {
	PARENT: 'genericTank',
	LABEL: "Complex Aura Benchmark",
	UPGRADE_TOOLTIP: "169 Large Snowdread Auras",
	TURRETS: []
}
Class.auraBenchmark1Aura = addAuraOld();
Class.auraBenchmark2Aura = addAuraNew(1, 1, 0.3, 0, "Large");
for (let i = -6; i <= 6; i++) {
	for (let j = -6; j <= 6; j++) {
		Class.auraBenchmark1.TURRETS.push({
			POSITION: [7.5, 20 * i, 20 * j, 0, 360, 0],
			TYPE: 'auraBenchmark1Aura'
		})
		Class.auraBenchmark2.TURRETS.push({
			POSITION: [7.5, 20 * i, 20 * j, 0, 360, 0],
			TYPE: 'auraBenchmark2Aura'
		})
	}
}

Class.snowtanksTesting.UPGRADES_TIER_0.push("auraBenchmark1", "auraBenchmark2");
