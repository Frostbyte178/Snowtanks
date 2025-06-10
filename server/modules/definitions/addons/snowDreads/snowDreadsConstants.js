const { base } = require('../../constants.js');
const g = require('../../gunvals.js');

// Set the below variable to true to enable all of the snowDreads addons.
exports.enableSnowDreads = true;

if (!exports.enableSnowDreads) {
	return console.log('--- Snowdreads constants addon [snowDreadsConstants.js] is disabled. ---');
}

// Set the below variable to true to enable hex dreadnought building.
exports.buildHexnoughts = true;

// Set the below variable to true to enable photosphere with 10 auras instead of 6.
exports.useOldPhotosphere = false;

// For hexnought merging
exports.exceptionHexdreadGuns = ["Javelin", "Woomera", "Trebuchet", "Jackhammer"];
exports.hexnoughtScaleFactor = 0.9;

// Missing stats
g.flame = {reload: 0.65, recoil: 0.1, shudder: 1.5, range: 0.6, spray: 7, damage: 1.9, health: 0.3, speed: 0.65, maxSpeed: 0.5};
g.honcho = {size: 2, damage: 2.5, health: 1.2, reload: 2, speed: 0.7};

// Body helpers
exports.hpBuffBodyStats = [
	{ HEALTH: 1.65, SPEED: 1.2,  SHIELD: 1.4,  REGEN: 1.3  },
	{ HEALTH: 2,    SPEED: 1.33, SHIELD: 1.65, REGEN: 1.45 },
	{ HEALTH: 2.3,  SPEED: 1.45, SHIELD: 1.9,  REGEN: 1.6  },
	{ HEALTH: 2.55, SPEED: 1.55, SHIELD: 2.15, REGEN: 1.7  },
];
exports.speedBuffBodyStats = [
	{ HEALTH: 0.75, SPEED: 2.1,  SHIELD: 0.85, REGEN: 1   },
	{ HEALTH: 0.62, SPEED: 2.45, SHIELD: 0.72, REGEN: 0.9 },
	{ HEALTH: 0.55, SPEED: 2.75, SHIELD: 0.6,  REGEN: 0.8 },
];
exports.shieldBuffBodyStats = [
	{ HEALTH: 1.2,  SPEED: 1.45, SHIELD: 2.2,  REGEN: 1.7 },
	{ HEALTH: 1.4,  SPEED: 1.6,  SHIELD: 2.75, REGEN: 1.9 },
	{ HEALTH: 1.55, SPEED: 1.72, SHIELD: 3.25, REGEN: 2.1 },
];

// Body stats
exports.eggnoughtBody = {
    SPEED: base.SPEED * 0.8,
    HEALTH: base.HEALTH * 1.75,
	SHIELD: base.SHIELD * 1.5,
	REGEN: base.REGEN * 1.5,
    FOV: base.FOV,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 1.5,
};
exports.squarenoughtBody = {
    SPEED: base.SPEED * 0.675,
    HEALTH: base.HEALTH * 2.5,
	SHIELD: base.SHIELD * 2,
	REGEN: base.REGEN * 2,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 2,
};
exports.trinoughtBody = {
    SPEED: base.SPEED * 0.55,
    HEALTH: base.HEALTH * 3.5,
	SHIELD: base.SHIELD * 2.5,
	REGEN: base.REGEN * 2.5,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 2.5,
};
exports.pentanoughtBody = {
    SPEED: base.SPEED * 0.425,
    HEALTH: base.HEALTH * 4.25,
	SHIELD: base.SHIELD * 3,
	REGEN: base.REGEN * 3,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 3,
};
exports.hexnoughtBody = {
    SPEED: base.SPEED * 0.3,
    HEALTH: base.HEALTH * 5,
	SHIELD: base.SHIELD * 3.5,
	REGEN: base.REGEN * 3.5,
    FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 3.5,
};

exports.pentanoughtWeapons = [
	"rapierSnowdread",     "javelinSnowdread",     "woomeraSnowdread",           "trebuchetSnowdread",  "boltSnowdread",
	"diplomatSnowdread",   "arbitratorSnowdread",  "dissolverSnowdread",         "eroderSnowdread",     "gripperSnowdread",
	"retardantSnowdread",  "tyrantSnowdread",      "anesthesiologistSnowdread",  "helixSnowdread",      "bombardmentSnowdread",
	"raiderSnowdread",     "gladiatorSnowdread",   "starlightSnowdread",         "bruiserSnowdread",    "incapacitatorSnowdread",
	"cerberusSnowdread",   "luciferSnowdread",     "sterilizerSnowdread",        "hielamanSnowdread",   "jackhammerSnowdread",
];

exports.hexDreadNames = {
	Javelin: {
		Javelin: 'Javelin',
		Rapier: 'Lance',
		Woomera: 'Shikari',
		Trebuchet: 'Ballista',
		Bolt: 'Tomahawk',
		Diplomat: 'Envoy',
		Arbitrator: 'Cutlass',
		Dissolver: 'Hellfire',
		Eroder: 'Partisan',
		Gripper: 'Encircler',
		Retardant: 'Rebel',
		Tyrant: 'Autocrat',
		Anesthesiologist: 'Patriot',
		Helix: 'Stinger',
		Bombardment: 'Downpour',
		Raider: 'Pirate',
		Gladiator: 'Pillager',
		Starlight: 'Hornet',
		Bruiser: 'Felon',
		Incapacitator: 'Stretcher',
		Cerberus: 'Argonaut',
		Lucifer: 'Kitsune',
		Sterilizer: 'Mastermind',
		Hielaman: 'Swordsman', 
		Jackhammer: 'Fissure',
	},
	Rapier: {
		Rapier: 'Rapier',
		Woomera: 'Cavalier',
		Trebuchet: 'Katana',
		Bolt: 'Claymore',
		Diplomat: 'Emissary',
		Arbitrator: 'Umpire',
		Dissolver: 'Relocator',
		Eroder: 'Debris',
		Gripper: 'Interrogator',
		Retardant: 'Impeder',
		Tyrant: 'Oppressor',
		Anesthesiologist: 'Slumberer',
		Helix: 'Vortex',
		Bombardment: 'Butcher',
		Raider: 'Bandit',
		Gladiator: 'Injurer',
		Starlight: 'Radiance',
		Bruiser: 'Ringster',
		Incapacitator: 'Swamper',
		Cerberus: 'Cyclops',
		Lucifer: 'Damocles',
		Sterilizer: 'Sanitizer',
		Hielaman: 'Escutcheon', 
		Jackhammer: 'Borer',
	},
	Woomera: {
		Woomera: 'Woomera',
		Trebuchet: 'Cannonball',
		Bolt: 'Piercer', // Soap
		Diplomat: 'Contractor',
		Arbitrator: 'Spirit',
		Dissolver: 'Venom',
		Eroder: 'Decomposer',
		Gripper: 'Crucifier',
		Retardant: 'Overrunner',
		Tyrant: 'Revolutionary',
		Anesthesiologist: 'Guerilla',
		Helix: 'Cultivator',
		Bombardment: 'Incendiary',
		Raider: 'Dispatcher', // Soap
		Gladiator: 'Pugilist',
		Starlight: 'Starborne',
		Bruiser: 'Soldier',
		Incapacitator: 'Scavenger', // Soap
		Cerberus: 'Poltergeist',
		Lucifer: 'Hunkerer',
		Sterilizer: 'Janitor',
		Hielaman: 'Reinforcer', 
		Jackhammer: 'Pyroclastic',
	},
	Trebuchet: {
		Trebuchet: 'Trebuchet',
		Bolt: 'Archer',
		Diplomat: 'Sherman',
		Arbitrator: 'Ultimatum',
		Dissolver: 'Grapeshot',
		Eroder: 'Shrapnel',
		Gripper: 'Razer',
		Retardant: 'Mangonel',
		Tyrant: 'Incarcerator', // Zenphia
		Anesthesiologist: 'Evacuator',
		Helix: 'Hurricane',
		Bombardment: 'Surrenderer',
		Raider: 'Capitulator',
		Gladiator: 'Uprising',
		Starlight: 'Magnetar',
		Bruiser: 'Crumpler',
		Incapacitator: 'Pinner',
		Cerberus: 'Phantom', // Umbra
		Lucifer: 'Sisyphus',
		Sterilizer: 'Operation',
		Hielaman: 'Entrencher', 
		Jackhammer: 'Demolitionist',
	},
	Bolt: {
		Bolt: 'Bolt',
		Diplomat: 'Informant',
		Arbitrator: 'Assaulter',
		Dissolver: 'Sprinter',
		Eroder: 'Discharger', // Soap
		Gripper: 'Lightning',
		Retardant: 'Evicter',
		Tyrant: 'Minister',
		Anesthesiologist: 'Ambusher',
		Helix: 'Ultraviolet',
		Bombardment: 'Dynamo',
		Raider: 'Infector',
		Gladiator: 'Blinder',
		Starlight: 'Neutrino',
		Bruiser: 'Impactor',
		Incapacitator: 'Volt',
		Cerberus: 'Collapse',
		Lucifer: 'Barycenter',
		Sterilizer: 'Greenhouse',
		Hielaman: 'Nebula', 
		Jackhammer: 'Archaeologist',
	},
	Diplomat: {
		Diplomat: 'Diplomat',
		Arbitrator: 'Moderator',
		Dissolver: 'Impaler', // Soap
		Eroder: 'Vulcan',
		Gripper: 'Politician',
		Retardant: 'Insurgent',
		Tyrant: 'Dictator',
		Anesthesiologist: 'Transporter',
		Helix: 'Signature',
		Bombardment: 'Berserker', // Soap
		Raider: 'Marauder',
		Gladiator: 'Champion',
		Starlight: 'Comet',
		Bruiser: 'Ambassador',
		Incapacitator: 'Erebus', // Yharon
		Cerberus: 'Orion',
		Lucifer: 'Manticore',
		Sterilizer: 'Officer',
		Hielaman: 'Investigator', 
		Jackhammer: 'Devourer', // Soap
	},
	Arbitrator: {
		Arbitrator: 'Arbitrator',
		Dissolver: 'Bargainer',
		Eroder: 'Stipulator',
		Gripper: 'Adjudicator',
		Retardant: 'Extinguisher',
		Tyrant: 'Shogun',
		Anesthesiologist: 'Brute',
		Helix: 'Referee',
		Bombardment: 'Jury',
		Raider: 'Buccaneer',
		Gladiator: 'Warrior',
		Starlight: 'Genesis', // Siece
		Bruiser: 'Terminator', // Soap
		Incapacitator: 'Debater',
		Cerberus: 'Gorgon',
		Lucifer: 'Keres',
		Sterilizer: 'Warden',
		Hielaman: 'Crusader', 
		Jackhammer: 'Excavator',
	},
	Dissolver: {
		Dissolver: 'Dissolver',
		Eroder: 'Current',
		Gripper: 'Patronizer',
		Retardant: 'Corroder',
		Tyrant: 'Throne',
		Anesthesiologist: 'Neurotoxin',
		Helix: 'Solution',
		Bombardment: 'Chlorine',
		Raider: 'Traitor',
		Gladiator: 'Abolitionist',
		Starlight: 'Accretion',
		Bruiser: 'Piranha',
		Incapacitator: 'Sandstorm',
		Cerberus: 'Appalachian',
		Lucifer: 'Styx',
		Sterilizer: 'Peroxide',
		Hielaman: 'Frontier', 
		Jackhammer: 'Fracker',
	},
	Eroder: {
		Eroder: 'Eroder',
		Gripper: 'Psychologist',
		Retardant: 'Shatterer',
		Tyrant: 'Crackdown',
		Anesthesiologist: 'Torrent',
		Helix: 'Tornado',
		Bombardment: 'Backstabber',
		Raider: 'Militant', // Umbra
		Gladiator: 'Vitrifier',
		Starlight: 'Stardust',
		Bruiser: 'Gasher', // Soap
		Incapacitator: 'Lacerator', // Soap
		Cerberus: 'Inevitability',
		Lucifer: 'Fragment',
		Sterilizer: 'Cynic',
		Hielaman: 'Polisher', 
		Jackhammer: 'Hoser',
	},
	Gripper: {
		Gripper: 'Gripper',
		Retardant: 'Arrestor',
		Tyrant: 'Tormentor', // Soap
		Anesthesiologist: 'Experimenter',
		Helix: 'Blockader',
		Bombardment: 'Striker',
		Raider: 'Warmongerer', // Umbra
		Gladiator: 'Throwdown',
		Starlight: 'Cryogen',
		Bruiser: 'Knockout',
		Incapacitator: 'Restrainer',
		Cerberus: 'Prometheus',
		Lucifer: 'Mortician',
		Sterilizer: 'Cleanser',
		Hielaman: 'Periscope', 
		Jackhammer: 'Vice',
	},
	Retardant: {
		Retardant: 'Retardant',
		Tyrant: 'Anarchist',
		Anesthesiologist: 'Buckshot', // Soap
		Helix: 'Magnetron',
		Bombardment: 'Sergeant',
		Raider: 'Freebooter',
		Gladiator: 'Combatant',
		Starlight: 'Apparition',
		Bruiser: 'Executioner', // Soap
		Incapacitator: 'Smotherer',
		Cerberus: 'Gigantes',
		Lucifer: 'Demogorgon',
		Sterilizer: 'Fumigator',
		Hielaman: 'Avalanche', 
		Jackhammer: 'Propagator',
	},
	Tyrant: {
		Tyrant: 'Tyrant',
		Anesthesiologist: 'Barbarian',
		Helix: 'Nautilus',
		Bombardment: 'Admiral',
		Raider: 'Corsair',
		Gladiator: 'Amazon',
		Starlight: 'Theocrat',
		Bruiser: 'Authoritarian',
		Incapacitator: 'Jailkeeper',
		Cerberus: 'Ouroboros',
		Lucifer: 'Raiju',
		Sterilizer: 'Purifier',
		Hielaman: 'Protectorate', 
		Jackhammer: 'Detailer',
	},
	Anesthesiologist: {
		Anesthesiologist: 'Anesthesiologist',
		Helix: 'Blizzard',
		Bombardment: 'Nightmare',
		Raider: 'Vaccinator',
		Gladiator: 'Harbinger', // Siece
		Starlight: 'Hypnotizer',
		Bruiser: 'Tactician',
		Incapacitator: 'Psychic', // Soap
		Cerberus: 'Revenant',
		Lucifer: 'Rehabilitator',
		Sterilizer: 'Pestilence',
		Hielaman: 'Heater', 
		Jackhammer: 'Sledgehammer',
	},
	Helix: {
		Helix: 'Helix',
		Bombardment: 'Derecho',
		Raider: 'Deliverer',
		Gladiator: 'Constrictor',
		Starlight: 'Orbit',
		Bruiser: 'Cobra',
		Incapacitator: 'Windfall',
		Cerberus: 'Viper',
		Lucifer: 'Taipan',
		Sterilizer: 'Networker',
		Hielaman: 'Turbine', 
		Jackhammer: 'Spindler',
	},
	Bombardment: {
		Bombardment: 'Bombardment',
		Raider: 'Specialist',
		Gladiator: 'Leonidas',
		Starlight: 'Meteor',
		Bruiser: 'Grenadier',
		Incapacitator: 'Shellshocker',
		Cerberus: 'Deluge',
		Lucifer: 'Containment',
		Sterilizer: 'Haven',
		Hielaman: 'Ballistic', 
		Jackhammer: 'Mallet', // Soap
	},
	Raider: {
		Raider: 'Raider',
		Gladiator: 'Filibuster',
		Starlight: 'Colonizer',
		Bruiser: 'Plunderer', // Umbra
		Incapacitator: 'Blitzkrieg',
		Cerberus: 'Wyvern',
		Lucifer: 'Kraken',
		Sterilizer: 'Splatterer',
		Hielaman: 'Strategist', 
		Jackhammer: 'Extractor',
	},
	Gladiator: {
		Gladiator: 'Gladiator',
		Starlight: 'Enveloper',
		Bruiser: 'Fistfighter',
		Incapacitator: 'Overloader', // Umbra
		Cerberus: 'Ogre',
		Lucifer: 'Wendigo',
		Sterilizer: 'Garrison', // Umbra
		Hielaman: 'Uziel', // Zenphia
		Jackhammer: 'Warlord',
	},
	Starlight: {
		Starlight: 'Starlight',
		Bruiser: 'Wanderer',
		Incapacitator: 'Starstruck',
		Cerberus: 'Constellation',
		Lucifer: 'Galaxy',
		Sterilizer: 'Evaporator',
		Hielaman: 'Protostar', 
		Jackhammer: 'Illuminator',
	},
	Bruiser: {
		Bruiser: 'Bruiser',
		Incapacitator: 'Mauler',
		Cerberus: 'Serpent',
		Lucifer: 'Trident',
		Sterilizer: 'Suture',
		Hielaman: 'Heavyweight', 
		Jackhammer: 'Stapler',
	},
	Incapacitator: {
		Incapacitator: 'Incapacitator',
		Cerberus: 'Opportunist',
		Lucifer: 'Condemner',
		Sterilizer: 'Poisoner',
		Hielaman: 'Eyrie', 
		Jackhammer: 'Thrasher', // Soap
	},
	Cerberus: {
		Cerberus: 'Cerberus',
		Lucifer: 'Oni',
		Sterilizer: 'Antibody',
		Hielaman: 'Typhon', 
		Jackhammer: 'Paver',
	},
	Lucifer: {
		Lucifer: 'Lucifer',
		Sterilizer: 'Lipid',
		Hielaman: 'Insulator', 
		Jackhammer: 'Earthquaker',
	},
	Sterilizer: {
		Sterilizer: 'Sterilizer',
		Hielaman: 'Homeland', 
		Jackhammer: 'Bulldozer',
	},
	Hielaman: {
		Hielaman: 'Hielaman', 
		Jackhammer: 'Compactor',
	},
	Jackhammer: {
		Jackhammer: 'Jackhammer',
	},
};
