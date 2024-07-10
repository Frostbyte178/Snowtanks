let { nest } = require('../tiles/misc.js'),
	room = Array(Config.roomHeight).fill(() => Array(Config.roomWidth).fill()).map(x => x()),
	nestRadius = 2;

for (let x = Math.floor(Config.roomWidth / 2) - nestRadius; x <= Math.floor(Config.roomWidth / 2) + nestRadius; x++) {
	for (let y = Math.floor(Config.roomHeight / 2) - nestRadius; y <= Math.floor(Config.roomHeight / 2) + nestRadius; y++) {
		room[y][x] = nest;
	}
}

module.exports = room;