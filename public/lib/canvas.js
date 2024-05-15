import { global } from "./global.js";
import { settings } from "./settings.js";
import * as socketStuff from "./socketInit.js";
let { gui } = socketStuff;

class Canvas {
    constructor() {
        this.directionLock = false;
        this.target = global.target;
        this.socket = global.socket;
        this.directions = [];

        this.chatInput = document.getElementById('chatInput');
        this.chatInput.addEventListener('keydown', event => {
            if (![global.KEY_ENTER, global.KEY_ESC].includes(event.keyCode)) return;
            this.chatInput.blur();
            this.cv.focus();
            this.chatInput.hidden = true;
            if (!this.chatInput.value) return;
            if (event.keyCode === global.KEY_ENTER) this.socket.talk('M', this.chatInput.value);
            this.chatInput.value = "";
        });

        this.cv = document.getElementById('gameCanvas');
        this.cv.addEventListener('mousemove', event => this.mouseMove(event), false);
        this.cv.addEventListener('mousedown', event => this.mouseDown(event), false);
        this.cv.addEventListener('mouseup', event => this.mouseUp(event), false);
        this.cv.addEventListener('keypress', event => this.keyPress(event), false);
        this.cv.addEventListener('keydown', event => this.keyDown(event), false);
        this.cv.addEventListener('keyup', event => this.keyUp(event), false);
        this.cv.addEventListener('wheel', event => this.wheel(event), false);
        this.cv.resize = (width, height) => {
            this.cv.width = this.width = width;
            this.cv.height = this.height = height;
        };
        this.cv.resize(innerWidth, innerHeight);
        this.reverseDirection = false;
        this.inverseMouse = false;
        this.spinLock = true;
        this.treeScrollSpeed = 0.5;
        this.treeScrollSpeedMultiplier = 1;
        global.canvas = this;
    }
    wheel(event) {
        if (!global.died && global.showTree) {
            if (event.deltaY > 1) {
                global.treeScale /= 1.1;
            } else {
                global.treeScale *= 1.1;
            }
        }
    }
    keyPress(event) {
        switch (event.keyCode) {
            case global.KEY_ZOOM_OUT:
                if (!global.died && global.showTree) global.treeScale /= 1.1;
                break;
            case global.KEY_ZOOM_IN:
                if (!global.died && global.showTree) global.treeScale *= 1.1;
                break;
        }
    }
    keyDown(event) {
        switch (event.keyCode) {
            case global.KEY_SHIFT:
                if (global.showTree) this.treeScrollSpeedMultiplier = 5;
                else this.socket.cmd.set(6, true);
                break;

            case global.KEY_ENTER:
                // Enter to respawn
                if (global.died) {
                    this.socket.talk('s', global.playerName, 0, 1 * settings.game.autoLevelUp);
                    global.died = false;
                    break;
                }

                // or to talk instead
                if (this.chatInput.hidden && global.gameStart) {
                    this.chatInput.hidden = false;
                    this.chatInput.focus();
                    break;
                }
                break;

            case global.KEY_UP_ARROW:
                if (!global.died && global.showTree) return global.scrollVelocityY = -this.treeScrollSpeed * this.treeScrollSpeedMultiplier;
            case global.KEY_UP:
                this.socket.cmd.set(0, true);
                break;
            case global.KEY_DOWN_ARROW:
                if (!global.died && global.showTree) return global.scrollVelocityY = +this.treeScrollSpeed * this.treeScrollSpeedMultiplier;
            case global.KEY_DOWN:
                this.socket.cmd.set(1, true);
                break;
            case global.KEY_LEFT_ARROW:
                if (!global.died && global.showTree) return global.scrollVelocityX = -this.treeScrollSpeed * this.treeScrollSpeedMultiplier;
            case global.KEY_LEFT:
                this.socket.cmd.set(2, true);
                break;
            case global.KEY_RIGHT_ARROW:
                if (!global.died && global.showTree) return global.scrollVelocityX = +this.treeScrollSpeed * this.treeScrollSpeedMultiplier;
            case global.KEY_RIGHT:
                this.socket.cmd.set(3, true);
                break;
            case global.KEY_MOUSE_0:
                this.socket.cmd.set(4, true);
                break;
            case global.KEY_MOUSE_1:
                this.socket.cmd.set(5, true);
                break;
            case global.KEY_MOUSE_2:
                this.socket.cmd.set(6, true);
                break;
            case global.KEY_LEVEL_UP:
                this.socket.talk('L');
                break;
            case global.KEY_FUCK_YOU:
                this.socket.talk('0');
                break;
            case global.KEY_BECOME:
                this.socket.talk('H');
                break;
            case global.KEY_MAX_STAT:
                global.statMaxing = true;
                break;
            case global.KEY_SUICIDE:
                this.socket.talk('1');
                break;
        }
        if (!event.repeat) {
            switch (event.keyCode) {
                case global.KEY_AUTO_SPIN:
                    global.autoSpin = !global.autoSpin;
                    this.socket.talk('t', 0);
                    break;
                case global.KEY_AUTO_FIRE:
                    this.socket.talk('t', 1);
                    break;
                case global.KEY_OVER_RIDE:
                    this.socket.talk('t', 2);
                    break;
                case global.KEY_REVERSE_MOUSE: //client side only, no server effects except message
                    this.inverseMouse = !this.inverseMouse;
                    this.socket.talk('t', 3);
                    break;
                case global.KEY_REVERSE_TANK: //client side only, no server effects except message
                    this.reverseDirection = !this.reverseDirection;
                    this.socket.talk('t', 4);
                    break;
                case global.KEY_AUTO_ALT:
                    this.socket.talk('t', 5);
                    break;
                case global.KEY_SPIN_LOCK:
                    this.spinLock = !this.spinLock;
                    this.socket.talk('t', 6);
                    break;
                case global.KEY_CLASS_TREE:
                    global.treeScale = 1;
                    global.showTree = !global.showTree;
                    break;
            }
            if (global.canSkill) {
                let skill = [
                    global.KEY_UPGRADE_ATK, global.KEY_UPGRADE_HTL, global.KEY_UPGRADE_SPD,
                    global.KEY_UPGRADE_STR, global.KEY_UPGRADE_PEN, global.KEY_UPGRADE_DAM,
                    global.KEY_UPGRADE_RLD, global.KEY_UPGRADE_MOB, global.KEY_UPGRADE_RGN,
                    global.KEY_UPGRADE_SHI
                ].indexOf(event.keyCode);
                if (skill >= 0) this.socket.talk('x', skill, 1 * global.statMaxing);
            }
            if (global.canUpgrade) {
                switch (event.keyCode) {
                    case global.KEY_CHOOSE_1:
                        this.socket.talk('U', 0, parseInt(gui.upgrades[0][0]));
                        break;
                    case global.KEY_CHOOSE_2:
                        this.socket.talk('U', 1, parseInt(gui.upgrades[1][0]));
                        break;
                    case global.KEY_CHOOSE_3:
                        this.socket.talk('U', 2, parseInt(gui.upgrades[2][0]));
                        break;
                    case global.KEY_CHOOSE_4:
                        this.socket.talk('U', 3, parseInt(gui.upgrades[3][0]));
                        break;
                    case global.KEY_CHOOSE_5:
                        this.socket.talk('U', 4, parseInt(gui.upgrades[4][0]));
                        break;
                    case global.KEY_CHOOSE_6:
                        this.socket.talk('U', 5, parseInt(gui.upgrades[5][0]));
                        break;
                }
            }
        }
    }
    keyUp(event) {
        switch (event.keyCode) {
            case global.KEY_SHIFT:
                if (global.showTree) this.treeScrollSpeedMultiplier = 1;
                else this.socket.cmd.set(6, false);
                break;
            case global.KEY_UP_ARROW:
                global.scrollVelocityY = 0;
            case global.KEY_UP:
                this.socket.cmd.set(0, false);
                break;
            case global.KEY_DOWN_ARROW:
                global.scrollVelocityY = 0;
            case global.KEY_DOWN:
                this.socket.cmd.set(1, false);
                break;
            case global.KEY_LEFT_ARROW:
                global.scrollVelocityX = 0;
            case global.KEY_LEFT:
                this.socket.cmd.set(2, false);
                break;
            case global.KEY_RIGHT_ARROW:
                global.scrollVelocityX = 0;
            case global.KEY_RIGHT:
                this.socket.cmd.set(3, false);
                break;
            case global.KEY_MOUSE_0:
                this.socket.cmd.set(4, false);
                break;
            case global.KEY_MOUSE_1:
                this.socket.cmd.set(5, false);
                break;
            case global.KEY_MOUSE_2:
                this.socket.cmd.set(6, false);
                break;
            case global.KEY_MAX_STAT:
                global.statMaxing = false;
                break;
        }
    }
    mouseDown(mouse) {
        if (!this.socket) return;
        let primaryFire = 4,
            secondaryFire = 6;
        if (this.inverseMouse) [primaryFire, secondaryFire] = [secondaryFire, primaryFire];
        switch (mouse.button) {
            case 0:
                let mpos = {
                    x: mouse.clientX * global.ratio,
                    y: mouse.clientY * global.ratio,
                };
                let statIndex = global.clickables.stat.check(mpos);
                if (statIndex !== -1) {
                    this.socket.talk('x', statIndex, 0);
                } else if (global.clickables.skipUpgrades.check(mpos) !== -1) {
                    global.clearUpgrades();
                } else {
                    let upgradeIndex = global.clickables.upgrade.check(mpos);
                    if (upgradeIndex !== -1) this.socket.talk('U', upgradeIndex, parseInt(gui.upgrades[upgradeIndex][0]));
                    else this.socket.cmd.set(primaryFire, true);
                }
                break;
            case 1:
                this.socket.cmd.set(5, true);
                break;
            case 2:
                this.socket.cmd.set(secondaryFire, true);
                break;
        }
    }
    mouseUp(mouse) {
        if (!this.socket) return;
        let primaryFire = 4,
            secondaryFire = 6;
        if (this.inverseMouse) [primaryFire, secondaryFire] = [secondaryFire, primaryFire];
        switch (mouse.button) {
            case 0:
                this.socket.cmd.set(primaryFire, false);
                break;
            case 1:
                this.socket.cmd.set(5, false);
                break;
            case 2:
                this.socket.cmd.set(secondaryFire, false);
                break;
        }
    }
    mouseMove(mouse) {
        global.statHover = global.clickables.hover.check({
            x: mouse.clientX * global.ratio,
            y: mouse.clientY * global.ratio,
        }) === 0;
        if (!this.spinLock) return;
        global.mouse.x = mouse.clientX * global.ratio;
        global.mouse.y = mouse.clientY * global.ratio;
    }
}
export { Canvas }