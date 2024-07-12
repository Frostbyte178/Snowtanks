let { pickFromChanceSet, spawnNatural } = require('./misc.js'),

spawnUndergroundNatural = (tile, layeredSet, kind) => {
    let o = new Entity(tile.randomInside());
    o.define(pickFromChanceSet(pickFromChanceSet(layeredSet)));
    
    tile.data.foodSpawnCooldown = 0;
    o.facing = ran.randomAngle();
    o.team = TEAM_ENEMIES;
    o.on('dead', () => tile.data[kind + 'Count']--);
    tile.data[kind + 'Count']++;
    // Abort if colliding
    for (let entity of frontierMazeWalls) {
        if (entity.type == 'wall' && Math.abs(o.x - entity.x) < (entity.size + o.size) && Math.abs(o.y - entity.y) < (entity.size + o.size)) {
            o.kill();
        }
    }
    return o;
},

undergroundTick = tile => {
    if (++tile.data.foodSpawnCooldown > Config.FOOD_SPAWN_COOLDOWN_UNDERGROUND) {
        if (tile.data.foodCount < Config.FOOD_CAP_UNDERGROUND && Math.random() < Config.FOOD_SPAWN_CHANCE_UNDERGROUND) {
            spawnUndergroundNatural(tile, Config.FOOD_TYPES_UNDERGROUND, 'food');
        }
    }
},

inkTick = tile => {
    if (++tile.data.foodSpawnCooldown > Config.FOOD_SPAWN_COOLDOWN_INK) {
        tile.data.foodSpawnCooldown = 0;
        if (tile.data.foodCount < Config.FOOD_CAP_INK && Math.random() < Config.FOOD_SPAWN_CHANCE_INK) {
            spawnNatural(tile, Config.FOOD_TYPES_INK, 'food');
        }
    }
},

underground = new Tile({
    color: "grey",
    data: {
        allowMazeWallSpawn: true,
        foodSpawnCooldown: 0, foodCount: 0,
    },
    tick: undergroundTick
}),

ink = new Tile({
    color: "black",
    data: {
        allowMazeWallSpawn: true,
        foodSpawnCooldown: 0, foodCount: 0,
        enemySpawnCooldown: -Config.FOOD_SPAWN_COOLDOWN_INK, enemyCount: 0
    },
    tick: inkTick
});

module.exports = {underground, ink}
