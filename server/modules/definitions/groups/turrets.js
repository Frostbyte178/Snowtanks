const { combineStats, makeDeco } = require('../facilitators.js');
const { gunCalcNames, base } = require('../constants.js');
const g = require('../gunvals.js');

// Auto Guns
Class.autoTankGun = {
    PARENT: "genericTank",
    LABEL: "",
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.bansheegun = {
    PARENT: "autoTankGun",
    BODY: {
        FOV: 2,
    },
    INDEPENDENT: true,
    GUNS: [
        {
            POSITION: [26, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret, { reload: 1.5 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.auto4gun = {
    PARENT: "autoTankGun",
    BODY: {
        FOV: 2,
    },
    GUNS: [
        {
            POSITION: [16, 4, 1, 0, -3.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 4, 1, 0, 3.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.bigauto4gun = {
    PARENT: "auto4gun",
    GUNS: [
        {
            POSITION: [14, 5, 1, 0, -4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.twin, g.power, { reload: 2 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 5, 1, 0, 4.5, 0, 0.33],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.twin, g.power, { reload: 2 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 5, 1, 0, 0, 0, 0.67],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.twin, g.power, { reload: 2 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.megaAutoTankGun = {
    PARENT: "autoTankGun",
    BODY: {
        FOV: 2,
    },
    GUNS: [
        {
            POSITION: [22, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.autoTurret]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.architectGun = {
    PARENT: "autoTurret",
    LABEL: "",
    GUNS: [
        {
            POSITION: [20, 16, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 16, 1.1, 20, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.autoTurret]),
                TYPE: "setTrap",
                STAT_CALCULATOR: gunCalcNames.block
            },
        },
    ],
}

// Boss turrets
Class.trapTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ["nearestDifferentMaster", 'onlyAcceptInArc'],
    COLOR: "grey",
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [
        {
            POSITION: [16, 14, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 14, 1.8, 16, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowPower, { speed: 1.2 }, { reload: 2 }]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
};
Class.baseTrapTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    INDEPENDENT: true,
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [16, 14, 1, 0, 0, 0, 0],
        }, {
            POSITION: [4, 14, 1.8, 16, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowPower, g.pounder, g.destroyer, { reload: 0.5 }, g.hexaTrapper]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
                AUTOFIRE: true,
            },
        },
    ],
}
Class.terrestrialTrapTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    INDEPENDENT: true,
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [13, 14, 1, 0, 0, 0, 0],
        }, {
            POSITION: [4, 14, 1.8, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowPower, g.pounder, g.destroyer, { reload: 0.5 }, g.hexaTrapper]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
                AUTOFIRE: true,
            },
        },
    ],
}
let makeshottrapTurretProps = () => ({
    SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.shotgun, g.machineGun, { speed: 0.7, maxSpeed: 0.2, damage: 1.5, range: 0.6 }]),
    AUTOFIRE: true,
    TYPE: "shotTrapBox",
    STAT_CALCULATOR: gunCalcNames.block,
});
Class.shottrapTurret = {
    PARENT: "genericTank",
    LABEL: 'Turret',
    BODY: {
        FOV: 0,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster', 'onlyAcceptInArc'], 
    COLOR: "grey",
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ {
            POSITION: [ 4, 1.5, 1, 11, -3, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 4, 2,   1, 11,  3, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 4, 1.5, 1, 13,  0, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2,   1, 11,  1, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2,   1, 12, -1, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 1.5, 1, 11,  1, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2,   1, 13, -1, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2,5, 1, 13,  1, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2,   1, 13,  2, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2,   1, 13, -2, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2.5, 1, 13, -2, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2.5, 1, 13,  2, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2,   1, 13, -2, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 16, 14, -1.4,  0, 0, 0, 0 ], 
    }, {
            POSITION: [  6, 14,  1.6, 16, 0, 0, 0 ], PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.shotgun, g.machineGun, g.fake]),
                AUTOFIRE: true,
                TYPE: "bullet"
            }
    } ]
}
Class.machineTripleTurret = {
    PARENT: "genericTank",
    LABEL: "Machine Gun",
    BODY: { FOV: 2 },
    CONTROLLERS: [ ["spin", {speed: 0.04}] ],
    INDEPENDENT: true,
    COLOR: -1,
    GUNS: [
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.flankGuard]),
                TYPE: "bullet",
                AUTOFIRE: true,
            },
        }, {
            POSITION: [12, 10, 1.4, 8, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.flankGuard]),
                TYPE: "bullet",
                AUTOFIRE: true,
            },
        }, {
            POSITION: [12, 10, 1.4, 8, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.flankGuard]),
                TYPE: "bullet",
                AUTOFIRE: true,
            },
        },
    ],
};
Class.launcherTurret = {
    PARENT: "genericTank",
    LABEL: "Launcher",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [10, 9, 1, 9, 0, 0, 0],
        }, {
            POSITION: [17, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery]),
                TYPE: "minimissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
};
Class.skimmerTurret = {
    PARENT: "genericTank",
    LABEL: "Skimmer",
    BODY: { FOV: 2 * base.FOV },
    COLOR: -1,
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    GUNS: [
        {
            POSITION: [10, 14, -0.5, 9, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer]),
                TYPE: "hypermissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        }, {
            POSITION: [17, 15, 1, 0, 0, 0, 0],
        },
    ],
};
Class.kronosSkimmerTurret = {
    PARENT: "genericTank",
    LABEL: "Skimmer",
    BODY: { FOV: 10 },
    COLOR: "grey",
    INDEPENDENT: true,
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
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
}
Class.autosmashTurret = {
    PARENT: "genericTank",
    LABEL: "Launcher",
    BODY: { FOV: 10 },
    COLOR: "grey",
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    INDEPENDENT: true,
    GUNS: [
        {
            POSITION: [4, 12, 1.2, 16, 0, 0, 0],
        }, {
            POSITION: [18, 20, -0.7, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, { reload: 2 }, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }, {range: 2.5}]),
                TYPE: "autoSmasherMissile",
            },
        },
    ],
}
Class.twisterTurret = {
    PARENT: "genericTank",
    LABEL: "Twister",
    BODY: { FOV: 2 },
    COLOR: -1,
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    GUNS: [
        {
            POSITION: [10, 13, -0.5, 9, 0, 0, 0],
        }, {
            POSITION: [17, 14, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, { speed: 1.3, maxSpeed: 1.3 }, { reload: 4/3 }]),
                TYPE: "spinmissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
};
Class.hyperTwisterTurret = {
    PARENT: "genericTank",
    LABEL: "Twister",
    BODY: { FOV: 2 },
    COLOR: -1,
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    GUNS: [
        {
            POSITION: [10, 13, -0.5, 9, 0, 0, 0],
        }, {
            POSITION: [17, 14, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, { speed: 1.3, maxSpeed: 1.3 }, { reload: 4/3 }]),
                TYPE: "hyperspinmissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
};
Class.rocketeerTurret = {
    PARENT: "genericTank",
    LABEL: "Rocketeer",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [10, 12.5, -0.7, 10, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.launcher, g.rocketeer]),
                TYPE: "rocketeerMissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        }, {
            POSITION: [17, 18, 0.65, 0, 0, 0, 0],
        },
    ],
};
Class.boomerTurret = {
    PARENT: "genericTank",
    LABEL: "Boomer",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: -1,
    GUNS: [
        {
            POSITION: [7.75, 10, 1, 12, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.boomerang, g.fake]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [6, 10, -1.5, 7, 0, 0, 0],
        }, {
            POSITION: [2, 10, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.boomerang]),
                TYPE: "boomerang",
            },
        },
    ],
};
Class.triTrapGuardTurret = {
    PARENT: "genericTank",
    COLOR: -1,
    CONTROLLERS: [["spin", { independent: true }]],
    GUNS: [],
};
for(let i = 0; i < 3; i++) {
    Class.triTrapGuardTurret.GUNS.push(
        {
            POSITION: [17, 8, 1, 0, 0, 120*i, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 120*i+60, 0],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 120*i+60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    )
};
Class.eliteSpinnerCyclone = {
    PARENT: "genericTank",
    COLOR: -1,
    CONTROLLERS: [["spin", { speed: 0.1, independent: true }]],
    GUNS: [],
};
for (let i = 0; i < 12; i++) {
    let delay;
    switch (i % 4) {
        case 0:
            delay = 0;
            break;
        case 1:
            delay = 0.5;
            break;
        case 2:
            delay = 0.25;
            break;
        case 3:
            delay = 0.75;
            break;
    }
    Class.eliteSpinnerCyclone.GUNS.push(
        {
            POSITION: [15, 3.5, 1, 0, 0, 30 * i, delay],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: "bullet",
            },
        },
    )
};
Class.barricadeTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ["nearestDifferentMaster"],
    COLOR: "grey",
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 8, 1.3, 22, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.minigun, { range: 0.5 }]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [4, 8, 1.3, 18, 0, 0, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.minigun, { range: 0.5 }]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [4, 8, 1.3, 14, 0, 0, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.minigun, { range: 0.5 }]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
};
Class.artilleryAutoTankgun = {
    PARENT: "genericTank",
    LABEL: "Artillery",
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: "grey",
    GUNS: [{
        POSITION: [17, 3, 1, 0, -6, -7, 0.25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, { reload: 0.5 }]),
            TYPE: "bullet",
            LABEL: "Secondary",
        },
    },
        {
            POSITION: [17, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, { reload: 0.5 }]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, { reload: 0.5 }]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
}
Class.artilleryTurret = { // This one has half the dps of the one above
    PARENT: "genericTank",
    LABEL: "Artillery",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [17, 3, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        }, {
            POSITION: [17, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        }, {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
};
Class.legionaryTwin = {
    PARENT: "auto4gun",
    COLOR: "grey",
    INDEPENDENT: true,
    GUNS: [
        {
            POSITION: [17.5, 5, 1, 0, -4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [17.5, 5, 1, 0, 4.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.nailgunTurret = {
    PARENT: "genericTank",
    LABEL: "Nailgun",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [{
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 2, 1, 0, -2.5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.nailgun]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [19, 2, 1, 0, 2.5, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.nailgun]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [20, 2, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.nailgun]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [5.5, 7, -1.8, 6.5, 0, 0, 0],
        },
    ],
};
Class.crowbarTurret = {
    PARENT: "genericTank",
    COLOR: "grey",
    LABEL: "Crowbar",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [37, 6.5, 1, 0, 0, 0, 0],
        }, {
            POSITION: [5, 8.5, -1.5, 8, 0, 0, 0],
        },
    ],
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 38, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        }, {
            POSITION: [6, 28, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        }, {
            POSITION: [6, 18, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        },
    ],
};
Class.wrenchTurret = {
    PARENT: "genericTank",
    COLOR: "grey",
    LABEL: "Wrench",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    GUNS: [{
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [67, 6.5, 1, 0, 0, 0, 0],
        }, {
            POSITION: [5, 8.5, -1.5, 8, 0, 0, 0],
        },
    ],
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 68, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        }, {
            POSITION: [6, 58, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        }, {
            POSITION: [6, 48, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        },
    ],
};
Class.protoSwarmerTurret = {
    PARENT: "genericTank",
    LABEL: "Swarmer",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
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
}
Class.swarmTurret = {
    PARENT: "genericTank",
    LABEL: "Swarm",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: ["swarm", {INDEPENDENT: true}],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
Class.napoleonLowerTurret = {
    PARENT: "genericTank",
    LABEL: "",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [8, 8, 0.6, 6, 0, 30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, g.pounder, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: ["bee", { INDEPENDENT: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [8, 8, 0.6, 6, 0, -30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, g.pounder, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: ["bee", { INDEPENDENT: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
Class.genghisLowerTurret = {
    PARENT: "genericTank",
    LABEL: "",
    MAX_CHILDREN: 4,
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
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
};

Class.cruiserTurret = {
    PARENT: "genericTank",
    LABEL: "Cruiser",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
Class.carrierTurret = {
    PARENT: "genericTank",
    LABEL: "Carrier",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    INDEPENDENT: true,
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [7, 8, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship, g.carrier, g.pounder, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [7, 8, 0.6, 7, 2, 30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship, g.carrier, g.pounder, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [7, 8, 0.6, 7, -2, -30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship, g.carrier, g.pounder, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
Class.gunnerCruiserTurret = {
    PARENT: "genericTank",
    LABEL: "Launcher",
    BODY: { FOV: 10 },
    COLOR: "grey",
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    INDEPENDENT: true,
    GUNS: [
        {
            POSITION: [4, 7.5, 0.6, 6, 4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [4, 7.5, 0.6, 6, -4.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
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
}
Class.juliusLowerTurret = {
    PARENT: "genericTank",
    LABEL: "",
    MAX_CHILDREN: 3,
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [8.5, 11, 0.6, 6, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.sunchip]),
                TYPE: "minichip",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
Class.swarmerTurret = {
    PARENT: "genericTank",
    LABEL: "Swarmer",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [14, 14, -1.2, 5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.hive]),
                TYPE: "hive",
            },
        }, {
            POSITION: [15, 12, 1, 5, 0, 0, 0],
        },
    ],
};
Class.basicTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [16, 4, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.napoleonUpperTurret = {
    PARENT: "genericTank",
    LABEL: "",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
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
};

// Mounted Turrets
Class.autoTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    COLOR: "grey",
    BODY: {
        FOV: 0.8,
    },
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.droneAutoTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    COLOR: "grey",
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'],
    BODY: {
        FOV: 0.8,
    },
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, g.overdrive]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.autoSmasherTurret = {
    PARENT: "autoTurret",
    GUNS: [
        {
            POSITION: [20, 6, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, { speed: 1.2 }, g.machineGun, g.pounder, { reload: 0.75 }, { reload: 0.75 }]),
                TYPE: "bullet",
                STAT_CALCULATOR: gunCalcNames.fixedReload,
            },
        },
        {
            POSITION: [20, 6, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, { speed: 1.2 }, g.machineGun, g.pounder, { reload: 0.75 }, { reload: 0.75 }]),
                TYPE: "bullet",
                STAT_CALCULATOR: gunCalcNames.fixedReload,
            },
        },
    ],
}
Class.pillboxTurret = {
    PARENT: "autoTurret",
    LABEL: "",
    BODY: {
        FOV: 2,
    },
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
}
Class.tripletTurret = {
    PARENT: "genericTank",
    LABEL: "Triplet",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    INDEPENDENT: true,
    COLOR: "grey",
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
}

// Healer turrets
Class.sanctuaryHealer = {
    PARENT: "genericTank",
    LABEL: "",
    COLOR: "grey",
    BODY: {
        FOV: base.FOV * 1.2,
    },
    CONTROLLERS: [["spin", { independent: true, speed: -0.05 }]],
    TURRETS: [{ 
        POSITION: { SIZE: 13, LAYER: 1 },
        TYPE: ['healerSymbol', { CONTROLLERS: [["spin", { startAngle: Math.PI / 2, speed: 0, independent: true }]] }]
    }],
};
Class.surgeonPillboxTurret = {
    PARENT: "genericTank",
    LABEL: "",
    COLOR: "grey",
    BODY: {
        FOV: 3,
    },
    HAS_NO_RECOIL: true,
    CONTROLLERS: [["spin", { independent: true, speed: 0.08 }]],
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        },
    ],
    GUNS: [
        {
            POSITION: [17, 11, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.minionGun, g.turret, g.power, g.autoTurret, { density: 0.1 }]),
                TYPE: "healerBullet",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [14, 11, 1, 0, 0, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.minionGun, g.turret, g.power, g.autoTurret, { density: 0.1 }]),
                TYPE: "healerBullet",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [17, 11, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.minionGun, g.turret, g.power, g.autoTurret, { density: 0.1 }]),
                TYPE: "healerBullet",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [14, 11, 1, 0, 0, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.minionGun, g.turret, g.power, g.autoTurret, { density: 0.1 }]),
                TYPE: "healerBullet",
                AUTOFIRE: true,
            },
        },
    ],
}

// Miscellaneous
Class.baseSwarmTurret = {
    PARENT: "genericTank",
    LABEL: "Protector",
    COLOR: "grey",
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: ["nearestDifferentMaster"],
    AI: {
        NO_LEAD: true,
        LIKES_SHAPES: true,
    },
    INDEPENDENT: true,
    GUNS: [
        {
            POSITION: [5, 4.5, 0.6, 7, 2, 0, 0.15],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.baseProtector]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4.5, 0.6, 7, -2, 0, 0.15],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.baseProtector]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4.5, 0.6, 7.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.baseProtector]),
                TYPE: ["swarm", { INDEPENDENT: true, AI: { LIKES_SHAPES: true }}],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
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
Class.tracker3gun = {
    PARENT: "genericTank",
    LABEL: "",
    COLOR: "timeGem",
    BODY: {
        FOV: 3
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster"
    ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0]
        },
        {
            POSITION: [10, 10, -2, 20, 0, 0, 0]
        }
    ]
}

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
};

// Bodies
Class.smasherBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.1 }]],
    COLOR: "black",
    SHAPE: 6,
    INDEPENDENT: true
}
Class.landmineBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.2 }]],
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
    CONTROLLERS: [["spin", { startAngle: Math.PI / 2, speed: 0, independent: true }]],
    COLOR: "black",
    SHAPE: 6,
    INDEPENDENT: true
}
