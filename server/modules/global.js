// Global Utilities Requires
let EventEmitter = require('events');
global.events = new EventEmitter();
global.ran = require(".././lib/random.js");
global.util = require(".././lib/util.js");
global.hshg = require(".././lib/hshg.js");
global.protocol = require(".././lib/fasttalk.js");

// Global Variables (These must come before we import from the modules folder.)
global.fps = "Unknown";
global.minimap = [];
global.entities = [];
global.walls = [];
global.views = [];
global.chats = {};
global.entitiesToAvoid = [];
global.grid = new hshg.HSHG();
global.arenaClosed = false;
global.mockupsLoaded = false;

global.loadedAddons = [];
global.TEAM_BLUE = -1;
global.TEAM_GREEN = -2;
global.TEAM_RED = -3;
global.TEAM_PURPLE = -4;
global.TEAM_YELLOW = -5;
global.TEAM_ORANGE = -6;
global.TEAM_BROWN = -7;
global.TEAM_CYAN = -8;
global.TEAM_ROOM = -100;
global.TEAM_ENEMIES = -101;
global.getSpawnableArea = team => ran.choose((team in room.spawnable && room.spawnable[team].length) ? room.spawnable[team] : room.spawnableDefault).randomInside();
global.getTeamName = team => ["BLUE", "GREEN", "RED", "PURPLE", "YELLOW", "ORANGE", "BROWN", "CYAN"][-team - 1] || "An unknown team";
global.getTeamColor = team => ([10, 11, 12, 15, 25, 26, 27, 28][-team - 1] || 3);
global.isPlayerTeam = team => /*team < 0 && */team > -9;
global.getWeakestTeam = () => {
    let teamcounts = {};
    for (let i = -c.TEAMS; i < 0; i++) {
        teamcounts[i] = 0;
    }
    for (let o of entities) {
        if ((o.isBot || o.isPlayer) && o.team in teamcounts && o.team < 0 && isPlayerTeam(o.team)) {
            if (!(o.team in teamcounts)) {
                teamcounts[o.team] = 0;
            }
            teamcounts[o.team]++;
        }
    }
    teamcounts = Object.entries(teamcounts);
    let lowestTeamCount = Math.min(...teamcounts.map(x => x[1])),
        entries = teamcounts.filter(a => a[1] == lowestTeamCount);
    return parseInt(!entries.length ? -Math.ceil(Math.random() * c.TEAMS) : ran.choose(entries)[0]);
};

global.Tile = class Tile {
    constructor (args) {
        this.args = args;
        if ("object" !== typeof this.args) {
            throw new Error("First argument has to be an object!");
        }

        this.color = args.color;
        this.data = args.data || {};
        if ("object" !== typeof this.data) {
            throw new Error("'data' property must be an object!");
        }
        this.init = args.init || (()=>{});
        if ("function" !== typeof this.init) {
            throw new Error("'init' property must be a function!");
        }
        this.tick = args.tick || (()=>{});
        if ("function" !== typeof this.tick) {
            throw new Error("'tick' property must be a function!");
        }
    }
}

global.tickIndex = 0;
global.tickEvents = new EventEmitter();
global.syncedDelaysLoop = () => tickEvents.emit(tickIndex++);
global.setSyncedTimeout = (callback, ticks = 0, ...args) => tickEvents.once(tickIndex + Math.round(ticks), () => callback(...args));

function TO_SCREAMING_SNAKE_CASE(TEXT) {
    if (/^[A-Z_]*[A-Z]$/.test(TEXT)) {
        return TEXT;
    } else if (/[a-zA-Z]+/.test(TEXT)) {
        return TEXT.replace(/[A-Z]/g, _ => '_' + _).toUpperCase();
    }
}

global.c = new Proxy(new EventEmitter(), {
    get (obj, prop) {
        return obj[TO_SCREAMING_SNAKE_CASE(prop)];
    },
    set (obj, prop, value) {
        let abort;
        prop = TO_SCREAMING_SNAKE_CASE(prop);

        events.emit('change', {
            setting: prop,
            newValue: value,
            oldValue: obj[prop],
            preventDefault: () => abort = true
        });

        if (!abort) {
            obj[prop] = value;
        }
    }
});
global.c.port = process.env.PORT;
global.Config = global.c;

for (let [key, value] of Object.entries(require('./setup/config.js'))) {
    if (key in EventEmitter.prototype) {
        util.warn(`Configuration contains "${key}", which is in 'EventEmitter.prototype' and its value is therefore discarded.`);
    } else {
        global.c[key] = value;
    }
}

global.Class = {};
global.ensureIsClass = str => {
    if ("object" == typeof str) {
        return str;
    }
    if (str in Class) {
        return Class[str];
    }
    console.log('Definitions:');
    console.log(Class);
    throw Error(`Definition ${str} is attempted to be gotten but does not exist!`);
}
global.makeHitbox = wall => {
    const _size = wall.size + 4;
    //calculate the relative corners
    let relativeCorners = [
            Math.atan2(    _size,     _size) + wall.angle,
            Math.atan2(0 - _size,     _size) + wall.angle,
            Math.atan2(0 - _size, 0 - _size) + wall.angle,
            Math.atan2(    _size, 0 - _size) + wall.angle
        ],
        distance = Math.sqrt(_size ** 2 + _size ** 2);

    //convert 4 corners into 4 lines
    for (let i = 0; i < 4; i++) {
        relativeCorners[i] = {
            x: distance * Math.sin(relativeCorners[i]),
            y: distance * Math.cos(relativeCorners[i])
        };
    }

    wall.hitbox = [
        [relativeCorners[0], relativeCorners[1]],
        [relativeCorners[1], relativeCorners[2]],
        [relativeCorners[2], relativeCorners[3]],
        [relativeCorners[3], relativeCorners[0]]
    ];
    wall.hitboxRadius = distance;
}

// Now that we've set up the global variables, we import all the modules, then put them into global varialbles and then export something just so this file is run.
const requires = [
    "./physics/relative.js", // Some basic physics functions that are used across the game.
    "./physics/collisionFunctions.js", // The actual collision functions that make the game work.
    "./live/color.js", // The class that makes dealing with colors easier.
    "./live/entitySubFunctions.js", // Skill, HealthType and other functions related to entities are here.
    "./live/controllers.js", // The AI of the game.
    "./live/entity.js", // The actual Entity constructor.
    "./definitions/combined.js", // Class dictionary.
    "./setup/room.js", // These are the basic room functions, set up by config.json
    "./network/sockets.js", // The networking that helps players interact with the game.
    "./network/webServer.js", // The networking that actually hosts the server.
    "./setup/mockups.js", // This file loads the mockups.
    "./debug/logs.js", // The logging pattern for the game. Useful for pinpointing lag.
    "./debug/speedLoop.js", // The speed check loop lmao.
    "./gamemodes/bossRush.js", // Boss Rush
    "./gamemodes/maze.js", // Maze
    "./gamemodes/mothership.js", // The mothership mode
    "./gamemodes/manhunt.js", // The Manhunt mode
    "./gamemodes/trainwars.js", // The Train Wars mode
    "./gamemodes/moon.js", // The Space mode
    "./gamemodes/gamemodeLoop.js", // The gamemode loop.
    "./gamemodes/groups.js", // Duos/Trios/Squads
    "./gamemodes/tag.js", // Tag
    "./gamemodes/closeArena.js", // Arena Closing mechanics
];

for (let file of requires) {
    const module = require(file);
    if (module.init) module.init(global);
    for (let key in module) {
        if (module.hasOwnProperty(key)) global[key] = module[key];
    }
}

module.exports = { creationDate: new Date() };
