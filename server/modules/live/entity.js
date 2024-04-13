let EventEmitter = require('events'),
    events,
    init = g => events = g.events;

function setNatural(natural, type) {
    type = ensureIsClass(type);
    if (type.PARENT != null) {
        if (typeof type.PARENT == 'string') setNatural(natural, type.PARENT)
        else {
            for (let i = 0; i < type.PARENT.length; i++) {
                setNatural(natural, type.PARENT[i]);
            }
        }
    }
    if (type.BODY != null) {
        for (let index in type.BODY) {
            natural[index] = type.BODY[index];
        }
    }
}
let lerp = (a, b, x) => a + x * (b - a);
class Gun {
    constructor(body, info) {
        this.id = entitiesIdLog++;
        this.ac = false;
        this.lastShot = { time: 0, power: 0 };
        this.body = body;
        this.master = body.source;
        this.label = "";
        this.identifier = "";
        this.controllers = [];
        this.children = [];
        // Stored Variables
        this.globalStore = {}
        this.store = {}
        // ----------------
        this.control = {
            target: new Vector(0, 0),
            goal: new Vector(0, 0),
            main: false,
            alt: false,
            fire: false,
        };
        this.color = new Color('16 0 1 0 false');
        this.alpha = 1;
        this.strokeWidth = 1;
        this.canShoot = false;
        this.borderless = false;
        this.drawFill = true;
        this.drawAbove = false;
        if (info.PROPERTIES != null) {
            if (info.PROPERTIES.TYPE != null) {
                this.canShoot = true;
                this.label = info.PROPERTIES.LABEL == null ? "" : info.PROPERTIES.LABEL;
                this.bulletTypes = Array.isArray(info.PROPERTIES.TYPE) ? info.PROPERTIES.TYPE : [info.PROPERTIES.TYPE];
                // Pre-load bullet definitions so we don't have to recalculate them every shot
                let natural = {};
                for (let type of this.bulletTypes) setNatural(natural, type);
                this.natural = natural;
                if (info.PROPERTIES.GUN_CONTROLLERS != null) {
                    let toAdd = [];
                    for (let i = 0; i < info.PROPERTIES.GUN_CONTROLLERS.length; i++) {
                        let io = info.PROPERTIES.GUN_CONTROLLERS[i];
                        if ("string" == typeof io) io = [io];
                        toAdd.push(new ioTypes[io[0]](this, io[1]));
                    }
                    this.controllers = toAdd.concat(this.controllers);
                }
            }
            this.onShoot = info.PROPERTIES.ON_SHOOT == null ? null : info.PROPERTIES.ON_SHOOT;
            this.autofire = info.PROPERTIES.AUTOFIRE == null ? false : info.PROPERTIES.AUTOFIRE;
            this.altFire = info.PROPERTIES.ALT_FIRE == null ? false : info.PROPERTIES.ALT_FIRE;
            this.calculator = info.PROPERTIES.STAT_CALCULATOR == null ? "default" : info.PROPERTIES.STAT_CALCULATOR;
            this.waitToCycle = info.PROPERTIES.WAIT_TO_CYCLE == null ? false : info.PROPERTIES.WAIT_TO_CYCLE;
            this.bulletStats = (info.PROPERTIES.BULLET_STATS == null || info.PROPERTIES.BULLET_STATS == "master") ? "master" : new Skill(info.PROPERTIES.BULLET_STATS);
            this.settings = info.PROPERTIES.SHOOT_SETTINGS == null ? [] : JSON.parse(JSON.stringify(info.PROPERTIES.SHOOT_SETTINGS));
            this.countsOwnKids = info.PROPERTIES.MAX_CHILDREN == null ? false : info.PROPERTIES.MAX_CHILDREN;
            this.syncsSkills = info.PROPERTIES.SYNCS_SKILLS == null ? false : info.PROPERTIES.SYNCS_SKILLS;
            this.negRecoil = info.PROPERTIES.NEGATIVE_RECOIL == null ? false : info.PROPERTIES.NEGATIVE_RECOIL;
            this.independentChildren = info.PROPERTIES.INDEPENDENT_CHILDREN == null ? false : info.PROPERTIES.INDEPENDENT_CHILDREN;
            if (info.PROPERTIES.COLOR != null) {
                this.color.interpret(info.PROPERTIES.COLOR);
            }
            if (info.PROPERTIES.BLINKER != null) {
                this.blinker = {
                    repeat: info.PROPERTIES.BLINKER.REPEAT ?? 1000,
                    start: info.PROPERTIES.BLINKER.START ?? 0,
                    end: info.PROPERTIES.BLINKER.END ?? 500,
                    offColor: "17 0 1 0 false",
                }
                // Color defining
                let blinkerOffUnboxed = {
                    base: 17,
                    hueShift: 0,
                    saturationShift: 1,
                    brightnessShift: 0,
                    allowBrightnessInvert: false,
                }
                if (typeof info.PROPERTIES.BLINKER.OFF_COLOR === "number" || typeof info.PROPERTIES.BLINKER.OFF_COLOR === "string") {
                    blinkerOffUnboxed.base = info.PROPERTIES.BLINKER.OFF_COLOR;
                }
                else if (typeof info.PROPERTIES.BLINKER.OFF_COLOR === "object")
                    blinkerOffUnboxed = {
                        base: info.PROPERTIES.BLINKER.OFF_COLOR.BASE ?? 17,
                        hueShift: info.PROPERTIES.BLINKER.OFF_COLOR.HUE_SHIFT ?? 0,
                        saturationShift: info.PROPERTIES.BLINKER.OFF_COLOR.SATURATION_SHIFT ?? 1,
                        brightnessShift: info.PROPERTIES.BLINKER.OFF_COLOR.BRIGHTNESS_SHIFT ?? 0,
                        allowBrightnessInvert: info.PROPERTIES.BLINKER.OFF_COLOR.ALLOW_BRIGHTNESS_INVERT ?? false,
                    };
                this.blinker.offColor = blinkerOffUnboxed.base + " " + blinkerOffUnboxed.hueShift + " " + blinkerOffUnboxed.saturationShift + " " + blinkerOffUnboxed.brightnessShift + " " + blinkerOffUnboxed.allowBrightnessInvert;
            }
            this.alpha = info.PROPERTIES.ALPHA == null ? 1 : info.PROPERTIES.ALPHA
            this.strokeWidth = info.PROPERTIES.STROKE_WIDTH == null ? 1 : info.PROPERTIES.STROKE_WIDTH
            this.borderless = info.PROPERTIES.BORDERLESS == null ? false : info.PROPERTIES.BORDERLESS;
            this.drawFill = info.PROPERTIES.DRAW_FILL == null ? true : info.PROPERTIES.DRAW_FILL;
            this.destroyOldestChild = info.PROPERTIES.DESTROY_OLDEST_CHILD == null ? false : info.PROPERTIES.DESTROY_OLDEST_CHILD;
            if (this.destroyOldestChild) this.countsOwnKids++;
            this.shootOnDeath = (info.PROPERTIES.SHOOT_ON_DEATH == null) ? false : info.PROPERTIES.SHOOT_ON_DEATH;
            this.drawAbove = (info.PROPERTIES.DRAW_ABOVE == null) ? false : info.PROPERTIES.DRAW_ABOVE;
            this.stack = (info.PROPERTIES.STACK_GUN == null) ? true : info.PROPERTIES.STACK_GUN;
            this.identifier = (info.PROPERTIES.IDENTIFIER == null) ? null : info.PROPERTIES.IDENTIFIER
        }
        let position = info.POSITION;
        if (Array.isArray(position)) {
            position = {
                LENGTH: position[0],
                WIDTH: position[1],
                ASPECT: position[2],
                X: position[3],
                Y: position[4],
                ANGLE: position[5],
                DELAY: position[6]
            }
        }
        position = {
            LENGTH: position.LENGTH ?? 18,
            WIDTH: position.WIDTH ?? 8,
            ASPECT: position.ASPECT ?? 1,
            X: position.X ?? 0,
            Y: position.Y ?? 0,
            ANGLE: position.ANGLE ?? 0,
            DELAY: position.DELAY ?? 0
        };
        this.length = position.LENGTH / 10;
        this.width = position.WIDTH / 10;
        this.aspect = position.ASPECT;
        let _off = new Vector(position.X, position.Y);
        this.angle = (position.ANGLE * Math.PI) / 180;
        this.direction = _off.direction;
        this.offset = _off.length / 10;
        this.delay = position.DELAY;
        this.position = 0;
        this.motion = 0;
        if (this.canShoot) {
            this.cycle = !this.waitToCycle - this.delay;
            this.trueRecoil = this.settings.recoil;
            this.recoilDir = 0;
        }
    }
    recoil() {
        if (this.motion || this.position) {
            // Simulate recoil
            this.motion -= (0.25 * this.position) / c.runSpeed;
            this.position += this.motion;
            if (this.position < 0) {
                // Bouncing off the back
                this.position = 0;
                this.motion = -this.motion;
            }
            if (this.motion > 0) {
                this.motion *= 0.75;
            }
        }
        if (this.canShoot && !this.body.settings.hasNoRecoil) {
            // Apply recoil to motion
            if (this.motion > 0) {
                let recoilForce = (-this.position * this.trueRecoil * this.body.recoilMultiplier * 1.08 / this.body.size) / c.runSpeed;
                this.body.accel.x += recoilForce * Math.cos(this.recoilDir);
                this.body.accel.y += recoilForce * Math.sin(this.recoilDir);
            }
        }
    }
    getSkillRaw() {
        if (this.bulletStats === "master") {
            return [
                this.body.skill.raw[0],
                this.body.skill.raw[1],
                this.body.skill.raw[2],
                this.body.skill.raw[3],
                this.body.skill.raw[4],
                0,
                0,
                0,
                0,
                0,
            ];
        }
        return this.bulletStats.raw;
    }
    getPhotoInfo() {
        return {
            ...this.lastShot, 
            color: this.color.compiled,
            alpha: this.alpha,
            strokeWidth: this.strokeWidth,
            borderless: this.borderless, 
            drawFill: this.drawFill, 
            blinker: this.blinker ? JSON.stringify(this.blinker) : 0,
            drawAbove: this.drawAbove,
            length: this.length,
            width: this.width,
            aspect: this.aspect,
            angle: this.angle,
            direction: this.direction,
            offset: this.offset,
        };
    }
    spawnBullets(useWhile, shootPermission) {
        // Find out some intermediate values
        let angle1 = this.direction + this.angle + this.body.facing,
            angle2 = this.angle + this.body.facing,
            gunlength = this.length - this.width * this.settings.size / 2,

            // Calculate offsets based on lengths and directions
            offsetBaseX = this.offset * Math.cos(angle1),
            offsetBaseY = this.offset * Math.sin(angle1),
            offsetEndX = gunlength * Math.cos(angle2),
            offsetEndY = gunlength * Math.sin(angle2),

            // Finally get the final bullet offset
            offsetFinalX = offsetBaseX + offsetEndX,
            offsetFinalY = offsetBaseY + offsetEndY,
            skill = this.bulletStats === "master" ? this.body.skill : this.bulletStats;

        // Shoot, multiple times in a tick if needed
        do {
            this.fire(offsetFinalX, offsetFinalY, skill);
            this.cycle--;
            shootPermission =
                  this.countsOwnKids    ? this.countsOwnKids    > this.children.length
                : this.body.maxChildren ? this.body.maxChildren > this.body.children.length
                : true;

        } while (useWhile && shootPermission && this.cycle-1 >= 1);
    }
    live() {
        this.recoil();

        if (!this.canShoot) return

        // Find the proper skillset for shooting
        let sk = this.bulletStats === "master" ? this.body.skill : this.bulletStats;
        // Decides what to do based on child-counting settings
        let shootPermission = this.countsOwnKids
            ? this.countsOwnKids >
                this.children.length * (this.calculator == "necro" ? sk.rld : 1)
            : this.body.maxChildren
            ? this.body.maxChildren >
                this.body.children.length * (this.calculator == "necro" ? sk.rld : 1)
            : true;
        if (this.destroyOldestChild) {
            if (!shootPermission) {
                shootPermission = true;
                this.destroyOldest();
            }
        }
        // Override in invuln
        if (this.body.master.invuln) {
            shootPermission = false;
        }
        // Cycle up if we should
        if (shootPermission || !this.waitToCycle) {
            if (this.cycle < 1) {
                this.cycle += 1 / (this.settings.reload * c.runSpeed * (this.calculator == "necro" || this.calculator == "fixed reload" ? 1 : sk.rld));
            }
        }
        // Firing routines
        if (shootPermission &&
            (this.autofire || (this.altFire ? this.body.control.alt : this.body.control.fire))
        ) {
            if (this.cycle >= 1) {
                this.spawnBullets(true, shootPermission);
            } // If we're not shooting, only cycle up to where we'll have the proper firing delay
        } else if (this.cycle > !this.waitToCycle - this.delay) {
            this.cycle = !this.waitToCycle - this.delay;
        }
    }
    destroyOldest() {
        let oldestChild,
            oldestTime = Infinity;
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            if (child && child.creationTime < oldestTime) {
                oldestTime = child.creationTime;
                oldestChild = child;
            }
        }
        if (oldestChild) oldestChild.kill();
    }
    syncChildren() {
        if (this.syncsSkills) {
            let self = this;
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i];
                child.define({
                    BODY: self.interpret(),
                    SKILL: self.getSkillRaw(),
                });
                child.refreshBodyAttributes();
            }
        }
    }
    fire(gx, gy, sk) {
        // Recoil
        this.lastShot.time = util.time();
        this.lastShot.power = 3 * Math.log(Math.sqrt(sk.spd) + this.trueRecoil + 1) + 1;
        this.motion += this.lastShot.power;
        // Find inaccuracy
        let shudder = 0, spread = 0;
        if (this.settings.shudder) {
            do {
                shudder = ran.gauss(0, Math.sqrt(this.settings.shudder));
            } while (Math.abs(shudder) >= this.settings.shudder * 2);
        }
        if (this.settings.spray) {
            do {
                spread = ran.gauss(0, this.settings.spray * this.settings.shudder);
            } while (Math.abs(spread) >= this.settings.spray / 2);
        }
        spread *= Math.PI / 180;
        // Find speed
        let vecLength = (this.negRecoil ? -1 : 1) * this.settings.speed * c.runSpeed * sk.spd * (1 + shudder),
            vecAngle = this.angle + this.body.facing + spread,
        s = new Vector(vecLength * Math.cos(vecAngle), vecLength * Math.sin(vecAngle));
        // Boost it if we should
        if (this.body.velocity.length) {
            let extraBoost =
                Math.max(0, s.x * this.body.velocity.x + s.y * this.body.velocity.y) /
                this.body.velocity.length /
                s.length;
            if (extraBoost) {
                let len = s.length;
                s.x += (this.body.velocity.length * extraBoost * s.x) / len;
                s.y += (this.body.velocity.length * extraBoost * s.y) / len;
            }
        }

        //create an independent entity
        if (this.independentChildren) {
            var o = new Entity({
                x: this.body.x + this.body.size * gx - s.x,
                y: this.body.y + this.body.size * gy - s.y,
            });
            for (let type of this.bulletTypes) {
                o.define(type);
            }
            o.coreSize = o.SIZE;
            o.team = this.body.team;
            o.refreshBodyAttributes();
            o.life();
            this.master.ON(undefined, this.altFire ? 'altFire' : 'fire', { gun: this, store: this.store, globalStore: this.globalStore, child: o });
            return;
        }

        // Create the bullet
        var o = new Entity({
                x: this.body.x + this.body.size * gx - s.x,
                y: this.body.y + this.body.size * gy - s.y,
            },
            this.master.master
        );
        /*let jumpAhead = this.cycle - 1;
        if (jumpAhead) {
                o.x += s.x * this.cycle / jumpAhead;
                o.y += s.y * this.cycle / jumpAhead;
        }*/
        o.velocity = s;
        this.bulletInit(o);
        o.coreSize = o.SIZE;

        this.master.ON(undefined, this.altFire ? 'altFire' : 'fire', { gun: this, store: this.store, globalStore: this.globalStore, child: o });
    }
    bulletInit(o) {
        // Define it by its natural properties
        for (let type of this.bulletTypes) {
            o.define(type);
        }
        if (o.color.base == '-1' || o.color.base == 'mirror') {
            o.color.base = this.body.master.color.base
        }
        // Pass the gun attributes
        o.define({
            BODY: this.interpret(),
            SKILL: this.getSkillRaw(),
            SIZE: (this.body.size * this.width * this.settings.size) / 2,
            LABEL: this.master.label + (this.label ? " " + this.label : "") + " " + o.label
        });
        // Keep track of it and give it the function it needs to deutil.log itself upon death
        if (this.countsOwnKids) {
            o.parent = this;
            this.children.push(o);
        } else if (this.body.maxChildren) {
            o.parent = this.body;
            this.body.children.push(o);
            this.children.push(o);
        }
        o.source = this.body;
        o.facing = o.velocity.direction;
        // Necromancers.
        let oo = o;
        o.necro = (host) => {
            if (this.countsOwnKids ?
                this.countsOwnKids > this.children.length * (this.bulletStats === "master" ? this.body.skill.rld : this.bulletStats.rld)
              : this.body.maxChildren ?
                this.body.maxChildren > this.body.children.length * (this.bulletStats === "master" ? this.body.skill.rld : this.bulletStats.rld)
              : true
            ) {
                let save = {
                    facing: host.facing,
                    size: host.SIZE,
                };
                host.define(Class.genericEntity);
                this.bulletInit(host);
                host.team = oo.master.master.team;
                host.master = oo.master;
                host.color.base = oo.color.base;
                host.facing = save.facing;
                host.SIZE = save.size;
                host.health.amount = host.health.max;
                return true;
            }
            return false;
        };
        // Otherwise
        o.refreshBodyAttributes();
        o.life();
        this.onShootFunction();
        this.recoilDir = this.body.facing + this.angle;
    }
    onShootHitscan() {
        if (this.body.master.health.amount < 0) return;
        let save = {
            x: this.body.master.x,
            y: this.body.master.y,
            angle: this.body.master.facing + this.angle,
        };
        let s = this.body.size * this.width * this.settings2.size;
        let target = {
            x: save.x + this.body.master.control.target.x,
            y: save.y + this.body.master.control.target.y,
        };
        let amount = (util.getDistance(target, save) / s) | 0;
        let gun = this;
        let explode = (e) => {
            e.on('dead', () => {
                let o = new Entity(e, gun.body);
                o.accel = {
                    x: 3 * Math.cos(save.angle),
                    y: 3 * Math.sin(save.angle),
                };
                o.color = gun.body.master.master.color;
                o.define(Class.hitScanExplosion);
                // Pass the gun attributes
                o.define({
                    BODY: gun.interpret(gun.settings3),
                    SKILL: gun.getSkillRaw(),
                    SIZE: (gun.body.size * gun.width * gun.settings3.size) / 2,
                    LABEL: gun.master.label + (gun.label ? " " + gun.label + " " : " ") + o.label,
                });
                o.refreshBodyAttributes();
                o.life();
                o.source = gun.body;
            });
        };
        let branchAlt = 0;
        let branchLength = 0;
        let branch = (e, a, b = false, g = 0, z = amount) => {
            if (!b) branchAlt++;
            let total = (z / 5) | 0 || 2;
            let dir = (a ? Math.PI / 2 : -Math.PI / 2) + g;
            for (let i = 0; i < total; i++)
                setTimeout(() => {
                    let ss = s * 1.5;
                    let x = e.x + ss * Math.cos(save.angle + dir) * i;
                    let y = e.y + ss * Math.sin(save.angle + dir) * i;
                    let o = new Entity(
                        {
                            x,
                            y,
                        },
                        this.body
                    );
                    o.facing = Math.atan2(target.y - y, target.x - x) + dir;
                    o.color = this.body.master.master.color;
                    o.define(Class.hitScanBullet);
                    // Pass the gun attributes
                    o.define({
                        BODY: this.interpret(this.settings3),
                        SKILL: this.getSkillRaw(),
                        SIZE: (this.body.size * this.width * this.settings2.size) / 2,
                        LABEL:
                            this.master.label +
                            (this.label ? " " + this.label : "") +
                            " " +
                            o.label,
                    });
                    o.refreshBodyAttributes();
                    o.life();
                    o.source = this.body;
                    if (i === total - 1) {
                        if (branchLength < 3) {
                            branchLength++;
                            branch(o, a, true, dir + g, total);
                        } else branchLength = 0;
                    }
                }, (500 / amount) * i);
        };
        const hitScanLevel = +this.onShoot.split("hitScan").pop();
        for (let i = 0; i < amount; i++) {
            setTimeout(() => {
                if (this.body.master.health.amount < 0) return;
                let x = save.x + s * Math.cos(save.angle) * i;
                let y = save.y + s * Math.sin(save.angle) * i;
                let e = new Entity({ x: x, y: y }, this.body);
                e.facing = Math.atan2(target.y - y, target.x - x);
                e.color = this.body.master.master.color;
                e.define(Class.hitScanBullet);
                // Pass the gun attributes
                e.define({
                    BODY: this.interpret(this.settings2),
                    SKILL: this.getSkillRaw(),
                    SIZE: (this.body.size * this.width * this.settings2.size) / 2,
                    LABEL:
                        this.master.label +
                        (this.label ? " " + this.label : "") +
                        " " +
                        e.label,
                });
                e.refreshBodyAttributes();
                e.life();
                e.source = this.body;
                switch (hitScanLevel) {
                    case 1:
                        if (i % 5 === 0) branch(e, branchAlt % 2 === 0);
                        break;
                    case 2:// Superlaser
                        if (i === amount - 1) explode(e);
                        break;
                    case 3:// Death Star
                        if (i % 3 === 0) explode(e);
                        break;
                }
            }, 10 * i);
        }
    }
    onShootFunction() {
        switch (this.onShoot) {
            case "hitScan":
            case "hitScan1":
            case "hitScan2":
            case "hitScan3":
                onShootHitscan();
                break;
        }
    }
    getTracking() {
        return {
            speed: c.runSpeed * (this.bulletStats == "master" ? this.body.skill.spd : this.bulletStats.spd) * this.settings.maxSpeed * this.natural.SPEED,
            range: Math.sqrt(this.bulletStats == "master" ? this.body.skill.spd : this.bulletStats.spd) * this.settings.range * this.natural.RANGE
        };
    }
    interpret(alt = false) {
        let sizeFactor = this.master.size / this.master.SIZE;
        let shoot = alt ? alt : this.settings;
        let sk = this.bulletStats == "master" ? this.body.skill : this.bulletStats;
        // Defaults
        let out = {
            SPEED: shoot.maxSpeed * sk.spd,
            HEALTH: shoot.health * sk.str,
            RESIST: shoot.resist + sk.rst,
            DAMAGE: shoot.damage * sk.dam,
            PENETRATION: Math.max(1, shoot.pen * sk.pen),
            RANGE: shoot.range / Math.sqrt(sk.spd),
            DENSITY: (shoot.density * sk.pen * sk.pen) / sizeFactor,
            PUSHABILITY: 1 / sk.pen,
            HETERO: 3 - 2.8 * sk.ghost,
        };
        // Special cases
        switch (this.calculator) {
            case "thruster":
                this.trueRecoil = shoot.recoil * Math.sqrt(sk.rld * sk.spd);
                break;
            case "sustained":
                out.RANGE = shoot.range;
                break;
            case "swarm":
                out.PENETRATION = Math.max(1, shoot.pen * (0.5 * (sk.pen - 1) + 1));
                out.HEALTH /= shoot.pen * sk.pen;
                break;
            case "trap":
            case "block":
                out.PUSHABILITY = 1 / Math.pow(sk.pen, 0.5);
                out.RANGE = shoot.range;
                break;
            case "necro":
            case "drone":
                out.PUSHABILITY = 1;
                out.PENETRATION = Math.max(1, shoot.pen * (0.5 * (sk.pen - 1) + 1));
                out.HEALTH = (shoot.health * sk.str + sizeFactor) / Math.pow(sk.pen, 0.8);
                out.DAMAGE = shoot.damage * sk.dam * Math.sqrt(sizeFactor) * shoot.pen * sk.pen;
                out.RANGE = shoot.range * Math.sqrt(sizeFactor);
                break;
        }
        // Go through and make sure we respect its natural properties
        for (let property in out) {
            if (this.natural[property] == null || !out.hasOwnProperty(property))
                continue;
            out[property] *= this.natural[property];
        }
        return out;
    }
}

class antiNaN {
    constructor (me) {
        this.me = me;
        this.nansInARow = 0;
        this.data = { x: 1, y: 1, vx: 0, vy: 0, ax: 0, ay: 0 };
        this.amNaN = me => [ me.x, me.y, me.velocity.x, me.velocity.y, me.accel.x, me.accel.y ].some(isNaN);
    }
    update() {
        if (this.amNaN(this.me)) {
            this.nansInARow++;
            if (this.nansInARow > 50) {
                console.log("NaN instance found with entity labeled " + this.me.label + " with type " + this.me.type + ". (Repeated)\nDebug:", [
                    ["x"         , isNaN(this.me.x)],
                    ["y"         , isNaN(this.me.y)],
                    ["velocity.x", isNaN(this.me.velocity.x)],
                    ["velocity.y", isNaN(this.me.velocity.y)],
                    ["accel.x"   , isNaN(this.me.accel.x)],
                    ["accel.y"   , isNaN(this.me.accel.y)],
                ].filter(entry => entry[1]).join(', '));
            }
            this.me.x = this.data.x;
            this.me.y = this.data.y;
            this.me.velocity.x = this.data.vx;
            this.me.velocity.y = this.data.vy;
            this.me.accel.x = this.data.ax;
            this.me.accel.y = this.data.ay;
            if (this.amNaN(this.me)) console.log("NaN instance is still NaN.");
        } else {
            this.data.x = this.me.x;
            this.data.y = this.me.y;
            this.data.vx = this.me.velocity.x;
            this.data.vy = this.me.velocity.y;
            this.data.ax = this.me.accel.x;
            this.data.ay = this.me.accel.y;
            if (this.nansInARow > 0) this.nansInARow--;
        }
    }
}

function getValidated(obj, prop, allowedType, from, optional = true) {
    let type = typeof obj[prop];
    if (allowedType === type || (optional && 'undefined' === type)) {
        return obj[prop];
    }
    throw new TypeError(`${from} property ${prop} is of type ${type} instead of type ${allowedType}`);
}
let labelThing = "StatusEffect's effects argument";
class StatusEffect extends EventEmitter {
    constructor (duration = 0, multipliers = {}, tick = a=>a) {
        super();
        this.duration = getValidated({duration}, 'duration', 'number', labelThing, false);
        this.acceleration = getValidated(multipliers, 'acceleration', 'number', labelThing);
        this.topSpeed = getValidated(multipliers, 'topSpeed', 'number', labelThing);
        this.health = getValidated(multipliers, 'health', 'number', labelThing);
        this.shield = getValidated(multipliers, 'shield', 'number', labelThing);
        this.regen = getValidated(multipliers, 'regen', 'number', labelThing);
        this.damage = getValidated(multipliers, 'damage', 'number', labelThing);
        this.penetration = getValidated(multipliers, 'penetration', 'number', labelThing);
        this.range = getValidated(multipliers, 'range', 'number', labelThing);
        this.fov = getValidated(multipliers, 'fov', 'number', labelThing);
        this.density = getValidated(multipliers, 'density', 'number', labelThing);
        this.stealth = getValidated(multipliers, 'stealth', 'number', labelThing);
        this.pushability = getValidated(multipliers, 'pushability', 'number', labelThing);
        this.recoilReceived = getValidated(multipliers, 'recoilReceived', 'number', labelThing);
        this.size = getValidated(multipliers, 'size', 'number', labelThing);
        this.tick = getValidated({tick}, 'tick', 'function', "StatusEffect's argument");
    }
}

class Prop {
    constructor(position, bond) {
        this.guns = [];
        this.color = new Color(16);
        this.borderless = false;
        this.drawFill = true;
        this.strokeWidth = 1;

        // Bind prop
        this.bond = bond;
        this.bond.props.push(this);
        // Get my position.
        if (Array.isArray(position)) {
            position = {
                SIZE: position[0],
                X: position[1],
                Y: position[2],
                ANGLE: position[3],
                LAYER: position[4]
            };
        }
        position.SIZE ??= 10;
        position.X ??= 0;
        position.Y ??= 0;
        position.ANGLE ??= 0;
        position.LAYER ??= 0;
        let _off = new Vector(position.X, position.Y);
        this.bound = {
            size: position.SIZE / 20,
            angle: position.ANGLE * Math.PI / 180,
            direction: _off.direction,
            offset: _off.length / 10,
            layer: position.LAYER
        };
        // Initalize.
        this.facing = 0;
        this.x = 0;
        this.y = 0;
        this.size = 1;
        this.realSize = 1;
        this.settings = {};
        this.settings.mirrorMasterAngle = true;
        this.upgrades = [];
        this.turrets = [];
        this.props = [];
    }
    define(def) {
        let set = ensureIsClass(def);

        if (set.PARENT != null) {
            if (Array.isArray(set.PARENT)) {
                for (let i = 0; i < set.PARENT.length; i++) {
                    this.define(set.PARENT[i], false);
                }
            } else {
                this.define(set.PARENT, false);
            }
        }
        if (set.index != null) this.index = set.index.toString();
        if (set.SHAPE != null) {
            this.shape = typeof set.SHAPE === "number" ? set.SHAPE : 0;
            this.shapeData = set.SHAPE;
        }
        this.imageInterpolation = set.IMAGE_INTERPOLATION != null ? set.IMAGE_INTERPOLATION : 'bilinear'
        if (set.COLOR != null) {
            this.color.interpret(set.COLOR);
        }
        if (set.STROKE_WIDTH != null) this.strokeWidth = set.STROKE_WIDTH
        if (set.BORDERLESS != null) this.borderless = set.BORDERLESS;
        if (set.DRAW_FILL != null) this.drawFill = set.DRAW_FILL;
        if (set.GUNS != null) {
            let newGuns = [];
            for (let i = 0; i < set.GUNS.length; i++) {
                newGuns.push(new Gun(this, set.GUNS[i]));
            }
            this.guns = newGuns;
        }
    }
    camera() {
        return {
            type: 0x01,
            id: this.id,
            index: this.index,
            size: this.size,
            realSize: this.realSize,
            facing: this.facing,
            angle: this.bound.angle,
            direction: this.bound.direction,
            offset: this.bound.offset,
            sizeFactor: this.bound.size,
            mirrorMasterAngle: this.settings.mirrorMasterAngle,
            layer: this.bound.layer,
            color: this.color.compiled,
            strokeWidth: this.strokeWidth,
            borderless: this.borderless,
            drawFill: this.drawFill,
            guns: this.guns.map((gun) => gun.getPhotoInfo()),
            turrets: this.turrets,
        };
    }
}

let entitiesIdLog = 0;
const forceTwiggle = ["autospin", "turnWithSpeed", "spin", "fastspin", "veryfastspin", "withMotion", "smoothWithMotion", "looseWithMotion"];
class Entity extends EventEmitter {
    constructor(position, master) {
        super();
        if (!master) master = this;
        this.isGhost = false;
        this.killCount = {
            solo: 0,
            assists: 0,
            bosses: 0,
            polygons: 0,
            killers: [],
        };
        this.creationTime = new Date().getTime();
        // Inheritance
        this.skipLife = false;
        this.master = master;
        this.source = this;
        this.parent = this;
        this.control = {
            target: new Vector(0, 0),
            goal: new Vector(0, 0),
            main: false,
            alt: false,
            fire: false,
            power: 0,
        };
        this.isInGrid = false;
        this.removeFromGrid = () => {
            if (this.isInGrid) {
                grid.removeObject(this);
                this.isInGrid = false;
            }
        };
        this.addToGrid = () => {
            if (!mockupsLoaded) return;
            if (!this.collidingBond && this.bond != null) return;
            if (!this.isInGrid) {
                grid.addObject(this);
                this.isInGrid = true;
            }
        };
        this.activation = (() => {
            let active = true;
            let timer = ran.irandom(15);
            return {
                update: () => {
                    if (this.skipLife) {
                        return active = false;
                    }
                    if (this.isDead()) {
                        return 0;
                    }
                    if (!active) {
                        this.removeFromGrid();
                        if (this.settings.diesAtRange) {
                            this.kill();
                        }
                        if (!timer--) {
                            active = true;
                        }
                    } else {
                        this.addToGrid();
                        timer = 15;
                        active = this.alwaysActive || this.isPlayer || this.isBot || views.some((v) => v.check(this, 0.6));
                    }
                },
                check: () => {
                    return active;
                },
            };
        })();
        this.autoOverride = false;
        this.healer = false;
        this.controllers = [];
        this.blend = {
            color: "#FFFFFF",
            amount: 0,
        };
        this.reverseTank = 1;
        // Objects
        this.skill = new Skill();
        this.health = new HealthType(1, "static", 0);
        this.shield = new HealthType(0, "dynamic");
        this.guns = [];
        this.turrets = [];
        this.props = [];
        this.upgrades = [];
        this.settings = {};
        this.aiSettings = {};
        this.children = [];
        this.statusEffects = [];
        this.color = new Color(16);
        this.glow = {radius: null, color: new Color(-1).compiled, alpha: 1, recursion: 1}
        this.invisible = [0, 0];
        this.alphaRange = [0, 1];
        // Define it
        this.SIZE = 1;
        this.sizeMultiplier = 1;
        this.define("genericEntity");
        // Initalize physics and collision
        this.alwaysShowOnMinimap = false;
        this.allowedOnMinimap = true;
        this.maxSpeed = 0;
        this.facingLocked = false;
        this.facing = 0;
        this.vfacing = 0;
        this.range = 0;
        this.angle = 0;
        this.damageRecieved = 0;
        this.recoilMultiplier = 1;
        this.stepRemaining = 1;
        this.x = position.x;
        this.y = position.y;
        this.cameraOverrideX = null;
        this.cameraOverrideY = null;
        this.velocity = new Vector(0, 0);
        this.accel = new Vector(0, 0);
        this.damp = 0.05;
        this.collisionArray = [];
        this.perceptionAngleIndependence = 1;
        this.firingArc = [0, 360];
        this.invuln = false;
        this.alpha = 1;
        this.strokeWidth = 1;
        this.levelCap = undefined;
        this.autospinBoost = 0;
        this.antiNaN = new antiNaN(this);
        // Get a new unique id
        this.id = entitiesIdLog++;
        this.team = this.id;
        this.team = master.team;
        this.turnAngle = 0;
        // Stored Variables
        this.globalStore = {};
        this.store = {};
        // This is for collisions
        this.AABB_data = {};
        this.AABB_savedSize = 0;
        this.collidingBond = false
        this.updateAABB = (active) => {
            if (!this.collidingBond && this.bond != null) return 0;
            if (!active) {
                this.AABB_data.active = false;
                return 0;
            }
            if (this.isPlayer && !this.isDead()) this.refreshBodyAttributes();
            this.antiNaN.update();
            // Get bounds
            let x1 = Math.min(this.x, this.x + this.velocity.x + this.accel.x) - this.realSize - 5;
            let y1 = Math.min(this.y, this.y + this.velocity.y + this.accel.y) - this.realSize - 5;
            let x2 = Math.max(this.x, this.x + this.velocity.x + this.accel.x) + this.realSize + 5;
            let y2 = Math.max(this.y, this.y + this.velocity.y + this.accel.y) + this.realSize + 5;
            let size = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
            let sizeDiff = this.AABB_savedSize / size;
            // Update data
            this.AABB_data = {
                min: [x1, y1],
                max: [x2, y2],
                active: true,
                size: size,
            };
            // Update grid if needed
            if (sizeDiff > Math.SQRT2 || sizeDiff < Math.SQRT1_2) {
                this.removeFromGrid();
                this.addToGrid();
                this.AABB_savedSize = size;
            }
        };
        this.getAABB = () => this.AABB_data;
        this.updateAABB(true);
        entities.push(this);
        for (let v of views) v.add(this);
        this.activation.update();
        events.emit('spawn', this);
    }
    addStatusEffect(effect) {
        this.emit('newStatusEffect', effect);
        this.statusEffects.push({ durationLeftover: effect.duration, effect });
        this.refreshBodyAttributes();
    }
    life() {
        // Size
        this.coreSize = this.SIZE;
        // Invisibility
        if (!this.damageReceived && (this.velocity.x ** 2 + this.velocity.y ** 2 <= 0.1)) {
            this.alpha = Math.max(this.alphaRange[0], this.alpha - this.invisible[1]);
        } else {
            this.alpha = Math.min(this.alphaRange[1], this.alpha + this.invisible[0]);
        }

        let lastingEffects = [], needsBodyAttribRefresh = false;
        for (let i = 0; i < this.statusEffects.length; i++) {
            let entry = this.statusEffects[i];
            entry.durationLeftover -= 1 / c.runSpeed;
            if (entry.durationLeftover > 0) {
                lastingEffects.push(entry);
            } else {
                needsBodyAttribRefresh = true;
                this.emit('expiredStatusEffect', entry.effect);
            }
            if (entry.effect.tick && entry.effect.tick(this, entry.effect, entry.durationLeftover)) {
                needsBodyAttribRefresh = true;
            }
        }
        this.statusEffects = lastingEffects;

        // Think
        let faucet = this.settings.independent || this.source == null || this.source === this ? {} : this.source.control,
        b = {
            target: remapTarget(faucet, this.source, this),
            goal: undefined,
            fire: faucet.fire,
            main: faucet.main,
            alt: faucet.alt,
            power: undefined,
        };
        // Seek attention
        if (this.settings.attentionCraver && !faucet.main && this.range) {
            this.range -= 1;
        }
        // So we start with my master's thoughts and then we filter them down through our control stack
        for (let i = 0; i < this.controllers.length; i++) {
            let AI = this.controllers[i],
                a = AI.think(b);
            if (a != null) {
                if (a.target != null && (b.target == null || AI.acceptsFromTop)) b.target = a.target;
                if (a.goal   != null && (b.goal   == null || AI.acceptsFromTop)) b.goal   = a.goal  ;
                if (a.fire   != null && (b.fire   == null || AI.acceptsFromTop)) b.fire   = a.fire  ;
                if (a.main   != null && (b.main   == null || AI.acceptsFromTop)) b.main   = a.main  ;
                if (a.alt    != null && (b.alt    == null || AI.acceptsFromTop)) b.alt    = a.alt   ;
                if (a.power  != null && (b.power  == null || AI.acceptsFromTop)) b.power  = a.power ;
            }
        }
        this.control.target = b.target == null ? this.control.target : b.target;
        this.control.goal = b.goal ? b.goal : { x: this.x, y: this.y };
        this.control.fire = b.fire;
        this.control.main = b.main;
        this.control.alt = b.alt;
        this.control.power = b.power == null ? 1 : b.power;

        if (this.invuln && (this.control.goal.x !== this.x || this.control.goal.y !== this.y)) {
            this.invuln = false;
        }

        // React
        this.move();
        this.face();
        // Handle guns and turrets if we've got them
        for (let i = 0; i < this.guns.length; i++) this.guns[i].live();
        for (let i = 0; i < this.turrets.length; i++) this.turrets[i].life();
        if (this.skill.maintain()) needsBodyAttribRefresh = true;
        if (needsBodyAttribRefresh) this.refreshBodyAttributes();
    }
    addController(newIO) {
        let listenToPlayer;
        if (this.controllers && this.controllers[0] instanceof ioTypes.listenToPlayer) {
            listenToPlayer = this.controllers.shift();
        }
        if (!Array.isArray(newIO)) newIO = [newIO];
        for (let io of newIO) {
            for (let i in this.controllers) {
                let oldIO = this.controllers[i];
                if (io.constructor === oldIO.constructor) this.controllers.splice(i, 1);
            }
        }
        this.controllers = newIO.concat(this.controllers);
        if (listenToPlayer) this.controllers.unshift(listenToPlayer);
    }
    become(player, dom = false) {
        this.addController(new ioTypes.listenToPlayer(this, { player, static: dom }));
        this.kick = (reason) => player.socket.kick(reason);
    }
    giveUp(player, name = "Mothership") {
        if (!player.body.isMothership) {
            player.body.controllers = [
                new ioTypes.nearestDifferentMaster(player.body),
                new ioTypes.spin(player.body, { onlyWhenIdle: true }),
            ];
        } else {
            player.body.controllers = [
                new ioTypes.nearestDifferentMaster(player.body),
                new ioTypes.wanderAroundMap(player.body, { lookAtGoal: true }),
                new ioTypes.mapTargetToGoal(player.body),
            ];
        }
        player.body.name = player.body.label;
        player.body.underControl = false;
        let fakeBody = new Entity({ x: player.body.x, y: player.body.y });
        fakeBody.passive = true;
        fakeBody.underControl = true;
        player.body = fakeBody;
        player.body.kill();
    }
    define(defs, emitEvent = true) {
        if (!Array.isArray(defs)) defs = [defs];
        
        // Define all primary stats
        let set = ensureIsClass(defs[0]);
        this.store = {};
        for (let gun of this.guns) gun.store = {};

        if (set.PARENT != null) {
            if (Array.isArray(set.PARENT)) {
                for (let i = 0; i < set.PARENT.length; i++) {
                    this.define(set.PARENT[i], false);
                }
            } else {
                this.define(set.PARENT, false);
            }
        }
        if (set.LAYER != null) this.layerID = set.LAYER;
        if (set.index != null) this.index = set.index.toString();
        if (set.NAME != null) this.name = set.NAME;
        if (set.LABEL != null) this.label = set.LABEL;
        if (set.ANGLE != null) this.angle = set.ANGLE;
        if (set.UPGRADE_LABEL != null) this.upgradeLabel = set.UPGRADE_LABEL;
        if (set.UPGRADE_TOOLTIP != null) this.upgradeTooltip = set.UPGRADE_TOOLTIP;
        if (set.DISPLAY_NAME != null) this.displayName = set.DISPLAY_NAME;
        if (set.TYPE != null) this.type = set.TYPE;
        if (set.SHAPE != null) {
            this.shape = typeof set.SHAPE === "number" ? set.SHAPE : 0;
            this.shapeData = set.SHAPE;
        }
        if (set.HEIGHT_SCALE != null) this.heightScale = set.HEIGHT_SCALE;
        this.imageInterpolation = set.IMAGE_INTERPOLATION != null ? set.IMAGE_INTERPOLATION : 'bilinear'
        if (set.COLOR != null) {
            if (this.color === undefined) {
                console.log(this);
            }
            this.color.interpret(set.COLOR);
        }
        this.upgradeColor = set.UPGRADE_COLOR == null ? null : new Color(set.UPGRADE_COLOR).compiled;
        if (set.GLOW != null) {
            this.glow = {
                radius: set.GLOW.RADIUS ?? 0,
                color: new Color(set.GLOW.COLOR).compiled,
                alpha: set.GLOW.ALPHA ?? 1,
                recursion: set.GLOW.RECURSION ?? 1
            };
        }
        if (set.PARTICLE_EMITTER != null) {
            this.particleEmitter = {
                rate: set.PARTICLE_EMITTER.RATE ?? 1,
                rateVariance: set.PARTICLE_EMITTER.RATE_VARIANCE ?? 0,
                size: (set.PARTICLE_EMITTER.SIZE ?? 10) / 20,
                sizeVariance: set.PARTICLE_EMITTER.SIZE_VARIANCE ?? 0,
                alpha: set.PARTICLE_EMITTER.ALPHA ?? 0.7,
                alphaVariance: set.PARTICLE_EMITTER.ALPHA_VARIANCE ?? 0,
                speed: set.PARTICLE_EMITTER.SPEED ?? 7.5,
                speedVariance: set.PARTICLE_EMITTER.SPEED_VARIANCE ?? 0,
                range: set.PARTICLE_EMITTER.RANGE ?? 50,
                rangeVariance: set.PARTICLE_EMITTER.RANGE_VARIANCE ?? 0,
                angle: set.PARTICLE_EMITTER.ANGLE ? {min: set.PARTICLE_EMITTER.ANGLE.MIN ?? -180, max: set.PARTICLE_EMITTER.ANGLE.MAX ?? 180} : {min: -180, max: 180},
            }
            this.particleEmitter.angle.min *= Math.PI / 180;
            this.particleEmitter.angle.max *= Math.PI / 180;
        }
        if (set.CONTROLLERS != null) {
            let toAdd = [];
            for (let i = 0; i < set.CONTROLLERS.length; i++) {
                let io = set.CONTROLLERS[i];
                if ("string" == typeof io) io = [io];
                toAdd.push(new ioTypes[io[0]](this, io[1]));
            }
            this.addController(toAdd);
        }
        if (set.IGNORED_BY_AI != null) this.ignoredByAi = set.IGNORED_BY_AI;
        if (set.MOTION_TYPE != null) this.motionType = set.MOTION_TYPE;
        if (typeof this.motionType == "string") this.motionType = [this.motionType];
        if (set.FACING_TYPE != null) this.facingType = set.FACING_TYPE;
        if (typeof this.facingType == "string") this.facingType = [this.facingType];
        if (set.MIRROR_MASTER_ANGLE != null) this.settings.mirrorMasterAngle = set.MIRROR_MASTER_ANGLE
        if (set.DRAW_HEALTH != null) this.settings.drawHealth = set.DRAW_HEALTH;
        if (set.DRAW_SELF != null) this.settings.drawShape = set.DRAW_SELF;
        if (set.DAMAGE_EFFECTS != null) this.settings.damageEffects = set.DAMAGE_EFFECTS;
        if (set.RATIO_EFFECTS != null) this.settings.ratioEffects = set.RATIO_EFFECTS;
        if (set.MOTION_EFFECTS != null) this.settings.motionEffects = set.MOTION_EFFECTS;
        if (set.ACCEPTS_SCORE != null) this.settings.acceptsScore = set.ACCEPTS_SCORE;
        if (set.GIVE_KILL_MESSAGE != null) this.settings.givesKillMessage = set.GIVE_KILL_MESSAGE;
        if (set.CAN_GO_OUTSIDE_ROOM != null) this.settings.canGoOutsideRoom = set.CAN_GO_OUTSIDE_ROOM;
        if (set.HITS_OWN_TYPE != null) this.settings.hitsOwnType = set.HITS_OWN_TYPE;
        if (set.DIE_AT_LOW_SPEED != null) this.settings.diesAtLowSpeed = set.DIE_AT_LOW_SPEED;
        if (set.DIE_AT_RANGE != null) this.settings.diesAtRange = set.DIE_AT_RANGE;
        if (set.INDEPENDENT != null) this.settings.independent = set.INDEPENDENT;
        if (set.PERSISTS_AFTER_DEATH != null) this.settings.persistsAfterDeath = set.PERSISTS_AFTER_DEATH;
        if (set.CLEAR_ON_MASTER_UPGRADE != null) this.settings.clearOnMasterUpgrade = set.CLEAR_ON_MASTER_UPGRADE;
        if (set.HEALTH_WITH_LEVEL != null) this.settings.healthWithLevel = set.HEALTH_WITH_LEVEL;
        if (set.ACCEPTS_SCORE != null) this.settings.acceptsScore = set.ACCEPTS_SCORE;
        if (set.OBSTACLE != null) this.settings.obstacle = set.OBSTACLE;
        if (set.NECRO != null) this.settings.necroTypes = Array.isArray(set.NECRO) ? set.NECRO : set.NECRO ? [this.shape] : [];
        if (set.HAS_NO_RECOIL != null) this.settings.hasNoRecoil = set.HAS_NO_RECOIL;
        if (set.CRAVES_ATTENTION != null) this.settings.attentionCraver = set.CRAVES_ATTENTION;
        if (set.KILL_MESSAGE != null) this.settings.killMessage = set.KILL_MESSAGE === "" ? "Killed" : set.KILL_MESSAGE;
        if (set.AUTOSPIN_MULTIPLIER != null) this.autospinBoost = set.AUTOSPIN_MULTIPLIER;
        if (set.BROADCAST_MESSAGE != null) this.settings.broadcastMessage = set.BROADCAST_MESSAGE === "" ? undefined : set.BROADCAST_MESSAGE;
        if (set.DEFEAT_MESSAGE) this.settings.defeatMessage = true;
        if (set.HEALER) this.healer = true;
        if (set.DAMAGE_CLASS != null) this.settings.damageClass = set.DAMAGE_CLASS;
        if (set.BUFF_VS_FOOD != null) this.settings.buffVsFood = set.BUFF_VS_FOOD;
        if (set.CAN_BE_ON_LEADERBOARD != null) this.settings.leaderboardable = set.CAN_BE_ON_LEADERBOARD;
        if (set.INTANGIBLE != null) this.intangibility = set.INTANGIBLE;
        if (set.IS_SMASHER != null) this.settings.reloadToAcceleration = set.IS_SMASHER;
        if (set.STAT_NAMES != null) this.settings.skillNames = {
            body_damage: set.STAT_NAMES?.BODY_DAMAGE ?? 'Body Damage',
            max_health: set.STAT_NAMES?.MAX_HEALTH ?? 'Max Health',
            bullet_speed: set.STAT_NAMES?.BULLET_SPEED ?? 'Bullet Speed',
            bullet_health: set.STAT_NAMES?.BULLET_HEALTH ?? 'Bullet Health',
            bullet_pen: set.STAT_NAMES?.BULLET_PEN ?? 'Bullet Penetration',
            bullet_damage: set.STAT_NAMES?.BULLET_DAMAGE ?? 'Bullet Damage',
            reload: set.STAT_NAMES?.RELOAD ?? 'Reload',
            move_speed: set.STAT_NAMES?.MOVE_SPEED ?? 'Movement Speed',
            shield_regen: set.STAT_NAMES?.SHIELD_REGEN ?? 'Shield Regeneration',
            shield_cap: set.STAT_NAMES?.SHIELD_CAP ?? 'Shield Capacity',
        };
        if (set.AI != null) this.aiSettings = set.AI;
        if (set.INVISIBLE != null) this.invisible = set.INVISIBLE;
        if (set.ALPHA != null) {
            this.alpha = ("number" === typeof set.ALPHA) ? set.ALPHA : set.ALPHA[1];
            this.alphaRange = [
                set.ALPHA[0] || 0,
                set.ALPHA[1] || 1
            ];
        }
        if (set.STROKE_WIDTH != null) this.strokeWidth = set.STROKE_WIDTH
        if (set.DANGER != null) this.dangerValue = set.DANGER;
        if (set.SHOOT_ON_DEATH != null) this.shootOnDeath = set.SHOOT_ON_DEATH;
        if (set.BORDERLESS != null) this.borderless = set.BORDERLESS;
        if (set.BORDER_FIRST != null) this.borderFirst = set.BORDER_FIRST;
        if (set.DRAW_FILL != null) this.drawFill = set.DRAW_FILL;
        if (set.TEAM != null) {
            this.team = set.TEAM;
            if (!sockets.players.length) {
                const _entity = this;
                for (let i = 0; i < sockets.players.length; i++) {
                    if (sockets.players[i].body.id == _entity.id) {
                        sockets.players[i].team = -_entity.team;
                    }
                }
            }
            for (let child of this.children) child.team = set.TEAM
        }
        if (set.VARIES_IN_SIZE != null) {
            this.settings.variesInSize = set.VARIES_IN_SIZE;
            this.squiggle = this.settings.variesInSize ? ran.randomRange(0.8, 1.2) : 1;
        }
        if (set.RESET_UPGRADES || set.RESET_STATS) {
            let caps = this.skill.caps.map(x=>x);
            this.skill.setCaps(Array(10).fill(0));
            this.skill.setCaps(caps);
            this.upgrades = [];
            this.isArenaCloser = false;
            this.ac = false;
            this.alpha = 1;
            this.reset();
        }
        if (set.RESET_UPGRADE_MENU) this.upgrades = []
        if (set.ARENA_CLOSER != null) {
            this.isArenaCloser = set.ARENA_CLOSER;
            this.ac = set.ARENA_CLOSER;
        }
        if (set.BRANCH_LABEL != null) this.branchLabel = set.BRANCH_LABEL;
        if (set.BATCH_UPGRADES != null) this.batchUpgrades = set.BATCH_UPGRADES;
        for (let i = 0; i < c.MAX_UPGRADE_TIER; i++) {
            let tierProp = 'UPGRADES_TIER_' + i;
            if (set[tierProp] != null && emitEvent) {
                for (let j = 0; j < set[tierProp].length; j++) {
                    let upgrades = set[tierProp][j];
                    let index = "";
                    if (!Array.isArray(upgrades)) upgrades = [upgrades];
                    let redefineAll = upgrades.includes(true);
                    let trueUpgrades = upgrades.slice(0, upgrades.length - redefineAll); // Ignore last element if it's true
                    for (let k of trueUpgrades) {
                        let e = ensureIsClass(k);
                        index += e.index + "-";
                    }
                    this.upgrades.push({
                        class: trueUpgrades,
                        level: c.TIER_MULTIPLIER * i,
                        index: index.substring(0, index.length-1),
                        tier: i,
                        branch: 0,
                        branchLabel: this.branchLabel,
                        redefineAll,
                    });
                }
            }
        }
        if (set.SIZE != null) {
            this.SIZE = set.SIZE * this.squiggle;
            if (this.coreSize == null) this.coreSize = this.SIZE;
        }
        if (set.LEVEL_CAP != null) {
            this.levelCap = set.LEVEL_CAP;
        }
        if (set.LEVEL != null) {
            this.skill.reset();
            while (this.skill.level < set.LEVEL) {
                this.skill.score += this.skill.levelScore;
                this.skill.maintain();
            }
            this.refreshBodyAttributes();
        }
        if (set.SKILL_CAP != null && set.SKILL_CAP != []) {
            if (set.SKILL_CAP.length != 10) throw "Inappropiate skill cap amount.";
            this.skill.setCaps(set.SKILL_CAP);
        }
        if (set.SKILL != null && set.SKILL != []) {
            if (set.SKILL.length != 10) throw "Inappropiate skill raws.";
            this.skill.set(set.SKILL);
        }
        if (set.VALUE != null) this.skill.score = Math.max(this.skill.score, set.VALUE * this.squiggle);
        if (set.ALT_ABILITIES != null) this.abilities = set.ALT_ABILITIES;
        if (set.GUNS != null) {
            let newGuns = [];
            for (let i = 0; i < set.GUNS.length; i++) {
                newGuns.push(new Gun(this, set.GUNS[i]));
            }
            this.guns = newGuns;
        }
        if (set.MAX_CHILDREN != null) this.maxChildren = set.MAX_CHILDREN;
        if (set.RESET_CHILDREN) this.destroyAllChildren();
        if ("function" === typeof set.LEVEL_SKILL_POINT_FUNCTION) {
            this.skill.LSPF = set.LEVEL_SKILL_POINT_FUNCTION;
        }
        if (set.RECALC_SKILL != null) {
            let score = this.skill.score;
            this.skill.reset();
            this.skill.score = score;
            while (this.skill.maintain()) {}
        }
        if (set.EXTRA_SKILL != null) {
            this.skill.points += set.EXTRA_SKILL;
        }
        if (set.BODY != null) {
            if (set.BODY.ACCELERATION != null) this.ACCELERATION = set.BODY.ACCELERATION;
            if (set.BODY.SPEED != null) this.SPEED = set.BODY.SPEED;
            if (set.BODY.HEALTH != null) this.HEALTH = set.BODY.HEALTH;
            if (set.BODY.RESIST != null) this.RESIST = set.BODY.RESIST;
            if (set.BODY.SHIELD != null) this.SHIELD = set.BODY.SHIELD;
            if (set.BODY.REGEN != null) this.REGEN = set.BODY.REGEN;
            if (set.BODY.DAMAGE != null) this.DAMAGE = set.BODY.DAMAGE;
            if (set.BODY.PENETRATION != null) this.PENETRATION = set.BODY.PENETRATION;
            if (set.BODY.RANGE != null) this.RANGE = set.BODY.RANGE;
            if (set.BODY.FOV != null) this.FOV = set.BODY.FOV;
            if (set.BODY.SHOCK_ABSORB != null) this.SHOCK_ABSORB = set.BODY.SHOCK_ABSORB;
            if (set.BODY.RECOIL_MULTIPLIER != null) this.RECOIL_MULTIPLIER = set.BODY.RECOIL_MULTIPLIER;
            if (set.BODY.DENSITY != null) this.DENSITY = set.BODY.DENSITY;
            if (set.BODY.STEALTH != null) this.STEALTH = set.BODY.STEALTH;
            if (set.BODY.PUSHABILITY != null) this.PUSHABILITY = set.BODY.PUSHABILITY;
            if (set.BODY.HETERO != null) this.heteroMultiplier = set.BODY.HETERO;
            this.refreshBodyAttributes();
        }
        if (set.SPAWN_ON_DEATH) this.spawnOnDeath = set.SPAWN_ON_DEATH;
        if (set.REROOT_UPGRADE_TREE) this.rerootUpgradeTree = set.REROOT_UPGRADE_TREE;
        if (Array.isArray(this.rerootUpgradeTree)) {
            let finalRoot = "";
            for (let root of this.rerootUpgradeTree) finalRoot += root + "\\/";
            this.rerootUpgradeTree = finalRoot.substring(0, finalRoot.length - 2);
        }
        if (set.ON_MINIMAP != null) this.allowedOnMinimap = set.ON_MINIMAP;
        if (set.TURRETS != null) {
            for (let i = 0; i < this.turrets.length; i++) {
                this.turrets[i].destroy();
            }
            this.turrets = [];
            for (let i = 0; i < set.TURRETS.length; i++) {
                let def = set.TURRETS[i],
                    o = new Entity(this, this.master),
                    turretDanger = false,
                    type = Array.isArray(def.TYPE) ? def.TYPE : [def.TYPE];
                for (let j = 0; j < type.length; j++) {
                    o.define(type[j]);
                    if (type.TURRET_DANGER) turretDanger = true;
                }
                if (!turretDanger) o.define({ DANGER: 0 });
                o.collidingBond = def.VULNERABLE
                o.bindToMaster(def.POSITION, this, def.VULNERABLE);
            }
        }
        if (set.PROPS != null) {
            this.props = [];
            for (let i = 0; i < set.PROPS.length; i++) {
                let def = set.PROPS[i],
                    o = new Prop(def.POSITION, this),
                    type = Array.isArray(def.TYPE) ? def.TYPE : [def.TYPE];
                for (let j = 0; j < type.length; j++) {
                    o.define(type[j]);
                }
            }
        }
        if (set.ON != null) this.onDef = set.ON;
        this.reverseTargetWithTank = set.REVERSE_TARGET_WITH_TANK ?? false;
        if (set.mockup != null) {
            this.mockup = set.mockup;
        }

        if (emitEvent) {
            this.emit('define', set);
        }

        if (this.onDef != null) {
            this.ON(this.onDef, 'define')
        }

        this.defs = [];
        for (let def of defs) this.defs.push(def);

        // Define additional stats for other split upgrades
        for (let branch = 1; branch < defs.length; branch++) {
            set = ensureIsClass(defs[branch]);
            
            if (set.index != null) this.index += "-" + set.index;
            if (set.PARENT != null) {
                if (Array.isArray(set.PARENT)) {
                    for (let i = 0; i < set.PARENT.length; i++) {
                        this.branchLabel = ensureIsClass(set.PARENT[i]).BRANCH_LABEL;
                    }
                } else {
                    this.branchLabel = ensureIsClass(set.PARENT).BRANCH_LABEL;
                }
            }
            if (set.LABEL != null && set.LABEL.length > 0) this.label = this.label + "-" + set.LABEL;
            if (set.MAX_CHILDREN != null) this.maxChildren += set.MAX_CHILDREN;
            else this.maxChildren = null; // For bullet and drone combos so all parts remain functional
            if (set.BODY != null) {
                if (set.BODY.ACCELERATION != null) this.ACCELERATION *= set.BODY.ACCELERATION;
                if (set.BODY.SPEED != null) this.SPEED *= set.BODY.SPEED;
                if (set.BODY.HEALTH != null) this.HEALTH *= set.BODY.HEALTH;
                if (set.BODY.RESIST != null) this.RESIST *= set.BODY.RESIST;
                if (set.BODY.SHIELD != null) this.SHIELD *= set.BODY.SHIELD;
                if (set.BODY.REGEN != null) this.REGEN *= set.BODY.REGEN;
                if (set.BODY.DAMAGE != null) this.DAMAGE *= set.BODY.DAMAGE;
                if (set.BODY.PENETRATION != null) this.PENETRATION *= set.BODY.PENETRATION;
                if (set.BODY.RANGE != null) this.RANGE *= set.BODY.RANGE;
                if (set.BODY.FOV != null) this.FOV *= set.BODY.FOV;
                if (set.BODY.SHOCK_ABSORB != null) this.SHOCK_ABSORB *= set.BODY.SHOCK_ABSORB;
                if (set.BODY.RECOIL_MULTIPLIER != null) this.RECOIL_MULTIPLIER *= set.BODY.RECOIL_MULTIPLIER;
                if (set.BODY.DENSITY != null) this.DENSITY *= set.BODY.DENSITY;
                if (set.BODY.STEALTH != null) this.STEALTH *= set.BODY.STEALTH;
                if (set.BODY.PUSHABILITY != null) this.PUSHABILITY *= set.BODY.PUSHABILITY;
                if (set.BODY.HETERO != null) this.heteroMultiplier *= set.BODY.HETERO;
                this.refreshBodyAttributes();
            }
            if (set.GUNS != null) {
                let newGuns = [];
                for (let i = 0; i < set.GUNS.length; i++) {
                    newGuns.push(new Gun(this, set.GUNS[i]));
                }
                this.guns.push(...newGuns);
            }
            if (set.TURRETS != null) {
                for (let i = 0; i < set.TURRETS.length; i++) {
                    let def = set.TURRETS[i],
                        o = new Entity(this, this.master),
                        turretDanger = false,
                        type = Array.isArray(def.TYPE) ? def.TYPE : [def.TYPE];
                    for (let j = 0; j < type.length; j++) {
                        o.define(type[j]);
                        if (type.TURRET_DANGER) turretDanger = true;
                    }
                    if (!turretDanger) o.define({ DANGER: 0 });
                    o.bindToMaster(def.POSITION, this);
                }
            }
            if (set.PROPS != null) {
                for (let i = 0; i < set.PROPS.length; i++) {
                    let def = set.PROPS[i],
                        o = new Prop(def.POSITION, this),
                        type = Array.isArray(def.TYPE) ? def.TYPE : [def.TYPE];
                    for (let j = 0; j < type.length; j++) {
                        o.define(type[j]);
                    }
                }
            }
            if (set.SIZE != null) {
                this.SIZE *= set.SIZE * this.squiggle;
                if (this.coreSize == null) this.coreSize = this.SIZE;
            }
            if (set.BATCH_UPGRADES != null) this.batchUpgrades = set.BATCH_UPGRADES;
            for (let i = 0; i < c.MAX_UPGRADE_TIER; i++) {
                let tierProp = 'UPGRADES_TIER_' + i;
                if (set[tierProp] != null && emitEvent) {
                    for (let j = 0; j < set[tierProp].length; j++) {
                        let upgrades = set[tierProp][j];
                        let index = "";
                        if (!Array.isArray(upgrades)) upgrades = [upgrades];
                        let redefineAll = upgrades.includes(true);
                        let trueUpgrades = upgrades.slice(0, upgrades.length - redefineAll); // Ignore last element if it's true
                        for (let k of trueUpgrades) {
                            let e = ensureIsClass(k);
                            index += e.index + "-";
                        }
                        this.upgrades.push({
                            class: trueUpgrades,
                            level: c.TIER_MULTIPLIER * i,
                            index: index.substring(0, index.length-1),
                            tier: i,
                            branch,
                            branchLabel: this.branchLabel,
                            redefineAll,
                        });
                    }
                }
            }
            if (set.REROOT_UPGRADE_TREE) this.rerootUpgradeTree = set.REROOT_UPGRADE_TREE;
            if (Array.isArray(this.rerootUpgradeTree)) {
                let finalRoot = "";
                for (let root of this.rerootUpgradeTree) finalRoot += root + "\\/";
                this.rerootUpgradeTree += finalRoot.substring(0, finalRoot.length - 2);
            }
        }

        // Batch upgrades
        if (this.batchUpgrades && emitEvent) {
            this.tempUpgrades = [];
            let numBranches = this.defs.length;
            for (let i = 0; i < numBranches; i++) { // Create a 2d array for the upgrades (1st index is branch index)
                this.tempUpgrades.push([]);
            }
            for (let upgrade of this.upgrades) {
                let upgradeBranch = upgrade.branch;
                this.tempUpgrades[upgradeBranch].push(upgrade);
            }

            this.upgrades = [];
            this.selection = JSON.parse(JSON.stringify(this.defs));
            this.chooseUpgradeFromBranch(numBranches); // Recursively build upgrade options
        }
    }
    chooseUpgradeFromBranch(remaining) {
        if (remaining > 0) { // If there's more to select
            let branchUgrades = this.tempUpgrades[this.defs.length - remaining];
            for (let i = 0; i < branchUgrades.length; i++) { // Pick all possible options and continue selecting
                this.selection[this.defs.length - remaining] = branchUgrades[i];
                this.chooseUpgradeFromBranch(remaining - 1);
            }
            if (branchUgrades.length == 0) // For when the branch has no upgrades
                this.chooseUpgradeFromBranch(remaining - 1);
        } else { // If there's nothing more to select
            let upgradeClass = [],
                upgradeTier = 0,
                upgradeIndex = "";
            for (let u of this.selection) {
                upgradeClass.push(u.class);
                upgradeIndex += u.index + '-';
                upgradeTier = Math.max(upgradeTier, u.tier);
            }
            this.upgrades.push({
                class: upgradeClass,
                level: c.TIER_MULTIPLIER * upgradeTier,
                index: upgradeIndex.substring(0, upgradeIndex.length-1),
                tier: upgradeTier,
                branch: 0,
                branchLabel: "",
                redefineAll: true,
            });
        }
    }
    ON(on = this.onDef, eventName, value) {
        if (on == null) return
        for (let onPairs of on) {
            switch (onPairs.event) {
                case 'fire':
                    if (eventName == 'fire') onPairs.handler({
                        body: this,
                        gun: value.gun,
                        child: value.child,
                        masterStore: this.store,
                        globalMasterStore: this.globalStore,
                        gunStore: value.store,
                        globalGunStore: value.globalStore
                     })
                    break;
                case 'altFire':
                    if (eventName == 'altFire') onPairs.handler({
                        body: this,
                        gun: value.gun,
                        child: value.child,
                        masterStore: this.store,
                        globalMasterStore: this.globalStore,
                        gunStore: value.store,
                        globalGunStore: value.globalStore
                     })
                case 'death':
                    if (eventName == 'death') onPairs.handler({ body: this, killers: value.killers, killTools: value.killTools })
                    break;
                case 'kill':
                    if (eventName == 'kill') onPairs.handler({ body: this, entity: value.entity })
                    break;
                case 'collide':
                    if (eventName == 'collide') onPairs.handler({ instance: value.instance, other: value.other })
                    break;
                case 'damage':
                    if (eventName == 'damage') onPairs.handler({ body: this, damageInflictor: value.damageInflictor, damageTool: value.damageTool })
                    break;
                case 'upgrade':
                    if (eventName == 'upgrade') onPairs.handler({ body: this, oldEntity: value.oldEntity })
                    break;
                case 'tick':
                    if (eventName == 'tick') onPairs.handler({ body: this })
                    break;
                case 'define':
                    if (eventName == 'define') onPairs.handler({ body: this })
                    break;
            }
        }
    }
    refreshBodyAttributes() {
        let accelerationMultiplier = 1,
            topSpeedMultiplier = 1,
            healthMultiplier = 1,
            shieldMultiplier = 1,
            regenMultiplier = 1,
            damageMultiplier = 1,
            penetrationMultiplier = 1,
            rangeMultiplier = 1,
            fovMultiplier = 1,
            densityMultiplier = 1,
            stealthMultiplier = 1,
            pushabilityMultiplier = 1,
            sizeMultiplier = 1,
            recoilReceivedMultiplier = 1;
        for (let i = 0; i < this.statusEffects.length; i++) {
            let effect = this.statusEffects[i].effect;
            if (effect.acceleration != null) accelerationMultiplier *= effect.acceleration;
            if (effect.topSpeed != null) topSpeedMultiplier *= effect.topSpeed;
            if (effect.health != null) healthMultiplier *= effect.health;
            if (effect.shield != null) shieldMultiplier *= effect.shield;
            if (effect.regen != null) regenMultiplier *= effect.regen;
            if (effect.damage != null) damageMultiplier *= effect.damage;
            if (effect.penetration != null) penetrationMultiplier *= effect.penetration;
            if (effect.range != null) rangeMultiplier *= effect.range;
            if (effect.fov != null) fovMultiplier *= effect.fov;
            if (effect.density != null) densityMultiplier *= effect.density;
            if (effect.stealth != null) stealthMultiplier *= effect.stealth;
            if (effect.pushability != null) pushabilityMultiplier *= effect.pushability;
            if (effect.recoilReceived != null) recoilReceivedMultiplier *= effect.recoilReceived;
            if (effect.size != null) sizeMultiplier *= effect.size;
        }

        let speedReduce = Math.pow(this.size / (this.coreSize || this.SIZE), 1);
        this.acceleration = (accelerationMultiplier * c.runSpeed * this.ACCELERATION) / speedReduce;
        if (this.settings.reloadToAcceleration) this.acceleration *= this.skill.acl;
        this.topSpeed = (topSpeedMultiplier * c.runSpeed * this.SPEED * this.skill.mob) / speedReduce;
        if (this.settings.reloadToAcceleration) this.topSpeed /= Math.sqrt(this.skill.acl);
        this.health.set(((this.settings.healthWithLevel ? 2 * this.level : 0) + this.HEALTH) * this.skill.hlt * healthMultiplier);
        this.health.resist = 1 - 1 / Math.max(1, this.RESIST + this.skill.brst);
        this.shield.set(((this.settings.healthWithLevel ? 0.6 * this.level : 0) + this.SHIELD) * this.skill.shi, Math.max(0, ((this.settings.healthWithLevel ? 0.006 * this.level : 0) + 1) * this.REGEN * this.skill.rgn * regenMultiplier));
        this.damage = damageMultiplier * this.DAMAGE * this.skill.atk * !this.pacify;
        this.penetration = penetrationMultiplier * (this.PENETRATION + 1.5 * (this.skill.brst + 0.8 * (this.skill.atk - 1)));
        if (!this.settings.dieAtRange || !this.range) this.range = rangeMultiplier * this.RANGE;
        this.fov = fovMultiplier * this.FOV * 275 * Math.sqrt(this.size);
        this.density = densityMultiplier * (1 + 0.08 * this.level) * this.DENSITY;
        this.stealth = stealthMultiplier * this.STEALTH;
        this.pushability = pushabilityMultiplier * this.PUSHABILITY;
        this.sizeMultiplier = sizeMultiplier;
        this.recoilMultiplier = this.RECOIL_MULTIPLIER * recoilReceivedMultiplier;
    }
    bindToMaster(position, bond, isInvulnerable) {
        this.bond = bond;
        this.source = bond;
        this.bond.turrets.push(this);
        this.skill = this.bond.skill;
        this.label = this.label.length ? this.bond.label + " " + this.label : this.bond.label;
        // It will not be in collision calculations any more nor shall it be seen or continue to run independently.
        if (!isInvulnerable) {
            this.removeFromGrid();
            this.skipLife = true;
        }
        // TODO: FIX CLIENT MAKING EVERYTHING FLASH WHEN A VULN TURRET DIES, and display health
        if (isInvulnerable) this.on('dead', () => {util.remove(this.master.turrets, this.master.turrets.indexOf(this))})
        this.settings.drawShape = false;
        // Get my position.
        if (Array.isArray(position)) {
            position = {
                SIZE: position[0],
                X: position[1],
                Y: position[2],
                ANGLE: position[3],
                ARC: position[4],
                LAYER: position[5]
            };
        }
        position.SIZE ??= 10;
        position.X ??= 0;
        position.Y ??= 0;
        position.ANGLE ??= 0;
        position.ARC ??= 360;
        position.LAYER ??= 0;
        let _off = new Vector(position.X, position.Y);
        this.bound = {
            size: position.SIZE / 20,
            angle: position.ANGLE * Math.PI / 180,
            direction: _off.direction,
            offset: _off.length / 10,
            arc: position.ARC * Math.PI / 180,
            layer: position.LAYER
        };
        // Initalize.
        this.activation.update();
        this.facing = this.bond.facing + this.bound.angle;
        this.facingType = ["bound"];
        this.motionType = ["bound"];
        this.move();
    }
    get level() {
        return Math.min(this.levelCap ?? c.LEVEL_CAP, this.skill.level);
    }
    get size() {
        return this.bond == null ? (this.coreSize || this.SIZE) * this.sizeMultiplier * (1 + this.level / 45) : this.bond.size * this.bound.size;
    }
    get mass() {
        return this.density * (this.size ** 2 + 1);
    }
    get realSize() {
        return this.size * lazyRealSizes[Math.floor(Math.abs(this.shape))];
    }
    get xMotion() {
        return (this.velocity.x + this.accel.x) / c.runSpeed;
    }
    get yMotion() {
        return (this.velocity.y + this.accel.y) / c.runSpeed;
    }
    camera(tur = false) {
        let turretsAndProps = this.turrets.concat(this.props);
        // Turret layer ordering
        turretsAndProps.sort((a, b) => a.bound.layer - b.bound.layer);
        return {
            type: 0 + tur * 0x01 + this.settings.drawHealth * 0x02 + (this.type === "tank" && this.displayName) * 0x04,
            invuln: this.invuln,
            id: this.id,
            index: this.index,
            label: this.label,
            x: this.x,
            y: this.y,
            vx: this.velocity.x,
            vy: this.velocity.y,
            size: this.size,
            realSize: this.realSize,
            status: 1,
            health: this.health.display(),
            shield: this.shield.display(),
            alpha: this.alpha,
            facing: this.facing,
            direction: this.bound ? this.bound.direction : 0,
            angle: this.bound ? this.bound.angle : 0,
            offset: this.bound ? this.bound.offset : 0,
            sizeFactor: this.bound ? this.bound.size : 1,
            mirrorMasterAngle: this.settings.mirrorMasterAngle ?? false,
            perceptionAngleIndependence: this.perceptionAngleIndependence, //vfacing: this.vfacing,
            defaultAngle: this.firingArc[0],
            twiggle: forceTwiggle.includes(this.facingType[0]) || (this.facingType[0] === "locksFacing" && this.control.alt),
            layer: this.layerID ? this.layerID : this.bond != null ? this.bound.layer : this.type === "wall" ? 11 : this.type === "food" ? 10 : this.type === "tank" ? 5 : this.type === "crasher" ? 1 : 0,
            color: this.color.compiled,
            strokeWidth: this.strokeWidth,
            borderless: this.borderless,
            drawFill: this.drawFill,
            name: (this.nameColor || "#FFFFFF") + this.name,
            score: this.skill.score,
            guns: this.guns.map((gun) => gun.getPhotoInfo()),
            turrets: turretsAndProps.map((turret) => turret.camera(true)),
            glow: this.glow,
        };
    }
    syncTurrets() {
        for (let i = 0; i < this.guns.length; i++) this.guns[i].syncChildren();
        for (let i = 0; i < this.turrets.length; i++) {
            this.turrets[i].skill = this.skill;
            this.turrets[i].refreshBodyAttributes();
            this.turrets[i].syncTurrets();
        }
    }
    skillUp(stat) {
        let suc = this.skill.upgrade(stat);
        if (suc) {
            this.refreshBodyAttributes();
            for (let i = 0; i < this.guns.length; i++) this.guns[i].syncChildren();
            for (let i = 0; i < this.turrets.length; i++) this.turrets[i].syncTurrets();
        }
        return suc;
    }
    upgrade(number) {
        let old = this;
        if (
            number < this.upgrades.length &&
            this.skill.level >= this.upgrades[number].level
        ) {
            let upgrade = this.upgrades[number],
                upgradeClass = upgrade.class,
                upgradeBranch = upgrade.branch,
                redefineAll = upgrade.redefineAll;
            if (redefineAll) {
                for (let i = 0; i < upgradeClass.length; i++){
                    upgradeClass[i] = ensureIsClass(...upgradeClass[i]);
                }
                this.upgrades = [];
                this.define(upgradeClass);
                this.ON(this.onDef, "upgrade", { oldEntity: old })
            } else {
                this.defs.splice(upgradeBranch, 1, ...upgradeClass);
                this.upgrades = [];
                this.define(this.defs);
                this.ON(this.onDef, "upgrade", { oldEntity: old })
            }
            if (this.color.base == '-1' || this.color.base == 'mirror') {
                this.color.base = getTeamColor((c.GROUPS || (c.MODE == 'ffa' && !c.TAG)) ? TEAM_RED : this.team);
            }
            this.sendMessage("You have upgraded to " + this.label + ".");
            for (let def of this.defs) {
                def = ensureIsClass(def);
                if (typeof def.TOOLTIP == 'string' && def.TOOLTIP.length > 0) {
                    let tooltips = Array.isArray(def.TOOLTIP) ? def.TOOLTIP : [def.TOOLTIP];
                    for (let i = tooltips.length; i--;) this.sendMessage(tooltips[i]);
                }
            }
            this.destroyAllChildren();
            this.skill.update();
            this.syncTurrets();
            this.refreshBodyAttributes();
        }
    }
    destroyAllChildren() {
        for (let instance of entities) {
            if (
                instance.settings.clearOnMasterUpgrade &&
                instance.master.id === this.id
            ) {
                instance.kill();
            }
        }
    }
    damageMultiplier() {
        switch (this.type) {
            case "swarm":
                return 0.25 + 1.5 * util.clamp(this.range / (this.RANGE + 1), 0, 1);
            default:
                return 1;
        }
    }
    move() {
        let g = {
                x: this.control.goal.x - this.x,
                y: this.control.goal.y - this.y,
            },
            gactive = g.x !== 0 || g.y !== 0,
            engine = {
                x: 0,
                y: 0,
            },
            a = this.acceleration / c.runSpeed;
        if (c.SPACE_PHYSICS) {
            this.maxSpeed = this.topSpeed;
            this.damp = 100;
        }
        let type = this.motionType[0],
            args = this.motionType[1] ?? {};
        switch (type) {
            case "grow":
                this.SIZE += args.growSpeed ?? 1;
                break;
            case "fastgrow":
                this.SIZE += args.growSpeed ?? 5;
                break;
            case "glide":
                this.maxSpeed = this.topSpeed;
                this.damp = args.damp ?? 0.05;
                break;
            case "motor":
                this.maxSpeed = 0;
                if (this.topSpeed) {
                    this.damp = Math.abs(a) / this.topSpeed;
                }
                if (gactive) {
                    let len = Math.sqrt(g.x * g.x + g.y * g.y);
                    engine = {
                        x: (a * g.x) / len,
                        y: (a * g.y) / len,
                    };
                }
                break;
            case "spgw":
                this.SIZE += args.growSpeed ?? 0.75;
                this.maxSpeed = this.topSpeed;
                this.damp = args.damp ?? -0.025;
                break;
            case "chonk":
                this.SIZE += args.growSpeed ?? 50;
                this.maxSpeed = this.topSpeed;
                this.damp = args.damo ?? -0.025;
                break;
            case "swarm":
                this.maxSpeed = this.topSpeed;
                let l =
                    util.getDistance(
                        {
                            x: 0,
                            y: 0,
                        },
                        g
                    ) + 1;
                if (gactive && l > this.size) {
                    let XvelDesired = (this.topSpeed * g.x) / l,
                        YvelDesired = (this.topSpeed * g.y) / l,
                        turning = Math.sqrt(
                            (this.topSpeed * Math.max(1, this.range) + 1) / a
                        );
                    engine = {
                        x: (XvelDesired - this.velocity.x) / Math.max(5, turning),
                        y: (YvelDesired - this.velocity.y) / Math.max(5, turning),
                    };
                } else {
                    if (this.velocity.length < this.topSpeed) {
                        engine = {
                            x: (this.velocity.x * a) / 20,
                            y: (this.velocity.y * a) / 20,
                        };
                    }
                }
                break;
            case "chase":
                if (gactive) {
                    let l = util.getDistance({ x: 0, y: 0, }, g);
                    if (l > this.size * 2) {
                        this.maxSpeed = this.topSpeed;
                        let XvelDesired = (this.topSpeed * g.x) / l,
                            YvelDesired = (this.topSpeed * g.y) / l;
                        engine = {
                            x: (XvelDesired - this.velocity.x) * a,
                            y: (YvelDesired - this.velocity.y) * a,
                        };
                    } else {
                        this.maxSpeed = 0;
                    }
                } else {
                    this.maxSpeed = 0;
                }
                break;
            case "drift":
                this.maxSpeed = 0;
                engine = {
                    x: g.x * a,
                    y: g.y * a,
                };
                break;
            case "bound":
                let bound = this.bound,
                    ref = this.bond;
                this.x = ref.x + ref.size * bound.offset * Math.cos(bound.direction + bound.angle + ref.facing);
                this.y = ref.y + ref.size * bound.offset * Math.sin(bound.direction + bound.angle + ref.facing);
                ref.velocity.x += bound.size * this.accel.x * ref.recoilMultiplier;
                ref.velocity.y += bound.size * this.accel.y * ref.recoilMultiplier;
                this.velocity = ref.velocity;
                this.firingArc = [ref.facing + bound.angle, bound.arc / 2];
                this.accel.null();
                this.blend = ref.blend;
                break;
            case "withMaster":
                this.x = this.source.x;
                this.y = this.source.y;
                this.velocity.x = this.source.velocity.x;
                this.velocity.y = this.source.velocity.y;
                break;
            case 'assembler':
                this.alpha -= 0.02;
                this.SIZE += 0.17;
                if (this.alpha <= 0) {
                    this.kill();
                    if (this.SIZE > 50) {
                        this.destroy();
                    }
                }
                break;
            case "desmos":
                this.damp = 0;
                if (this.waveReversed == null) this.waveReversed = this.master.control.alt ? -1 : 1;
                if (this.waveAngle == null) {
                    this.waveAngle = this.master.facing;
                    this.velocity.x = this.velocity.length * Math.cos(this.waveAngle);
                    this.velocity.y = this.velocity.length * Math.sin(this.waveAngle);;
                }
                let waveX = this.maxSpeed * 5 * Math.cos((this.RANGE - this.range) / (args.period ?? 4) * 2);
                let waveY = (args.amplitude ?? 15) * Math.cos((this.RANGE - this.range) / (args.period ?? 4)) * this.waveReversed * (args.invert ? -1 : 1);
                this.x += Math.cos(this.waveAngle) * waveX - Math.sin(this.waveAngle) * waveY;
                this.y += Math.sin(this.waveAngle) * waveX + Math.cos(this.waveAngle) * waveY;
                break;
        }
        this.accel.x += engine.x * this.control.power;
        this.accel.y += engine.y * this.control.power;
    }
    reset(keepPlayerController = true) {
        this.controllers = keepPlayerController ? [this.controllers.filter(con => con instanceof ioTypes.listenToPlayer)[0]] : [];
    }
    face() {
        let t = this.control.target,
            tactive = t.x !== 0 || t.y !== 0,
            oldFacing = this.facing,
            oldVFacing = this.vfacing;
        let type = this.facingType[0],
            args = this.facingType[1] ?? {};
        switch (type) {
            case "autospin":
                this.facing += (args.speed ?? 0.02) / c.runSpeed;
                break;
            case "auraspin":
                this.facing += (args.speed ?? -0.04) / c.runSpeed;
                break;
            case "turnWithSpeed":
                this.facing += ((this.velocity.length / 90) * Math.PI) / c.runSpeed;
                break;
            case "spin":
                this.facing += (args.speed ?? 0.05) / c.runSpeed;
                break;
            case "fastspin":
                this.facing += (args.speed ?? 0.1) / c.runSpeed;
                break;
            case "veryfastspin":
                this.facing += (args.speed ?? 1) / c.runSpeed;
                break;
            case "withMotion":
                this.facing = this.velocity.direction;
                break;
            case "smoothWithMotion":
            case "looseWithMotion":
                this.facing = util.interpolateAngle(this.facing, this.velocity.direction, c.runSpeed / (args.speed ?? 4));
                break;
            case "withTarget":
            case "toTarget":
                let reverse = this.reverseTargetWithTank ? 1 : this.reverseTank;
                this.facing = Math.atan2(t.y * reverse, t.x * reverse);
                break;
            case "locksFacing":
                if (!this.control.alt) this.facing = Math.atan2(t.y, t.x);
                break;
            case "looseWithTarget":
            case "looseToTarget":
            case "smoothToTarget":
                this.facing = util.interpolateAngle(this.facing, Math.atan2(t.y, t.x), c.runSpeed / (args.speed ?? 4));
                break;
            case "noFacing":
                this.facing = args.angle ?? 0;
                break;
            case "bound":
                let angleToTarget, angleDiff = 3,
                    reduceIndependence = false,
                    slowness = this.settings.mirrorMasterAngle ? 1 : (args.slowness ?? 4) / c.runSpeed;
                if (this.control.main) {
                    angleToTarget = Math.atan2(t.y, t.x);
                    angleDiff = Math.abs(util.angleDifference(angleToTarget, this.firingArc[0]));
                    if (angleDiff >= this.firingArc[1]) {
                        angleToTarget = this.firingArc[0];
                        reduceIndependence = true;
                    }
                } else {
                    angleToTarget = this.firingArc[0];
                    reduceIndependence = true;
                }
                if (reduceIndependence) {
                    this.perceptionAngleIndependence -= 0.3 / c.runSpeed;
                    if (this.perceptionAngleIndependence < 0) {
                        this.perceptionAngleIndependence = 0;
                    }
                } else {
                    this.perceptionAngleIndependence += 0.3 / c.runSpeed;
                    if (this.perceptionAngleIndependence > 1) {
                        this.perceptionAngleIndependence = 1;
                    }
                }
                this.facing = util.interpolateAngle(this.facing, angleToTarget, Math.min(1, 1 / (slowness * Math.min(1, angleDiff))));
                break;
        }
        this.facing += this.turnAngle;
        // Loop
        const TAU = 2 * Math.PI;
        if (this.facingLocked) {
            this.facing = oldFacing;
            this.vfacing = oldVFacing;
        } else {
            this.facing = ((this.facing % TAU) + TAU) % TAU;
            this.vfacing = util.angleDifference(oldFacing, this.facing) * c.runSpeed;
        }
    }
    takeSelfie() {
        this.flattenedPhoto = null;
        this.photo = this.settings.drawShape ? this.camera() : undefined;
    }
    physics() {
        if (this.accel.x == null || this.velocity.x == null) {
            util.error("Void Error!");
            util.error(this.collisionArray);
            util.error(this.label);
            util.error(this);
            this.accel.null();
            this.velocity.null();
        }
        // Apply acceleration
        this.velocity.x += this.accel.x;
        this.velocity.y += this.accel.y;
        // Reset acceleration
        this.accel.null();
        // Apply motion
        this.stepRemaining = 1;
        if (c.SPACE_PHYSICS) this.stepRemaining = 2;
        this.x += (this.stepRemaining * this.velocity.x) / c.runSpeed;
        this.y += (this.stepRemaining * this.velocity.y) / c.runSpeed;
    }
    friction() {
        var motion = this.velocity.length,
            excess = motion - this.maxSpeed;
        if (excess > 0 && this.damp) {
            var k = this.damp / c.runSpeed,
                drag = excess / (k + 1),
                finalvelocity = this.maxSpeed + drag;
            if (c.SPACE_PHYSICS)
                finalvelocity *= this.type === "bullet" ? 1.005 : 1.1;
            this.velocity.x = (finalvelocity * this.velocity.x) / motion;
            this.velocity.y = (finalvelocity * this.velocity.y) / motion;
        }
    }
    confinementToTheseEarthlyShackles() {
        if (this.x == null || this.x == null) {
            util.error("Void Error!");
            util.error(this.collisionArray);
            util.error(this.label);
            util.error(this);
            this.accel.null();
            this.velocity.null();
            return 0;
        }
        if (!this.settings.canGoOutsideRoom) {
            if (c.ARENA_TYPE === "circle") {
                let centerPoint = {
                    x: room.width / 2,
                    y: room.height / 2,
                }, dist = util.getDistance(this, centerPoint);
                if (dist > room.width / 2) {
                    let strength = (dist - room.width / 2) * c.ROOM_BOUND_FORCE / (c.runSpeed * 750);
                    this.x = lerp(this.x, centerPoint.x, strength);
                    this.y = lerp(this.y, centerPoint.y, strength);
                }
            } else {
                let padding = this.realSize;
                // Frontier middle barrier
                let leftEdge = 0, 
                    rightEdge = room.width,
                    dividerX = (c.UNDERGROUND_START + c.TDM_END) / 2 * c.TILE_WIDTH;
                if (c.UNDERGROUND_START && this.x < dividerX) rightEdge = c.TDM_END * c.TILE_WIDTH;
                else if (c.UNDERGROUND_START && this.x > dividerX) leftEdge = c.UNDERGROUND_START * c.TILE_WIDTH;
                this.accel.x -= Math.max(this.x + padding - rightEdge, Math.min(this.x - padding - leftEdge, 0)) * c.ROOM_BOUND_FORCE / c.runSpeed;
                this.accel.y -= Math.max(this.y + padding - room.height, Math.min(this.y - padding, 0)) * c.ROOM_BOUND_FORCE / c.runSpeed;
            }
        }
    }
    contemplationOfMortality() {
        if (this.invuln) {
            this.damageRecieved = 0;
            return 0;
        }
        if (this.damageRecieved > 0) {
            let damageInflictor = []
            let damageTool = []

            for (let i = 0; i < this.collisionArray.length; i++) {
                let instance = this.collisionArray[i];
                if (instance.type === 'wall' || !instance.damage) continue;
                damageInflictor.push(instance.master)
                damageTool.push(instance)
            }
            this.onDef != null ? this.ON(undefined, 'damage', { damageInflictor, damageTool }) : null
            // TODO: find out how to fix 'collide' and 'damage'
        }
        // Life-limiting effects
        if (this.settings.diesAtRange) {
            this.range -= 1 / c.runSpeed;
            if (this.range < 0) {
                this.kill();
            }
        }
        if (this.settings.diesAtLowSpeed) {
            if (
                !this.collisionArray.length &&
                this.velocity.length < this.topSpeed / 2
            ) {
                this.health.amount -= this.health.getDamage(1 / c.runSpeed);
            }
        }
        // Shield regen and damage
        if (this.shield.max) {
            if (this.damageRecieved) {
                let shieldDamage = this.shield.getDamage(this.damageRecieved);
                this.damageRecieved -= shieldDamage;
                this.shield.amount -= shieldDamage;
            }
        }
        // Health damage
        if (this.damageRecieved) {
            let healthDamage = this.health.getDamage(this.damageRecieved);
            this.blend.amount = 1;
            this.health.amount -= healthDamage;
        }
        this.damageRecieved = 0;
        // Check for death
        if (this.isDead()) {

            this.emit('dead');

            //Shoot on death
            for (let i = 0; i < this.guns.length; i++) {
                let gun = this.guns[i];
                if (gun.shootOnDeath && gun.body != null) {
                    gun.spawnBullets();
                }
            }

            // MEMORY LEAKS ARE BAD!!!!
            for (let i = 0; i < this.turrets.length; i++) {
                this.turrets[i].kill();
            }

            // Initalize message arrays
            let killers = [],
                killTools = [],
                notJustFood = false;
            // If I'm a tank, call me a nameless player
            let name = this.master.name == ""
                ? this.master.type === "tank"
                    ? "an unnamed " + this.label : this.master.type === "miniboss"
                    ? "a visiting " + this.label : this.label.substring(0, 3) == 'The'
                    ? this.label : util.addArticle(this.label)
                : this.master.name + "'s " + this.label;
            // Calculate the jackpot
            let jackpot = util.getJackpot(this.skill.score) / this.collisionArray.length;
            // Now for each of the things that kill me...
            for (let i = 0; i < this.collisionArray.length; i++) {
                let instance = this.collisionArray[i];
                if (instance.type === 'wall' || !instance.damage) continue;
                if (instance.master.settings.acceptsScore) {
                    // If it's not food, give its master the score
                    if (instance.master.type === "tank" || instance.master.type === "miniboss") {
                        notJustFood = true;
                    }
                    instance.master.skill.score += jackpot;
                    killers.push(instance.master); // And keep track of who killed me
                } else if (instance.settings.acceptsScore) {
                    instance.skill.score += jackpot;
                }
                killTools.push(instance); // Keep track of what actually killed me
            }
            // Remove duplicates
            killers = killers.filter((elem, index, self) => index == self.indexOf(elem));
            this.onDef != null ? this.ON(this.onDef, 'death', { killers, killTools }) : null
            killers.forEach((e) => {
                e.onDef != null ? e.ON(e.onDef, 'kill', { entity: this }) : null;
            });
            // If there's no valid killers (you were killed by food), change the message to be more passive
            let killText = notJustFood ? "" : "You have been killed by ",
                dothISendAText = this.settings.givesKillMessage;

            for (let i = 0; i < killers.length; i++) {
                let instance = killers[i];
                
                switch (this.type) {
                    case "tank":
                        killers.length > 1 ? instance.killCount.assists++ : instance.killCount.solo++;
                        break;
                    
                    case "food":
                    case "crasher":
                        instance.killCount.polygons++;
                        break
                    
                    case "miniboss": 
                        instance.killCount.bosses++;
                        break;
                }

                this.killCount.killers.push(instance.index);
            };
            // Add the killers to our death message, also send them a message
            if (notJustFood) {
                for (let i = 0; i < killers.length; i++) {
                    let instance = killers[i];
                    if (instance.master.type !== "food" && instance.master.type !== "crasher") {
                        killText += instance.name == "" ? killText == "" ? "An unnamed player" : "an unnamed player" : instance.name;
                        killText += " and ";
                    }
                    // Only if we give messages
                    if (dothISendAText) {
                        instance.sendMessage("You killed " + name + (killers.length > 1 ? " (with some help)." : "."));
                    }
                    if (this.settings.killMessage) {
                        instance.sendMessage("You " + this.settings.killMessage + " " + name + (killers.length > 1 ? " (with some help)." : "."));
                    }
                }
                // Prepare the next part of the next
                killText = killText.slice(0, -4) + "killed you with ";
            }
            // Broadcast
            if (this.settings.broadcastMessage) {
                sockets.broadcast(this.settings.broadcastMessage);
            }
            if (this.settings.defeatMessage) {
                let text = util.addArticle(this.label, true);
                if (notJustFood) {
                    text += " has been defeated by";
                    for (let { name } of killers) {
                        text += " ";
                        text += name === "" ? "an unnamed player" : name;
                        text += " and";
                    }
                    text = text.slice(0, -4);
                    text += "!";
                } else {
                    text += " fought a polygon... and the polygon won.";
                }
                sockets.broadcast(text);
            }

            // instead of "a Machine Gunner Bullet and a Machine Gunner Bullet and a Machine Gunner Bullet",
            // make it say " 3 Machine Gunner Bullets"
            let killCounts = {};
            for (let { label } of killTools) {
                if (!killCounts[label]) killCounts[label] = 0;
                killCounts[label]++;
            }
            let killCountEntries = Object.entries(killCounts).map(([name, count], i) => name);
            for (let i = 0; i < killCountEntries.length; i++) {
                killText += (killCounts[killCountEntries[i]] == 1) ? util.addArticle(killTools[i].label) : killCounts[killCountEntries[i]] + ' ' + killCountEntries[i] + 's';
                killText += i < killCountEntries.length - 2 ? ', ' : ' and ';
            }

            // Prepare it and clear the collision array.
            killText = killText.slice(0, -5);
            if (killText === "You have been kille") {
                killText = "You have died a stupid death";
            }
            this.sendMessage(killText + ".");
            // If I'm the leader, broadcast it:
            if (this.id === room.topPlayerID) {
                let usurptText = this.name === "" ? "The leader" : this.name;
                if (notJustFood) {
                    usurptText += " has been usurped by";
                    for (let i = 0; i < killers.length; i++) {
                        usurptText += " ";
                        usurptText += killers[i].name === "" ? "an unnamed player" : killers[i].name;
                        usurptText += " and";
                    }
                    usurptText = usurptText.slice(0, -4) + "!";
                } else {
                    usurptText += " fought a polygon... and the polygon won.";
                }
                sockets.broadcast(usurptText);
            }
            this.setKillers(killers);
            // Kill it
            return 1;
        }
        return 0;
    }
    protect() {
        entitiesToAvoid.push(this);
        this.isProtected = true;
    }
    say(message, duration = c.CHAT_MESSAGE_DURATION) {
        if (!chats[this.id]) {
            chats[this.id] = [];
        }
        chats[this.id].unshift({ message, expires: Date.now() + duration });
    }
    sendMessage(message) {} // Dummy
    setKillers(killers) {} // Dummy
    kill() {
        this.invuln = false;
        this.health.amount = -100;
    }
    destroy() {
        // Remove from the protected entities list
        if (this.isProtected) {
            util.remove(entitiesToAvoid, entitiesToAvoid.indexOf(this));
        }
        // Remove from minimap
        let i = minimap.findIndex(entry => entry[0] === this.id);
        if (i != -1) {
            util.remove(minimap, i);
        }
        // Remove this from views
        for (let view of views) {
            view.remove(this);
        }
        // Remove from parent lists if needed
        if (this.parent != null)
            util.remove(this.parent.children, this.parent.children.indexOf(this));
        // Kill all of its children
        for (let instance of entities) {
            if (instance.source.id === this.id) {
                if (instance.settings.persistsAfterDeath) {
                    instance.source = instance;
                } else {
                    instance.kill();
                }
            }
            if (instance.parent && instance.parent.id === this.id) {
                instance.parent = null;
            }
            if (instance.master.id === this.id) {
                instance.kill();
                instance.master = instance;
            }
        }
        // Remove everything bound to it
        for (let i = 0; i < this.turrets.length; i++) this.turrets[i].destroy();
        // Remove from the collision grid
        this.removeFromGrid();
        this.isGhost = true;
    }
    isDead() {
        return this.health.amount <= 0;
    }
}
module.exports = { init, StatusEffect, Gun, Entity };