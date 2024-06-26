let spawnPermanentAntiTankMachineGun = (loc) => {
    let o = new Entity(loc);
    o.define('antiTankMachineGun');
    o.controllers = [new ioTypes.nearestDifferentMaster(o)]
    o.team = TEAM_ROOM;
    o.color.base = getTeamColor(TEAM_RED);
    o.on('dead', () => spawnPermanentAntiTankMachineGun(loc));
},

atmg = new Tile({ color: "#C5C5C5", init: tile => spawnPermanentAntiTankMachineGun(tile.loc) }),

// we are not yet advanced enough to transition between two color codes
outside = new Tile({ color: "#C5C5C5" }),

bossSpawn = new Tile({
    color: getTeamColor(TEAM_RED),
    init: tile => {
        if (!room.spawnable[TEAM_ENEMIES]) room.spawnable[TEAM_ENEMIES] = [];
        room.spawnable[TEAM_ENEMIES].push(tile);
    },
    /*tick: tile => {
        for (let i = 0; i < tile.entities.length; i++) {
            let entity = tile.entities[i];
            if (!entity.isBoss && !entity.isArenaCloser) entity.kill();
        }
    }*/
    tick: tile => {
        for (let i = 0; i < tile.entities.length; i++) {
            let entity = tile.entities[i];
            if (entity.pushability && !entity.immuneToTiles && !entity.master.immuneToTiles) {
                let dirToCenter = Math.atan2(room.center.y - entity.y, room.center.x - entity.x);
                entity.velocity.x = Math.cos(dirToCenter) * 25 * entity.pushability;
                entity.velocity.y = Math.sin(dirToCenter) * 25 * entity.pushability;
            }
        }
    }
});

module.exports = { bossSpawn, outside, atmg };
