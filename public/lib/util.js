import { global } from "./global.js";
import { settings } from "./settings.js";
const util = {
    submitToLocalStorage: name => {
        localStorage.setItem(name + 'Value', document.getElementById(name).value);
        localStorage.setItem(name + 'Checked', document.getElementById(name).checked);
        return false;
    },
    retrieveFromLocalStorage: name => {
        document.getElementById(name).value = localStorage.getItem(name + 'Value');
        document.getElementById(name).checked = localStorage.getItem(name + 'Checked') === 'true';
        return false;
    },
    handleLargeNumber: (a, cullZeroes = false) => {
        if (cullZeroes && a == 0) {
            return '';
        }
        if (a < Math.pow(10, 3)) {
            return '' + a.toFixed(0);
        }
        if (a < Math.pow(10, 6)) {
            return (a / Math.pow(10, 3)).toFixed(2) + "k";
        }
        if (a < Math.pow(10, 9)) {
            return (a / Math.pow(10, 6)).toFixed(2) + "m";
        }
        if (a < Math.pow(10, 12)) {
            return (a / Math.pow(10, 9)).toFixed(2) + "b";
        }
        if (a < Math.pow(10, 15)) {
            return (a / Math.pow(10, 12)).toFixed(2) + "t";
        }
        return (a / Math.pow(10, 15)).toFixed(2) + "q";
    },
    timeForHumans: x => {
        // ought to be in seconds
        let seconds = x % 60;
        x /= 60;
        x = Math.floor(x);
        let minutes = x % 60;
        x /= 60;
        x = Math.floor(x);
        let hours = x % 24;
        x /= 24;
        x = Math.floor(x);
        let days = x;
        let y = '';

        function weh(z, text) {
            if (z) {
                y = y + ((y === '') ? '' : ', ') + z + ' ' + text + ((z > 1) ? 's' : '');
            }
        }
        weh(days, 'day');
        weh(hours, 'hour');
        weh(minutes, 'minute');
        weh(seconds, 'second');
        if (y === '') {
            y = 'less than a second';
        }
        return y;
    },
    addArticle: string => {
        return (/[aeiouAEIOU]/.test(string[0])) ? 'an ' + string : 'a ' + string;
    },
    formatLargeNumber: x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    pullJSON: fileName => {
        return new Promise((resolve, reject) => {
            const url = `${location.protocol}//${window.serverAdd}/lib/json/${fileName}.json`;
            console.log("Loading JSON from " + url);
            fetch(url).then(response => response.json()).then(json => {
                console.log("JSON load from " + url + " complete");
                resolve(json);
            }).catch(error => {
                console.log("JSON load from " + url + " complete");
                reject(error);
            });
        });
    },
    lerp: (a, b, x, syncWithFps = false) => {
        if (syncWithFps) {
            if (global.fps < 20) global.fps = 20;
            x /= global.fps / 120;
        }
        return a + x * (b - a);
    },
    lerpAngle: (is, to, amount, syncWithFps) => {
        var normal = {
            x: Math.cos(is),
            y: Math.sin(is)
        };
        var normal2 = {
            x: Math.cos(to),
            y: Math.sin(to)
        };
        var res = {
            x: util.lerp(normal.x, normal2.x, amount, syncWithFps),
            y: util.lerp(normal.y, normal2.y, amount, syncWithFps)
        };
        return Math.atan2(res.y, res.x);
    },
    getRatio: () => Math.max(global.screenWidth, 16 * global.screenHeight / 9) / global.player.renderv,
    getScreenRatio: () => Math.max(global.screenWidth, 16 * global.screenHeight / 9) / global.screenSize,
    Smoothbar: (value, speed, sharpness = 3, lerpValue = .05) => {
        let time = Date.now();
        let display = value;
        let oldvalue = value;
        return {
            set: val => {
                if (value !== val) {
                    oldvalue = display;
                    value = val;
                    time = Date.now();
                }
            },
            get: (round = false) => {
                display = util.lerp(display, value, lerpValue);
                if (Math.abs(value - display) < 0.1 && round) display = value;
                return display;
            },
        };
    },
    isInView: (x, y, r, mid = false) => {
        let ratio = util.getRatio();
        r += settings.graphical.borderChunk;
        if (mid) {
            ratio *= 2;
            return x > -global.screenWidth / ratio - r && x < global.screenWidth / ratio + r && y > -global.screenHeight / ratio - r && y < global.screenHeight / ratio + r;
        }
        return x > -r && x < global.screenWidth / ratio + r && y > -r && y < global.screenHeight / ratio + r;
    },
    getEntityImageFromMockup: (index, color) => {
        let firstIndex = parseInt(index.split("-")[0]),
            mainMockup = global.mockups[firstIndex],
            guns = [],
            turrets = [],
            name = "",
            upgradeTooltip = "",
            positionData = [],
            rerootUpgradeTree = [],
            allRoots = [],
            trueColor = mainMockup.color.split(" ");
        if ((trueColor[0] == '-1' || trueColor[0] == 'mirror') && color) trueColor[0] = color.split(' ')[0];
        let finalColor = trueColor.join(' ');
        
        for (let i of index.split("-")) {
            let mockup = global.mockups[parseInt(i)];
            guns.push(...mockup.guns);
            turrets.push(...mockup.turrets);
            positionData.push(mockup.position);
            name += mockup.name.length > 0 ? "-" + mockup.name : "";
            upgradeTooltip += mockup.upgradeTooltip ? "\n" + mockup.upgradeTooltip : "";
            if (mockup.rerootUpgradeTree) allRoots.push(...mockup.rerootUpgradeTree.split("\\/"));
        }
        for (let root of allRoots) {
            if (!rerootUpgradeTree.includes(root))
                rerootUpgradeTree.push(root);
        }
        turrets.sort((a, b) => a.layer - b.layer);
        return {
            time: 0,
            index: index,
            x: mainMockup.x,
            y: mainMockup.y,
            vx: 0,
            vy: 0,
            size: mainMockup.size,
            realSize: mainMockup.realSize,
            color: finalColor,
            borderless: mainMockup.borderless,
            drawFill: mainMockup.drawFill,
            upgradeColor: mainMockup.upgradeColor ? mainMockup.upgradeColor : null,
            glow: mainMockup.glow,
            render: {
                status: {
                    getFade: () => {
                        return 1;
                    },
                    getColor: () => {
                        return '#FFFFFF';
                    },
                    getBlend: () => {
                        return 0;
                    },
                    health: {
                        get: () => {
                            return 1;
                        },
                    },
                    shield: {
                        get: () => {
                            return 1;
                        },
                    },
                },
            },
            facing: mainMockup.facing,
            shape: mainMockup.shape,
            name: name.substring(1),
            upgradeTooltip: upgradeTooltip.substring(1),
            upgradeName: mainMockup.upgradeName,
            score: 0,
            tiggle: 0,
            layer: mainMockup.layer,
            position: util.sizeMultipleMockups(positionData),
            rerootUpgradeTree,
            guns: {
                length: guns.length,
                getPositions: () => Array(guns.length).fill(0),
                getConfig: () => guns.map(g => {
                    return {
                        color: g.color,
                        alpha: g.alpha,
                        strokeWidth: g.strokeWidth,
                        borderless: g.borderless, 
                        drawFill: g.drawFill,
                        drawAbove: g.drawAbove,
                        length: g.length,
                        width: g.width,
                        aspect: g.aspect,
                        angle: g.angle,
                        direction: g.direction,
                        offset: g.offset,
                    };
                }),
                update: () => {},
            },
            turrets: turrets.map((t) => {
                let o = util.getEntityImageFromMockup(t.index);
                o.color = t.color;
                o.borderless = t.borderless;
                o.drawFill = t.drawFill;
                o.realSize = o.realSize / o.size * mainMockup.size * t.sizeFactor;
                o.size = mainMockup.size * t.sizeFactor;
                o.sizeFactor = t.sizeFactor;
                o.angle = t.angle;
                o.offset = t.offset;
                o.direction = t.direction;
                o.facing = t.direction + t.angle;
                o.render.f = o.facing;
                o.layer = t.layer;
                o.mirrorMasterAngle = t.mirrorMasterAngle;
                return o;
            }),
        };
    },
    sizeMultipleMockups: (positionData) => {
        let endPoints = [];

        function rounder(val) {
            if (Math.abs(val) < 0.00001) val = 0;
            return +val.toPrecision(6);
        }
        
        function getFurthestFrom(x, y) {
            let furthestDistance = 0,
                furthestPoint = [x, y],
                furthestIndex = 0;
            for (let i = 0; i < endPoints.length; i++) {
                let point = endPoints[i];
                let distance = (point[0] - x) ** 2 + (point[1] - y) ** 2;
                if (distance > furthestDistance) {
                    furthestDistance = distance;
                    furthestPoint = point;
                    furthestIndex = i;
                }
            }
            endPoints.splice(furthestIndex, 1);
            return [rounder(furthestPoint[0]), rounder(furthestPoint[1])];
        }
        
        function checkIfSamePoint(p1, p2) {
            return p1[0] == p2[0] && p1[1] == p2[1];
        }
        
        function checkIfOnLine(endpoint1, endpoint2, checkPoint) {
            let xDiff = endpoint2[0] - endpoint1[0],
                yDiff = endpoint2[1] - endpoint1[1];
            
            // Endpoints on the same vertical line
            if (xDiff == 0) {
                return (checkPoint[0] == endpoint1[0]);
            }
        
            let slope = yDiff / xDiff,
                xLengthToCheck = checkPoint[0] - endpoint1[0],
                predictedY = endpoint1[1] + xLengthToCheck * slope;
            // Check point is on the line with a small margin
            return Math.abs(checkPoint[1] - predictedY) <= 1e-5;
        }

        // Find circumcircle and circumcenter
        function constructCircumcirle(point1, point2, point3) {
            // Rounder to avoid floating point nonsense
            let x1 = rounder(point1[0]);
            let y1 = rounder(point1[1]);
            let x2 = rounder(point2[0]);
            let y2 = rounder(point2[1]);
            let x3 = rounder(point3[0]);
            let y3 = rounder(point3[1]);

            // Invalid math protection
            if (x3 == x1 || x3 == x2) {
                x3 += 1e-5;
            }
            
            let numer1 = x3 ** 2 + y3 ** 2 - x1 ** 2 - y1 ** 2;
            let numer2 = x2 ** 2 + y2 ** 2 - x1 ** 2 - y1 ** 2;
            let factorX1 = 2 * x2 - 2 * x1;
            let factorX2 = 2 * x3 - 2 * x1;
            let factorY1 = 2 * y1 - 2 * y2;
            let factorY2 = 2 * y1 - 2 * y3;
            let y = (numer1 * factorX1 - numer2 * factorX2) / (factorY1 * factorX2 - factorY2 * factorX1);
            let x = ((y - y3) ** 2 - (y - y1) ** 2 - x1 ** 2 + x3 ** 2) / factorX2;
            let r = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));

            return {x, y, r};
        }
        
        // Draw each mockup circumcircle as a ring of 32 points
        for (let position of positionData) {
            let {axis, middle} = position;
            for (let i = 0; i < 32; i++) {
                let theta = Math.PI / 16 * i;
                endPoints.push([middle.x + Math.cos(theta) * axis / 2, middle.y + Math.sin(theta) * axis / 2]);
            }
        }

        // Convert to useful info
        endPoints.sort((a, b) => (b[0] ** 2 + b[1] ** 2 - a[0] ** 2 - a[1] ** 2));
        let point1 = getFurthestFrom(0, 0),
            point2 = getFurthestFrom(...point1);
        
        // Repeat selecting the second point until at least one of the first two points is off the centerline
        while (point1[0] == 0 && point2[0] == 0 || point1[1] == 0 && point2[1] == 0) {
            point2 = getFurthestFrom(...point1);
        }

        let avgX = (point1[0] + point2[0]) / 2,
            avgY = (point1[1] + point2[1]) / 2,
            point3 = getFurthestFrom(avgX, avgY);
        
        // Repeat selecting the third point until it's actually different from the other points and it's not collinear with them
        while (checkIfSamePoint(point3, point1) || checkIfSamePoint(point3, point2) || checkIfOnLine(point1, point2, point3)) {
            point3 = getFurthestFrom(avgX, avgY);
        }
        
        let {x, y, r} = constructCircumcirle(point1, point2, point3);

        return {
            axis: r * 2,
            middle: {x, y},
        };
    },
}
export { util }