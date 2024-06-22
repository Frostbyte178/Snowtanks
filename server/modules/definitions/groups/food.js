const { basePolygonDamage, basePolygonHealth, base } = require('../constants.js');
const { makeRelic, makeRare, makeCrasher, makeLaby } = require('../facilitators.js');

// EGGS
Class.egg = {
    PARENT: "food",
    LABEL: "Egg",
    VALUE: 10,
    SHAPE: 0,
    SIZE: 4.5,
    COLOR: "veryLightGrey",
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.5 * basePolygonHealth,
        PUSHABILITY: 0,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: false,
};
Class.gem = {
    PARENT: "food",
    LABEL: "Gem",
    VALUE: 2e3,
    SHAPE: 6,
    SIZE: 4.5,
    COLOR: "aqua",
    BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.jewel = {
    PARENT: "food",
    LABEL: "Jewel",
    VALUE: 1e5,
    SHAPE: 6,
    SIZE: 8,
    COLOR: "yellow",
    BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 50,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.shinyEgg = makeRare("egg", 0);
Class.legendaryEgg = makeRare("egg", 1);
Class.shadowEgg = makeRare("egg", 2);
Class.rainbowEgg = makeRare("egg", 3);
Class.transEgg = makeRare("egg", 4); //ironic

// SQUARES
Class.square = {
    PARENT: "food",
    LABEL: "Square",
    VALUE: 30,
    SHAPE: 4,
    SIZE: 14,
    COLOR: "gold",
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
        ACCELERATION: 0.0075
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
Class.shinySquare = makeRare("square", 0);
Class.legendarySquare = makeRare("square", 1);
Class.shadowSquare = makeRare("square", 2);
Class.rainbowSquare = makeRare("square", 3);
Class.transSquare = makeRare("square", 4);

// TRIANGLES
Class.triangle = {
    PARENT: "food",
    LABEL: "Triangle",
    VALUE: 120,
    SHAPE: 3,
    SIZE: 10,
    COLOR: "orange",
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
        ACCELERATION: 0.005
    },
    DRAW_HEALTH: true,
};
Class.shinyTriangle = makeRare("triangle", 0);
Class.legendaryTriangle = makeRare("triangle", 1);
Class.shadowTriangle = makeRare("triangle", 2);
Class.rainbowTriangle = makeRare("triangle", 3);
Class.transTriangle = makeRare("triangle", 4);

// PENTAGONS
Class.pentagon = {
    PARENT: "food",
    LABEL: "Pentagon",
    VALUE: 400,
    SHAPE: 5,
    SIZE: 21,
    COLOR: "purple",
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true,
};
Class.shinyPentagon = makeRare("pentagon", 0);
Class.legendaryPentagon = makeRare("pentagon", 1);
Class.shadowPentagon = makeRare("pentagon", 2);
Class.rainbowPentagon = makeRare("pentagon", 3);
Class.transPentagon = makeRare("pentagon", 4);

// BETA PENTAGONS
Class.betaPentagon = {
    PARENT: "food",
    LABEL: "Beta Pentagon",
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: "purple",
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 75 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        PENETRATION: 1.1,
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.shinyBetaPentagon = makeRare("betaPentagon", 0);
Class.legendaryBetaPentagon = makeRare("betaPentagon", 1);
Class.shadowBetaPentagon = makeRare("betaPentagon", 2);
Class.rainbowBetaPentagon = makeRare("betaPentagon", 3);
Class.transBetaPentagon = makeRare("betaPentagon", 4);

// ALPHA PENTAGONS
Class.alphaPentagon = {
    PARENT: "food",
    LABEL: "Alpha Pentagon",
    VALUE: 15e3,
    SHAPE: 5,
    SIZE: 58,
    COLOR: "purple",
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 562.5 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        PENETRATION: 1.1,
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
        ACCELERATION: 0.0025
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.shinyAlphaPentagon = makeRare("alphaPentagon", 0);
Class.legendaryAlphaPentagon = makeRare("alphaPentagon", 1);
Class.shadowAlphaPentagon = makeRare("alphaPentagon", 2);
Class.rainbowAlphaPentagon = makeRare("alphaPentagon", 3);
Class.transAlphaPentagon = makeRare("alphaPentagon", 4);

// HEXAGONS
Class.hexagon = {
    PARENT: "food",
    LABEL: "Hexagon",
    VALUE: 500,
    SHAPE: 6,
    SIZE: 25,
    COLOR: "hexagon",
    BODY: {
        DAMAGE: 3 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 20 * basePolygonHealth,
        RESIST: 1.3,
        SHIELD: 50 * basePolygonHealth,
        PENETRATION: 1.1,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};
Class.shinyHexagon = makeRare("hexagon", 0);
Class.legendaryHexagon = makeRare("hexagon", 1);
Class.shadowHexagon = makeRare("hexagon", 2);
Class.rainbowHexagon = makeRare("hexagon", 3);
Class.transHexagon = makeRare("hexagon", 4);

// 3D POLYGONS
Class.sphere = {
    PARENT: "food",
    LABEL: "The Sphere",
    FACING_TYPE: "noFacing",
    VALUE: 1e7,
    SHAPE: 0,
    SIZE: 9,
    COLOR: {
        BASE: "veryLightGrey",
        BRIGHTNESS_SHIFT: -15,
    },
    BODY: {
        DAMAGE: 4,
        DENSITY: 16,
        HEALTH: 30,
        RESIST: 1.25,
        PENETRATION: 15,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    PROPS: [{
        POSITION: [17, 0, 0, 0, 1],
        TYPE: ["egg", { COLOR: { BRIGHTNESS_SHIFT: -14 }, BORDERLESS: true }]
    }, {
        POSITION: [15, 1, -1, 0, 1],
        TYPE: ["egg", { COLOR: { BRIGHTNESS_SHIFT: -9 }, BORDERLESS: true }]
    }, {
        POSITION: [13, 2, -2, 0, 1],
        TYPE: ["egg", { COLOR: { BRIGHTNESS_SHIFT: -8 }, BORDERLESS: true }]
    }, {
        POSITION: [11, 3, -3, 0, 1],
        TYPE: ["egg", { COLOR: { BRIGHTNESS_SHIFT: -3 }, BORDERLESS: true }]
    }, {
        POSITION: [8, 3.25, -3.25, 0, 1],
        TYPE: ["egg", { COLOR: { BRIGHTNESS_SHIFT: 3 }, BORDERLESS: true }]
    }, {
        POSITION: [6, 3, -3, 0, 1],
        TYPE: ["egg", { COLOR: { BRIGHTNESS_SHIFT: 9 }, BORDERLESS: true }]
    }]
};
Class.cube = {
    PARENT: "food",
    LABEL: "The Cube",
    VALUE: 2e7,
    SIZE: 10,
    COLOR: "egg",
    SHAPE: "M 0.0575 0.0437 V 0.9921 L 0.8869 0.5167 V -0.4306 L 0.0575 0.0437 Z M -0.0583 0.0437 V 0.9921 L -0.8869 0.5159 V -0.4306 L -0.0583 0.0437 Z M 0 -0.0556 L 0.829 -0.5266 L 0 -1 L -0.8254 -0.527 L 0 -0.0556",
    BODY: {
        DAMAGE: 4.8,
        DENSITY: 20,
        HEALTH: 40,
        RESIST: 1.25,
        PENETRATION: 17.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.tetrahedron = {
    PARENT: "food",
    LABEL: "The Tetrahedron",
    VALUE: 3e7,
    SIZE: 12,
    COLOR: "egg",
    SHAPE: "M 0.058 0.044 V 1 L 0.894 -0.434 L 0.058 0.044 Z M -0.0588 0.044 V 1 L -0.894 -0.434 L -0.0588 0.044 Z M 0 -0.056 L 0.8356 -0.5308 L -0.832 -0.5312 L 0 -0.056",
    BODY: {
        DAMAGE: 6,
        DENSITY: 23,
        HEALTH: 50,
        RESIST: 1.25,
        PENETRATION: 22.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
Class.octahedron = {
    PARENT: "food",
    LABEL: "The Octahedron",
    VALUE: 4e7,
    SIZE: 13,
    COLOR: "egg",
    SHAPE: "M 0.06 -0.06 L 0.95 -0.06 L 0.06 -0.95 L 0.06 -0.06 M -0.06 0.06 L -0.06 0.95 L -0.95 0.06 L -0.06 0.06 M -0.06 -0.06 L -0.95 -0.06 L -0.06 -0.95 L -0.06 -0.06 M 0.06 0.06 L 0.06 0.95 L 0.95 0.06 L 0.06 0.06",
    BODY: {
        DAMAGE: 6.5,
        DENSITY: 26,
        HEALTH: 60,
        RESIST: 1.25,
        PENETRATION: 30,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
Class.dodecahedron = {
    PARENT: "food",
    LABEL: "The Dodecahedron",
    VALUE: 5e7,
    SIZE: 18,
    COLOR: "egg",
    SHAPE: "M -0.3273 -0.4318 H 0.3045 L 0.5068 0.1727 L -0.0091 0.5455 L -0.5227 0.1727 L -0.3273 -0.4318 Z M -0.6068 0.2682 L -0.0773 0.6545 V 0.9591 L -0.5955 0.7977 L -0.9136 0.3545 L -0.6068 0.2682 Z M 0.5909 0.2682 L 0.0523 0.6591 V 0.9636 L 0.5773 0.7955 L 0.8955 0.3545 L 0.5909 0.2682 Z M -0.65 0.1455 L -0.4477 -0.4818 L -0.6318 -0.7505 L -0.9545 -0.3182 V 0.2318 L -0.65 0.1455 Z M 0.4273 -0.4841 L 0.6318 0.1455 L 0.9341 0.2341 V -0.3136 L 0.6145 -0.7591 L 0.4273 -0.4841 Z M -0.0091 -1 L -0.5318 -0.8341 L -0.3455 -0.5609 H 0.3227 L 0.5159 -0.8314 L -0.0091 -1",
    BODY: {
        DAMAGE: 7,
        DENSITY: 28,
        HEALTH: 70,
        RESIST: 1.25,
        PENETRATION: 32.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.icosahedron = {
    PARENT: "food",
    LABEL: "The Icosahedron",
    VALUE: 1e8,
    SIZE: 20,
    COLOR: "egg",
    SHAPE: "M 0 0.65 L -0.563 -0.325 L 0.563 -0.325 Z M -0.866 0.5 L -0.108 0.653 L -0.619 -0.233 Z M 0.679 -0.332 L 0.906 0.331 L 0.892 -0.455 Z M 0.627 -0.422 L 0.166 -0.95 L 0.84 -0.545 Z M 0.866 0.5 L 0.619 -0.233 L 0.108 0.653 Z M -0.627 -0.422 L -0.166 -0.95 L -0.84 -0.545 Z M -0.679 -0.332 L -0.906 0.331 L -0.892 -0.455 Z M 0 -1 L -0.511 -0.42 L 0.511 -0.42 Z M -0.052 0.754 L -0.74 0.619 L -0.052 1 Z M 0.052 0.754 L 0.74 0.619 L 0.052 1 Z",
    BODY: {
        DAMAGE: 9,
        DENSITY: 30,
        HEALTH: 80,
        RESIST: 1.25,
        PENETRATION: 35,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};

// RELICS
for (let [gemColor, name] of [
    [undefined, ""],
    ["powerGem", "Power"],
    ["spaceGem", "Space"],
    ["realityGem", "Reality"],
    ["soulGem", "Soul"],
    ["timeGem", "Time"],
    ["mindGem", "Mind"]
]) {
    let gem;
    if (gemColor) {
        gem = Class[name + "Gem"] = {
            PARENT: 'gem',
            LABEL: name + ' Gem',
            SHAPE: 6,
            COLOR: gemColor
        }
    }

    Class[name + "EggRelic"] = makeRelic("egg", 0.5, gem, 7);
    Class[name + "SquareRelic"] = makeRelic("square", 1, gem);
    Class[name + "TriangleRelic"] = makeRelic("triangle", 1.45, gem);
    Class[name + "PentagonRelic"] = makeRelic("pentagon", -0.6, gem);
    Class[name + "BetaPentagonRelic"] = makeRelic("betaPentagon", -0.6, gem);
    Class[name + "AlphaPentagonRelic"] = makeRelic("alphaPentagon", -0.6, gem);
}

// 4D
Class.tesseract = {
    PARENT: "food",
    LABEL: "The Tesseract",
    VALUE: 42e7,
    SIZE: 25,
    COLOR: "egg",
    SHAPE: "M -0.43 0.35 L -0.71 0.63 L -0.71 -0.63 L -0.43 -0.35 L -0.43 0.35 M -0.35 0.43 L -0.63 0.71 L 0.63 0.71 L 0.35 0.43 L -0.35 0.43 M 0.35 -0.43 L 0.63 -0.71 L -0.63 -0.71 L -0.35 -0.43 L 0.35 -0.43 M 0.43 -0.35 L 0.71 -0.63 L 0.71 0.63 L 0.43 0.35 L 0.43 -0.35 M 0.32 0.32 L 0.32 -0.32 L -0.32 -0.32 L -0.32 0.32 L 0.32 0.32",
    BODY: {
        DAMAGE: 10,
        DENSITY: 40,
        RESIST: 1.25,
        HEALTH: 200,
        PENETRATION: 50,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};

// LABY
let polyNames = [ "egg", "square", "triangle", "pentagon", "hexagon" ],
    shinyNames = [ "", "shiny", "legendary", "shadow", "rainbow", "trans" ];
for (let tier = 0; tier < 6; tier++) {
    for (let poly in polyNames) {

        let polyName = polyNames[poly];
        polyName = polyName[0].toUpperCase() + polyName.slice(1);

        for (let shiny in shinyNames) {

            let shinyName = shinyNames[shiny];
            let food = shinyName + polyName;
            food = food[0].toLowerCase() + food.slice(1);

            Class[`laby${tier}${food}`] = // backwards compatability, DO NOT ADD A SEMICOLON HERE. javascript is funny about whitespace characters :))))))
            Class[`laby_${poly}_${tier}_${shiny}_0`] = makeLaby(Class[food], tier, (polyName == "Triangle" && tier > 0) ? 2/3 : 1);

            Class[`laby_${poly}_${tier}_${shiny}_1`] = makeCrasher(Class[`laby_${poly}_${tier}_${shiny}_0`]);
        }
    }
}