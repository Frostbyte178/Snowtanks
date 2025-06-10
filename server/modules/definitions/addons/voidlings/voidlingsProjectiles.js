const { weaponArray, combineStats } = require('../../facilitators.js');
const g = require('../../gunvals.js');
const { 
    enableSnowVoidlings,
    baseColor, bright1, bright2, dark1, trim,
} = require('./voidlingsConstants.js');
const { decoAuraProperties, shadingProperties } = require('./voidlingsFacilitators.js');

// Navigate to [snowVoidlingsConstants.js] and the "enableSnowVoidlings" variable to enable/disable this addon.
if (!enableSnowVoidlings) {
	return console.log('--- Voidlings projectiles addon [voidlingsProjectiles.js] is disabled. ---');
}

// Relativity
Class.relativityMissile = {
    PARENT: 'swarm',
    TYPE: 'bullet',
    BODY: {
        PENETRATION: 1,
        SPEED: 3,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.165,
        DAMAGE: 6,
        PUSHABILITY: 0.3,
        ACCELERATION: 4,
    },
    SHAPE: "M 1.1 0 L -1.1 1 L -0.5 0 L -1.1 -1 Z",
    COLOR: baseColor,
    GUNS: [
        { // Fins
            POSITION: [9, 5, 0.001, -3, -4.75, 18, 0],
            PROPERTIES: {COLOR: bright2}
        }, {
            POSITION: [9, 5, 0.001, -3, 4.75, -18, 0],
            PROPERTIES: {COLOR: bright2}
        }, {
            POSITION: [6, 4, 0.001, -3, 7.5, 18, 0],
            PROPERTIES: {COLOR: dark1}
        }, {
            POSITION: [6, 4, 0.001, -3, -7.5, -18, 0],
            PROPERTIES: {COLOR: dark1}
        }, { // Shards
            POSITION: [18, 4.8, 0.001, 0, 0.5, 145, 0],
            PROPERTIES: {COLOR: trim, DRAW_ABOVE: true}
        }, {
            POSITION: [18, 4.8, 0.001, 0, -0.5, -145, 0],
            PROPERTIES: {COLOR: trim, DRAW_ABOVE: true}
        }, {
            POSITION: [18, 4.8, 0.001, 0, 0.5, 145, 0],
            PROPERTIES: shadingProperties(trim)
        }, {
            POSITION: [18, 4.8, 0.001, 0, -0.5, -145, 0],
            PROPERTIES: shadingProperties(trim)
        }, { // Center Diamond
            POSITION: [3, 2.75, 0.001, 1.4, 0, 0, 0],
            PROPERTIES: {COLOR: dark1, DRAW_ABOVE: true}
        }, {
            POSITION: [6, 2.75, 0.001, -1, 0, 180, 0],
            PROPERTIES: {COLOR: dark1, DRAW_ABOVE: true}
        }, { // Thruster (functional)
            POSITION: [0, 14, 0.001, 6.5, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.thruster, {recoil: 1.65, reload: 0.5, range: 0}]),
                TYPE: 'bullet',
            }
        }, { // Thruster (decorative)
            POSITION: [5.75, 14, 0.001, 6.5, 0, 180, 0],
            PROPERTIES: {COLOR: baseColor}
        }, 
    ],
    PROPS: [
        {
            POSITION: [17, -10, 0, 0, 0],
            TYPE: 'relativityMissileJet'
        }
    ]
}
Class.relativityBomb = {
    PARENT: 'bullet',
    FACING_TYPE: ['spin', {speed: 0.04}],
    SHAPE: 5, 
    COLOR: baseColor,
    GUNS: [
        {
            POSITION: [0, 85, 0, 0, 0, 0, 0],
            PROPERTIES: decoAuraProperties(['relativityBombFlare', {
                ALPHA: 0.45, 
                COLOR: {BASE: trim, BRIGHTNESS_SHIFT: 10, SATURATION_SHIFT: 0.7}, 
                FACING_TYPE: ["spin", {speed: 0.015}],
            }])
        }, {
            POSITION: [0, 60, 0, 0, 0, 0, 0],
            PROPERTIES: decoAuraProperties('relativityBombFlare')
        }, {
            POSITION: [0, 10, 0, 0, 0, 0, 999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, {speed: 0, maxSpeed: 0, damage: 0.75, health: 1e6, size: 15, range: 0.06}]),
                TYPE: 'relativityBombShockwave',
                SHOOT_ON_DEATH: true,
            }
        }, {
            POSITION: [0, 10, 0, 0, 0, 0, 999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, {speed: 0, maxSpeed: 0, damage: 0.75, health: 1e6, size: 6.5, range: 0.06}]),
                TYPE: ['relativityBombShockwave', {ALPHA: 0.5}],
                SHOOT_ON_DEATH: true,
            }
        },
        ...weaponArray([
            {
                POSITION: [14, 6, 0.001, 0, 0, 0, 0],
                PROPERTIES: {
                    COLOR: dark1,
                    DRAW_ABOVE: true
                },
            }, {
                POSITION: [2, 4.5, 0, 9, 0, 36, 0],
                PROPERTIES: {
                    COLOR: trim,
                    DRAW_ABOVE: true
                },
            }
        ], 5),
        ...weaponArray({
            POSITION: [14, 6, 0.001, 0, 0, 0, 0],
            PROPERTIES: shadingProperties(dark1)
        }, 5)
    ],
}
Class.relativityShield = {
    PARENT: 'unsetTrap',
    FACING_TYPE: "withMotion",
    MOTION_TYPE: ["glide", {damp: 0.2}],
    COLOR: baseColor,
    SHAPE: 3,
    GUNS: [
        {
            POSITION: [9, 10.4, 0.001, 1, 0, 0, 0],
            PROPERTIES: {COLOR: bright1, DRAW_ABOVE: true},
        }, {
            POSITION: [6, 6.9, 0.001, 0, 0, 0, 0],
            PROPERTIES: {COLOR: trim, DRAW_ABOVE: true},
        }, {
            POSITION: [5, 18, 0.95, 5, 0, 180, 0],
            PROPERTIES: {COLOR: bright1, DRAW_ABOVE: true},
        }, {
            POSITION: [14.5, 12.5, 0.8, 0, 0, 180, 0],
            PROPERTIES: {COLOR: dark1, DRAW_ABOVE: true},
        }, {
            POSITION: [26, 14, 0.001, 0, 0, 0, 0],
            PROPERTIES: {COLOR: dark1},
        }, {
            POSITION: [47, 17, 0.001, 0, 0, 93, 0],
            PROPERTIES: {COLOR: trim, ALPHA: 0.75},
        }, {
            POSITION: [47, 17, 0.001, 0, 0, -93, 0],
            PROPERTIES: {COLOR: trim, ALPHA: 0.75},
        }, {
            POSITION: [24, 13, 0.001, 0, 0, 93, 0],
            PROPERTIES: {COLOR: bright1},
        }, {
            POSITION: [24, 13, 0.001, 0, 0, -93, 0],
            PROPERTIES: {COLOR: bright1},
        }, 
    ]
}
