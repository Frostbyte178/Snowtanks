const { base } = require('../../constants.js');

exports.enableSnowVoidlings = true;

if (!exports.enableSnowVoidlings) {
	return console.log('--- Voidlings constants addon [voidlingsConstants.js] is disabled. ---');
}

// Colors
exports.baseColor = '#50516e';
exports.bright1 = {BASE: exports.baseColor, BRIGHTNESS_SHIFT: 7.5, SATURATION_SHIFT: 0.8};
exports.bright2 = {BASE: exports.baseColor, BRIGHTNESS_SHIFT: 12.5, SATURATION_SHIFT: 0.55};
exports.dark1 = {BASE: exports.baseColor, BRIGHTNESS_SHIFT: -7.5, SATURATION_SHIFT: 1.25};

exports.trim = '#cb52f7';

// Body stats
exports.voidlingsBody = {
	PUSHABILITY: 0.6,
	HEALTH: base.HEALTH * 15,
	DAMAGE: base.DAMAGE * 2,
	PENETRATION: base.PENETRATION * 2,
	SHIELD: base.SHIELD * 8,
	REGEN: base.REGEN * 0.3,
	SPEED: base.SPEED * 0.85,
	ACCELERATION: base.ACCEL * 0.7,
	FOV: base.FOV * 1.7,
	DENSITY: base.DENSITY * 8,
}
