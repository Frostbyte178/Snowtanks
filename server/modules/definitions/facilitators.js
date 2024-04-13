const { gunCalcNames } = require('./constants.js');
const { MAX_SKILL } = require("../../config.js");
const g = require('./gunvals.js');

let skcnv = {
    atk: 6,
    spd: 4,
    dam: 3,
    shi: 5,
    str: 2,
    mob: 9,
    rld: 0,
    pen: 1,
    rgn: 8,
    hlt: 7,
};

// GUN DEFINITIONS
exports.combineStats = function (stats) {
    try {
        // Build a blank array of the appropiate length
        let data = {
            reload: 1,
            recoil: 1,
            shudder: 1,
            size: 1,
            health: 1,
            damage: 1,
            pen: 1,
            speed: 1,
            maxSpeed: 1,
            range: 1,
            density: 1,
            spray: 1,
            resist: 1
        };

        for (let object = 0; object < stats.length; object++) {
            let gStat = stats[object];
            if (Array.isArray(gStat)) {
                gStat = {
                    reload: gStat[0], recoil: gStat[1], shudder: gStat[2],
                    size: gStat[3], health: gStat[4], damage: gStat[5],
                    pen: gStat[6], speed: gStat[7], maxSpeed: gStat[8],
                    range: gStat[9], density: gStat[10], spray: gStat[11],
                    resist: gStat[12]
                };
            }
            data.reload *= gStat.reload ?? 1;
            data.recoil *= gStat.recoil ?? 1;
            data.shudder *= gStat.shudder ?? 1;
            data.size *= gStat.size ?? 1;
            data.health *= gStat.health ?? 1;
            data.damage *= gStat.damage ?? 1;
            data.pen *= gStat.pen ?? 1;
            data.speed *= gStat.speed ?? 1;
            data.maxSpeed *= gStat.maxSpeed ?? 1;
            data.range *= gStat.range ?? 1;
            data.density *= gStat.density ?? 1;
            data.spray *= gStat.spray ?? 1;
            data.resist *= gStat.resist ?? 1;
        }
        return data;
    } catch (err) {
        console.log(err);
        console.log(JSON.stringify(stats));
    }
};
exports.setBuild = (build) => {
    let skills = build.split(build.includes("/") ? "/" : "").map((r) => +r);
    if (skills.length !== 10)
        throw new RangeError("Build must be made up of 10 numbers");
    return [6, 4, 3, 5, 2, 9, 0, 1, 8, 7].map((r) => skills[r]);
};
exports.skillSet = (args) => {
    let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let s in args) {
        if (!args.hasOwnProperty(s)) continue;
        skills[skcnv[s]] = Math.round(MAX_SKILL * args[s]);
    }
    return skills;
};

// FUNCTIONS
exports.dereference = type => {
    let output = JSON.parse(JSON.stringify(type));
    if (type.GUNS) {
        for (let i = 0; i < type.GUNS.length; i++) {
            if (output.GUNS[i].PROPERTIES) {
                output.GUNS[i].PROPERTIES.TYPE = type.GUNS[i].PROPERTIES.TYPE;
            }
        }
    }
    if (type.TURRETS) {
        for (let i = 0; i < type.TURRETS.length; i++) {
            output.TURRETS[i].TYPE = type.TURRETS[i].TYPE;
        }
    }
    for (let key in output) {
        if (key.startsWith('UPGRADES_TIER_')) {
            delete output[key];
        }
    }
    return output;
}

// CANNON FUNCTIONS
exports.makeGuard = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type),
    cannons = [{
        POSITION: [13, 8, 1, 0, 0, 180, 0],
    }, {
        POSITION: [4, 8, 1.7, 13, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.trap]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }];
    output.GUNS = type.GUNS == null ? cannons : type.GUNS.concat(cannons);
    output.LABEL = name == -1 ? type.LABEL + " Guard" : name;
    return output;
}
exports.makeConq = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type),
    cannons = [{
        POSITION: [18, 14, 1, 0, 0, 180, 0],
    }, {
        POSITION: [2, 14, 1.1, 18, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.trap, g.setTrap]),
            TYPE: "setTrap",
            STAT_CALCULATOR: gunCalcNames.block
        },
    }];
    output.GUNS = type.GUNS == null ? cannons : type.GUNS.concat(cannons);
    output.LABEL = name == -1 ? type.LABEL + " Conqueror" : name;
    return output;
}
exports.makeSplit = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);
    let cannons = [{
        POSITION: [18, 8, 1, 0, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.basic, g.flankGuard]),
            TYPE: "bullet",
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.basic, g.flankGuard]),
            TYPE: "bullet",
        },
    }];
    output.GUNS = type.GUNS == null ? cannons : type.GUNS.concat(cannons);
    output.LABEL = name == -1 ? "Split " + type.LABEL : name;
    return output;
}
exports.addBackGunner = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);
    let cannons = [{
        POSITION: [19, 2, 1, 0, -2.5, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.basic, g.pelleter, g.power, g.twin, { recoil: 4 }, { recoil: 1.8 }]),
            TYPE: "bullet",
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 180, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.basic, g.pelleter, g.power, g.twin, { recoil: 4 }, { recoil: 1.8 }]),
            TYPE: "bullet",
        },
    }, {
        POSITION: [12, 11, 1, 0, 0, 180, 0],
    }];
    output.GUNS = type.GUNS == null ? cannons : type.GUNS.concat(cannons);
    output.LABEL = name == -1 ? type.LABEL : name;
    return output;
}
exports.makeMulti = (type, count, name = -1, startRotation = 0) => {
    type = ensureIsClass(type);
    let greekNumbers = ',Double ,Triple ,Quad ,Penta ,Hexa ,Septa ,Octo ,Nona ,Deca ,Hendeca ,Dodeca ,Trideca ,Tetradeca ,Pentadeca ,Hexadeca ,Septadeca ,Octadeca ,Nonadeca ,Icosa ,Henicosa ,Doicosa ,Triaicosa ,Tetraicosa ,Pentaicosa ,Hexaicosa ,Septaicosa ,Octoicosa ,Nonaicosa ,Triaconta '.split(','),
        output = exports.dereference(type),
        fraction = 360 / count;
    output.GUNS = [];
    for (let gun of type.GUNS) {
        for (let i = 0; i < count; i++) {
            let newgun = exports.dereference(gun);
            if (Array.isArray(newgun.POSITION)) {
                newgun.POSITION[5] += startRotation + fraction * i;
            } else {
                newgun.POSITION.ANGLE = (newgun.POSITION.ANGLE ?? 0) + startRotation + fraction * i;
            }
            if (gun.PROPERTIES) newgun.PROPERTIES = gun.PROPERTIES;
            output.GUNS.push(newgun);
        };
    }
    output.LABEL = name == -1 ? (greekNumbers[count - 1] || (count + ' ')) + type.LABEL : name;
    return output;
}
exports.makeBird = (type, name = -1, frontRecoilFactor = 1, backRecoilFactor = 1, color) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);
    // Thrusters
    let backRecoil = 0.5 * backRecoilFactor;
    let thrusterProperties = { SHOOT_SETTINGS: exports.combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster, { recoil: backRecoil }]), TYPE: "bullet", LABEL: gunCalcNames.thruster };
    let shootyBois = [{
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: thrusterProperties
        }, {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: thrusterProperties
        }, {
            POSITION: [18, 8, 1, 0, 0, 180, 0.6],
            PROPERTIES: thrusterProperties
        }];
    // Assign thruster color
    if (color) for (let gun of shootyBois) {
        gun.PROPERTIES.TYPE = [gun.PROPERTIES.TYPE, { COLOR: color }];
    }

    // Modify front barrels
    for (let gun of output.GUNS) {
        if (gun.PROPERTIES) {
            gun.PROPERTIES.ALT_FIRE = true;
            // Nerf front barrels
            if (gun.PROPERTIES.SHOOT_SETTINGS) {
                gun.PROPERTIES.SHOOT_SETTINGS = exports.combineStats([gun.PROPERTIES.SHOOT_SETTINGS, g.flankGuard, g.triAngle, g.triAngleFront, {recoil: frontRecoilFactor}]);
            }
        }
    }
    // Assign misc settings
    if (output.FACING_TYPE == "locksFacing") output.FACING_TYPE = "toTarget";
    output.GUNS = type.GUNS == null ? [...shootyBois] : [...output.GUNS, ...shootyBois];
    output.LABEL = name == -1 ? "Bird " + type.LABEL : name;
    return output;
}

// SPAWNER FUNCTIONS
exports.makeHybrid = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);
    let spawner = {
        POSITION: [6, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.drone, g.weak]),
            TYPE: ["drone", { INDEPENDENT: true }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 3,
        },
    };
    output.GUNS = type.GUNS == null ? [spawner] : type.GUNS.concat([spawner]);
    output.LABEL = name == -1 ? "Hybrid " + type.LABEL : name;
    return output;
}
exports.makeOver = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);
    let spawners = [{
        POSITION: [6, 12, 1.2, 8, 0, 125, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.drone, g.overseer]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 235, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.drone, g.overseer]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3,
        },
    }];
    output.GUNS = type.GUNS == null ? spawners : type.GUNS.concat(spawners);
    output.LABEL = name == -1 ? "Over" + type.LABEL.toLowerCase() : name;
    return output;
}
exports.makeOversplit = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);
    let spawners = [{
        POSITION: [6, 12, 1.2, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.drone, g.overseer]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.drone, g.overseer]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3,
        },
    }];
    output.GUNS = type.GUNS == null ? spawners : type.GUNS.concat(spawners);
    output.LABEL = name == -1 ? "Over" + type.LABEL.toLowerCase() : name;
    return output;
}
exports.makeBattle = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);
    let spawner1 = {
        POSITION: [7, 7.5, 0.6, 7, 4, 125, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.swarm]),
            TYPE: "swarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    };
    let spawner2 = {
        POSITION: [7, 7.5, 0.6, 7, -4, 125, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.swarm]),
            TYPE: "swarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    };
    let spawner3 = {
        POSITION: [7, 7.5, 0.6, 7, 4, 235, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.swarm]),
            TYPE: "swarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    };
    let spawner4 = {
        POSITION: [7, 7.5, 0.6, 7, -4, 235, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.swarm]),
            TYPE: "swarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    };
    if (type.TURRETS != null) {
        output.TURRETS = type.TURRETS;
    }
    if (type.GUNS == null) {
        output.GUNS = [spawner1, spawner2, spawner3, spawner4];
    } else {
        output.GUNS = [...type.GUNS, spawner1, spawner2, spawner3, spawner4];
    }
    if (name == -1) {
        output.LABEL = "Battle" + type.LABEL.toLowerCase();
    } else {
        output.LABEL = name;
    }
    return output;
}
exports.makeCap = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);
    let spawner1 = {
        POSITION: [4.5, 10, 1, 10.5, 0, 125, 0],
    };
    let spawner2 = {
        POSITION: [1, 12, 1, 15, 0, 125, 0],
        PROPERTIES: {
            MAX_CHILDREN: 4,
            SHOOT_SETTINGS: exports.combineStats([g.factory, g.babyfactory]),
            TYPE: "minion",
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    };
    let spawner3 = {
        POSITION: [11.5, 12, 1, 0, 0, 125, 0],
    };
    let spawner4 = {
        POSITION: [4.5, 10, 1, 10.5, 0, 235, 0],
    };
    let spawner5 = {
        POSITION: [1, 12, 1, 15, 0, 235, 0],
        PROPERTIES: {
            MAX_CHILDREN: 4,
            SHOOT_SETTINGS: exports.combineStats([g.factory, g.babyfactory]),
            TYPE: "minion",
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    };
    let spawner6 = {
        POSITION: [11.5, 12, 1, 0, 0, 235, 0],
    };
    if (type.TURRETS != null) {
        output.TURRETS = type.TURRETS;
    }
    if (type.GUNS == null) {
        output.GUNS = [spawner1, spawner2, spawner3, spawner4, spawner5, spawner6];
    } else {
        output.GUNS = [
            ...type.GUNS,
            spawner1,
            spawner2,
            spawner3,
            spawner4,
            spawner5,
            spawner6,
        ];
    }
    if (name == -1) {
        output.LABEL = "Cap" + type.LABEL.toLowerCase();
    } else {
        output.LABEL = name;
    }
    return output;
}
exports.makeCross = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);
    let spawner1 = {
        POSITION: [6, 12, 1.2, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.drone, g.overseer]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2,
        },
    };
    let spawner2 = {
        POSITION: [6, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.drone, g.overseer]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2,
        },
    };
    let spawner3 = {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.drone, g.overseer]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2,
        },
    };
    if (type.TURRETS != null) {
        output.TURRETS = type.TURRETS;
    }
    if (type.GUNS == null) {
        output.GUNS = [spawner1, spawner2, spawner3];
    } else {
        output.GUNS = [...type.GUNS, spawner1, spawner2, spawner3];
    }
    if (name == -1) {
        output.LABEL = "Cross-" + type.LABEL;
    } else {
        output.LABEL = name;
    }
    return output;
}
exports.makeSwarming = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);
    let spawner = {
        POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.swarm]),
            TYPE: "autoswarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    };
    if (type.TURRETS != null) {
        output.TURRETS = type.TURRETS;
    }
    if (type.GUNS == null) {
        output.GUNS = [spawner];
    } else {
        output.GUNS = [...type.GUNS, spawner];
    }
    if (name == -1) {
        output.LABEL = "Swarming " + type.LABEL;
    } else {
        output.LABEL = name;
    }
    return output;
}
exports.makeBiSwarming = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);
    let spawner1 = {
        POSITION: [7, 7.5, 0.6, 7, 0, 25, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.swarm]),
            TYPE: "autoswarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    };
    let spawner2 = {
        POSITION: [7, 7.5, 0.6, 7, 0, -25, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.swarm]),
            TYPE: "autoswarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    };
    if (type.TURRETS != null) {
        output.TURRETS = type.TURRETS;
    }
    if (type.GUNS == null) {
        output.GUNS = [spawner1, spawner2];
    } else {
        output.GUNS = [...type.GUNS, spawner1, spawner2];
    }
    if (name == -1) {
        output.LABEL = "Bi-Swarming " + type.LABEL;
    } else {
        output.LABEL = name;
    }
    return output;
}
exports.makeTriSwarming = (type, name = -1) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);
    let spawner1 = {
        POSITION: [7, 7.5, 0.6, 7, 0, 45, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.swarm]),
            TYPE: "autoswarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    };
    let spawner2 = {
        POSITION: [7, 7.5, 0.6, 7, 0, -45, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.swarm]),
            TYPE: "autoswarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    };
    let spawner3 = {
        POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.swarm]),
            TYPE: "autoswarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    };
    if (type.TURRETS != null) {
        output.TURRETS = type.TURRETS;
    }
    if (type.GUNS == null) {
        output.GUNS = [spawner1, spawner2, spawner3];
    } else {
        output.GUNS = [...type.GUNS, spawner1, spawner2, spawner3];
    }
    if (name == -1) {
        output.LABEL = "Tri-Swarming " + type.LABEL;
    } else {
        output.LABEL = name;
    }
    return output;
}

// AUTO FUNCTIONS
exports.makeAuto = (type, name = -1, options = {}) => {
    type = ensureIsClass(type);
    let turret = {
        type: "autoTurret",
        size: 10,
        independent: true,
        color: 16,
        angle: 180,
    };
    if (options.type != null) {
        turret.type = options.type;
    }
    if (options.size != null) {
        turret.size = options.size;
    }
    if (options.independent != null) {
        turret.independent = options.independent;
    }
    if (options.color != null) {
        turret.color = options.color;
    }
    if (options.angle != null) {
        turret.angle = options.angle;
    }
    let output = exports.dereference(type);
    let autogun = {
        POSITION: [turret.size, 0, 0, turret.angle, 360, 1],
        TYPE: [
            turret.type,
            {
                CONTROLLERS: ["nearestDifferentMaster"],
                INDEPENDENT: turret.independent,
                COLOR: turret.color,
            },
        ],
    };
    if (type.GUNS != null) {
        output.GUNS = type.GUNS;
    }
    if (type.TURRETS == null) {
        output.TURRETS = [autogun];
    } else {
        output.TURRETS = [...type.TURRETS, autogun];
    }
    if (name == -1) {
        output.LABEL = "Auto-" + type.LABEL;
    } else {
        output.LABEL = name;
    }
    output.DANGER = type.DANGER + 1;
    return output;
}
exports.makeCeption = (type, name = -1, options = {}) => {
    type = ensureIsClass(type);
    let turret = {
        type: "autoTurret",
        size: 12.5,
        independent: true,
    };
    if (options.type != null) {
        turret.type = options.type;
    }
    if (options.size != null) {
        turret.size = options.size;
    }
    if (options.independent != null) {
        turret.independent = options.independent;
    }
    let output = exports.dereference(type);
    let autogun = {
        POSITION: [turret.size, 0, 0, 180, 360, 1],
        TYPE: [
            type,
            {
                CONTROLLERS: ["nearestDifferentMaster"],
                INDEPENDENT: turret.independent,
            },
        ],
    };
    if (type.GUNS != null) {
        output.GUNS = type.GUNS;
    }
    if (type.TURRETS == null) {
        output.TURRETS = [autogun];
    } else {
        output.TURRETS = [...type.TURRETS, autogun];
    }
    if (name == -1) {
        output.LABEL = type.LABEL + "-Ception";
    } else {
        output.LABEL = name;
    }
    output.DANGER = type.DANGER + 1;
    return output;
}
exports.makeDeco = (shape = 0, color = 16) => {
    return {
        PARENT: "genericTank",
        SHAPE: shape,
        COLOR: color,
    };
}
exports.addAura = (damageFactor = 1, sizeFactor = 1, opacity = 0.3, auraColor) => {
    let isHeal = damageFactor < 0;
    let auraType = isHeal ? "healAura" : "aura";
    let symbolType = isHeal ? "healerSymbol" : "auraSymbol";
    auraColor = auraColor ?? (isHeal ? 12 : 0);
    return {
        PARENT: ["genericTank"],
        INDEPENDENT: true,
        LABEL: "",
        COLOR: 17,
        GUNS: [
            {
                POSITION: [0, 20, 1, 0, 0, 0, 0,],
                PROPERTIES: {
                    SHOOT_SETTINGS: exports.combineStats([g.aura, { size: sizeFactor, damage: damageFactor }]),
                    TYPE: [auraType, {COLOR: auraColor, ALPHA: opacity}],
                    MAX_CHILDREN: 1,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                }, 
            }, 
        ],
        TURRETS: [
            {
                POSITION: [20 - 7.5 * isHeal, 0, 0, 0, 360, 1],
                TYPE: [symbolType, {COLOR: auraColor, INDEPENDENT: true}],
            },
        ]
    };
}

class LayeredBoss {
    constructor(identifier, NAME, PARENT = "celestial", SHAPE = 9, COLOR = 0, trapTurretType = "baseTrapTurret", trapTurretSize = 6.5, layerScale = 5, BODY, SIZE, VALUE) {
        this.identifier = identifier ?? NAME.charAt(0).toLowerCase() + NAME.slice(1);
        this.layerID = 0;
        Class[this.identifier] = {
            PARENT, SHAPE, NAME, COLOR, BODY, SIZE, VALUE,
            UPGRADE_LABEL: NAME,
            UPGRADE_COLOR: COLOR,
            TURRETS: Array(SHAPE).fill().map((_, i) => ({
                POSITION: [trapTurretSize, 9, 0, 360 / SHAPE * (i + 0.5), 180, 0],
                TYPE: trapTurretType,
            })),
        };
        this.layerScale = layerScale;
        this.shape = SHAPE;
        this.layerSize = 20;
    }

    addLayer({gun, turret}, decreaseSides = true, layerScale, MAX_CHILDREN) {
        this.layerID++;
        this.shape -= decreaseSides ? 2 : 0;
        this.layerSize -= layerScale ?? this.layerScale;
        let layer = {
            PARENT: "genericTank",
            LABEL: "",
            SHAPE: this.shape,
            COLOR: -1,
            INDEPENDENT: true,
            CONTROLLERS: [["spin", { independent: true, speed: 0.02 / c.runSpeed * (this.layerID % 2 ? -1 : 1) }]],
            MAX_CHILDREN, 
            GUNS: [],
            TURRETS: [],
        };
        if (gun) {
            for (let i = 0; i < this.shape; i++) {
                layer.GUNS.push({
                    POSITION: gun.POSITION.map(n => n ?? 360 / this.shape * (i + 0.5)),
                    PROPERTIES: gun.PROPERTIES,
                });
            }
        }
        if (turret) {
            for (let i = 0; i < this.shape; i++) {
                layer.TURRETS.push({
                    POSITION: turret.POSITION.map(n => n ?? 360 / this.shape * (i + 0.5)),
                    TYPE: turret.TYPE,
                });
            }
        }

        Class[this.identifier + "Layer" + this.layerID] = layer;
        Class[this.identifier].TURRETS.push({
            POSITION: [this.layerSize, 0, 0, 0, 360, 1],
            TYPE: this.identifier + "Layer" + this.layerID,
        });
    }
}
exports.LayeredBoss = LayeredBoss;

//unfinished lolo
exports.makeLabyrinthShape = (type) => {
    let output = exports.dereference(type);
    let downscale = Math.max(output.SHAPE, 3);
    return output;
}
exports.menu = (name = -1, color = -1, shape = 0) => {
    let gun = {
        POSITION: [18, 10, -1.4, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: exports.combineStats([g.basic]),
            TYPE: "bullet",
        },
    };
    return {
        PARENT: "genericTank",
        LABEL: name == -1 ? undefined : name,
        GUNS: [gun],
        COLOR: color,
        UPGRADE_COLOR: color == -1 ? undefined : color,
        SHAPE: shape,
        IGNORED_BY_AI: true,
    };
}