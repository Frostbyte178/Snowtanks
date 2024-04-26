let { rock, roid } = require('../tiles/decoration.js'),
    { normal: ____, nest } = require('../tiles/misc.js'),
    { underground, ink, barrier } = require('../tiles/theFrontier.js'),
    bases = require('../tiles/tdm.js'),
    { TEAMS: teams, TDM_END: tdmEnd, UNDERGROUND_START: undergroundStart, UNDERGROUND_END: undergroundEnd } = require('../gamemodeconfigs/theFrontier.js'),

// 4T open arena
room = [
    [____,____,____,____,____,____,____,roid,roid,roid,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,roid,roid,roid,roid,roid,____,____,____,____,____,____],
    [____,____,____,rock,____,____,____,____,roid,____,____,____,____,rock,____,____,____],
    [____,____,rock,rock,rock,____,____,____,____,____,____,____,rock,rock,rock,____,____],
    [____,____,____,rock,____,____,____,____,____,____,____,____,____,rock,____,____,____],
    [____,____,____,____,____,____,____,nest,nest,nest,____,____,____,____,____,____,____],
    [____,roid,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,roid,____],
    [roid,roid,____,____,____,nest,nest,nest,nest,nest,nest,nest,____,____,____,roid,roid],
    [roid,roid,roid,____,____,nest,nest,nest,nest,nest,nest,nest,____,____,roid,roid,roid],
    [roid,roid,____,____,____,nest,nest,nest,nest,nest,nest,nest,____,____,____,roid,roid],
    [____,roid,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,roid,____],
    [____,____,____,____,____,____,____,nest,nest,nest,____,____,____,____,____,____,____],
    [____,____,____,rock,____,____,____,____,____,____,____,____,____,rock,____,____,____],
    [____,____,rock,rock,rock,____,____,____,____,____,____,____,rock,rock,rock,____,____],
    [____,____,____,rock,____,____,____,____,roid,____,____,____,____,rock,____,____,____],
    [____,____,____,____,____,____,roid,roid,roid,roid,roid,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,roid,roid,roid,____,____,____,____,____,____,____]
];

// Base drawing
locations = [
	[
		[[ 0,  0], [ 1,  0], [ 0,  1], [ 1,  1], [ 2,  1], [ 1,  2]],
		[[ 0,  2], [ 2,  0]]
	],[
		[[16, 16], [15, 16], [16, 15], [15, 15], [14, 15], [15, 14]],
		[[14, 16], [16, 14]]
	],[
		[[ 0, 16], [ 1, 16], [ 0, 15], [ 1, 15], [ 2, 15], [ 1, 14]],
		[[ 2, 16], [ 0, 14]]
	],[
		[[16,  0], [15,  0], [16,  1], [15,  1], [14,  1], [15,  2]],
		[[16,  2], [14,  0]]
	]
];

for (let i = 1; i <= teams; i++) {
	let [ spawns, protectors ] = locations[i - 1];
	for (let [y, x] of spawns) room[y][x] = bases[`base${i}`];
	for (let [y, x] of protectors) room[y][x] = bases[`base${i}protected`];
}

// Add underground tiles
for (let row of room) {
    for (let i = tdmEnd; i < undergroundStart; i++) row.push(barrier);
    for (let i = undergroundStart; i < undergroundEnd; i++) row.push(underground);
}

// Add ink tiles
for (let row of room) {
    for (let i = undergroundEnd; i < 68; i++) row.push(ink);
}

module.exports = room;