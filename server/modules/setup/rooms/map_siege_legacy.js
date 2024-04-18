let { bossSpawn:   b  , atmg:  A  , outside:   o  } = require('../tiles/siege.js'),
    { wall: WALL, nestNoBoss:  n, normal:   _  } = require('../tiles/misc.js'),
	{ base1:   s  } = require('../tiles/tdm.js'),

room = [
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,WALL,WALL,WALL,WALL,WALL,  o ,  o ,  o ,  o ,  o ,  o ,  o ],
    [  o ,  A ,  o ,  o ,  o ,  o ,  o ,WALL,  b ,  b ,  b ,WALL,  o ,  o ,  o ,  o ,  o ,  A ,  o ],
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,WALL,  b ,  b ,  b ,WALL,  o ,  o ,  o ,  o ,  o ,  o ,  o ],
    [  o ,  o ,  o ,  o ,WALL,WALL,WALL,WALL,  b ,  b ,  b ,WALL,WALL,WALL,WALL,  o ,  o ,  o ,  o ],
    [  o ,  o ,  o ,WALL,WALL,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,WALL,WALL,  o ,  o ,  o ],
    [  o ,  o ,  o ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  o ,  o ,  o ],
    [  o ,  o ,  o ,WALL,  _ ,  _ ,  s ,  n ,  n ,  n ,  n ,  n ,  s ,  _ ,  _ ,WALL,  o ,  o ,  o ],
    [WALL,WALL,WALL,WALL,WALL,  _ ,  n ,  _ ,  _ ,  _ ,  _ ,  _ ,  n ,  _ ,WALL,WALL,WALL,WALL,WALL],
    [WALL,  b ,  b ,  b ,  _ ,  _ ,  n ,  _ ,  _ ,  _ ,  _ ,  _ ,  n ,  _ ,  _ ,  b ,  b ,  b ,WALL],
    [WALL,  b ,  b ,  b ,  _ ,  _ ,  n ,  _ ,  _ ,  _ ,  _ ,  _ ,  n ,  _ ,  _ ,  b ,  b ,  b ,WALL],
    [WALL,  b ,  b ,  b ,  _ ,  _ ,  n ,  _ ,  _ ,  _ ,  _ ,  _ ,  n ,  _ ,  _ ,  b ,  b ,  b ,WALL],
    [WALL,WALL,WALL,WALL,WALL,  _ ,  n ,  _ ,  _ ,  _ ,  _ ,  _ ,  n ,  _ ,WALL,WALL,WALL,WALL,WALL],
    [  o ,  o ,  o ,WALL,  _ ,  _ ,  s ,  n ,  n ,  n ,  n ,  n ,  s ,  _ ,  _ ,WALL,  o ,  o ,  o ],
    [  o ,  o ,  o ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  o ,  o ,  o ],
    [  o ,  o ,  o ,WALL,WALL,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,WALL,WALL,  o ,  o ,  o ],
    [  o ,  o ,  o ,  o ,WALL,WALL,WALL,WALL,  b ,  b ,  b ,WALL,WALL,WALL,WALL,  o ,  o ,  o ,  o ],
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,WALL,  b ,  b ,  b ,WALL,  o ,  o ,  o ,  o ,  o ,  o ,  o ],
    [  o ,  A ,  o ,  o ,  o ,  o ,  o ,WALL,  b ,  b ,  b ,WALL,  o ,  o ,  o ,  o ,  o ,  A ,  o ],
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,WALL,WALL,WALL,WALL,WALL,  o ,  o ,  o ,  o ,  o ,  o ,  o ],
];

module.exports = room;