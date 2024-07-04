const { combineStats, makeDeco, weaponArray, makeTurret } = require('../facilitators.js');
const { base } = require('../constants.js');
const g = require('../gunvals.js');

// Radial Auto Guns
Class.autoTankGun = makeTurret({
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard]),
                TYPE: "bullet",
            },
        },
    ],
}, {canRepel: true, limitFov: true, fov: 3})
Class.bansheegun = makeTurret({
    GUNS: [
        {
            POSITION: [26, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, { reload: 1.5 }]),
                TYPE: "bullet",
            },
        },
    ],
}, {limitFov: true, independent: true})
Class.auto4gun = makeTurret({
    GUNS: [
        {
            POSITION: [16, 4, 1, 0, -3.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 4, 1, 0, 3.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "bullet",
            },
        },
    ],
}, {canRepel: true, limitFov: true})
Class.bigauto4gun = makeTurret({
    GUNS: [
        {
            POSITION: [14, 5, 1, 0, -4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.twin, g.twin, g.power, { reload: 2 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 5, 1, 0, 4.5, 0, 0.33],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.twin, g.twin, g.power, { reload: 2 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 5, 1, 0, 0, 0, 0.67],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.twin, g.twin, g.power, { reload: 2 }]),
                TYPE: "bullet",
            },
        },
    ],
}, {canRepel: true, limitFov: true, fov: 3})
Class.megaAutoTankGun = makeTurret({
    GUNS: [
        {
            POSITION: [22, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder]),
                TYPE: "bullet",
            },
        },
    ],
}, {canRepel: true, limitFov: true})
Class.architectGun = makeTurret({
    GUNS: [
        {
            POSITION: [20, 16, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 16, 1.1, 20, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
                TYPE: "setTrap",
                STAT_CALCULATOR: "block"
            },
        },
    ],
}, {canRepel: true, limitFov: true, fov: 3})

// NPC turrets
Class.trapTurret = makeTurret({
    GUNS: [
        {
            POSITION: [16, 14, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 14, 1.8, 16, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowPower, { shudder: 0.4, speed: 0.9, reload: 2 }]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}, {limitFov: true, aiSettings: {SKYNET: true, FULL_VIEW: true, independent: true, extraStats: []}})
Class.baseTrapTurret = makeTurret({
    GUNS: [
        {
            POSITION: [16, 14, 1, 0, 0, 0, 0],
        }, {
            POSITION: [4, 14, 1.8, 16, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.pounder, g.hexaTrapper, {size: 1.2, speed: 0.9, shudder: 0.1}]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
                AUTOFIRE: true,
            },
        },
    ],
}, {independent: true, hasAI: false, extraStats: []})
Class.terrestrialTrapTurret = makeTurret({
    GUNS: [
        {
            POSITION: [13, 14, 1, 0, 0, 0, 0],
        }, {
            POSITION: [4, 14, 1.8, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.pounder, g.hexaTrapper, {size: 1.2, speed: 0.9, shudder: 0.1}]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
                AUTOFIRE: true,
            },
        },
    ],
}, {independent: true, hasAI: false, extraStats: []})
const shottrapTurretProperties = {
    SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.shotgun, g.machineGun, { speed: 0.7, maxSpeed: 0.2, damage: 1.5, range: 0.6 }]),
    AUTOFIRE: true,
    TYPE: "shotTrapBox",
    STAT_CALCULATOR: "block",
}
Class.shottrapTurret = makeTurret({
    GUNS: [{
        POSITION: [ 4, 1.5, 1, 11, -3, 0, 0 ], PROPERTIES: shottrapTurretProperties,
    }, {
        POSITION: [ 4, 2,   1, 11,  3, 0, 0 ], PROPERTIES: shottrapTurretProperties,
    }, {
        POSITION: [ 4, 1.5, 1, 13,  0, 0, 0 ], PROPERTIES: shottrapTurretProperties,
    }, {
        POSITION: [ 1, 2,   1, 11,  1, 0, 0 ], PROPERTIES: shottrapTurretProperties,
    }, {
        POSITION: [ 1, 2,   1, 12, -1, 0, 0 ], PROPERTIES: shottrapTurretProperties,
    }, {
        POSITION: [ 1, 1.5, 1, 11,  1, 0, 0 ], PROPERTIES: shottrapTurretProperties,
    }, {
        POSITION: [ 1, 2,   1, 13, -1, 0, 0 ], PROPERTIES: shottrapTurretProperties,
    }, {
        POSITION: [ 1, 2.5, 1, 13,  1, 0, 0 ], PROPERTIES: shottrapTurretProperties,
    }, {
        POSITION: [ 1, 2,   1, 13,  2, 0, 0 ], PROPERTIES: shottrapTurretProperties,
    }, {
        POSITION: [ 1, 2,   1, 13, -2, 0, 0 ], PROPERTIES: shottrapTurretProperties,
    }, {
        POSITION: [ 1, 2.5, 1, 13, -2, 0, 0 ], PROPERTIES: shottrapTurretProperties,
    }, {
        POSITION: [ 1, 2.5, 1, 13,  2, 0, 0 ], PROPERTIES: shottrapTurretProperties,
    }, {
        POSITION: [ 1, 2,   1, 13, -2, 0, 0 ], PROPERTIES: shottrapTurretProperties,
    }, {
        POSITION: [ 16, 14, -1.4,  0, 0, 0, 0 ], 
    }, {
        POSITION: [  6, 14,  1.6, 16, 0, 0, 0 ], PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.shotgun, g.machineGun, g.fake]),
            AUTOFIRE: true,
            TYPE: "bullet"
        }
    }]
}, {limitFov: true, aiSettings: {SKYNET: true, FULL_VIEW: true, independent: true, extraStats: []}})
Class.machineTripleTurret = {
    PARENT: "genericTank",
    FACING_TYPE: ["spin", {speed: 0.06}],
    INDEPENDENT: true,
    COLOR: -1,
    GUNS: weaponArray({
        POSITION: [12, 10, 1.4, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.flankGuard]),
            TYPE: "bullet",
            AUTOFIRE: true,
        },
    }, 3)
}
Class.launcherTurret = makeTurret('launcher', {canRepel: true, limitFov: true, extraStats: []})
Class.skimmerTurret = makeTurret('skimmer', {canRepel: true, limitFov: true, extraStats: [], color: 'mirror'})
Class.kronosSkimmerTurret = makeTurret({
    GUNS: [
        {
            POSITION: [8, 20, -0.25, 11, 0, 0, 0],
        }, {
            POSITION: [15, 18, -0.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, { reload: 2 }]),
                TYPE: "kronosMissile",
            },
        },
    ],
}, {canRepel: true, limitFov: true, fov: 10, independent: true, extraStats: []})
Class.autoSmasherLauncherTurret = makeTurret({
    GUNS: [
        {
            POSITION: [4, 12, 1.2, 16, 0, 0, 0],
        }, {
            POSITION: [18, 20, -0.7, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, { reload: 2, speed: 1.5, maxSpeed: 1.5, range: 2.5 }]),
                TYPE: "autoSmasherMissile",
            },
        },
    ],
}, {canRepel: true, limitFov: true, fov: 10, independent: true, extraStats: []})
Class.twisterTurret = makeTurret('twister', {canRepel: true, limitFov: true, color: 'mirror', extraStats: [{speed: 1.3, maxSpeed: 1.3}]})
Class.hyperTwisterTurret = makeTurret({
    GUNS: [
        {
            POSITION: [10, 13, -0.5, 9, 0, 0, 0],
        }, {
            POSITION: [17, 14, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, { speed: 1.3, maxSpeed: 1.3 }, { reload: 4/3 }]),
                TYPE: "hyperspinmissile",
                STAT_CALCULATOR: "sustained",
            },
        },
    ],
}, {canRepel: true, limitFov: true, color: 'mirror', extraStats: []})
Class.rocketeerTurret = makeTurret('rocketeer', {canRepel: true, limitFov: true})
Class.boomerTurret = makeTurret('boomer', {canRepel: true, limitFov: true, color: 'mirror', extraStats: []})
Class.triTrapGuardTurret = {
    PARENT: "genericTank",
    COLOR: -1,
    FACING_TYPE: ["spin", { independent: true }],
    GUNS: weaponArray([
        {
            POSITION: [17, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 60, 0],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
    ], 3),
}
Class.eliteSpinnerCyclone = {
    PARENT: "genericTank",
    COLOR: -1,
    FACING_TYPE: ["spin", { speed: 0.1, independent: true }],
    GUNS: weaponArray([
        {
            POSITION: [15, 3.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 60, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 90, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        }
    ], 3)
}
Class.barricadeTurret = makeTurret('barricade', {aiSettings: {SKYNET: true, FULL_VIEW: true, independent: true, extraStats: []}})
Class.artilleryTurret = makeTurret('artillery', {canRepel: true, limitFov: true, extraStats: []})
Class.nailgunTurret = makeTurret('nailgun', {canRepel: true, limitFov: true, extraStats: []})
Class.crowbarTurret = makeTurret({
    GUNS: [
        {
            POSITION: [37, 6.5, 1, 0, 0, 0, 0],
        }, {
            POSITION: [5, 8.5, -1.5, 8, 0, 0, 0],
        },
    ],
    TURRETS: [
        {
            POSITION: [6, 38, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { GUN_STAT_SCALE: [g.flankGuard], INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        }, {
            POSITION: [6, 28, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { GUN_STAT_SCALE: [g.flankGuard], INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        }, {
            POSITION: [6, 18, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { GUN_STAT_SCALE: [g.flankGuard], INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        },
    ],
}, {canRepel: true, limitFov: true, extraStats: []})
Class.wrenchTurret = makeTurret({
    GUNS: [
        {
            POSITION: [67, 6.5, 1, 0, 0, 0, 0],
        }, {
            POSITION: [5, 8.5, -1.5, 8, 0, 0, 0],
        },
    ],
    TURRETS: [
        {
            POSITION: [6, 68, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { GUN_STAT_SCALE: [g.flankGuard], INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        }, {
            POSITION: [6, 58, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { GUN_STAT_SCALE: [g.flankGuard], INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        }, {
            POSITION: [6, 48, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { GUN_STAT_SCALE: [g.flankGuard], INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        },
    ],
}, {canRepel: true, limitFov: true, extraStats: []})
Class.protoSwarmerTurret = makeTurret({
    GUNS: [
        {
            POSITION: [10, 14, -1.2, 5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.hive]),
                TYPE: "protoHive",
            },
        }, {
            POSITION: [11, 12, 1, 5, 0, 0, 0],
        },
    ],
}, {canRepel: true, limitFov: true, extraStats: []})
Class.swarmTurret = makeTurret({
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: 'autoswarm',
                STAT_CALCULATOR: "swarm",
            },
        },
    ],
}, {canRepel: true, limitFov: true, extraStats: []})
Class.genghisLowerTurret = makeTurret({
    MAX_CHILDREN: 4,
    GUNS: [
        {
            POSITION: [7, 11, 0.6, 6, 0, 0, 0.5],
        }, {
            POSITION: [2, 12, 1, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.babyfactory, { reload: 1.5 }]),
                TYPE: ["tinyMinion", {INDEPENDENT: true}],
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
    ],
}, {canRepel: true, limitFov: true, extraStats: []})
Class.cruiserTurret = makeTurret('cruiser', {canRepel: true, limitFov: true})
Class.carrierTurret = makeTurret('carrier', {canRepel: true, limitFov: true})
Class.napoleonLowerTurret = makeTurret({
    GUNS: [
        {
            POSITION: [8, 8, 0.6, 6, 0, 30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, g.pounder, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: ["bee", { INDEPENDENT: true }],
                STAT_CALCULATOR: "swarm",
            },
        }, {
            POSITION: [8, 8, 0.6, 6, 0, -30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, g.pounder, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: ["bee", { INDEPENDENT: true }],
                STAT_CALCULATOR: "swarm",
            },
        },
    ],
}, {canRepel: true, limitFov: true, extraStats: []})
Class.gunnerCruiserTurret = makeTurret({
    GUNS: [
        {
            POSITION: [4, 7.5, 0.6, 6, 4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        }, {
            POSITION: [4, 7.5, 0.6, 6, -4.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        }, {
            POSITION: [16, 3, 1, 0, -3, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [16, 3, 1, 0, 3, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin]),
                TYPE: "bullet",
            },
        },
    ],
}, {canRepel: true, limitFov: true, independent: true, fov: 10, extraStats: []})
Class.juliusLowerTurret = makeTurret({
    MAX_CHILDREN: 3,
    GUNS: [
        {
            POSITION: [8.5, 11, 0.6, 6, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.sunchip]),
                TYPE: "minichip",
                STAT_CALCULATOR: "drone",
            },
        },
    ],
}, {canRepel: true, limitFov: true, extraStats: []})
Class.swarmerTurret = makeTurret('swarmer', {canRepel: true, limitFov: true, extraStats: []})
Class.basicTurret = makeTurret({
    GUNS: [
        {
            POSITION: [16, 4, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "bullet",
            },
        },
    ],
}, {canRepel: true, limitFov: true, extraStats: []})
Class.tripletTurret = makeTurret({
    GUNS: [
        {
            POSITION: [18, 10, 1, 0, 5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [18, 10, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [21, 10, 1.2, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet]),
                TYPE: "bullet",
            },
        },
    ],
}, {canRepel: true, limitFov: true, extraStats: []})
Class.napoleonUpperTurret = makeTurret({
    GUNS: [
        {
            POSITION: [12, 17, -0.6, 0, 0, 0, 0],
        }, {
            POSITION: [16, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, { speed: 0.93, maxSpeed: 0.93 }]),
                TYPE: ["turretedBullet", {COLOR: "veryLightGrey"}],
            },
        },
    ],
}, {canRepel: true, limitFov: true, extraStats: []})

// Mounted Turrets
Class.autoTurret = makeTurret({
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret]),
                TYPE: "bullet",
            },
        },
    ],
}, {label: "Turret", fov: 0.8, extraStats: []})
Class.droneAutoTurret = makeTurret({
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, g.overdrive]),
                TYPE: "bullet",
            },
        },
    ],
}, {label: "Turret", fov: 0.8, extraStats: []})
Class.autoSmasherTurret = makeTurret({
    GUNS: [
        {
            POSITION: [20, 6, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, { speed: 1.2 }, g.machineGun, g.pounder, { reload: 0.75 }, { reload: 0.75 }]),
                TYPE: "bullet",
                STAT_CALCULATOR: "fixedReload",
            },
        },
        {
            POSITION: [20, 6, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, { speed: 1.2 }, g.machineGun, g.pounder, { reload: 0.75 }, { reload: 0.75 }]),
                TYPE: "bullet",
                STAT_CALCULATOR: "fixedReload",
            },
        },
    ],
}, {label: "Turret", fov: 0.8, extraStats: []})
Class.pillboxTurret = makeTurret({
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            POSITION: [22, 11, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.turret, g.power, g.autoTurret, { density: 0.1 }]),
                TYPE: "bullet",
            },
        },
    ],
}, {extraStats: []})
Class.autoSmasherMissileTurret = makeTurret({
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            POSITION: [19, 6, 1, 0, 4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter, g.power, g.turret]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 6, 1, 0, -4.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter, g.power, g.turret]),
                TYPE: "bullet"
            }
        }
    ],
}, {fov: 5, independent: true, aiSettings: {SKYNET: true, BLIND: true}, extraStats: []})
Class.legionaryTwin = makeTurret({
    GUNS: [
        {
            POSITION: [18, 7, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter, g.power, g.turret, {reload: 0.85}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 7, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter, g.power, g.turret, {reload: 0.85}]),
                TYPE: "bullet"
            }
        }
    ],
}, {fov: 5, independent: true, extraStats: []})

// Healer turrets
Class.sanctuaryHealer = {
    PARENT: "genericTank",
    LABEL: "",
    COLOR: "grey",
    BODY: {
        FOV: base.FOV * 1.2,
    },
    FACING_TYPE: ["spin", { speed: -0.05 }],
    TURRETS: [{ 
        POSITION: { SIZE: 13, LAYER: 1 },
        TYPE: ['healerSymbol', { FACING_TYPE: ["noFacing", { angle: Math.PI / 2 }] }]
    }],
}
Class.surgeonPillboxTurret = {
    PARENT: "genericTank",
    LABEL: "",
    COLOR: "grey",
    HAS_NO_RECOIL: true,
    FACING_TYPE: ["spin", { speed: 0.08 }],
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        },
    ],
    GUNS: weaponArray({
        POSITION: [17, 11, 1, 0, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.minionGun, g.turret, g.power, g.autoTurret, { density: 0.1 }]),
            TYPE: "healerBullet",
            AUTOFIRE: true,
        },
    }, 2, 0.5)
}

// Miscellaneous
Class.baseSwarmTurret = makeTurret({
    GUNS: [
        {
            POSITION: [5, 4.5, 0.6, 7, 2, 0, 0.15],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.baseProtector]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        },
        {
            POSITION: [5, 4.5, 0.6, 7, -2, 0, 0.15],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.baseProtector]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        },
        {
            POSITION: [5, 4.5, 0.6, 7.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.baseProtector]),
                TYPE: ["swarm", { INDEPENDENT: true, AI: { LIKES_SHAPES: true }}],
                STAT_CALCULATOR: "swarm",
            },
        },
    ],
}, {label: "Protector", independent: true, aiSettings: {NO_LEAD: true, LIKES_SHAPES: true}})
Class.antiTankMachineGunArm = {
    PARENT: "genericTank",
    COLOR: "grey",
    CONTROLLERS: ["mapTargetToGoal"],
    SKILL_CAP: Array(10).fill(255),
    SKILL: Array(10).fill(255),
    GUNS: [
        {
            POSITION: [14.25, 3, 1, 0, -2, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op, {recoil: 0, spray: 0.1}]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14.25, 3, 1, 0, 2, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op, {recoil: 0, spray: 0.1}]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15.85, 3, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op, {recoil: 0, spray: 0.1}]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [5, 8.5, -1.6, 6.25, 0, 0, 0],
        },
    ],
}
Class.tracker3gun = makeTurret({
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0]
        },
        {
            POSITION: [10, 10, -2, 20, 0, 0, 0]
        }
    ]
}, {canRepel: true, limitFov: true, fov: 3})

// Decorations
Class.overdriveDeco = makeDeco(4)
Class.mendersymbol = makeDeco(3)
Class.assemblerEffect = {
    PARENT: "bullet",
    MOTION_TYPE: 'assembler',
    LABEL: '',
    BODY: {
        DAMAGE: 0,
        RANGE: 10
    },
    ALPHA: 0.8
}
Class.assemblerDot = {
    LABEL: '',
    SHAPE: -4,
    COLOR: "darkGrey",
    INDEPENDENT: true
}
Class.healerSymbol = {
    SHAPE: [[0.3, -0.3],[1,-0.3],[1,0.3],[0.3,0.3],[0.3,1],[-0.3,1],[-0.3,0.3],[-1,0.3],[-1,-0.3],[-0.3,-0.3],[-0.3,-1],[0.3,-1]],
    SIZE: 13,
    COLOR: "red",
}

// Bodies
Class.smasherBody = {
    LABEL: "",
    FACING_TYPE: ["spin", { speed: 0.1 }],
    COLOR: "black",
    SHAPE: 6,
    INDEPENDENT: true
}
Class.landmineBody = {
    LABEL: "",
    FACING_TYPE: ["spin", { speed: 0.1 }],
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true
}
Class.spikeBody = {
    PARENT: "smasherBody",
    SHAPE: 3
}
Class.dominationBody = {
    LABEL: "",
    FACING_TYPE: ["noFacing", { angle: Math.PI / 2 }],
    COLOR: "black",
    SHAPE: 6,
    INDEPENDENT: true
}
