let fails = 0;
const speedcheckloop = () => {
    let activationtime = logs.activation.sum(),
        collidetime = logs.collide.sum(),
        movetime = logs.entities.sum(),
        playertime = logs.network.sum(),
        maptime = logs.minimap.sum(),
        physicstime = logs.physics.sum(),
        lifetime = logs.life.sum(),
        selfietime = logs.selfie.sum();
    let sum = logs.master.record();
    let loops = logs.loops.count(),
        active = logs.entities.count();
    global.fps = (1000 / sum).toFixed(2);
    if (sum > 1000 / c.runSpeed / 30) {
        //fails++;
        if (c.LOGS) {
            util.warn('~~ LAST SERVER TICK TOOK TOO LONG TO CALCULATE ~~');
            util.warn('~~ LOOPS: ' + loops + '. ENTITIES: ' + entities.length + '//' + Math.round(active / loops) + '. VIEWS: ' + views.length + '. BACKLOGGED :: ' + (sum * c.runSpeed * 3).toFixed(3) + '%! ~~');
            util.warn('Total activation time: ' + activationtime);
            util.warn('Total collision time: ' + collidetime);
            util.warn('Total cycle time: ' + movetime);
            util.warn('Total player update time: ' + playertime);
            util.warn('Total lb+minimap processing time: ' + maptime);
            util.warn('Total entity physics calculation time: ' + physicstime);
            util.warn('Total entity life+thought cycle time: ' + lifetime);
            util.warn('Total entity selfie-taking time: ' + selfietime);
            util.warn('Total time: ' + (activationtime + collidetime + movetime + playertime + maptime + physicstime + lifetime + selfietime));
        }
        if (fails > 60) {
            util.error("FAILURE!");
            //process.exit(1);
        }
    } else {
        fails = 0;
    }
};

module.exports = {
    speedcheckloop
};