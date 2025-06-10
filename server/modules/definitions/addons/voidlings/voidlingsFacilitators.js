const { combineStats } = require('../../facilitators.js');
const { 
    enableSnowVoidlings, 
    bright1, dark1, trim,
} = require('./voidlingsConstants.js');

// Navigate to [snowVoidlingsConstants.js] and the "enableSnowVoidlings" variable to enable/disable this addon.
if (!enableSnowVoidlings) {
	return console.log('--- Voidlings facilitators addon [voidlingsFacilitators.js] is disabled. ---');
}

exports.decoAuraProperties = (type) => {
    return {
        SHOOT_SETTINGS: combineStats([]),
        TYPE: type,
        MAX_CHILDREN: 1,
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        BORDERLESS: true,
    }
}
exports.shadingProperties = (color = bright1) => {
    return {
        COLOR: color,
        BORDERLESS: true,
        DRAW_ABOVE: true,
    }
}
exports.blinkerProperties = (i) => {
    return {
        COLOR: trim,
        BORDERLESS: true,
        DRAW_ABOVE: true,
        BLINKER: {
            REPEAT: 800,
            START: 125 * i,
            END: 400 + 125 * i,
            OFF_COLOR: dark1,
        }
    }
}
