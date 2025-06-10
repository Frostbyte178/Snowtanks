const { combineStats, makeAuto, weaponArray } = require('../../facilitators.js');
const g = require('../../gunvals.js');
const { addGunner, addTrap, addThruster } = require('./snowDreadsFacilitators.js');
const { enableSnowDreads } = require('./snowDreadsConstants.js');

// Navigate to [snowDreadsConstants.js] and the "enableSnowDreads" variable to enable/disable this addon.
if (!enableSnowDreads) {
	return console.log('--- Snowdreads projectiles addon [snowDreadsProjectiles.js] is disabled. ---');
}

Class.heavyBulletSnowdread = {
	PARENT: "bullet",
	PROPS: [{
		POSITION: [20, 0, 0, 0, 1],
		TYPE: "ring085"
	}]
}

// Missiles
Class.missileProjectileSnowdread = {
	PARENT: "bullet",
	LABEL: "Missile",
	INDEPENDENT: true,
	BODY: { RANGE: 120 },
	GUNS: [
		...addThruster({length: 16, width: 6, y: -2, angle: 130}, -2.5, [g.basic, g.skimmer, g.lowPower, {reload: 0.5, recoil: 1.35, speed: 1.7, maxSpeed: 1.7}]),
		...addThruster({length: 16, width: 6, y: 2, angle: -130}, -2.5, [g.basic, g.skimmer, g.lowPower, {reload: 0.5, recoil: 1.35, speed: 1.7, maxSpeed: 1.7}]),
	],
	TURRETS: [
		{
			POSITION: [10, 0, 0, 0, 0, 1],
			TYPE: ["egg", {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}}],
		}
	],
}
Class.superMissileSnowdread = {
	PARENT: "bullet",
	LABEL: "Missile",
	INDEPENDENT: true,
	BODY: { RANGE: 120 },
	GUNS: [
		...addThruster({length: 14, width: 7, y: -2, angle: 130}, -2.5, [g.basic, g.skimmer, g.lowPower, {speed: 1.7, maxSpeed: 1.7, recoil: 2.7, damage: 0.6}]),
		...addThruster({length: 14, width: 7, y: 2, angle: -130}, -2.5, [g.basic, g.skimmer, g.lowPower, {speed: 1.7, maxSpeed: 1.7, recoil: 2.7, damage: 0.6}]),
		...addThruster({length: 15.5, width: 7, delay: 0.2}, -2.5, [g.basic, g.skimmer, {speed: 2.2, maxSpeed: 2.2, damage: 0.9}], false),
	],
	TURRETS: [
		{
			POSITION: [14, 0, 0, 0, 0, 1],
			TYPE: ["egg", {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [9, 0, 0, 0, 0, 1],
			TYPE: ["egg", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 2.5, SATURATION_SHIFT: 0.8}, BORDERLESS: true}],
		},
	],
}
Class.swirlMissileSnowdread = {
	PARENT: 'spinmissile',
	GUNS: [
		...addThruster({length: 14, width: 8, angle: 0}, -2.5, [g.basic, g.skimmer, {speed: 1.3, maxSpeed: 1.3}], false),
		...addThruster({length: 14, width: 8, angle: 180}, -2.5, [g.basic, g.skimmer, {speed: 1.3, maxSpeed: 1.3}], false),
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 0, 1],
			TYPE: ['egg', {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [6, 0, 0, 0, 1],
			TYPE: ['egg', {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 10, SATURATION_SHIFT: 0.7}}],
		},
	]
}
Class.spiralMissileSnowdread = {
	PARENT: 'spinmissile',
	GUNS: [
		...addThruster({length: 14, width: 8, angle: 0}, -2.5, [g.basic, g.rocketeer, {speed: 1.3, maxSpeed: 1.3}], false),
		...addThruster({length: 14, width: 8, angle: 180}, -2.5, [g.basic, g.rocketeer, {speed: 1.3, maxSpeed: 1.3}], false),
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 0, 1],
			TYPE: ['egg', {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}}],
		}, {
			POSITION: [8, 0, 0, 0, 1],
			TYPE: ['egg', {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 10, SATURATION_SHIFT: 0.7}}],
		},
	]
}

// Drones
Class.betadrone = {
	PARENT: "drone",
	PROPS: [
		{
			POSITION: [10, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: -1}],
		},
	]
}
Class.turretedDroneSnowdread = {
	PARENT: 'drone',
	TURRETS: [
		{
			POSITION: [10, 0, 0, 180, 360, 2],
			TYPE: 'droneAutoTurretSnowdread',
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 0, 1],
			TYPE: ['triangle', {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}}],
		}, 
	]
}
Class.honchoDroneSnowdread = {
	PARENT: 'drone',
	PROPS: [
		{
			POSITION: [20, 0, 0, 180, 1],
			TYPE: ["aggressorMinionTopSnowdread"],
		},
	]
}

// Minions
Class.assailantMinionSnowdread = {
	PARENT: "minion",
	BODY: { SPEED: 2 },
	SHAPE: 4,
	COLOR: 13,
	GUNS: weaponArray(
		addGunner({length: 15, width: 7.5}, -5, [g.basic, g.assassin, g.minionGun])
	, 4),
	PROPS: [
		{
			POSITION: [20, 0, 0, 0, 1],
			TYPE: ["square", {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 7.5}}]
		}, {
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "assailantMinionTopSnowdread"
		}
	]
}
Class.aggressorMinionSnowdread = {
	PARENT: "minion",
	SHAPE: 3.5,
	COLOR: 2,
	BODY: { SPEED: 2 },
	GUNS: weaponArray(
		addGunner({length: 16, width: 8.5}, -2.5, [g.basic, g.sniper, g.assassin, g.minionGun, {speed: 0.93, maxSpeed: 0.93}])
	, 3),
	PROPS: [
		{
			POSITION: [20, 0, 0, 0, 1],
			TYPE: "aggressorMinionTopSnowdread"
		}
	]
}
Class.gladiatorTritankMinionSnowdread = {
	PARENT: "gladiatorGenericMinionSnowdread",
	GUNS: weaponArray([
		{
			POSITION: [15, 8.5, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.minionGun, {speed: 0.7, maxSpeed: 0.7, range: 0.6}]),
				WAIT_TO_CYCLE: true,
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 10 },
				TYPE: 'bullet',
			},
		}, {
			POSITION: [13.5, 5.5, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.minionGun, g.fake]),
				WAIT_TO_CYCLE: true,
				COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -2.5, SATURATION_SHIFT: 0.85 },
				TYPE: 'bullet',
			},
		},
	], 3),
}
Class.gladiatorTritrapMinionSnowdread = {
	PARENT: "gladiatorGenericMinionSnowdread",
	GUNS: weaponArray([
		{
			POSITION: [13, 7, 1, 0, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -5, SATURATION_SHIFT: 0.6}}
		}, {
			POSITION: [3, 7, 1.7, 13, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.flankGuard, g.minionGun, {reload: 1.6, shudder: 0.2}]),
				TYPE: "trap",
				STAT_CALCULATOR: "trap",
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -7.5, SATURATION_SHIFT: 0.6}
			},
		}, {
			POSITION: [14, 5.5, 0.7, 0, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -12.5,  SATURATION_SHIFT: 0.75}}
		}
	], 3),
}
Class.gladiatorTriswarmMinionSnowdread = {
	PARENT: "gladiatorGenericMinionSnowdread",
	GUNS: weaponArray([
		{
			POSITION: [7, 8.5, -1.5, 7, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.swarm, g.minionGun, {size: 1.6, range: 0.5}]),
				TYPE: 'swarm',
				STAT_CALCULATOR: "swarm",
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.7}
			},
		}, {
			POSITION: [10.5, 6.8, -1.5, 2.5, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.swarm, g.minionGun, g.fake]),
				TYPE: 'swarm',
				COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -2.5, SATURATION_SHIFT: 0.7},
				BORDERLESS: true
			},
		},
	], 3),
}
Class.gladiatorAutoMinionTurretSnowdread = {
	PARENT: "spamAutoTurretSnowdread",
	GUNS: [
		{ // Main gun
			POSITION: [22, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.turret, {range: 0.5}]),
				TYPE: "bullet",
				COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.5 },
			},
		}, {
			POSITION: [14.5, 2, 1, 0, 5, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.turret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 17.5 },
			},
		}, {
			POSITION: [14.5, 2, 1, 0, -5, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.turret, g.fake]),
				TYPE: "bullet",
				COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 17.5 },
			},
		},
	]
}
Class.gladiatorAutoMinionSnowdread = {
	PARENT: "gladiatorGenericMinionSnowdread",
	TURRETS: [
		{
			POSITION: [12, 0, 0, 0, 360, 2],
			TYPE: "gladiatorAutoMinionTurretSnowdread"
		}
	]
}
Class.gladiatorAuraMinionSnowdread = {
	PARENT: "gladiatorGenericMinionSnowdread",
	TURRETS: [
		{
			POSITION: [12, 0, 0, 0, 360, 2],
			TYPE: "gladiatorAuraMinionAuraSnowdread",
		}
	]
}
Class.gladiatorHealAuraMinionSnowdread = {
	PARENT: "gladiatorGenericMinionSnowdread",
	TURRETS: [
		{
			POSITION: [12, 0, 0, 0, 360, 2],
			TYPE: "gladiatorHealAuraMinionAuraSnowdread",
		}
	]
}

// Traps
Class.autoTrapSnowdread = {
	PARENT: 'trap',
	TURRETS: [
		{
			POSITION: [11, 0, 0, 0, 360, 1],
			TYPE: "trapAutoTurret",
		},
	],
}
Class.auraTrap = makeAuto(Class.trap, "", {type: 'auraTrapAura'});

// Blocks
Class.unsetTrapSnowdread = {
	PARENT: 'unsetTrap',
	PROPS: [{
		POSITION: [20, 0, 0, 0, 1],
		TYPE: 'unsetTrapTopSnowdread'
	}]
}
Class.auraBlock = {
	PARENT: 'unsetTrap',
	TURRETS: [
		{
			POSITION: [10, 0, 0, 0, 360, 2],
			TYPE: 'auraBlockAura'
		}
	],
	PROPS: [
		{
			POSITION: [20, 0, 0, 45, 1],
			TYPE: 'unsetPillboxTopSnowdread'
		}
	]
}

// Pillboxes
Class.unsetPillboxWeakSnowdread = {
	PARENT: 'unsetPillbox',
	TURRETS: [
		{
			POSITION: [11, 0, 0, 0, 360, 2],
			TYPE: "pillboxTurretWeakSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [20, 0, 0, 45, 1],
			TYPE: 'unsetPillboxTopSnowdread'
		}
	]
}
Class.unsetPillboxSnowdread = {
	PARENT: 'unsetPillbox',
	TURRETS: [
		{
			POSITION: [11, 0, 0, 0, 360, 2],
			TYPE: "pillboxTurretSnowdread",
		},
	],
	PROPS: [
		{
			POSITION: [20, 0, 0, 45, 1],
			TYPE: 'unsetPillboxTopSnowdread'
		}
	]
}
