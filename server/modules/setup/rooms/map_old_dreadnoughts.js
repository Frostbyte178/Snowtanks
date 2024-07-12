let { nest } = require('../tiles/misc.js'),
    { open: ____, labyrinth, forge, outOfBounds } = require('../tiles/old_dreadnoughts.js'),
    teams = require('../gamemodeconfigs/old_dreadnoughts.js').TEAMS,
    bases = require('../tiles/tdm.js'),

room = [
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,____],
    [____,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,____],
    [____,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,____],
    [____,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,____],
    [____,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____]
];
Config.roomHeight = room.length;
Config.roomWidth = room[0].length;

let locations = [
    [
        [[ 0,  0], [ 1,  0], [ 0,  1]],
        [[ 1,  1]]
    ],[
        [
            [Config.roomHeight - 1, Config.roomWidth - 1], 
            [Config.roomHeight - 2, Config.roomWidth - 1], 
            [Config.roomHeight - 1, Config.roomWidth - 2]
        ],
        [[Config.roomHeight - 2, Config.roomWidth - 2]]
    ],[
        [
            [ 0, Config.roomWidth - 1], 
            [ 1, Config.roomWidth - 1], 
            [ 0, Config.roomWidth - 2]
        ],
        [[ 1, Config.roomWidth - 2]]
    ],[
        [
            [Config.roomHeight - 1,  0], 
            [Config.roomHeight - 1,  1], 
            [Config.roomHeight - 2,  0]
        ],
        [[Config.roomHeight - 2,  1]]
    ]
];

if (teams === 2) {
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

for (let row in room) {
    if (row < 11 && row >= 4) {
        room[row].unshift(...Array(4).fill(outOfBounds), ...Array(7).fill(forge), ...Array(4).fill(outOfBounds));
    } else {
        room[row].unshift(...Array(Config.roomWidth).fill(outOfBounds));
    }
}
for (let row of room) {
    row.unshift(...Array(Config.roomWidth).fill(labyrinth));
}

Config.FOOD_TYPES_NEST = [
    [1, [
        [4, 'pentagon'], [ 12, 'betaPentagon'], [ 8, 'alphaPentagon'], [ 5, 'hexagonOfficialV1'], [ 4, 'heptagonOfficialV1'], [ 3, 'octagonOfficialV1'], [ 2, 'nonagonOfficialV1']
    ]]
];

require('../../gamemodes/oldDreadnoughts.js');

module.exports = room;