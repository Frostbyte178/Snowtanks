const { addAura } = require('./snowDreadsFacilitators.js');
const { enableSnowDreads, useOldPhotosphere } = require('./snowDreadsConstants.js');

// Navigate to [snowDreadsConstants.js] and the "enableSnowDreads" variable to enable/disable this addon.
if (!enableSnowDreads) {
	return console.log('--- Snowdreads auras addon [snowDreadsAuras.js] is disabled. ---');
}

const auraSmallShape = "M 1 0 L 0.715 0.519 L 0.309 0.951 L -0.273 0.84 L -0.809 0.588 L -0.883 0 L -0.809 -0.588 L -0.273 -0.84 L 0.309 -0.951 L 0.715 -0.519 L 1 0" + 
					"L 0.309 0.951 L -0.809 0.588 L -0.809 -0.588 L 0.309 -0.951 L 1 0" + 
					"L 0 0 L 0.309 0.951 M 0 0 L -0.809 0.588 M 0 0 L -0.809 -0.588 M 0 0 L 0.309 -0.951";
const auraMediumShape = "M 1 0 L 0.809 0.588 L 1 0 L 0.809 0.588 L 0.309 0.951 L -0.309 0.951 L -0.809 0.588 L -1 0 L -0.809 -0.588 L -0.309 -0.951 L 0.309 -0.951 L 0.809 -0.588 L 1 0" + 
					"L 0.856 0.278 L 0.809 0.588 L 0.551 0.759 L 0.309 0.951 L 0 0.9 L -0.309 0.951 L -0.551 0.759 L -0.809 0.588 L -0.856 0.278 L -1 0 L -0.892 -0.29 L -0.809 -0.588 L -0.529 -0.728 L -0.309 -0.951 L 0 -0.938 L 0.309 -0.951 L 0.529 -0.728 L 0.809 -0.588 L 0.892 -0.29 L 1 0" + 
					"M 0.856 0.278 L 0.551 0.759 L 0 0.9 L -0.551 0.759 L -0.856 0.278 L -0.892 -0.29 L -0.529 -0.728 L 0 -0.938 L 0.529 -0.728 L 0.892 -0.29 L 0.856 0.278" + 
					"M 0.892 -0.29 L 0.546 -0.178 L 0.856 0.278 L 0.338 0.465 L 0.551 0.759 M 0.338 0.465 L 0 0.9 L -0.338 0.465 L -0.551 0.759 M -0.338 0.465 L -0.856 0.278 L -0.546 -0.178 L -0.892 -0.29 M -0.546 -0.178 L -0.529 -0.728 L 0 -0.575 L 0 -0.938 M 0 -0.575 L 0.529 -0.728 L 0.546 -0.178" + 
					"L 0.338 0.465 L 0 0 L 0.546 -0.178 L 0 -0.575 L 0 0 L -0.546 -0.178 L -0.338 0.465 L 0 0 M 0 -0.575 L -0.546 -0.178 M -0.338 0.465 L 0.338 0.465";
const auraLargeShape = "M 1 0 L 0.988 0.156 L 0.951 0.309 L 0.891 0.454 L 0.809 0.588 L 0.707 0.707 L 0.588 0.809 L 0.454 0.891 L 0.309 0.951 L 0.156 0.988 L 0 1 L -0.156 0.988 L -0.309 0.951 L -0.454 0.891 L -0.588 0.809 L -0.707 0.707 L -0.809 0.588 L -0.891 0.454 L -0.951 0.309 L -0.988 0.156 L -1 0 L -0.988 -0.156 L -0.951 -0.309 L -0.891 -0.454 L -0.809 -0.588 L -0.707 -0.707 L -0.588 -0.809 L -0.454 -0.891 L -0.309 -0.951 L -0.156 -0.988 L 0 -1 L 0.156 -0.988 L 0.309 -0.951 L 0.454 -0.891 L 0.588 -0.809 L 0.707 -0.707 L 0.809 -0.588 L 0.891 -0.454 L 0.951 -0.309 L 0.988 -0.156 L 1 0" + 
					"M 0.988 -0.156 L 0.988 0.156 L 0.891 0.454 L 0.707 0.707 L 0.454 0.891 L 0.156 0.988 L -0.156 0.988 L -0.454 0.891 L -0.707 0.707 L -0.891 0.454 L -0.988 0.156 L -0.988 -0.156 L -0.891 -0.454 L -0.707 -0.707 L -0.454 -0.891 L -0.156 -0.988 L 0.156 -0.988 L 0.454 -0.891 L 0.707 -0.707 L 0.891 -0.454 L 0.988 -0.156 L 0.949 0" + 
					"L 0.988 0.156 L 0.891 0.256 L 0.891 0.454 L 0.739 0.537 L 0.707 0.707 L 0.519 0.769 L 0.454 0.891 L 0.293 0.902 L 0.156 0.988 L 0.032 0.927 L -0.156 0.988 L -0.282 0.869 L -0.454 0.891 L -0.571 0.731 L -0.707 0.707 L -0.768 0.558 L -0.891 0.454 L -0.871 0.317 L -0.988 0.156 L -0.914 0 L -0.988 -0.156 L -0.871 -0.317 L -0.891 -0.454 L -0.768 -0.558 L -0.707 -0.707 L -0.571 -0.731 L -0.454 -0.891 L -0.282 -0.869 L -0.156 -0.988 L 0.032 -0.927 L 0.156 -0.988 L 0.293 -0.902 L 0.454 -0.891 L 0.519 -0.769 L 0.707 -0.707 L 0.739 -0.537 L 0.891 -0.454 L 0.891 -0.256 L 0.988 -0.156 L 0.949 0" + 
					"L 0.891 0.256 L 0.739 0.537 L 0.519 0.769 L 0.293 0.902 L 0.032 0.927 L -0.282 0.869 L -0.571 0.731 L -0.768 0.558 L -0.871 0.317 L -0.914 0 L -0.871 -0.317 L -0.768 -0.558 L -0.571 -0.731 L -0.282 -0.869 L 0.032 -0.927 L 0.293 -0.902 L 0.519 -0.769 L 0.739 -0.537 L 0.891 -0.256 L 0.949 0" + 
					"M 0.834 0 L 0.891 0.256 L 0.704 0.291 L 0.739 0.537 L 0.495 0.579 L 0.519 0.769 L 0.258 0.793 L 0.032 0.927 L -0.06 0.759 L -0.282 0.869 L -0.398 0.649 L -0.571 0.731 L -0.674 0.49 L -0.871 0.317 L -0.741 0.178 L -0.914 0 L -0.741 -0.178 L -0.871 -0.317 L -0.674 -0.49 L -0.571 -0.731 L -0.398 -0.649 L -0.282 -0.869 L -0.06 -0.759 L 0.032 -0.927 L 0.258 -0.793 L 0.519 -0.769 L 0.495 -0.579 L 0.739 -0.537 L 0.704 -0.291 L 0.891 -0.256 L 0.834 0" + 
					"L 0.704 0.291 L 0.495 0.579 L 0.258 0.793 L -0.06 0.759 L -0.398 0.649 L -0.674 0.49 L -0.741 0.178 L -0.741 -0.178 L -0.674 -0.49 L -0.398 -0.649 L -0.06 -0.759 L 0.258 -0.793 L 0.495 -0.579 L 0.704 -0.291 L 0.834 0" + 
					"M 0.592 0 L 0.704 0.291 L 0.413 0.3 L 0.495 0.579 L 0.183 0.563 L -0.06 0.759 L -0.158 0.485 L -0.398 0.649 L -0.479 0.348 L -0.741 0.178 L -0.51 0 L -0.741 -0.178 L -0.479 -0.348 L -0.398 -0.649 L -0.158 -0.485 L -0.06 -0.759 L 0.183 -0.563 L 0.495 -0.579 L 0.413 -0.3 L 0.704 -0.291 L 0.592 0" + 
					"L 0.413 0.3 L 0.183 0.563 L -0.158 0.485 L -0.479 0.348 L -0.51 0 L -0.479 -0.348 L -0.158 -0.485 L 0.183 -0.563 L 0.413 -0.3 L 0.592 0" + 
					"M 0.292 0 L 0.413 0.3 L 0.09 0.277 L -0.158 0.485 L -0.236 0.171 L -0.51 0 L -0.236 -0.171 L -0.158 -0.485 L 0.09 -0.277 L 0.413 -0.3 L 0.292 0 L 0.09 0.277" + 
					"L -0.236 0.171 L -0.236 -0.171 L 0.09 -0.277 L 0.292 0 M 0 0 L 0.949 0" + 
					"M 0 0 L 0.293 0.902 M 0 0 L -0.768 0.558 M 0 0 L -0.768 -0.558 M 0 0 L 0.293 -0.902";
const auraConfig = {
	FACING_TYPE: ["spin", {speed: -0.04}],
	LAYER: 30,
	BORDER_FIRST: true,
}
Class.auraSmall = {
	PARENT: "aura",
	...auraConfig,
	SHAPE: auraSmallShape,
}
Class.healAuraSmall = {
	PARENT: "healAura",
	...auraConfig,
	SHAPE: auraSmallShape,
}
Class.auraMedium = {
	PARENT: "aura",
	...auraConfig,
	SHAPE: auraMediumShape,
}
Class.healAuraMedium = {
	PARENT: "healAura",
	...auraConfig,
	SHAPE: auraMediumShape,
}
Class.auraLarge = {
	PARENT: "aura",
	...auraConfig,
	SHAPE: auraLargeShape,
}
Class.healAuraLarge = {
	PARENT: "healAura",
	...auraConfig,
	SHAPE: auraLargeShape,
}
Class.auraSymbolSnowdreads = {
	CONTROLLERS: [["spin", { speed: -0.04 }]],
	INDEPENDENT: true,
	COLOR: 0,
	BORDER_FIRST: true,
	SHAPE: "M 1 0 L 0.797 0.46 L 0.5 0.866 L 0 0.92 L -0.5 0.866 L -0.797 0.46 L -1 0 L -0.797 -0.46 L -0.5 -0.866 L 0 -0.92 L 0.5 -0.866 L 0.797 -0.46 L 1 0 Z" +
	"M 0.52 0.3 L 0.52 -0.3 L 0.797 -0.46 M 0.52 -0.3 L 0 -0.6 L 0 -0.92 M 0 -0.6 L -0.52 -0.3 L -0.797 -0.46 M -0.52 -0.3 L -0.52 0.3 L -0.797 0.46 M -0.52 0.3 L 0 0.6 L 0 0.92 M 0 0.6 L 0.52 0.3 L 0.797 0.46"
}
Class.healAuraSymbolSnowdreads = {
	CONTROLLERS: [["spin", { speed: -0.04 }]],
	INDEPENDENT: true,
	COLOR: "red",
	BORDER_FIRST: true,
	SHAPE: "M 1 0 L 0.5 0.866 L -0.5 0.866 L -1 0 L -0.5 -0.866 L 0.5 -0.866 L 1 0 Z M 0.7 0 L 1 0 L 0.5 0.866 L 0.7 0 L -0.35 0.606 L 0.5 0.866 L -0.5 0.866 L -0.35 0.606 M -0.5 0.866 L -1 0 L -0.35 0.606 L -0.35 -0.606 L -1 0 L -0.5 -0.866 L -0.35 -0.606 L -0.5 -0.866 L 0.5 -0.866 L -0.35 -0.606 L 0.7 0 L 0.5 -0.866 L 1 0",
};

// Projectile auras
Class.auraTrapAura = addAura(1/3, 2.5, 0.15, 0, "Small");
Class.auraBlockAura = addAura(1/3, 1.6, 0.15, 0, "Small");
Class.gladiatorAuraMinionAuraSnowdread = addAura(1, 1.2, 0.3, 0, "Small");
Class.gladiatorHealAuraMinionAuraSnowdread = addAura(-2/3, 1.2, 0.3, "red", "Small");

// Dread auras
Class.atmosphereAuraSnowdread = addAura(1, 1, 0.15);
Class.coronaAuraSnowdread = addAura(1.5, 0.8, 0.15);
Class.trinoughtBigAuraSnowdread = addAura(2, 1.5);
Class.trinoughtSmallAuraSnowdread = addAura(1, 2.1, 0.15, 0, "Small");
Class.pentanoughtBigAuraSnowdread = addAura(2.5, 1.45, 0.3, 0, "Large");
Class.pentanoughtSmallAuraSnowdread = addAura(1, 1.6, 0.15, 0, "Small");
if (useOldPhotosphere) {
	Class.photosphereSmallAuraSnowdread = addAura(1, 1.85, 0.1, 0, "Small");
	Class.photosphereBigAuraSnowdread = addAura(1.5, 4, 0.15);
}

Class.thermosphereAuraSnowdread = addAura(-1, 1.5);
Class.trinoughtBigHealAuraSnowdread = addAura(-1.5, 1.5);
Class.trinoughtSmallHealAuraSnowdread = addAura(-2/3, 2.1, 0.15, "red", "Small");
Class.pentanoughtBigHealAuraSnowdread = addAura(-2, 1.45, 0.3, "red", "Large");
Class.pentanoughtSmallHealAuraSnowdread = addAura(-2/3, 1.6, 0.15, "red", "Small");
