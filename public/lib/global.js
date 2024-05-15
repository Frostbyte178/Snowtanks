function Clickable() {
    let region = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
    };
    let active = false;
    return {
        set: (x, y, w, h) => {
            region.x = x * global.ratio;
            region.y = y * global.ratio;
            region.w = w * global.ratio;
            region.h = h * global.ratio;
            active = true;
        },
        check: target => {
            let dx = Math.round(target.x - region.x);
            let dy = Math.round(target.y - region.y);
            return active && dx >= 0 && dy >= 0 && dx <= region.w && dy <= region.h;
        },
        hide: () => {
            active = false;
        },
    };
}
let Region = (size) => {
    // Define the region
    let data = [];
    for (let i = 0; i < size; i++) {
        data.push(Clickable());
    }
    // Return the region methods
    return {
        place: (index, ...a) => {
            if (index >= data.length) {
                console.log(index);
                console.log(data);
                throw new Error('Trying to reference a clickable outside a region!');
            }
            data[index].set(...a);
        },
        hide: () => {
            for (let region of data) region.hide();
        },
        check: x => data.findIndex(r => r.check(x))
    };
};

const global = {
    // Keys and other mathematical constants. You can find the list here: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    KEY_ESC: 27,// Escape
    KEY_ENTER: 13,// Enter
    KEY_SHIFT: 16,// Shift
    KEY_BECOME: 70,// F
    KEY_CHAT: 13,// Enter
    KEY_FIREFOOD: 119,// F8
    KEY_SPLIT: 32,// Space

    KEY_LEFT: 65,// A
    KEY_UP: 87,// W
    KEY_RIGHT: 68,// D
    KEY_DOWN: 83,// S
    KEY_LEFT_ARROW: 37,// ArrowLeft
    KEY_UP_ARROW: 38,// ArrowUp
    KEY_RIGHT_ARROW: 39,// ArrowRight
    KEY_DOWN_ARROW: 40,// ArrowDown

    KEY_AUTO_SPIN: 67,// C
    KEY_AUTO_FIRE: 69,// E
    KEY_AUTO_ALT: 71,// G
    KEY_OVER_RIDE: 82,// R
    KEY_REVERSE_TANK: 86,// V
    KEY_REVERSE_MOUSE: 66,// B
    KEY_SPIN_LOCK: 88,// X

    KEY_LEVEL_UP: 78,
    KEY_FUCK_YOU: 80,// P
    KEY_CLASS_TREE: 84,// T
    KEY_MAX_STAT: 77,// M
    KEY_SUICIDE: 79,// O
    KEY_ZOOM_OUT: 45,// ??
    KEY_ZOOM_IN: 61,// ??

    KEY_UPGRADE_ATK: 49,// 1
    KEY_UPGRADE_HTL: 50,// 2
    KEY_UPGRADE_SPD: 51,// 3
    KEY_UPGRADE_STR: 52,// 4
    KEY_UPGRADE_PEN: 53,// 5
    KEY_UPGRADE_DAM: 54,// 6
    KEY_UPGRADE_RLD: 55,// 7
    KEY_UPGRADE_MOB: 56,// 8
    KEY_UPGRADE_RGN: 57,// 9
    KEY_UPGRADE_SHI: 48,// 0
    KEY_MOUSE_0: 32,// 32
    KEY_MOUSE_1: 86,// V
    KEY_MOUSE_2: 16,// ShiftLeft
    KEY_CHOOSE_1: 89,// Y
    KEY_CHOOSE_2: 85,// U
    KEY_CHOOSE_3: 73,// I
    KEY_CHOOSE_4: 72,// H
    KEY_CHOOSE_5: 74,// J
    KEY_CHOOSE_6: 75,// K

    FFA: false,
    showTree: false,
    scrollX: 0,
    realScrollX: 0,
    // Canvas
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    gameWidth: 0,
    gameHeight: 0,
    xoffset: -0,
    yoffset: -0,
    gameLoading: false,
    gameStart: false,
    disconnected: false,
    autoSpin: false,
    died: false,
    kicked: false,
    continuity: false,
    startPingTime: 0,
    toggleMassState: 0,
    backgroundColor: '#f2fbff',
    lineColor: '#000000',
    nameColor: "#FFFFFF",
    player: {},
    messages: [],
    mockups: [],
    roomSetup: [],
    entities: [],
    updateTimes: 0,
    clickables: {
        stat: Region(10),
        upgrade: Region(100),
        hover: Region(1),
        skipUpgrades: Region(1),
    },
    statHover: false,
    upgradeHover: false,
    statMaxing: false,
    metrics: {
        latency: 0,
        lag: 0,
        rendertime: 0,
        updatetime: 0,
        lastlag: 0,
        lastrender: 0,
        rendergap: 0,
        lastuplink: 0,
    },
    mouse: { x: 0, y: 0},
    target: { x: 0, y: 0 },
    reverseTank: 1,
    fps: 60,
    screenSize: Math.min(1920, Math.max(window.innerWidth, 1280)),
    ratio: window.devicePixelRatio,
    mockupLoading: { then: cb => cb() },
    treeScale: 1,
    chats: {}
};
export { global }
