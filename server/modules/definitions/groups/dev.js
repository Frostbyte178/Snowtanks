const { combineStats, menu, addAura, makeDeco, LayeredBoss, newWeapon, weaponArray, makeRadialAuto } = require('../facilitators.js');
const { base, gunCalcNames, basePolygonDamage, basePolygonHealth, dfltskl, statnames } = require('../constants.js');
const g = require('../gunvals.js');
require('./tanks.js');
require('./food.js');

// Menus
Class.developer = {
    PARENT: "genericTank",
    LABEL: "Developer",
    BODY: {
        SHIELD: 1000,
        REGEN: 10,
        HEALTH: 100,
        DAMAGE: 10,
        DENSITY: 20,
        FOV: 2,
    },
    SKILL_CAP: Array(10).fill(dfltskl),
    IGNORED_BY_AI: true,
    RESET_CHILDREN: true,
    ACCEPTS_SCORE: true,
    CAN_BE_ON_LEADERBOARD: true,
    CAN_GO_OUTSIDE_ROOM: false,
    DRAW_HEALTH: true,
    ARENA_CLOSER: true,
    INVISIBLE: [0, 0],
    ALPHA: [0, 1],
    HITS_OWN_TYPE: "hardOnlyTanks",
    SHAPE: [
        [-1, -0.8],
        [-0.8, -1],
        [0.8, -1],
        [1, -0.8],
        [0.2, 0],
        [1, 0.8],
        [0.8, 1],
        [-0.8, 1],
        [-1, 0.8],
    ],
    GUNS: [
        {
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                TYPE: "developerBullet"
            }
        }
    ]
}
Class.spectator = {
    PARENT: "genericTank",
    LABEL: "Spectator",
    ALPHA: 0,
    IGNORED_BY_AI: true,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: "never",
    ARENA_CLOSER: true,
    SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 255],
    BODY: {
        SPEED: 5,
        FOV: 2.5,
        DAMAGE: 0,
        HEALTH: 1e100,
        SHIELD: 1e100,
        REGEN: 1e100,
    }
}

Class.bosses = menu("Bosses")
Class.bosses.REROOT_UPGRADE_TREE = "bosses"
Class.sentries = menu("Sentries", "pink", 3.5)
Class.sentries.PROPS = [
    {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: "genericEntity"
    }
]
Class.elites = menu("Elites", "pink", 3.5)
Class.mysticals = menu("Mysticals", "gold", 4)
Class.nesters = menu("Nesters", "purple", 5.5)
Class.rogues = menu("Rogues", "darkGrey", 6)
Class.rammers = menu("Rammers", "aqua")
Class.rammers.PROPS = [
    {
        POSITION: [21.5, 0, 0, 360, -1],
        TYPE: "smasherBody",
    }
]
Class.terrestrials = menu("Terrestrials", "orange", 7)
Class.celestials = menu("Celestials", "lightGreen", 9)
Class.eternals = menu("Eternals", "veryLightGrey", 11)
Class.devBosses = menu("Developers", "lightGreen", 4)
Class.devBosses.UPGRADE_COLOR = "rainbow"

Class.tanks = menu("Tanks")
Class.unavailable = menu("Unavailable")
Class.dominators = menu("Dominators")
Class.dominators.PROPS = [
    {
        POSITION: [22, 0, 0, 360, 0],
        TYPE: "dominationBody",
    }
]
Class.sanctuaries = menu("Sanctuaries")
Class.sanctuaries.PROPS = [
    {
        POSITION: [22, 0, 0, 360, 0],
        TYPE: "dominationBody",
    }, {
        POSITION: [13, 0, 0, 360, 1],
        TYPE: "healerSymbol",
    }
]

// Generators
function compileMatrix(matrix, matrix2Entrance) {
    let matrixWidth = matrix[0].length,
        matrixHeight = matrix.length;
    for (let x = 0; x < matrixWidth; x++) for (let y = 0; y < matrixHeight; y++) {
        let str = matrix[y][x],
            LABEL = str[0].toUpperCase() + str.slice(1).replace(/[A-Z]/g, m => ' ' + m) + " Generator",
            code = str + 'Generator';
        Class[code] = matrix[y][x] = {
            PARENT: "spectator",
            LABEL,
            SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
            TURRETS: [{
                POSITION: [5 + y * 2, 0, 0, 0, 0, 1],
                TYPE: str,
            }],
            GUNS: [{
                POSITION: [14, 12, 1, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }, g.fake]),
                    TYPE: "bullet"
                }
            }, {
                POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                    INDEPENDENT_CHILDREN: true,
                    TYPE: str
                },
            }],
        };
    }
}
function connectMatrix(matrix, matrix2Entrance) {
    let matrixWidth = matrix[0].length,
        matrixHeight = matrix.length;
    for (let x = 0; x < matrixWidth; x++) for (let y = 0; y < matrixHeight; y++) {
        let top = (y + matrixHeight - 1) % matrixHeight,
            bottom = (y + matrixHeight + 1) % matrixHeight,
            left = (x + matrixWidth - 1) % matrixWidth,
            right = (x + matrixWidth + 1) % matrixWidth,

        center = matrix[y     ][x    ];
        top    = matrix[top   ][x    ];
        bottom = matrix[bottom][x    ];
        left   = matrix[y     ][left ];
        right  = matrix[y     ][right];

        matrix[y][x].UPGRADES_TIER_0 = [
            "developer" ,  top    , "spectator",
             left       ,  center ,  right      ,
            "basic"     ,  bottom ,  matrix2Entrance
        ];
    }
}
let generatorMatrix = [
    [ "egg"           , "gem"                , "jewel"                  , "crasher"             , "sentry"               , "shinySentry"        , "EggRelic"           ],
    [ "square"        , "shinySquare"        , "legendarySquare"        , "shadowSquare"        , "rainbowSquare"        , "transSquare"        , "SquareRelic"        ],
    [ "triangle"      , "shinyTriangle"      , "legendaryTriangle"      , "shadowTriangle"      , "rainbowTriangle"      , "transTriangle"      , "TriangleRelic"      ],
    [ "pentagon"      , "shinyPentagon"      , "legendaryPentagon"      , "shadowPentagon"      , "rainbowPentagon"      , "transPentagon"      , "PentagonRelic"      ],
    [ "betaPentagon"  , "shinyBetaPentagon"  , "legendaryBetaPentagon"  , "shadowBetaPentagon"  , "rainbowBetaPentagon"  , "transBetaPentagon"  , "BetaPentagonRelic"  ],
    [ "alphaPentagon" , "shinyAlphaPentagon" , "legendaryAlphaPentagon" , "shadowAlphaPentagon" , "rainbowAlphaPentagon" , "transAlphaPentagon" , "AlphaPentagonRelic" ],
    [ "sphere"        , "cube"               , "tetrahedron"            , "octahedron"          , "dodecahedron"         , "icosahedron"        , "tesseract"          ],
],
gemRelicMatrix = [];
for (let tier of [ "", "Egg", "Square", "Triangle", "Pentagon", "BetaPentagon", "AlphaPentagon" ]) {
    let row = [];
    for (let gem of [ "Power", "Space", "Reality", "Soul", "Time", "Mind" ]) {
        row.push(gem + (tier ? tier + 'Relic' : 'Gem'));
    }
    gemRelicMatrix.push(row);
}

compileMatrix(generatorMatrix);
compileMatrix(gemRelicMatrix);

// Tensor = N-Dimensional Array, BASICALLY
let labyTensor = [];
for (let poly = 0; poly < 5; poly++) {
    let row = [];
    for (let tier = 0; tier < 6; tier++) {
        let column = [];
        for (let shiny = 0; shiny < 6; shiny++) {
            let tube = [];
            for (let rank = 0; rank < 2; rank++) {
                let str = `laby_${poly}_${tier}_${shiny}_${rank}`,
                    LABEL = ensureIsClass(str).LABEL + " Generator";
                Class['generator_' + str] = {
                    PARENT: "spectator",
                    LABEL,
                    SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
                    TURRETS: [{
                        POSITION: [5 + tier * 2, 0, 0, 0, 0, 1],
                        TYPE: str,
                    }],
                    GUNS: [{
                        POSITION: [14, 12, 1, 4, 0, 0, 0],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }, g.fake]),
                            TYPE: "bullet"
                        }
                    }, {
                        POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                            INDEPENDENT_CHILDREN: true,
                            TYPE: str
                        },
                    }],
                };
                tube.push('generator_' + str);
            }
            column.push(tube);
        }
        row.push(column);
    }
    labyTensor.push(row);
}

connectMatrix(generatorMatrix, 'PowerGemGenerator');
connectMatrix(gemRelicMatrix, 'generator_laby_0_0_0_0');

let tensorWidth = labyTensor.length,
    tensorHeight = labyTensor[0].length,
    tensorLength = labyTensor[0][0].length,
    tensorDepth = labyTensor[0][0][0].length;

for (let x = 0; x < tensorWidth; x++) {
    for (let y = 0; y < tensorHeight; y++) {
        for (let z = 0; z < tensorLength; z++) {
            for (let w = 0; w < tensorDepth; w++) {

                let left = (x + tensorWidth - 1) % tensorWidth,
                    right = (x + tensorWidth + 1) % tensorWidth,
                    top = (y + tensorHeight - 1) % tensorHeight,
                    bottom = (y + tensorHeight + 1) % tensorHeight,
                    front = (z + tensorLength - 1) % tensorLength,
                    back = (z + tensorLength + 1) % tensorLength,
                    past = (w + tensorDepth - 1) % tensorDepth,
                    future = (w + tensorDepth + 1) % tensorDepth,
            
                center = labyTensor[x    ][y     ][z    ][w     ];
                top    = labyTensor[x    ][top   ][z    ][w     ];
                bottom = labyTensor[x    ][bottom][z    ][w     ];
                left   = labyTensor[left ][y     ][z    ][w     ];
                right  = labyTensor[right][y     ][z    ][w     ];
                front  = labyTensor[x    ][y     ][front][w     ];
                back   = labyTensor[x    ][y     ][back ][w     ];
                past   = labyTensor[x    ][y     ][z    ][past  ];
                future = labyTensor[x    ][y     ][z    ][future];

                Class[labyTensor[x][y][z][w]].UPGRADES_TIER_0 = [
                    "developer"         , left  , right  ,
                    "teams"             , top   , bottom ,
                    "eggGenerator"      , front , back   ,
                    "PowerGemGenerator" , past  , future
                ];
            }
        }
    }
}

// Testing tanks
Class.diamondShape = {
    PARENT: "basic",
    LABEL: "Rotated Body",
    SHAPE: 4.5
};

Class.mummyHat = {
    SHAPE: 4.5,
    COLOR: -1
};
Class.mummy = {
    PARENT: "drone",
    SHAPE: 4,
    NECRO: [4],
    TURRETS: [{
        POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 360, 1],
        TYPE: ["mummyHat"]
    }]
};
Class.mummifier = {
    PARENT: "genericTank",
    LABEL: "Mummifier",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    SHAPE: 4,
    MAX_CHILDREN: 10,
    GUNS: [{
        POSITION: [5.5, 13, 1.1, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: "mummy",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro
        }
    },{
        POSITION: [5.5, 13, 1.1, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: "mummy",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro
        }
    }],
    TURRETS: [{
        POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 360, 1],
        TYPE: ["mummyHat"]
    }]
};
Class.miscTestHelper2 = {
    PARENT: "genericTank",
    LABEL: "Turret Reload 3",
    MIRROR_MASTER_ANGLE: true,
    COLOR: -1,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
                TYPE: "bullet",
                COLOR: -1,
            },
        },
    ],
};
Class.miscTestHelper = {
    PARENT: "genericTank",
    LABEL: "Turret Reload 2",
    //MIRROR_MASTER_ANGLE: true,
    COLOR: {
        BASE: -1,
        BRIGHTNESS_SHIFT: 15,
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
                TYPE: "bullet",
                COLOR: -1,
            },
        },
    ],
    TURRETS: [
        {
          POSITION: [20, 0, 20, 30, 0, 1],
          TYPE: "miscTestHelper2",
        }
    ]
};
Class.miscTest = {
    PARENT: "genericTank",
    LABEL: "Turret Reload",
    COLOR: "teal",
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
                TYPE: "bullet",
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [20, 0, 20, 30, 0, 1],
            TYPE: "miscTestHelper",
        }
    ]
};
Class.mmaTest2 = {
    PARENT: "genericTank",
    MIRROR_MASTER_ANGLE: true,
    COLOR: "grey",
    GUNS: [{
            POSITION: [40, 4, 1, -20, 0, 0, 0],
        }],
}
Class.mmaTest1 = {
    PARENT: "genericTank",
    COLOR: -1,
    // Somehow, removing the gun below causes a crash when the tank is chosen ??????
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
        }
    ],
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "mmaTest2",
        }
    ]
}
Class.mmaTest = {
    PARENT: "genericTank",
    LABEL: "Mirror Master Angle",
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "mmaTest2",
        },
        {
            POSITION: [20, 0, 20, 0, 360, 1],
            TYPE: "mmaTest1",
        },
    ]
}

Class.vulnturrettest_turret = {
    PARENT: "genericTank",
    COLOR: "grey",
    HITS_OWN_TYPE: 'hard',
    LABEL: 'Shield',
    COLOR: 'teal',
}

Class.vulnturrettest = {
    PARENT: "genericTank",
    LABEL: "Vulnerable Turrets",
    TOOLTIP: "[DEV NOTE] Vulnerable turrets are still being worked on and may not function as intended!",
    BODY: {
        FOV: 2,
    },
    DANGER: 6,
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet'
        }
    }],
    TURRETS: (() => {
        let output = []
        for (let i = 0; i < 10; i++) {
            output.push({
                POSITION: {SIZE: 20, X: 40, ANGLE: (360/10)*i},
                TYPE: "vulnturrettest_turret",
                VULNERABLE: true
            })
        }
        return output
    })(),
};

Class.turretLayerTesting = {
    PARENT: 'genericTank',
    LABEL: 'Turret Layer Testing',
    TURRETS: [
        {
            POSITION: [20, 10, 10, 0, 0, 2],
            TYPE: ["basic", {COLOR: "lightGrey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, 15, 5, 0, 0, 2],
            TYPE: ["basic", {COLOR: "grey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, 10, -5, 0, 0, 1],
            TYPE: ["basic", {COLOR: "darkGrey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, -10, -5, 0, 0, -2],
            TYPE: ["basic", {COLOR: "darkGrey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, -10, 5, 0, 0, -1],
            TYPE: ["basic", {COLOR: "grey", MIRROR_MASTER_ANGLE: true}]
        },
    ]
}

Class.alphaGunTest = {
    PARENT: "basic",
    LABEL: "Translucent Guns",
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            ALPHA: 0.5
        }
    }]
}

Class.radialAutoTest = makeRadialAuto("gunner", {
    count: 5,
    isTurret: false,
    extraStats: [{spray: 4, speed: 1.4, maxSpeed: 1.4, recoil: 0.2}],
    turretIdentifier: "radialAutoTestTurret",
    size: 8,
    x: 10,
    arc: 220,
    angle: 36,
    label: "Radial Auto Test",
    rotation: 0.04,
    danger: 10,
})

Class.imageShapeTest = {
    PARENT: 'genericTank',
    LABEL: "Image Shape Test",
    SHAPE: 'round.png',
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            }
        }
    ]
}

// unfinished
Class.strokeWidthTest = {
    PARENT: "basic",
    LABEL: "Stroke Width Test",
    STROKE_WIDTH: 2,
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            STROKE_WIDTH: 0.5
        }
    }]
}

Class.onTest = {
    PARENT: 'genericTank',
    LABEL: "ON property test",
    TOOLTIP: "Refer to Class.onTest in dev.js to know more.",
    ON: [{
        event: "fire",
        handler: ({ body, gun }) => {
            switch (gun.identifier) {
                case 'mainGun':
                    body.sendMessage(`I fired my main gun.`)
                    break;
                case 'secondaryGun':
                    body.sendMessage('I fired my secondary gun.')
                    break;
            }
        }
    }, {
        event: "altFire",
        handler: ({ body, gun }) => {
            body.sendMessage(`I fired my alt gun.`)
        }
    }, {
        event: "death",
        handler: ({ body, killers, killTools }) => {
            const killedOrDied = killers.length == 0 ? 'died.' : 'got killed.'
            body.sendMessage(`I ${killedOrDied}`)
        }
    }, {
        event: "collide",
        handler: ({ instance, other }) => {
            instance.sendMessage(`I collided with ${other.label}.`)
        }
    }, {
        event: "damage",
        handler: ({ body, damageInflictor, damageTool }) => { 
            body.sendMessage(`I got hurt`)
        }
    }],
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'mainGun'
        }
    }, {
        POSITION: { ANGLE: 90 },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            ALT_FIRE: true
        }
    }, {
        POSITION: { ANGLE: 180, DELAY: 0.5 },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'secondaryGun'
        }
    }]
}

Class.auraBasicGen = addAura();
Class.auraBasic = {
    PARENT: "genericTank",
    LABEL: "Aura Basic",
    TURRETS: [
        {
            POSITION: [14, 0, 0, 0, 0, 1],
            TYPE: "auraBasicGen"
        }
    ],
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.auraHealerGen = addAura(-1);
Class.auraHealer = {
    PARENT: "genericTank",
    LABEL: "Aura Healer",
    TURRETS: [
        {
            POSITION: [14, 0, 0, 0, 0, 1],
            TYPE: "auraHealerGen"
        }
    ],
    GUNS: [
        {
            POSITION: [8, 9, -0.5, 12.5, 0, 0, 0],
        },
        {
            POSITION: [18, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer]),
                TYPE: "healerBullet",
            },
        },
    ],
};

Class.ghoster_ghosted = {
    PARENT: "genericTank",
    TOOLTIP: 'You are now hidden, roam around and find your next target. You will be visible again in 5 seconds',
    LABEL: 'Ghoster',
    BODY: {
        SPEED: 20,
        ACCELERATION: 10,
        FOV: base.FOV + 1,
    },
    GUNS: [{
        POSITION: { WIDTH: 20, LENGTH: 20 },
    }],
    ALPHA: 0.6,
}

Class.ghoster = {
    PARENT: "genericTank",
    LABEL: 'Ghoster',
    TOOLTIP: 'Shooting will hide you for 5 seconds',
    BODY: {
        SPEED: base.SPEED,
        ACCELERATION: base.ACCEL,
    },
    ON: [
        {
            event: 'fire',
            handler: ({ body }) => {
                body.define("ghoster_ghosted")
                setTimeout(() => {
                    body.SPEED = 1e-99
                    body.ACCEL = 1e-99
                    body.FOV *= 2
                    body.alpha = 1
                }, 2000)
                setTimeout(() => {
                    body.SPEED = base.SPEED
                    body.define("ghoster")
                }, 2500)
            }
        }
    ],
    GUNS: [{
        POSITION: {WIDTH: 20, LENGTH: 20},
        PROPERTIES: {
            TYPE: 'bullet',
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator]),
        }
    }],
    ALPHA: 1,
}

Class.switcheroo = {
    PARENT: "basic",
    LABEL: 'Switcheroo',
    UPGRADES_TIER_0: [],
    RESET_UPGRADE_MENU: true,
    ON: [
        {
            event: "fire",
            handler: ({ body, globalMasterStore: store, gun }) => {
                if (gun.identifier != 'switcherooGun') return
                store.switcheroo_i ??= 0;
                store.switcheroo_i++;
                store.switcheroo_i %= 6;
                body.define(Class.basic.UPGRADES_TIER_1[store.switcheroo_i]);
                setTimeout(() => body.define("switcheroo"), 6000);
            }
        }
    ],
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'switcherooGun'
        }
    }]
}

Class.vanquisher = {
    PARENT: "genericTank",
    DANGER: 8,
    LABEL: "Vanquisher",
    STAT_NAMES: statnames.generic,
    CONTROLLERS: ['stackGuns'],
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    //destroyer
    GUNS: [{
        POSITION: [21, 14, 1, 0, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
            TYPE: "bullet"
        }

    //builder
    },{
        POSITION: [18, 12, 1, 0, 0, 0, 0],
    },{
        POSITION: [2, 12, 1.1, 18, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
            TYPE: "setTrap",
            STAT_CALCULATOR: gunCalcNames.block
        }

    //launcher
    },{
        POSITION: [10, 9, 1, 9, 0, 90, 0],
    },{
        POSITION: [17, 13, 1, 0, 0, 90, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery]), TYPE: "minimissile", STAT_CALCULATOR: gunCalcNames.sustained }

    //shotgun
    },{
        POSITION: [4, 3, 1, 11, -3, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [4, 3, 1, 11, 3, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [4, 4, 1, 13, 0, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 4, 1, 12, -1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 4, 1, 11, 1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 3, 1, 13, -1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [1, 3, 1, 13, 1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [1, 2, 1, 13, 2, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    }, {
        POSITION: [1, 2, 1, 13, -2, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    }, {
        POSITION: [15, 14, 1, 6, 0, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun, g.fake]), TYPE: "casing" }
    }, {
        POSITION: [8, 14, -1.3, 4, 0, 270, 0]
    }]
}
Class.armyOfOneBullet = {
    PARENT: "bullet",
    LABEL: "Unstoppable",
    TURRETS: [
        {
            POSITION: [18.5, 0, 0, 0, 360, 0],
            TYPE: ["spikeBody", { COLOR: null }]
        },
        {
            POSITION: [18.5, 0, 0, 180, 360, 0],
            TYPE: ["spikeBody", { COLOR: null }]
        }
    ]
}
Class.armyOfOne = {
    PARENT: "genericTank",
    LABEL: "Army Of One",
    DANGER: 9,
    SKILL_CAP: [31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    BODY: {
        SPEED: 0.5 * base.SPEED,
        FOV: 1.8 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [21, 19, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.destroyer, g.destroyer, g.destroyer, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }]),
                TYPE: "armyOfOneBullet",
            },
        },{
            POSITION: [21, 11, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.destroyer, g.destroyer, g.destroyer, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }, g.fake]),
                TYPE: "bullet",
            },
        }
    ],
};
Class.weirdAutoBasic = {
    PARENT: "genericTank",
    LABEL: "Weirdly Defined Auto-Basic",
    GUNS: [{
        POSITION: {
            LENGTH: 20,
            WIDTH: 10
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, [0.8, 0.8, 1.5, 1, 0.8, 0.8, 0.9, 1, 1, 1, 1, 2, 1]]),
            TYPE: "bullet"
        },
    }],
    TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["autoTurret", {
            CONTROLLERS: ["nearestDifferentMaster"],
            INDEPENDENT: true
        }]
    }]
}

Class.tooltipTank = {
    PARENT: 'genericTank',
    LABEL: "Tooltips",
    UPGRADE_TOOLTIP: "Allan please add details"
}

Class.bulletSpawnTest = {
    PARENT: 'genericTank',
    LABEL: "Bullet Spawn Position",
    GUNS: [
        {
            POSITION: [20, 10, 1, 0, -5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {speed: 0, maxSpeed: 0, shudder: 0, spray: 0, recoil: 0}]),
                TYPE: ['bullet', {BORDERLESS: true}],
                BORDERLESS: true,
            }
        }, {
            POSITION: [50, 10, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {speed: 0, maxSpeed: 0, shudder: 0, spray: 0, recoil: 0}]),
                TYPE: ['bullet', {BORDERLESS: true}],
                BORDERLESS: true,
            }
        }
    ]
}

Class.propTestProp = {
    PARENT: 'genericTank',
    SHAPE: 6,
    COLOR: 0,
    GUNS: [
        {
            POSITION: [20, 10, 1, 0, 0, 45, 0],
            PROPERTIES: {COLOR: 13},
        }, {
            POSITION: [20, 10, 1, 0, 0, -45, 0],
            PROPERTIES: {COLOR: 13},
        }
    ]
}
Class.propTest = {
    PARENT: 'genericTank',
    LABEL: 'Deco Prop Test',
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            }
        }
    ],
    PROPS: [
        {
            POSITION: [10, 0, 0, 0, 1],
            TYPE: 'propTestProp'
        }
    ]
}
Class.weaponArrayTest = {
    PARENT: 'genericTank',
    LABEL: 'Weapon Array Test',
    GUNS: weaponArray([
        {
            POSITION: [20, 8, 1, 0, 0, 25, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {reload: 2}]),
                TYPE: 'bullet'
            }
        }, {
            POSITION: [17, 8, 1, 0, 0, 25, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {reload: 2}]),
                TYPE: 'bullet'
            }
        }
    ], 5, 0.4, false),
    TURRETS: weaponArray(
        {
            POSITION: [7, 10, 0, -11, 180, 0],
            TYPE: 'autoTankGun'
        }
    , 5),
}

Class.levels = menu("Levels")
Class.levels.UPGRADES_TIER_0 = []
for (let i = 0; i < 12; i++) {
    let LEVEL = i * c.TIER_MULTIPLIER;
    Class["level" + LEVEL] = {
        PARENT: "levels",
        LEVEL,
        LABEL: "Level " + LEVEL
    };
    Class.levels.UPGRADES_TIER_0.push("level" + LEVEL);
}

Class.teams = menu("Teams")
Class.teams.UPGRADES_TIER_0 = []
for (let i = 1; i <= 8; i++) {
    let TEAM = i;
    Class["Team" + TEAM] = {
        PARENT: "teams",
        TEAM: -TEAM,
        COLOR: getTeamColor(-TEAM),
        LABEL: "Team " + TEAM
    };
    Class.teams.UPGRADES_TIER_0.push("Team" + TEAM);
}
Class['Team' + TEAM_ROOM] = {
    PARENT: "teams",
    TEAM: TEAM_ROOM,
    COLOR: "yellow",
    LABEL: "Room Team"
};
Class['Team' + TEAM_ENEMIES] = {
    PARENT: "teams",
    TEAM: TEAM_ENEMIES,
    COLOR: "yellow",
    LABEL: "Enemies Team"
};
Class.teams.UPGRADES_TIER_0.push('Team' + TEAM_ROOM, 'Team' + TEAM_ENEMIES);

Class.testing = menu("Testing")

Class.addons = menu("Addon Entities")
Class.addons.UPGRADES_TIER_0 = []

Class.volute = {
    PARENT: "genericTank",
    LABEL: "Volute",
    DANGER: 6,
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [20, 13, 0.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos, g.pounder]),
                TYPE: ["bullet", {MOTION_TYPE: "desmos"}]
            },
        },
        {
            POSITION: [5, 10, 2.125, 1, -6.375, 90, 0],
        },
        {
            POSITION: [5, 10, 2.125, 1, 6.375, -90, 0],
        },
    ],
}
Class.snakeOld = {
    PARENT: "missile",
    LABEL: "Snake",
    GUNS: [
        {
            POSITION: [6, 12, 1.4, 8, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.thruster,
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.snake, g.snakeskin]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
            },
        },
        {
            POSITION: [10, 12, 0.8, 8, 0, 180, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                NEGATIVE_RECOIL: true,
                STAT_CALCULATOR: gunCalcNames.thruster,
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.snake]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
            },
        },
    ],
}
Class.sidewinderOld = {
    PARENT: "genericTank",
    LABEL: "Sidewinder (old)",
    DANGER: 7,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.3 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [10, 11, -0.5, 14, 0, 0, 0],
        },
        {
            POSITION: [21, 12, -1.1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder]),
                TYPE: "snakeOld",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
}
Class.whirlwindDeco = makeDeco(6)
Class.whirlwindDeco.CONTROLLERS = [["spin", { independent: true, speed: 0.128 }]]
Class.whirlwind = {
    PARENT: "genericTank",
    LABEL: "Whirlwind",
    ANGLE: 60,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.whirlwind,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "whirlwindDeco"
        }
    ],
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 6; i++) { 
            output.push({ 
                POSITION: {WIDTH: 8, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite]), 
                    TYPE: ["satellite", {ANGLE: i * 60}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
}
let testLayeredBoss = new LayeredBoss("testLayeredBoss", "Test Layered Boss", "terrestrial", 7, 3, "terrestrialTrapTurret", 5, 7, {SPEED: 10});
testLayeredBoss.addLayer({gun: {
    POSITION: [3.6, 7, -1.4, 8, 0, null, 0],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, { size: 0.5 }]),
        TYPE: ["minion", {INDEPENDENT: true}],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
    },
}}, true, null, 16);
testLayeredBoss.addLayer({turret: {
    POSITION: [10, 7.5, 0, null, 160, 0],
    TYPE: "crowbarTurret",
}}, true);

// FLAIL!!!
Class.flailBallSpike = {
    PARENT: "genericTank",
    COLOR: "black",
    SHAPE: 6,
    INDEPENDENT: true,
};
Class.flailBall = {
    PARENT: "genericTank",
    COLOR: "grey",
    HITS_OWN_TYPE: 'hard',
    INDEPENDENT: true,
    TURRETS: [{
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: "flailBallSpike",
    }],
};
Class.flailBolt1 = {
    PARENT: "genericTank",
    COLOR: "grey",
    INDEPENDENT: true,
    GUNS: [{
        POSITION: [40, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [48, 56, 0, 0, 360, 1],
        TYPE: "flailBall"
    }],
};
Class.flailBolt2 = {
    PARENT: "genericTank",
    COLOR: "grey",
    INDEPENDENT: true,
    GUNS: [{
        POSITION: [30, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [20, 36, 0, 0, 360, 1],
        TYPE: "flailBolt1"
    }],
};
Class.flailBolt3 = {
    PARENT: "genericTank",
    COLOR: "grey",
    GUNS: [{
        POSITION: [30, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [18, 36, 0, 0, 360, 1],
        TYPE: "flailBolt2"
    }],
};
Class.genericFlail = {
    PARENT: "genericTank",
    STAT_NAMES: statnames.flail,
    TOOLTIP: "[DEV NOTE] The Flail is not finished yet. This tank is currently just a mockup.",
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
}
Class.flail = {
    PARENT: "genericFlail",
    LABEL: "Flail",
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }]
}
Class.doubleFlail = {
    PARENT: "genericFlail",
    LABEL: "Double Flail",
    DANGER: 6,
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [6, 10, 0, 180, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }]
}
Class.tripleFlail = {
    PARENT: "genericFlail",
    LABEL: "Triple Flail",
    DANGER: 7,
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [6, 10, 0, 120, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [6, 10, 0, 240, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }]
}

Class.developer.UPGRADES_TIER_0 = ["tanks", "bosses", "spectator", "levels", "teams", "eggGenerator", "testing", "addons"]
    Class.tanks.UPGRADES_TIER_0 = ["basic", "unavailable", "arenaCloser", "dominators", "sanctuaries", "mothership", "baseProtector", "antiTankMachineGun"]
        Class.unavailable.UPGRADES_TIER_0 = ["flail", "healer", "volute", "whirlwind"]
            Class.flail.UPGRADES_TIER_2 = ["doubleFlail"]
                Class.doubleFlail.UPGRADES_TIER_3 = ["tripleFlail"]
            Class.volute.UPGRADES_TIER_3 = ["sidewinderOld"]
        Class.dominators.UPGRADES_TIER_0 = ["destroyerDominator", "gunnerDominator", "trapperDominator"]
        Class.sanctuaries.UPGRADES_TIER_0 = ["sanctuaryTier1", "sanctuaryTier2", "sanctuaryTier3", "sanctuaryTier4", "sanctuaryTier5", "sanctuaryTier6"]

    Class.bosses.UPGRADES_TIER_0 = ["sentries", "elites", "mysticals", "nesters", "rogues", "rammers", "terrestrials", "celestials", "eternals", "devBosses"]
        Class.sentries.UPGRADES_TIER_0 = ["sentrySwarm", "sentryGun", "sentryTrap", "shinySentrySwarm", "shinySentryGun", "shinySentryTrap", "sentinelMinigun", "sentinelLauncher", "sentinelCrossbow"]
        Class.elites.UPGRADES_TIER_0 = ["eliteDestroyer", "eliteGunner", "eliteSprayer", "eliteBattleship", "eliteSpawner", "eliteTrapGuard", "eliteSpinner", "eliteSkimmer", "legionaryCrasher", "guardian", "defender", "sprayerLegion"]
        Class.mysticals.UPGRADES_TIER_0 = ["sorcerer", "summoner", "enchantress", "exorcistor", "shaman"]
        Class.nesters.UPGRADES_TIER_0 = ["nestKeeper", "nestWarden", "nestGuardian"]
        Class.rogues.UPGRADES_TIER_0 = ["roguePalisade", "rogueArmada", "julius", "genghis", "napoleon"]
	    Class.rammers.UPGRADES_TIER_0 = ["bob", "nemesis"]
        Class.terrestrials.UPGRADES_TIER_0 = ["ares", "gersemi", "ezekiel", "eris", "selene"]
        Class.celestials.UPGRADES_TIER_0 = ["paladin", "freyja", "zaphkiel", "nyx", "theia", "atlas", "rhea", "julius", "genghis", "napoleon"]
        Class.eternals.UPGRADES_TIER_0 = ["odin", "kronos"]
        Class.devBosses.UPGRADES_TIER_0 = ["taureonBoss", "zephiBoss", "dogeiscutBoss", "trplnrBoss", "frostBoss", "toothlessBoss"]

    Class.testing.UPGRADES_TIER_0 = ["diamondShape", "miscTest", "mmaTest", "vulnturrettest", "onTest", "alphaGunTest", "strokeWidthTest", "testLayeredBoss", "tooltipTank", "turretLayerTesting", "bulletSpawnTest", "propTest", "weaponArrayTest", "radialAutoTest", "imageShapeTest", "auraBasic", "auraHealer", "weirdAutoBasic", "ghoster", "switcheroo", ["developer", "developer"], "armyOfOne", "vanquisher", "mummifier"]
