const { enableSnowVoidlings } = require('./voidlingsConstants.js');

// Navigate to [snowVoidlingsConstants.js] and the "enableSnowVoidlings" variable to enable/disable this addon.
if (!enableSnowVoidlings) {
	return console.log('--- Voidlings controllers addon [voidlingsControllers.js] is disabled. ---');
}

class io_weaponSwitcher extends IO {
    constructor(body, opts = {}) {
        super(body);
        this.weaponId = -1;
        this.numWeaponGroups = opts.groupCount ?? 3;
        this.lastAlt = false;
        this.gunsToFire = [];
    }
    think(input) {
        if (input.alt && !this.lastAlt || !this.gunsToFire.length) {
            // Reset altfire settings of the previous group
            for (let gun of this.gunsToFire) {
                gun.altFire = this.weaponId + 1;
            }

            this.weaponId = (this.weaponId + 1) % this.numWeaponGroups;
            this.lastAlt = true;
            this.body.sendMessage(`Selected Weapon Group ${this.weaponId + 1}.`);

            // Remove altfire settings of the current group
            this.gunsToFire = this.body.guns.filter((x) => x.altFire === this.weaponId + 1);
            for (let gun of this.gunsToFire) {
                gun.altFire = false;
            }
        } else if (!input.alt) {
            this.lastAlt = false;
        }

        return {
            alt: false,
        }
    }
}
ioTypes.weaponSwitcher = io_weaponSwitcher;
