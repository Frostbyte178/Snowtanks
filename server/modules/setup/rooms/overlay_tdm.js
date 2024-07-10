let bases = require('../tiles/tdm.js'),
	teams = require('../gamemodeconfigs/tdm.js').TEAMS,
	room = Array(Config.roomHeight).fill(() => Array(Config.roomWidth).fill()).map(x => x()),
	isMaze = Config.GAME_MODES.includes('maze'),
locations = [
	[
		[[ 0 + isMaze,  0 + isMaze], [ 1 + isMaze,  0 + isMaze], [ 0 + isMaze,  1 + isMaze]],
		[[ 1 + isMaze,  1 + isMaze]]
	],[
		[
			[Config.roomHeight - 1 - isMaze, Config.roomWidth - 1 - isMaze], 
			[Config.roomHeight - 2 - isMaze, Config.roomWidth - 1 - isMaze], 
			[Config.roomHeight - 1 - isMaze, Config.roomWidth - 2 - isMaze]
		],
		[[Config.roomHeight - 2 - isMaze, Config.roomWidth - 2 - isMaze]]
	],[
		[
			[ 0 + isMaze, Config.roomWidth - 1 - isMaze], 
			[ 1 + isMaze, Config.roomWidth - 1 - isMaze], 
			[ 0 + isMaze, Config.roomWidth - 2 - isMaze]
		],
		[[ 1 + isMaze, Config.roomWidth - 2 - isMaze]]
	],[
		[
			[Config.roomHeight - 1 - isMaze,  0 + isMaze], 
			[Config.roomHeight - 1 - isMaze,  1 + isMaze], 
			[Config.roomHeight - 2 - isMaze,  0 + isMaze]
		],
		[[Config.roomHeight - 2 - isMaze,  1 + isMaze]]
	],[
		[
			[0 + isMaze,  Math.floor(Config.roomWidth / 2) - 1], 
			[1 + isMaze,  Math.floor(Config.roomWidth / 2)], 
			[0 + isMaze,  Math.floor(Config.roomWidth / 2) + 1]
		],
		[[0 + isMaze,  Math.floor(Config.roomWidth / 2)]]
	],[
		[
			[Math.floor(Config.roomHeight / 2) - 1,  Config.roomWidth - 1 - isMaze], 
			[Math.floor(Config.roomHeight / 2),		 Config.roomWidth - 2 - isMaze], 
			[Math.floor(Config.roomHeight / 2) + 1,  Config.roomWidth - 1 - isMaze]
		],
		[[Math.floor(Config.roomHeight / 2),  Config.roomWidth - 1 - isMaze]]
	],[
		[
			[Config.roomHeight - 1 - isMaze,  Math.floor(Config.roomWidth / 2) - 1], 
			[Config.roomHeight - 2 - isMaze,  Math.floor(Config.roomWidth / 2)], 
			[Config.roomHeight - 1 - isMaze,  Math.floor(Config.roomWidth / 2) + 1]
		],
		[[Config.roomHeight - 1 - isMaze,  Math.floor(Config.roomWidth / 2)]]
	],[
		[
			[Math.floor(Config.roomHeight / 2) - 1,  0 + isMaze], 
			[Math.floor(Config.roomHeight / 2),  	 1 + isMaze], 
			[Math.floor(Config.roomHeight / 2) + 1,  0 + isMaze]
		],
		[[Math.floor(Config.roomHeight / 2),  0 + isMaze]]
	]
];

if (teams === 2 && !isMaze) {
	let baseprotGap = Math.ceil((Config.roomHeight - 1) / 6);
	for (let y = 0; y < Config.roomHeight; y++) {
		room[y][0] = bases.base1;
		room[y][Config.roomWidth - 1] = bases.base2;
	}
	for (let i = -2; i <= 2; i++) {
		let y = Math.floor(Config.roomHeight / 2 - baseprotGap * i);
		room[y][0] = bases.base1protected;
		room[y][Config.roomWidth - 1] = bases.base2protected;
	}
} else {
	for (let i = 1; i <= teams; i++) {
		let [ spawns, protectors ] = locations[i - 1];
		for (let [y, x] of spawns) room[y][x] = bases[`base${i}`];
		for (let [y, x] of protectors) room[y][x] = bases[`base${i}protected`];
	}
}

module.exports = room;
