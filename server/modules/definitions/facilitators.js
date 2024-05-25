const { gunCalcNames } = require('./constants.js')
const { MAX_SKILL } = require("../../config.js")
const g = require('./gunvals.js')
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
}

// gun definitions
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
        throw JSON.stringify(stats);
    }
}
exports.setBuild = (build) => {
    let skills = build.split(build.includes("/") ? "/" : "").map((r) => +r);
    if (skills.length !== 10)
        throw new RangeError("Build must be made up of 10 numbers");
    return [6, 4, 3, 5, 2, 9, 0, 1, 8, 7].map((r) => skills[r]);
}
exports.skillSet = (args) => {
    let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let s in args) {
        if (!args.hasOwnProperty(s)) continue;
        skills[skcnv[s]] = Math.round(MAX_SKILL * args[s]);
    }
    return skills;
}

// functions
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

// gun functions
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
exports.makeBird = (type, name = -1, options = {}) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);
    let frontRecoilFactor = options.frontRecoil ?? 1;
    let backRecoilFactor = options.frontRecoil ?? 1;
    let color = options.frontRecoil;
    let superBird = options.super ?? false;

    // Thrusters
    let backRecoil = 0.5 * backRecoilFactor;
    let thrusterProperties = { SHOOT_SETTINGS: exports.combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster, { recoil: backRecoil }]), TYPE: "bullet", LABEL: gunCalcNames.thruster };
    let shootyBois = [{
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: thrusterProperties
        }, {
            POSITION: [16, 8, 1, 0, 0, -150, 0.1],
            PROPERTIES: thrusterProperties
        }, {
            POSITION: [18, 8, 1, 0, 0, 180, 0.6],
            PROPERTIES: thrusterProperties
        }];
    if (superBird) {
        shootyBois.splice(0, 0, {
            POSITION: [14, 8, 1, 0, 0, 130, 0.6],
            PROPERTIES: thrusterProperties
        }, {
            POSITION: [14, 8, 1, 0, 0, -130, 0.6],
            PROPERTIES: thrusterProperties
        })
    }
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

// drone functions
exports.makeOver = (type, name = -1, options = {}) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);

    let angle = 180 - (options.angle ?? 125);
    let count = options.count ?? 2;
    let independent = options.independent ?? false;
    let cycle = options.cycle ?? true;
    let maxChildren = options.maxDrones ?? 3;
    let stats = options.extraStats ?? [];
    let spawnerProperties = {
        SHOOT_SETTINGS: exports.combineStats([g.drone, g.overseer, ...stats]),
        TYPE: ["drone", {INDEPENDENT: independent}],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.drone,
        WAIT_TO_CYCLE: cycle,
        MAX_CHILDREN: maxChildren,
    };

    let spawners = [];
    if (count % 2 == 1) {
        spawners.push({
            POSITION: [6, 12, 1.2, 8, 0, 180, 0],
            PROPERTIES: spawnerProperties,
        })
    }
    for (let i = 2; i <= (count - count % 2); i += 2) {
        spawners.push({
            POSITION: [6, 12, 1.2, 8, 0, 180 - angle * i / 2, 0],
            PROPERTIES: spawnerProperties,
        }, {
            POSITION: [6, 12, 1.2, 8, 0, 180 + angle * i / 2, 0],
            PROPERTIES: spawnerProperties,
        })
    }
    
    output.GUNS = type.GUNS == null ? spawners : type.GUNS.concat(spawners);
    output.LABEL = name == -1 ? "Over" + type.LABEL.toLowerCase() : name;
    return output;
}
exports.makeBattle = (type, name = -1, options = {}) => {
    type = ensureIsClass(type);
    let output = exports.dereference(type);

    let angle = 180 - (options.angle ?? 125);
    let count = options.count ?? 2;
    let independent = options.independent ?? false;
    let stats = options.extraStats ?? [];
    let spawnerProperties = {
        SHOOT_SETTINGS: exports.combineStats([g.swarm, ...stats]),
        TYPE: independent ? "autoswarm" : "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
    };

    let spawners = [];
    if (count % 2 == 1) {
        spawners.push({
            POSITION: [7, 7.5, 0.6, 7, 4, 180, 0],
            PROPERTIES: spawnerProperties,
        }, {
            POSITION: [7, 7.5, 0.6, 7, -4, 180, 0.5],
            PROPERTIES: spawnerProperties,
        })
    }
    for (let i = 2; i <= (count - count % 2); i += 2) {
        spawners.push({
            POSITION: [7, 7.5, 0.6, 7, 4, 180 - angle * i / 2, 0],
            PROPERTIES: spawnerProperties,
        }, {
            POSITION: [7, 7.5, 0.6, 7, -4, 180 - angle * i / 2, 0.5],
            PROPERTIES: spawnerProperties,
        }, {
            POSITION: [7, 7.5, 0.6, 7, 4, 180 + angle * i / 2, 0],
            PROPERTIES: spawnerProperties,
        }, {
            POSITION: [7, 7.5, 0.6, 7, -4, 180 + angle * i / 2, 0.5],
            PROPERTIES: spawnerProperties,
        })
    }
    
    output.GUNS = type.GUNS == null ? spawners : type.GUNS.concat(spawners);
    output.LABEL = name == -1 ? "Battle" + type.LABEL.toLowerCase() : name;
    return output;
}

// turret functions
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
exports.makeRadialAuto = (type, options = {}) => {
    

    /*
    Available options:
    - count: number of turrets
    - turret: what turret definition to use (leave null to make a new turret), overrides the `type` parameter
    - extraStats: extra stats to append to all turret barrels, on top of g.autoTurret
    - turretIdentifier: Class[turretIdentifier] to refer to the turret in other uses if necessary
    - size: turret size
    - x: turret X
    - arc: turret FOV arc
    - angle: turret ring offset angle
    - label: label of the final tank
    - rotation: rotation speed of the final tank
    - danger: danger value of the final tank
    - body: body stats of the final tank
    */

    let count = options.count ?? 3;
    let isTurret = options.isTurret ?? false;
    let turretIdentifier = type;

    if (!isTurret) {
        type = exports.dereference(ensureIsClass(type));

        let extraStats = options.extraStats ?? [];
        turretIdentifier = options.turretIdentifier ?? `auto${type.LABEL}Gun`;

        Class[turretIdentifier] = {
            PARENT: 'genericTank',
            LABEL: "",
            BODY: {
                FOV: 3,
            },
            CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
            COLOR: "grey",
            GUNS: type.GUNS,
            TURRETS: type.TURRETS,
            PROPS: type.PROPS,
        }

        for (let gun of Class[turretIdentifier].GUNS) {
            if (!gun.PROPERTIES) continue;
            if (!gun.PROPERTIES.SHOOT_SETTINGS) continue;

            gun.PROPERTIES.SHOOT_SETTINGS = exports.combineStats([gun.PROPERTIES.SHOOT_SETTINGS, g.autoTurret, ...extraStats])
        }
    }

    let LABEL = options.label ?? (type.LABEL + "-" + count);
    let turretSize = options.size ?? 11;
    let turretX = options.x ?? 8;
    let turretArc = options.arc ?? 190;
    let turretAngle = options.angle ?? 0;

    return {
        PARENT: 'genericTank',
        LABEL,
        FACING_TYPE: ["spin", {speed: options.rotation ?? 0.02}],
        DANGER: options.danger ?? (type.DANGER + 2),
        BODY: options.body ?? undefined,
        TURRETS: exports.weaponArray({
            POSITION: [turretSize, turretX, 0, turretAngle, turretArc, 0],
            TYPE: turretIdentifier
        }, count)
    }
}
exports.addAura = (damageFactor = 1, sizeFactor = 1, opacity = 0.3, auraColor) => {
    let isHeal = damageFactor < 0;
    let auraType = isHeal ? "healAura" : "aura";
    let symbolType = isHeal ? "healerSymbol" : "auraSymbol";
    auraColor = auraColor ?? (isHeal ? 12 : 0);
    return {
        PARENT: "genericTank",
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

// misc functions
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
exports.weaponArray = (weapons, count, delayIncrement = 0, delayOverflow = false) => {
    // delayIncrement: how much each side's delay increases by
    // delayOverflow: false to constrain the delay value between [0, 1)
    if (!Array.isArray(weapons)) {
        weapons = [weapons]
    }
    let isTurret = weapons[0].TYPE != undefined;
    let angleKey = isTurret ? 3 : 5;
    let delayKey = 6;

    let output = [];
    for (let weapon of weapons) {
        for (let i = 0; i < count; i++) {
            let angle = 360 / count * i;
            let delay = delayIncrement * i;
            let newWeapon = exports.dereference(weapon);

            if (!Array.isArray(newWeapon.POSITION)) {
                angleKey = "ANGLE";
                delayKey = "DELAY";
            }

            newWeapon.POSITION[angleKey] = (newWeapon.POSITION[angleKey] ?? 0) + angle;
            if (!isTurret) {
                newWeapon.POSITION[delayKey] = (newWeapon.POSITION[delayKey] ?? 0) + delay;
                if (!delayOverflow) {
                    newWeapon.POSITION[delayKey] %= 1;
                }
            }
            output.push(newWeapon);
        }
    }
    return output;
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