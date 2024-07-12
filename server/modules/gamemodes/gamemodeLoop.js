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

let logger = new LagLogger();
const gamemodeLoop = function() {
    logger.set();
    if (Config.HUNT) hunt.loop();
    if (Config.TRAIN) train.loop();
    if (Config.SPACE_MODE) moon.loop();
    if (Config.MOTHERSHIP_LOOP) mothershipLoop.loop();
    if (Config.SPECIAL_BOSS_SPAWNS) bossRush.loop();
    logger.mark();
    if (logger.totalTime > 100) {
        console.log("Gamemode loop is taking a long time!");
        console.log(`Gamemode loop took ${logger.totalTime}ms to complete!`);
        console.log(`Gamemode loop log history: (Last ${logger.sum.length} entries)`);
        console.log(logger.sum.map(entry => `Run at: ${entry.at}. Time: ${entry.time}.`).join("\n"));
    }
};

module.exports = { gamemodeLoop };