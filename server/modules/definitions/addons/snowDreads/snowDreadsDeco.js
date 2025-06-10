const { weaponArray } = require('../../facilitators.js');
const { enableSnowDreads } = require('./snowDreadsConstants.js');

// Navigate to [snowDreadsConstants.js] and the "enableSnowDreads" variable to enable/disable this addon.
if (!enableSnowDreads) {
	return console.log('--- Snowdreads decoration addon [snowDreadsDeco.js] is disabled. ---');
}

// Dread base deco
Class.eggBaseDeco = {
	SHAPE: "M 0.71 0.71 A 1 0.98 0 0 1 -0.71 0.71 L -0.6 0.6 A 1 1.25 0 0 0 0.6 0.6 L 0.71 0.71" + 
			"M -0.71 -0.71 A 1 0.98 180 0 1 0.71 -0.71 L 0.6 -0.6 A 1 1.25 180 0 0 -0.6 -0.6 L -0.71 -0.71" + 
			"M 0.79 0.33 A 1 0.95 45 0 1 0.6 0.6 L 0.54 0.54 A 1.88 1 45 0 0 0.71 0.29 L 0.79 0.33" + 
			"M -0.79 0.33 A 1 0.95 157.5 0 0 -0.6 0.6 L -0.54 0.54 A 1.88 1 157.5 0 1 -0.71 0.29 L -0.79 0.33" + 
			"M 0.79 -0.33 A 1 0.95 -45 0 0 0.6 -0.6 L 0.54 -0.54 A 1.88 1 -45 0 1 0.71 -0.29 L 0.79 -0.33" + 
			"M -0.79 -0.33 A 1 0.95 -157.5 0 1 -0.6 -0.6 L -0.54 -0.54 A 1.88 1 -157.5 0 0 -0.71 -0.29 L -0.79 -0.33",
	COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 10 },
	GUNS: weaponArray([
		{
			POSITION: [8.25, 6.75, 0.6, 0, 0, 55, 0],
			PROPERTIES: {
				COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -12.5, SATURATION_SHIFT: 0.85 },
				BORDERLESS: true,
			}
		}, {
			POSITION: [8.25, 6.75, 0.6, 0, 0, 125, 0],
			PROPERTIES: {
				COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -12.5, SATURATION_SHIFT: 0.85 },
				BORDERLESS: true,
			}
		}, {
			POSITION: [4, 1.3, 0.001, 9, 0, 48, 0],
			PROPERTIES: {
				COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -20 },
				DRAW_ABOVE: true,
			},
		}, {
			POSITION: [3.5, 1.7, 0.001, 9, 0, 90, 0],
			PROPERTIES: {
				COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -20 },
				DRAW_ABOVE: true,
			},
		}, {
			POSITION: [4, 1.3, 0.001, 9, 0, 132, 0],
			PROPERTIES: {
				COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -20 },
				DRAW_ABOVE: true,
			},
		}, {
			POSITION: [1.5, 1.3, 0, 7.5, 0, 48, 0],
			PROPERTIES: {
				COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -20 },
				DRAW_ABOVE: true,
			},
		}, {
			POSITION: [1, 1.7, 0, 8, 0, 90, 0],
			PROPERTIES: {
				COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -20 },
				DRAW_ABOVE: true,
			},
		}, {
			POSITION: [1.5, 1.3, 0, 7.5, 0, 132, 0],
			PROPERTIES: {
				COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -20 },
				DRAW_ABOVE: true,
			},
		},
	], 2),
}
Class.squareBaseDeco = {
	SHAPE: "M -0.98 0.98 L -0.3 0.75 L -0.63 0.63 L -0.75 0.3 L -0.98 0.98" + 
			"M 0.98 0.98 L 0.75 0.3 L 0.63 0.63 L 0.3 0.75 L 0.98 0.98" + 
			"M 0.98 -0.98 L 0.3 -0.75 L 0.63 -0.63 L 0.75 -0.3 L 0.98 -0.98" + 
			"M -0.98 -0.98 L -0.75 -0.3 L -0.63 -0.63 L -0.3 -0.75 L -0.98 -0.98",
	COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 10 },
	GUNS: weaponArray([
		{
			POSITION: [4, 2, 0.001, 9.5, 2.6, 20, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -15 } },
		}, {
			POSITION: [4, 2, 0.001, 9.5, -2.6, 70, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -15 } },
		}, {
			POSITION: [5, 1.5, 0.001, -2, 9, -70, 0],
			PROPERTIES: { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 17.5 } },
		}, {
			POSITION: [5, 1.5, 0.001, -2, -9, 70, 0],
			PROPERTIES: { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 17.5 } },
		},
	], 4),
}
Class.triangleBaseDeco = {
	SHAPE: "M -1.546 -0.108 L -1.546 0.108 L -0.175 0.303 L 0.679 1.393 L 0.867 1.285 L 0.35 0 L 0.867 -1.285 L 0.679 -1.393 L -0.175 -0.303 L -1.546 -0.108",
	COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 5 },
	GUNS: weaponArray([
		{
			POSITION: [7, 3, 0.001, 10, 0, 60, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -12.5, SATURATION_SHIFT: 0.7 } },
		}, {
			POSITION: [5, 2.5, 0.001, 6.5, -2, 90, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.85 } },
		}, {
			POSITION: [5, 2.5, 0.001, 6.5, 2, 30, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.85 } },
		}, {
			POSITION: [9, 5, 0.25, 0, 0, 60, 0],
			PROPERTIES: { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 12.5 }, BORDERLESS: true, DRAW_ABOVE: true },
		},
	], 3),
}
Class.pentagonBaseDeco = {
	SHAPE: "M -1.207 -0.324 L -0.724 -0.194 L -0.408 -0.629 L -0.681 -1.048 L -0.688 -0.5 Z" +
		"M -1.207 0.324 L -0.724 0.194 L -0.408 0.629 L -0.681 1.048 L -0.688 0.5 Z" +
		"M 0.787 -0.971 L 0.472 -0.583 L -0.039 -0.749 L -0.065 -1.248 L 0.263 -0.808 Z" +
		"M 0.787 0.971 L 0.472 0.583 L -0.039 0.749 L -0.065 1.248 L 0.263 0.808 Z" +
		"M 1.167 0.448 L 0.7 0.269 L 0.7 -0.269 L 1.167 -0.448 L 0.85 0 Z",
	COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 5 },
	GUNS: weaponArray([
		{
			POSITION: [4, 6, 0.001, 8.5, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.6 } },
		}, {
			POSITION: [7, 2.5, 0.001, 6, -6.2, 60, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -2.5, SATURATION_SHIFT: 0.8 } },
		}, {
			POSITION: [7, 2.5, 0.001, 6, 6.2, -60, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -2.5, SATURATION_SHIFT: 0.8 } },
		},
	], 5),
}
Class.hexagonBaseDeco = {
	SHAPE: "M -1.1 0 L -0.956 0.292 L -0.669 0.205 L -0.669 -0.205 L -0.956 -0.292 Z" +
		"M -0.55 0.952 L -0.225 0.974 L -0.157 0.682 L -0.512 0.477 L -0.731 0.682 Z" +
		"M -0.55 -0.952 L -0.225 -0.974 L -0.157 -0.682 L -0.512 -0.477 L -0.731 -0.682 Z" +
		"M 0.55 0.952 L 0.225 0.974 L 0.157 0.682 L 0.512 0.477 L 0.731 0.682 Z" +
		"M 0.55 -0.952 L 0.225 -0.974 L 0.157 -0.682 L 0.512 -0.477 L 0.731 -0.682 Z" +
		"M 1.1 0 L 0.956 0.292 L 0.669 0.205 L 0.669 -0.205 L 0.956 -0.292 Z",
	COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 2.5 },
	GUNS: weaponArray([
		{
			POSITION: [1.75, 3, -0.75, 7.5, 0, 0, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: 2.5, SATURATION_SHIFT: 0.9 }, DRAW_ABOVE: true },
		}, {
			POSITION: [1, 9, 0, 8.5, 0, 30, 0],
			PROPERTIES: { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: 10, SATURATION_SHIFT: 1.15 } },
		},
	], 6),
}

// Projectile deco
Class.ring085 = {
	COLOR: {BASE: 17, BRIGHTNESS_SHIFT: -7.5},
	SHAPE: "M -0.85 0 A 0.85 0.85 0 0 0 0.85 0 A 0.85 0.85 0 0 0 -0.85 0 M -1 0 A 1 1 0 0 1 1 0 A 1 1 0 0 1 -1 0 Z"
}
Class.assailantMinionTopSnowdread = {
	SHAPE: "M 0.5 0 L 1 1 L 0 0.5 L -1 1 L -0.5 0 L -1 -1 L 0 -0.5 L 1 -1 L 0.5 0",
	COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -5, SATURATION_SHIFT: 0.75},
}
Class.aggressorMinionTopSnowdread = {
	SHAPE: "M -1.546 -0.108 L -1.546 0.108 L -0.175 0.303 L 0.679 1.393 L 0.867 1.285 L 0.35 0 L 0.867 -1.285 L 0.679 -1.393 L -0.175 -0.303 L -1.546 -0.108",
	COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 5 },
}
Class.unsetTrapTopSnowdread = {
	SHAPE: "M 1.1 1.1 L 1 0 L 1.1 -1.1 L 0 -1 L -1.1 -1.1 L -1 0 L -1.1 1.1 L 0 1 L 1.1 1.1 M 0.9 0.9 L 0 0.825 L -0.9 0.9 L -0.825 0 L -0.9 -0.9 L 0 -0.825 L 0.9 -0.9 L 0.825 0 L 0.9 0.9 Z",
	COLOR: {BASE: 17, BRIGHTNESS_SHIFT: -7.5},
}
Class.unsetPillboxTopSnowdread = {
	SHAPE: "M -1.3 -0.15 L -1.3 0.15 L -0.3 0.3 L -0.15 1.3 L 0.15 1.3 L 0.3 0.3 L 1.3 0.15 L 1.3 -0.15 L 0.3 -0.3 L 0.15 -1.3 L -0.15 -1.3 L -0.3 -0.3 Z",
	COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 5 },
}

// Dread body deco
// Shield buff body deco
Class.brassTopSnowdread = {
	PARENT: 'genericTank',
	SHAPE: 4.25,
	COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10},
	BORDERLESS: true,
	GUNS: weaponArray([
		{
			POSITION: [23, 15, 0.001, 0, 0, 0, 0],
			PROPERTIES: {COLOR: 9}
		}, {
			POSITION: [17.5, 12, 0.001, 0, 0, 45, 0],
			PROPERTIES: {COLOR: 9}
		}
	], 4)
}
Class.brassBottomSnowdread = {
	PARENT: 'genericTank',
	SHAPE: 4,
	COLOR: 9,
	GUNS: weaponArray({
		POSITION: [16, 14, 0.001, 0, 0, 45, 0],
		PROPERTIES: {COLOR: 9}
	}, 4)
}
Class.steelTopSnowdread = {
	PARENT: 'genericTank',
	SHAPE: -3,
	COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10},
	BORDERLESS: true,
	GUNS: weaponArray([
		{
			POSITION: [24, 15, 0.001, 0, 0, 0, 0],
			PROPERTIES: {COLOR: 9}
		}, {
			POSITION: [20, 12, 0.001, 0, 0, 25, 0],
			PROPERTIES: {COLOR: 9}
		}, {
			POSITION: [20, 12, 0.001, 0, 0, -25, 0],
			PROPERTIES: {COLOR: 9}
		}
	], 3)
}
Class.steelBottomSnowdread = {
	PARENT: 'genericTank',
	SHAPE: 3.5,
	COLOR: 9,
	GUNS: weaponArray({
		POSITION: [23, 14, 0.001, -3, 0, 60, 0],
		PROPERTIES: {COLOR: 9}
	}, 3)
}
Class.pentagonTitaniumTopSnowdread = {
	PARENT: 'genericTank',
	SHAPE: 5,
	COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10},
	BORDERLESS: true,
	GUNS: weaponArray([
		{
			POSITION: [26, 15, 0.001, 0, 0, 36, 0],
			PROPERTIES: {COLOR: 9}
		}, {
			POSITION: [17.5, 16, 0.001, 0, 0, 0, 0],
			PROPERTIES: {COLOR: 9}
		}
	], 5)
}
Class.pentagonTitaniumTop2Snowdread = {
	PARENT: 'genericTank',
	SHAPE: "M 1.149 0 L 0.485 0.353 L 0.355 1.093 L -0.185 0.571 L -0.93 0.676 L -0.6 0 L -0.93 -0.676 L -0.185 -0.571 L 0.355 -1.093 L 0.485 -0.353 Z",
	COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10},
	GUNS: weaponArray({
		POSITION: [6, 11, 0.001, 3, 0, 36, 0],
		PROPERTIES: {COLOR: 9}
	}, 5)
}
Class.pentagonTitaniumBottomSnowdread = {
	PARENT: 'genericTank',
	SHAPE: 5,
	COLOR: 9,
	GUNS: weaponArray({
		POSITION: [16, 15, 0.001, 0, 0, 36, 0],
		PROPERTIES: {COLOR: 9}
	}, 5)
}
Class.hexagonTitaniumTopSnowdread = {
	PARENT: 'genericTank',
	SHAPE: 6,
	COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10},
	BORDERLESS: true,
	GUNS: weaponArray([
		{
			POSITION: [24, 13, 0.001, 0, 0, 30, 0],
			PROPERTIES: {COLOR: 9}
		}, {
			POSITION: [16, 16, 0.001, 0, 0, 0, 0],
			PROPERTIES: {COLOR: 9}
		}
	], 6)
}
Class.hexagonTitaniumTop2Snowdread = {
	PARENT: 'genericTank',
	SHAPE: "M 0.65 0 L 0.952 0.55 L 0.325 0.563 L 0 1.1 L -0.325 0.563 L -0.952 0.55 L -0.65 0 L -0.952 -0.55 L -0.325 -0.563 L 0 -1.1 L 0.325 -0.563 L 0.952 -0.55 Z",
	COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10},
	GUNS: weaponArray({
		POSITION: [7, 10, 0.001, 2.5, 0, 0, 0],
		PROPERTIES: {COLOR: 9}
	}, 6)
}
Class.hexagonTitaniumBottomSnowdread = {
	PARENT: 'genericTank',
	SHAPE: 6,
	COLOR: 9,
	GUNS: weaponArray({
		POSITION: [14, 14, 0.001, 0, 0, 30, 0],
		PROPERTIES: {COLOR: 9}
	}, 6)
}

// FOV boost body deco
Class.spotterRadarSnowdread = {
	PARENT: 'genericTank',
	FACING_TYPE: ["spin", {speed: 0.03}],
	INDEPENDENT: true,
	SHAPE: [[0.225, 1], [0.225, -1], [-0.225, -1], [-0.225, 1]],
	COLOR: 17,
	GUNS: [
		{
			POSITION: [4.5, 26, 1, -2.25, 0, 0, 0],
			PROPERTIES: {COLOR: -1}
		}, {
			POSITION: [7, 17, 1, -3.5, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -20}}
		},
	]
}
Class.spyRadarSnowdread = {
	PARENT: 'genericTank',
	FACING_TYPE: ["spin", {speed: 0.03}],
	INDEPENDENT: true,
	SHAPE: [[0.2, 1], [0.2, -1], [-0.2, -1], [-0.2, 1]],
	COLOR: 17,
	GUNS: [
		{
			POSITION: [4, 26, 1, -2, 0, 0, 0],
			PROPERTIES: {COLOR: -1}
		}, {
			POSITION: [8.5, 7.75, 0.85, 0, 0, 90, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -12.5}}
		}, {
			POSITION: [8.5, 7.75, 0.85, 0, 0, -90, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -12.5}}
		}, {
			POSITION: [5, 8.5, 0.001, 0, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}}
		}, {
			POSITION: [5, 8.5, 0.001, 0, 0, 180, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}}
		}
	]
}
Class.monitorRadarSnowdread = {
	PARENT: 'genericTank',
	FACING_TYPE: ["spin", {speed: 0.03}],
	INDEPENDENT: true,
	SHAPE: [[0.175, 1], [0.175, -1], [-0.175, -1], [-0.175, 1]],
	COLOR: 17,
	GUNS: [
		{
			POSITION: [6, 17, 1, -3, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -12.5, SATURATION_SHIFT: 0.65}}
		}, {
			POSITION: [3.5, 26, 1, -1.75, 0, 0, 0],
			PROPERTIES: {COLOR: -1}
		}, {
			POSITION: [4, 10, 0.5, 0, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}}
		}, {
			POSITION: [4, 10, 0.5, 0, 0, 180, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}}
		}
	]
}
Class.trackerRadarSnowdread = {
	PARENT: 'genericTank',
	FACING_TYPE: ["spin", {speed: 0.03}],
	INDEPENDENT: true,
	SHAPE: [[0.16, 1], [0.16, -1], [-0.16, -1], [-0.16, 1]],
	COLOR: 17,
	GUNS: [
		{
			POSITION: [6.2, 17, 1, -3.1, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -7.5, SATURATION_SHIFT: 0.65}}
		}, {
			POSITION: [3.2, 26, 1, -1.6, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 2.5}}
		}, {
			POSITION: [4, 11, 0.5, 0, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}}
		}, {
			POSITION: [4, 11, 0.5, 0, 0, 180, 0],
			PROPERTIES: {COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 5}}
		}, {
			POSITION: [2, 2, 0.9, 6, 0, 90, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -2.5, SATURATION_SHIFT: 0.7}, DRAW_ABOVE: true}
		}, {
			POSITION: [2, 2, 0.9, 6, 0, -90, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -2.5, SATURATION_SHIFT: 0.7}, DRAW_ABOVE: true}
		}
	]
}

// Speed buff body deco
Class.colossusTopSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5},
	GUNS: weaponArray([
		{
			POSITION: [2.5, 9, 0, 7, 0, 0, 0],
			PROPERTIES: {COLOR: 9, DRAW_ABOVE: true},
		}, {
			POSITION: [3.5, 17.5, 0.001, 9, 0, 0, 0],
			PROPERTIES: {COLOR: 9},
		},
	], 4),
}
Class.colossusBottomSnowdread = {
	PARENT: "genericSquarenoughtSnowdread",
	GUNS: weaponArray({
		POSITION: [4, 17.5, 0.001, 9, 0, 0, 0],
		PROPERTIES: {COLOR: 9},
	}, 4),
}
Class.titanTopSnowdread = {
	PARENT: "genericTrinoughtSnowdread",
	GUNS: weaponArray({
		POSITION: [5, 26, 0.001, 8, 0, 0, 0],
		PROPERTIES: {COLOR: 9},
	}, 3),
}
Class.pentagonLeviathanTopSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Leviathan",
	COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5},
	GUNS: weaponArray([
		{
			POSITION: [6, 13.5, 0.001, 9, 0, 0, 0],
			PROPERTIES: {COLOR: 9},
		}, {
			POSITION: [4, 11.5, 0, 5.7, 0, 0, 0],
			PROPERTIES: {COLOR: 9, DRAW_ABOVE: true},
		},
	], 5),
}
Class.pentagonLeviathanTop2Snowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Leviathan",
	COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5},
	GUNS: weaponArray([
		{
			POSITION: [4.5, 13.5, 0.001, 9, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10}},
		}, {
			POSITION: [3, 11.5, 0, 6.7, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10}, DRAW_ABOVE: true},
		},
	], 5),
}
Class.pentagonLeviathanTop3Snowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Leviathan",
	COLOR: 9,
	GUNS: weaponArray({
		POSITION: [3.5, 8, 0, 6.7, 0, 0, 0],
		PROPERTIES: {COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10}, DRAW_ABOVE: true, BORDERLESS: true},
	}, 5),
}
Class.pentagonLeviathanBottomSnowdread = {
	PARENT: "genericPentanoughtSnowdread",
	LABEL: "Leviathan",
	GUNS: weaponArray({
		POSITION: [7, 17, 0.001, 9, 0, 0, 0],
		PROPERTIES: {COLOR: 9},
	}, 5),
}
Class.hexagonLeviathanTopSnowdread = {
	PARENT: "genericHexnoughtSnowdread",
	LABEL: "Leviathan",
	COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5},
	GUNS: weaponArray([
		{
			POSITION: [6, 10, 0.001, 9.5, 0, 0, 0],
			PROPERTIES: {COLOR: 9},
		}, {
			POSITION: [3, 9, 0, 7, 0, 0, 0],
			PROPERTIES: {COLOR: 9, DRAW_ABOVE: true},
		},
	], 6),
}
Class.hexagonLeviathanTop2Snowdread = {
	PARENT: "genericHexnoughtSnowdread",
	LABEL: "Leviathan",
	COLOR: {BASE: -1, BRIGHTNESS_SHIFT: 7.5},
	GUNS: weaponArray([
		{
			POSITION: [5, 10, 0.001, 9.5, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10}},
		}, {
			POSITION: [2.5, 9, 0, 7.5, 0, 0, 0],
			PROPERTIES: {COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10}, DRAW_ABOVE: true},
		},
	], 6),
}
Class.hexagonLeviathanTop3Snowdread = {
	PARENT: "genericHexnoughtSnowdread",
	LABEL: "Leviathan",
	COLOR: 9,
	GUNS: weaponArray({
		POSITION: [3, 6.5, 0, 7, 0, 0, 0],
		PROPERTIES: {COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 10}, DRAW_ABOVE: true, BORDERLESS: true},
	}, 6),
}
Class.hexagonLeviathanBottomSnowdread = {
	PARENT: "genericHexnoughtSnowdread",
	LABEL: "Leviathan",
	GUNS: weaponArray({
		POSITION: [7, 13.5, 0.001, 9.5, 0, 0, 0],
		PROPERTIES: {COLOR: 9},
	}, 6),
}

// Misc
Class.octogon = { SHAPE: 8 }
