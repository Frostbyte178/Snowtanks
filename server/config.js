module.exports = {
    // Server

    // Game server domain.
    // If 'localhost:NUMBER', the port must equal the port setting.
    host: "localhost:26301",

    // Which port to run the web server on.
    port: 26301,

    // How often to update the list of the entities that players can see.
    // Has effects of when entities are activated.
    visibleListInterval: 250,

    // How long (in ms) a socket can be disconnected without their player dying.
    maxHeartbeatInterval: 300000,

    // Flatten entity definition, which gets rid of PARENT attributes and applies the parents' attributes to the entity definition, if they're not set in the entity already.
    flattenDefintions: false,

    // The \modules\setup\gamemodeconfigs\ files to load.
    // To change specific things about specific gamemodes (such as team count for tdm), edit their config file in \modules\setup\gamemodeconfigs\.
    GAME_MODES: ['tdm', 'domination'],

    // The room files to load in the setup/rooms folder.
    // NOTE: If a /gamemodeconfig/ file "replaces" the value of ROOM_SETUP, it just adds its own ROOM_SETUP's content to this array.
    // NOTE: Files starting with `map_` are maps. files starting with `overlay_` are overlays that get added on.
    // NOTE: These prefixes are only for categorisation, a room file would work the same regardless of its prefix. APS++ does nothing based on file name prefixes.
    ROOM_SETUP: ['map_apspp_default'],

    // The dimensions of a single tile on the map.
    TILE_WIDTH: 400,
    TILE_HEIGHT: 400,



    // Miscellaneous

    // How long a entity chat message lasts in milliseconds.
    // Includes the fade-out period.
    CHAT_MESSAGE_DURATION: 30_000,

    // If you don't want your players to color their messages.
    // They get sanitized after addons interpret them, but before they're added to the chat message dictionary.
    SANITIZE_CHAT_MESSAGE_COLORS: true,

    // If someone tries to get a file that does not exist, send them this instead.
    DEFAULT_FILE: 'index.html',

    // Window name of the server terminal.
    WINDOW_NAME: 'OSA Game Server Instance',

    // Allows you to type and run javascript code in the terminal.
    REPL_WINDOW: false,

    // Welcome message once a player spawns.
    WELCOME_MESSAGE: "You have spawned! Welcome to the game.\n"
                    +"You will be invulnerable until you move or shoot.\n"
                    +"Please report any bugs you encounter!",
    
    // How long a popup message lasts before fading out in milliseconds.
    MESSAGE_DISPLAY_TIME: 10_000,
    

    // Physics

    // General multiplier for acceleration and max speeds.
    runSpeed: 1.5,

    // General damage multiplier everytime damage is dealt.
    DAMAGE_CONSTANT: 0.5,

    // General knockback multiplier everytime knockback is applied.
    KNOCKBACK_CONSTANT: 1.5,

    // TODO: Figure out how the math behind this works.
    GLASS_HEALTH_FACTOR: 2,

    // How strong the force is that confines entities to the map and portals apply to entities.
    ROOM_BOUND_FORCE: 0.01,



    // Gameplay

    // When an entity reaches a level, this function is called and returns how many points that entity gets for reaching that level.
    LEVEL_SKILL_POINT_FUNCTION: level => {
        if (level < 2) return 0;
        if (level <= 40) return 1;
        if (level <= 45 && level & 1 == 1) return 1;
        return 0;
    },

    // Default skill caps.
    MAX_SKILL: 9,

    // Amount of tank tiers.
    MAX_UPGRADE_TIER: 9,

    // Level difference between each tier.
    TIER_MULTIPLIER: 15,

    // Max normally achievable level.
    LEVEL_CAP: 45,

    // Max level you get by level-up key and auto-level-up.
    LEVEL_CHEAT_CAP: 45,

    // Amount of player-bots to spawn.
    BOTS: 0,

    // How much XP player-bots get per second until they reach LEVEL_CAP.
    BOT_XP: 125,

    // The chances of a player-bot upgrading a specific skill when skill upgrades are available.
    BOT_SKILL_UPGRADE_CHANCES: [ 1, 1, 3, 4, 4, 4, 4, 2, 1, 1],

    // The chances of a player-bot upgrading a specific amount of times before it stops upgrading.
    BOT_CLASS_UPGRADE_CHANCES: [ 1, 5, 20, 37, 37],

    // The prefix of the bot's name.
    BOT_NAME_PREFIX: "[AI] ",

    // The class that players and player-bots spawn as.
    SPAWN_CLASS: "basic",



    // Natural Spawns

    FOOD_CAP: 3, // Max normal food per normal tile.
    FOOD_SPAWN_CHANCE: 0.875, // Likeliness of normal food spawn attempts succeeding.
    FOOD_SPAWN_COOLDOWN: 30, // Cooldown (in game ticks) of food spawn attempts being made.

    FOOD_CAP_NEST: 3, // Max nest food per nest tile.
    FOOD_SPAWN_CHANCE_NEST: 0.25, // Likeliness of nest food spawn attempts succeeding.
    FOOD_SPAWN_COOLDOWN_NEST: 45, // Cooldown (in game ticks) of nest food spawn attempts being made.

    ENEMY_CAP_NEST: 1, // Max nest enemies per nest tile.
    ENEMY_SPAWN_CHANCE_NEST: 0.9, // Likeliness of nest enemies spawn attempts succeeding.
    ENEMY_SPAWN_COOLDOWN_NEST: 60, // Cooldown (in game ticks) of nest enemies spawn attempts being made.

    // Cooldown (in seconds) of boss spawns being announced.
    BOSS_SPAWN_COOLDOWN: 60,
    // The delay (in seconds) between the boss spawns being announced and the bosses actually spawning.
    // NOTE: The spawn message (ex. "A strange trembling...") takes half as long to appear than the boss.
    BOSS_SPAWN_DURATION: 5,

    // The possible food types that can spawn.
    FOOD_TYPES: [
        [2000, [
            [1024, 'egg'], [256, 'square'], [64, 'triangle'], [16, 'pentagon'], [4, 'betaPentagon'], [1, 'alphaPentagon']
        ]],
        [1, [
            [3125, 'gem'], [625, 'shinySquare'], [125, 'shinyTriangle'], [25, 'shinyPentagon'], [5, 'shinyBetaPentagon'], [1, 'shinyAlphaPentagon']
        ]],
        [0.1, [
            [6836, 'jewel'], [1296, 'legendarySquare'], [216, 'legendaryTriangle'], [36, 'legendaryPentagon'], [6, 'legendaryBetaPentagon'], [1, 'legendaryAlphaPentagon']
        ]],
        [0.005, [
            /*[16807, 'egg'], */[2401, 'shadowSquare'], [343, 'shadowTriangle'], [49, 'shadowPentagon'], [7, 'shadowBetaPentagon'], [1, 'shadowAlphaPentagon']
        ]],
        [0.001, [
            /*[65536, 'egg'], */[8192, 'rainbowSquare'], [1024, 'rainbowTriangle'], [64, 'rainbowPentagon'], [8, 'rainbowBetaPentagon'], [1, 'rainbowAlphaPentagon']
        ]],
        [0.0005, [
            [59549, 'egg'], [6561, 'transSquare'], [729, 'transTriangle'], [81, 'transPentagon'], [9, 'transBetaPentagon'], [1, 'transAlphaPentagon']
        ]],
        [0.0001, [
            [100000, 'sphere'], [10000, 'cube'], [1000, 'tetrahedron'], [100, 'octahedron'], [10, 'dodecahedron'], [1, 'icosahedron']
        ]]
    ],

    // The possible nest food types that can spawn.
    FOOD_TYPES_NEST: [
        [1, [
            [16, 'pentagon'], [ 4, 'betaPentagon'], [ 1, 'alphaPentagon']
        ]]
    ],

    // The possible nest enemy types that can spawn.
    ENEMY_TYPES_NEST: [
        [19, [
            [1, 'crasher']
        ]],
        [1, [
            [1, 'sentryGun'], [1, 'sentrySwarm'], [1, 'sentryTrap']
        ]]
    ],

    // The possible boss types that can spawn.
    BOSS_TYPES: [{
        bosses: ["eliteDestroyer", "eliteGunner", "eliteSprayer", "eliteBattleship", "eliteSpawner"],
        amount: [5, 5, 4, 2, 1], chance: 2, nameType: "a",
    },{
        bosses: ["roguePalisade"],
        amount: [4, 1], chance: 1, nameType: "castle",
        message: "A strange trembling...",
    },{
        bosses: ["summoner", "eliteSkimmer", "nestKeeper"],
        amount: [2, 2, 1], chance: 1, nameType: "a",
        message: "A strange trembling...",
    },{
        bosses: ["paladin", "freyja", "zaphkiel", "nyx", "theia"],
        amount: [1], chance: 0.1,
        message: "The world tremors as the celestials are reborn anew!",
    },{
        bosses: ["julius", "genghis", "napoleon"],
        amount: [1], chance: 0.1,
        message: "The darkness arrives as the realms are torn apart!",
    }],



    // Default values for gamemode related stuff.
    // Do not change these, you'll likely break stuff.
    // Change GAME_MODES instead.
    GAMEMODE_NAME_PREFIXES: [],
    SPECIAL_BOSS_SPAWNS: false,
    MOTHERSHIP_LOOP: false,
    RANDOM_COLORS: false,
    SPACE_PHYSICS: false,
    ARENA_TYPE: "rect",
    SPACE_MODE: false,
    GROUPS: false,
    TRAIN: false,
    MAZE: false,
    HUNT: false,
    MODE: "ffa",
    TAG: false
}
