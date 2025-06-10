const { 
    enableSnowVoidlings,
    dark1, trim
} = require('./voidlingsConstants.js');

// Navigate to [snowVoidlingsConstants.js] and the "enableSnowVoidlings" variable to enable/disable this addon.
if (!enableSnowVoidlings) {
	return console.log('--- Voidlings decoration addon [voidlingsDeco.js] is disabled. ---');
}

// Body shapes
exports.shape3 = "M 0.78 -1.35 L -1.56 0 L -0.9 0 L -0.44 -0.26 L -0.35 -0.61 L 0 -0.51 L 0.45 -0.78 Z" +
            "M -1.56 0 L 0.78 1.35 L 0.45 0.78 L 0 0.51 L -0.35 0.61 L -0.44 0.26 L -0.9 0 Z" + 
            "M 0.78 1.35 L 0.78 -1.35 L 0.45 -0.78 L 0.45 -0.25 L 0.7 0 L 0.45 0.25 L 0.45 0.78 Z";

// Body inserts
const insert3 = "M -0.7 0.11 L -0.39 0.18 L -0.35 0.61 L 0.04 0.43 L 0.25 0.66 L 0.04 0.54 L -0.5 0.87 L -0.48 0.24 Z" + 
            "M -0.7 -0.11 L -0.39 -0.18 L -0.35 -0.61 L 0.04 -0.43 L 0.25 -0.66 L 0.04 -0.54 L -0.5 -0.87 L -0.48 -0.24 Z" +
            "M 0.45 0.55 L 0.35 0.25 L 0.7 0 L 0.35 -0.25 L 0.45 -0.55 L 0.45 -0.3 L 1 0 L 0.45 0.3 Z";
Class.voidlingInsert3 = {
    SHAPE: insert3,
    COLOR: dark1,
}

// Cores
Class.voidlingCore1 = {
    PARENT: 'auraBase',
    BODY: {DAMAGE: 0},
    FACING_TYPE: ["spin", {speed: -1}],
    SHAPE: 6,
    COLOR: 6,
    ALPHA: 0.7,
    PARTICLE_EMITTER: {
        RATE: 20,
        SIZE: 10,
        ALPHA: 0.6,
    }
}
Class.voidlingCore2 = {
    PARENT: 'auraBase',
    BODY: {DAMAGE: 0},
    FACING_TYPE: ["spin", {speed: 0.65}],
    SHAPE: 6,
    COLOR: 6,
    ALPHA: 0.7,
}

// Projectile deco
// Relativity
Class.relativityMissileJet = {
    SHAPE: 'M 0.8 0 L 0 1 Q -0.45 0.35 -2 0 Q -0.45 -0.35 0 -1 Z',
    COLOR: 6,
    PARTICLE_EMITTER: {
        RATE: 10,
        SIZE: 8,
        ALPHA: 0.6,
        SPEED: 6,
        ANGLE: {MIN: 150, MAX: 210},
    },
}
Class.relativityBombFlare = {
    PARENT: 'auraBase',
    BODY: {DAMAGE: 0},
    LAYER: -1,
    FACING_TYPE: ["spin", {speed: -0.025}],
    DIE_AT_RANGE: false,
    SHAPE: "M 1 0 L 0.433 0.25 L 0.5 0.866 L 0 0.5 L -0.5 0.866 L -0.433 0.25 L -1 0 L -0.433 -0.25 L -0.5 -0.866 L 0 -0.5 L 0.5 -0.866 L 0.433 -0.25 Z",
    COLOR: trim,
    ALPHA: 0.75
}
Class.relativityBombShockwave = {
    PARENT: 'bullet',
    MOTION_TYPE: 'withMaster', 
    HITS_OWN_TYPE: 'never', 
    PERSISTS_AFTER_DEATH: true, 
    ALPHA: 0.4,
    COLOR: trim,
}
