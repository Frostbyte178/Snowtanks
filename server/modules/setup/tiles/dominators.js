let dominatorTypes = ["destroyerDominator", "gunnerDominator", "trapperDominator"],
    neededToWin = 4,

    teamcounts = {},
    gameWon = false,

spawn = (tile, team, color, type = false) => {
    type = type ? type : ran.choose(dominatorTypes);
    let o = new Entity(tile.loc);
    o.define(type);
    o.team = team;
    o.color.base = color;
    o.skill.score = 111069;
    o.name = "Dominator";
    o.nameColor = "#ffffff";
    o.SIZE = room.tileWidth / 15;
    o.isDominator = true;
    o.controllers = [new ioTypes.nearestDifferentMaster(o), new ioTypes.spin(o, { onlyWhenIdle: true })];

    tile.color.base = color;

    if (!teamcounts[team]) {
        teamcounts[team] = 0;
    }
    teamcounts[team]++;

    o.on('dead', () => {

        teamcounts[team]--;
        if (!teamcounts[team]) {
            delete teamcounts[team];
        }

        let newTeam = TEAM_ENEMIES,
            newColor = getTeamColor(newTeam);

        if (team === TEAM_ENEMIES) {
            let killers = [];
            for (let instance of o.collisionArray) {
                if (isPlayerTeam(instance.team) && team !== instance.team) {
                    killers.push(instance);
                }
            }

            let killer = ran.choose(killers);
            killer = killer ? killer.master.master : { team: TEAM_ROOM, color: Config.MODE === "tdm" ? 3 : 12 };

            newTeam = killer.team;
            newColor = getTeamColor(newTeam);

            for (let player of sockets.players) {
                if (player.body && player.body.team === newTeam) {
                    player.body.sendMessage("Press F to take control of the dominator.");
                }
            }

            let teamName = newTeam > 0 ? killer.name : getTeamName(newTeam);
            sockets.broadcast(`A dominator is now controlled by ${teamName}!`);
            if (newTeam !== TEAM_ENEMIES && teamcounts[newTeam] >= neededToWin && !gameWon) {
                gameWon = true;
                setTimeout(sockets.broadcast, 1500, teamName + " has won the game!");
                setTimeout(closeArena, 4500);
            }

        } else {
            sockets.broadcast("A dominator is being contested!");
        }

        spawn(tile, newTeam, newColor, type);
        sockets.broadcastRoom();
    });
},

makeDefenderDominator = (tile, mainTeam, team, deadTeam, aliveDef) => {
    aliveDef = aliveDef ? aliveDef : ran.choose(dominatorTypes);
    let o = new Entity(tile.loc);
    o.define(mainTeam == team ? aliveDef : "dominator");
    o.team = team;
    o.color.base = getTeamColor(team);
    o.skill.score = 111069;
    o.SIZE = room.tileWidth / 15;
    o.isDominator = true;

    tile.color.base = getTeamColor(team);

    if (!teamcounts[team]) {
        teamcounts[team] = 0;
    }
    teamcounts[team]++;

    o.on('dead', () => {

        teamcounts[team]--;

        if (team === mainTeam) {
            sockets.broadcast(`A ${o.label} has been destroyed!`);
            if (!teamcounts[team] && !gameWon) {
                gameWon = true;
                setTimeout(sockets.broadcast, 1500, "The raiders has won the game!"); //figure out how to guess a better text
                setTimeout(closeArena, 4500);
            }

        } else {
            sockets.broadcast(`A ${o.label} has been repaired!`);
        }

        makeDefenderDominator(tile, mainTeam, team === mainTeam ? deadTeam : mainTeam, deadTeam, aliveDef);
        sockets.broadcastRoom();
    });
};

let dominatorBlue = new Tile({ init: tile => makeDefenderDominator(tile, TEAM_BLUE, TEAM_BLUE, TEAM_ENEMIES) }),
    dominatorGreen = new Tile({ init: tile => makeDefenderDominator(tile, TEAM_GREEN, TEAM_GREEN, TEAM_BLUE) }),
    dominatorContested = new Tile({ init: tile => spawn(tile, TEAM_ENEMIES, getTeamColor(TEAM_ENEMIES)) }),
    sanctuaryBlue = new Tile({ init: tile => makeDefenderDominator(tile, TEAM_BLUE, TEAM_BLUE, TEAM_ENEMIES, 'sanctuaryTier1') }),
    sanctuaryGreen = new Tile({ init: tile => makeDefenderDominator(tile, TEAM_GREEN, TEAM_GREEN, TEAM_BLUE, 'sanctuaryTier3') }),
    sanctuaryContested = new Tile({ init: tile => spawn(tile, TEAM_ENEMIES, getTeamColor(TEAM_ENEMIES), 'sanctuaryTier1') });


module.exports = {
    contested: dominatorContested,
    dominatorBlue,
    dominatorGreen,
    dominatorContested,
    sanctuaryBlue, // siege
    sanctuaryGreen, // assault
    sanctuaryContested // idk i thought it was funny
};