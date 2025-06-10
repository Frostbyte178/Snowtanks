const { combineStats, menu } = require('../facilitators.js');
const { base } = require('../constants.js');

Class.spectator.CAN_GO_OUTSIDE_ROOM = true;

Class.snowtanksTesting = menu("Snow Testing", {BASE: 0, SATURATION_SHIFT: 0.7, BRIGHTNESS_SHIFT: 15}, -6);

Class.particleEmitterTest = {
    PARENT: 'genericTank',
    LABEL: "Particle Emitter Testing",
    COLOR: 6,
    PARTICLE_EMITTER: {
        RATE: 20,
        SIZE: 10,
        ALPHA: 0.6,
    }
}
Class.blinkerTest = {
    PARENT: 'genericTank',
    LABEL: "Blinker Testing",
    SHAPE: 4,
    COLOR: 16,
    SIZE: 20,
    GUNS: [],
}
for (let a = 0; a < 4; a++) {
    Class.blinkerTest.GUNS.push({
        POSITION: [2, 1, 1, 8.5, 0, 90 * a + 45, 0],
        PROPERTIES: {
            COLOR: 0,
            BORDERLESS: true,
            DRAW_ABOVE: true,
            BLINKER: {
                REPEAT: 700,
                START: 0,
                END: 350,
                OFF_COLOR: 17,
            }
        }
    })
    for (let i = 1; i < 3; i++) {
        Class.blinkerTest.GUNS.push({
            POSITION: [2, 1, 1, 8.5 - 1 * i, 1.5 * i, 90 * a + 45, 0],
            PROPERTIES: {
                COLOR: 0,
                BORDERLESS: true,
                DRAW_ABOVE: true,
                BLINKER: {
                    REPEAT: 700,
                    START: 100 * i,
                    END: 350 + 100 * i,
                    OFF_COLOR: 17,
                }
            }
        }, {
            POSITION: [2, 1, 1, 8.5 - 1 * i, -1.5 * i, 90 * a + 45, 0],
            PROPERTIES: {
                COLOR: 0,
                BORDERLESS: true,
                DRAW_ABOVE: true,
                BLINKER: {
                    REPEAT: 700,
                    START: 100 * i,
                    END: 350 + 100 * i,
                    OFF_COLOR: 17,
                }
            }
        })
    }
}

Class.addons.UPGRADES_TIER_0.push('snowtanksTesting');
    Class.snowtanksTesting.UPGRADES_TIER_0 = ["particleEmitterTest", "blinkerTest"];
