let { portal } = require('../tiles/portal.js'),

room = Array(Config.roomHeight).fill(() => Array(Config.roomWidth).fill()).map(x => x());

room[Math.floor(Config.roomHeight / 4)][Math.floor(Config.roomWidth / 4)] = 
room[Math.floor(3 * Config.roomHeight / 4)][Math.floor(Config.roomWidth / 4)] = 
room[Math.floor(3 * Config.roomHeight / 4)][3 * Math.floor(Config.roomWidth / 4)] = 
room[Math.floor(Config.roomHeight / 4)][Math.floor(3 * Config.roomWidth / 4)] = 
room[Math.floor(Config.roomHeight / 2)][Math.floor(Config.roomWidth / 2)] = 
portal;

module.exports = room;