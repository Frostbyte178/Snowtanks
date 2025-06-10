const { skillSet } = require('../../facilitators.js');
const { enableSnowVoidlings, baseColor, voidlingsBody } = require('./voidlingsConstants.js');

// Navigate to [snowVoidlingsConstants.js] and the "enableSnowVoidlings" variable to enable/disable this addon.
if (!enableSnowVoidlings) {
	return console.log('--- Voidlings misc addon [voidlingsMisc.js] is disabled. ---');
}

// Generics
Class.genericVoidling = {
    PARENT: "genericTank",
    TYPE: "miniboss",
    DANGER: 15,
    COLOR: baseColor,
    SKILL: skillSet({
        rld: 0.4, // reload
        dam: 0.7, // bullet damage
        pen: 0.6, // bullet pen
        str: 0.8, // bullet health
        spd: 0.8, // bullet speed
        atk: 0.3, // body damage
        hlt: 1,   // max health
        shi: 0.7, // max shield
        rgn: 0,   // shield regen
        mob: 1,   // movement speed
    }),
    // CONTROLLERS: ["nearestDifferentMaster", "canRepel"],
    HITS_OWN_TYPE: "hardOnlyBosses",
    SIZE: 40,
    VALUE: 1e6,
    BODY: voidlingsBody
}
