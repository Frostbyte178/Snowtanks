const { menu, combineStats, weaponArray } = require('../../facilitators.js');
const { base, statnames } = require('../../constants.js');
const g = require('../../gunvals.js');
const { decoAuraProperties, shadingProperties, blinkerProperties } = require('./voidlingsFacilitators.js');
const { 
    enableSnowVoidlings, 
    baseColor, bright1, bright2, dark1, trim,
} = require('./voidlingsConstants.js');
const { shape3 } = require('./voidlingsDeco.js');
require('./voidlingsMisc.js');
require('./voidlingsControllers.js');

// Navigate to [snowVoidlingsConstants.js] and the "enableSnowVoidlings" variable to enable/disable this addon.
if (!enableSnowVoidlings) {
	return console.log('--- Voidlings addon [voidlings.js] is disabled. ---');
}

// Relativity
Class.relativity = {
    PARENT: 'genericVoidling',
    LABEL: "Relativity",
    SHAPE: shape3,
    CONTROLLERS: ["weaponSwitcher"],
    GUNS: [
        {
            POSITION: [0, 5.5, 1, 0, 0, 0, 0,],
            PROPERTIES: decoAuraProperties('voidlingCore1')
        }, {
            POSITION: [0, 6.5, 1, 0, 0, 0, 0,],
            PROPERTIES: decoAuraProperties('voidlingCore2')
        },
        ...weaponArray([
            {
                POSITION: [2.2, 8.625, 1.35, 13.6, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, {damage: 0.6, speed: 1.8, maxSpeed: 3.25, range: 3, size: 0.7}]),
                    TYPE: 'relativityMissile',
                    STAT_CALCULATOR: "swarm",
                    BORDERLESS: true,
                    DRAW_FILL: false,
                    ALT_FIRE: 1,
                }, 
            }, {
                POSITION: [2.2, 8.625, 1.35, 13.6, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, {damage: 0.2, health: 1.3, speed: 2.6, maxSpeed: 0.3, range: 0.6, size: 0.75}]),
                    TYPE: 'relativityBomb',
                    BORDERLESS: true,
                    DRAW_FILL: false,
                    ALT_FIRE: 2,
                }, 
            }, {
                POSITION: [2.2, 8.625, 1.35, 13.6, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.pounder, g.destroyer, {speed: 1.5, maxSpeed: 0, size: 0.85}]),
                    TYPE: 'relativityShield',
                    STAT_CALCULATOR: "block",
                    BORDERLESS: true,
                    DRAW_FILL: false,
                    ALT_FIRE: 3,
                }, 
            }, { // Body shading
                POSITION: [1.5, 6, 1.4, 4.4, 6, 0, 0],
                PROPERTIES: shadingProperties()
            }, {
                POSITION: [1.5, 6, 1.4, 4.4, -6, 0, 0],
                PROPERTIES: shadingProperties()
            }, {
                POSITION: [1, 4, 0.8, 5.8, 3.5, 0, 0],
                PROPERTIES: shadingProperties()
            }, {
                POSITION: [1, 4, 0.8, 5.8, -3.5, 0, 0],
                PROPERTIES: shadingProperties()
            }, {
                POSITION: [0.65, 4.5, 0.7, 5, 4.5, 0, 0],
                PROPERTIES: shadingProperties(trim)
            }, {
                POSITION: [0.65, 4.5, 0.7, 5, -4.5, 0, 0],
                PROPERTIES: shadingProperties(trim)
            }, { // Bracing
                POSITION: [0.6, 4.5, 1, 5, 0, 60, 0],
                PROPERTIES: {COLOR: bright1}
            }, {
                POSITION: [0.6, 4.5, 1, 6.5, 0, 60, 0],
                PROPERTIES: {COLOR: bright1}
            }, { // Shards
                POSITION: [9, 5, 0.001, 6, -4.5, 68, 0],
                PROPERTIES: {COLOR: trim},
            }, {
                POSITION: [9, 5, 0.001, 6, 4.5, -68, 0],
                PROPERTIES: {COLOR: trim},
            }, { // Guns
                POSITION: [2.7, 10, -1.2, 8, 0, 0, 0],
                PROPERTIES: {COLOR: bright2}
            }, {
                POSITION: [2.7, 8.5, 1, 8, 0, 0, 0],
                PROPERTIES: {COLOR: baseColor}
            }, {
                POSITION: [1.1, 11.5, 1, 10.7, 0, 0, 0],
                PROPERTIES: {COLOR: baseColor}
            }, {
                POSITION: [1.1, 11.5, 0.75, 11.8, 0, 0, 0],
                PROPERTIES: {COLOR: baseColor}
            }, {
                POSITION: [2.2, 8.625, 1.35, 13.6, 0, 0, 0],
                PROPERTIES: {COLOR: baseColor}
            }, {
                POSITION: [1.2, 8.3, 0.8, 13.6, 0, 0, 0],
                PROPERTIES: {COLOR: dark1, BORDERLESS: true}
            }, {
                POSITION: [0.7, 10, 1, 12.9, 0, 0, 0],
                PROPERTIES: {COLOR: trim}
            }, {
                POSITION: [6.3, 4.3, 0.7, 8, 0, 0, 0],
                PROPERTIES: {COLOR: bright2}
            }
        ], 3)
    ],
    PROPS: [
        {
            POSITION: [20, 0, 0, 0, 1],
            TYPE: 'voidlingInsert3',
        }
    ],
}

for (let a = 0; a < 3; a++) {
    // Blinkers
    for (let i = 0; i < 3; i++) {
        Class.relativity.GUNS.push({
            POSITION: [0.7, 1.2, 0.9, 6.2 + 1.4 * i, 4.15 - 0.9 * i, 120 * a + 60, 0],
            PROPERTIES: blinkerProperties(i)
        }, {
            POSITION: [0.7, 1.2, 0.9, 6.2 + 1.4 * i, -4.15 + 0.9 * i, 120 * a - 60, 0],
            PROPERTIES: blinkerProperties(i)
        })
    }
}

Class.voidlingsMenu = menu("Voidlings", baseColor, 3.5);

Class.addons.UPGRADES_TIER_0.push("voidlingsMenu");
    Class.voidlingsMenu.UPGRADES_TIER_0 = ["relativity"];
