let bases = {},

spawnPermanentBaseProtector = (loc, team) => {
    let o = new Entity(loc);
    o.define('baseProtector');
    o.team = team;
    o.color.base = getTeamColor(team);
    o.on('dead', () => spawnPermanentBaseProtector(loc, team));
};

makeBase = (team, hasProtection) => new Tile({
    color: getTeamColor(team),
    init: tile => {
        if (hasProtection) spawnPermanentBaseProtector(tile.loc, team);
        if (!room.spawnable[team]) room.spawnable[team] = [];
        room.spawnable[team].push(tile);
    },
    tick: tile => {
    	for (let i = 0; i < tile.entities.length; i++) {
    		let entity = tile.entities[i];
    		if (entity.team != team && isPlayerTeam(entity.team) && !entity.immuneToTiles && !entity.master.immuneToTiles) entity.kill();
    	}
    }
});

for (let i = 1; i < 9; i++) {
	bases['base' + i] = makeBase(-i, false);
	bases['base' + i + 'protected'] = makeBase(-i, true);
}

module.exports = bases;