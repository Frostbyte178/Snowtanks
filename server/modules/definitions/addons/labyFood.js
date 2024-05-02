module.exports = ({ Config }) => {
	// To enable this addon, simply comment out the line below.
		return console.log('[labyFood.js] Addon disabled by default');

		const disableCrashers = false;

	// there is no `ENEMY_CAP`, so we are "reconstructing them"
	Config.ENEMY_CAP_NEST = 0;

	// Constructs a four-dimensional array of shape types

	// 3-wide dimension of the 3 base shape types - egg, square, triangle
	Config.FOOD_TYPES = Array(3).fill().map((_, i, a) => [
		// Chance of spawning in exponents of 4
		4 ** (a.length - i),
		// 4-wide dimension of the 4 shape tiers - regular, beta, alpha, omega
		Array(4).fill().map((_, j, b) => [
			// Chance of spawning in exponents of 5
			5 ** (b.length - j),
			// 6-wide dimension of the 6 shiny modifiers
			Array(6).fill().map((_, k, c) => [
				// Chance of spawning, set to 200mil for regular polygons and exponents of 10 otherwise
				k ? 10 ** (c.length - k - 1) : 200_000_000,

				
				disableCrashers ? // no crashers
					`laby_${j}_${i}_${k}_0`
				: // 2-wide dimension of the 2 shape "ranks" - normal, crasher
					[[24, `laby_${j}_${i}_${k}_0`], [1, `laby_${j}_${i}_${k}_1`]]
			])
		])
	]);


	//laby_${poly}_${tier}_${shiny}_${rank}

	// 2-wide dimension of the 2 base shape types - pentagon, hexagon
	Config.FOOD_TYPES_NEST = Array(2).fill().map((_, i, a) => [
		// Chance of spawning in exponents of 4
		4 ** (a.length - i),
		// 4-wide dimension of the 4 shape tiers - regular, beta, alpha, omega
		Array(4).fill().map((_, j, b) => [
			// Chance of spawning in exponents of 5
			5 ** (b.length - j),
			// 6-wide dimension of the 6 shiny modifiers
			Array(6).fill().map((_, k, c) => [
				// Chance of spawning, set to 200mil for regular polygons and exponents of 10 otherwise
				k ? 10 ** (c.length - k - 1) : 200_000_000,

				
				disableCrashers ? // no crashers
					`laby_${i+3}_${j}_${k}_0`
				: // 2-wide dimension of the 2 shape "ranks" - normal, crasher
					[[24, `laby_${i+3}_${j}_${k}_0`], [1, `laby_${i+3}_${j}_${k}_1`]]
			])
		])
	]);

	console.log('[labyFood.js] Using Labyrinth Food.');
};