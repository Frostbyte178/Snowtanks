class Logger {
    constructor() {
        this.logTimes = [];
        this.trackingStart = performance.now();
        this.tallyCount = 0;
    }
    startTracking() {
        this.trackingStart = performance.now();
    }
    endTracking() {
        this.logTimes.push(performance.now() - this.trackingStart);
    }
    averageLogTimes() {
        let average = util.averageArray(this.logTimes);
        this.logTimes = [];
        return average;
    }
    sumLogTimes() {
        let sum = util.sumArray(this.logTimes);
        this.logTimes = [];
        return sum;
    }
    tally() {
        this.tallyCount++;
    }
    getTallyCount() {
        let tally = this.tallyCount;
        this.tallyCount = 0;
        return tally;
    }
}

let logs = {
    entities: new Logger(),
    collide: new Logger(),
    network: new Logger(),
    minimap: new Logger(),
    misc2: new Logger(),
    misc3: new Logger(),
    physics: new Logger(),
    life: new Logger(),
    selfie: new Logger(),
    master: new Logger(),
    activation: new Logger(),
    loops: new Logger(),
    gamemodeLoop: new Logger(),
};

module.exports = { logs };