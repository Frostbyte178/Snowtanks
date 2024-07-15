let bossRush;
if (Config.SPECIAL_BOSS_SPAWNS) bossRush = new BossRush();
let train;
if (Config.TRAIN) train = new Train();
let moon;
if (Config.SPACE_MODE) moon = new Moon();
let hunt;
if (Config.HUNT) hunt = new ManHunt();

if (Config.MOTHERSHIP_LOOP) mothershipLoop.spawn();
if (Config.SPECIAL_BOSS_SPAWNS) bossRush.init();
if (Config.MAZE > 0) generateMaze(Config.MAZE);
if (Config.UNDERGROUND_WIDTH > 0 && Config.UNDERGROUND_HEIGHT > 0) generateFrontierMaze(Config.UNDERGROUND_WIDTH, Config.UNDERGROUND_HEIGHT);

// Below maze generation because it relies on the maze data
let portalLoop;
if (Config.PORTAL_SPAWNS) {
    portalLoop = new PortalLoop();
    portalLoop.init();
};

let logHistory = [];
const gamemodeLoop = function() {
    logs.gamemodeLoop.startTracking();
    if (Config.HUNT) hunt.loop();
    if (Config.TRAIN) train.loop();
    if (Config.SPACE_MODE) moon.loop();
    if (Config.MOTHERSHIP_LOOP) mothershipLoop.loop();
    if (Config.SPECIAL_BOSS_SPAWNS) bossRush.loop();
    logs.gamemodeLoop.endTracking();

    let logTime = logs.gamemodeLoop.sumLogTimes();
    if (logTime > 100) {
        console.log("Gamemode loop is taking a long time!");
        console.log(`Gamemode loop took ${logTime}ms to complete!`);
        console.log(`Gamemode loop log history: (Last ${logHistory.length} entries)`);

        logHistory.push({at: performance.now(), time: logTime});
        if (logHistory.length > 10) {
            logHistory.shift();
        }

        console.log(logHistory.map(entry => `Run at: ${entry.at}. Time: ${entry.time}.`).join("\n"));
    }
};

module.exports = { gamemodeLoop };