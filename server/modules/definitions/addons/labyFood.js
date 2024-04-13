module.exports = ({ Config }) => {
	// To enable this addon, simply comment out the line below.
	return console.log('[labyFood.js] Addon disabled by default');

	const disableCrashers = true
	if (disableCrashers)  Config.ENEMY_CAP_NEST = 0;

	let shinys = [ "", "Shiny", "Legendary", "Shadow", "Rainbow", "Trans" ],
		polys = [ "Egg", "Square", "Triangle", "Pentagon", "Hexagon" ];

	// Constructs a three-dimensional array of shape types

	// 6-wide dimension of the 6 shiny modifiers
	Config.FOOD_TYPES = Array(6).fill().map((_, i, a) => [
		// Chance of spawning, set to 200mil for regular polygons and exponents of 10 otherwise
		i ? 10 ** (a.length - i - 1) : 200_000_000,
		// 4-wide dimension of the 4 shape tiers - regular, beta, alpha, omega
		Array(4).fill().map((_, j, b) => [
			// Chance of spawning in exponents of 5
			5 ** (b.length - j),
			// 3-wide dimension of the 3 base shape types - egg, square, triangle
			Array(3).fill().map((_, k, c) => [
				// Chance of spawning in exponents of 4
				4 ** (c.length - k),
				`laby${j}${shinys[i]}${polys[k]}`
			])
		])
	]);
	
	Config.FOOD_TYPES_NEST = Array(6).fill().map((_, i, a) => [
		i ? 10 ** (a.length - i - 1) : 200_000_000,
		Array(4).fill().map((_, j, b) => [
			5 ** (b.length - j),
			// 2-wide dimension of the 2 base shape types - pentagon, hexagon
			Array(2).fill().map((_, k, c) => [
				4 ** (c.length - k),
				`laby${j}${shinys[i]}${polys[k+3]}`
			])
		])
	]);

	console.log('[labyFood.js] Using Labyrinth Food.');
};
