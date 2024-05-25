let checkMazeForBlocks = (initX, initY, size, maze) => {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                if (!maze[initY + y] || !maze[initY + y][initX + x]) return;
            }
        }
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                maze[initY + y][initX + x] = false;
            }
        }
        maze[initY][initX] = size;
    },
    generateMaze = (size) => {
        let maze = JSON.parse(JSON.stringify(Array(size).fill(Array(size).fill(true))));
        let activeLocsThatWeCantPlaceIn = 0;
        maze[0] = Array(size).fill(false);
        maze[size - 1] = Array(size).fill(false);
        maze[Math.floor(size * 0.15)] = [true, true, true, true, true, true, ...Array(size - 12).fill(false), true, true, true, true, true, true];
        maze[size - Math.floor(size * 0.15)] = [true, true, true, true, true, true, ...Array(size - 12).fill(false), true, true, true, true, true, true];
        maze[Math.floor(size * 0.5)] = Array(size).fill(false);
        let e = 0.25;
        let d = 0.4;
        maze[Math.floor(size * e)] = Array(size).fill(false);
        maze[Math.floor(size * (1 - e))] = Array(size).fill(false);
        maze[Math.floor(size * d)] = Array(size).fill(false);
        maze[Math.floor(size * (1 - d))] = Array(size).fill(false);
        for (let line of maze) {
            let i = maze.indexOf(line);
            line[0] = 0;
            line[size - 1] = 0;
            if (i > 6 && i < size - 6) line[Math.floor(size * 0.15)] = false;
            if (i > 6 && i < size - 6) line[size - Math.floor(size * 0.15)] = false;
            if (i > 6 && i < size - 6) line[Math.floor(size * e)] = false;
            if (i > 6 && i < size - 6) line[Math.floor(size * (1 - e))] = false;
            if (i > 6 && i < size - 6) line[Math.floor(size * d)] = false;
            if (i > 6 && i < size - 6) line[Math.floor(size * (1 - d))] = false;
            line[Math.floor(size * 0.5)] = false;
        }
        let center = Math.floor(size * (size === 16 ? 0.4 : 0.5));
        for (let x = 0; x < Math.floor(size * 0.1); x++)
            for (let y = 0; y < Math.floor(size * 0.1); y++) {
                maze[center + x][center + y] = false;
                maze[center - x][center - y] = false;
                maze[center + x][center - y] = false;
                maze[center - x][center + y] = false;
            }
        let cells = 0;
        for (let row of maze)
            for (let cell of row)
                if (cell) cells++;
        let eroded = 0;
        let toErode = cells * 0.55;
        toErode -= activeLocsThatWeCantPlaceIn * 10;
        if (toErode < 0) generateMaze(size + 1);
        for (let i = 0; i < toErode; i++) {
            if (eroded >= toErode) {
                console.log("Done!");
                break;
            }
            for (let i = 0; i < 10000; i++) {
                let x = Math.floor(Math.random() * size);
                let y = Math.floor(Math.random() * size);
                if (maze[x][y]) continue;
                if ((x === 0 || x === size - 1) && (y === 0 || y === size - 1)) continue;
                let direction = Math.floor(Math.random() * 4);
                if (x === 0) direction = 0;
                else if (y === 0) direction = 1;
                else if (x === size - 1) direction = 2;
                else if (y === size - 1) direction = 3;
                let tx = direction === 0 ? x + 1 : direction === 2 ? x - 1 : x;
                let ty = direction === 1 ? y + 1 : direction === 3 ? y - 1 : y;
                if (maze[tx][ty] !== true) continue;
                maze[tx][ty] = false;
                eroded++;
                break;
            }
        }
        if (eroded) {
            // Convert to big walls
            for (let x = 0; x < size - 1; x++) {
                for (let y = 0; y < size - 1; y++) {
                    for (s = 5; s >= 2; s--) checkMazeForBlocks(x, y, s, maze);
                }
            }
            for (let x = 0; x < size; x++) {
                for (let y = 0; y < size; y++) {
                    let spawnWall = false,
                        d = {},
                        scale = room.width / size;

                    // Find spawn location and size
                    for (let s = 5; s >= 1; s--) {
                        if (maze[x][y] == s) {
                            d = {
                                x: (x * scale) + (scale * s / 2),
                                y: (y * scale) + (scale * s / 2),
                                s: scale * s,
                            };
                            spawnWall = true;
                            break
                        }
                    }
                    if (spawnWall && room.getAt(d).data.allowMazeWallSpawn) {
                        let o = new Entity({
                            x: d.x,
                            y: d.y
                        });
                        o.define("wall");
                        o.SIZE = d.s * 0.5 / lazyRealSizes[4] * 1.414 - 2;
                        o.team = TEAM_ENEMIES;
                        o.protect();
                        o.life();
                        makeHitbox(o);
                        walls.push(o);
                    }
                }
            }
        }
    };

module.exports = { generateMaze };