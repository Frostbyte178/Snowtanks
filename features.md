# List of added, changed or removed features

The list of all features that OSA/APS++ has included in the base template that are not in other templates.

It includes all features up to the latest release version.

## Added

* Addon API Support.
  * Addons can be added to `server/modules/definitions/addons`.
  * Addons can easily be downloaded, installed and published.
  * They can add custom entities and gamemodes, aswell as change the server configuration if needed.
  * They also have access to `Events`, like `spawn` or `chatMessage`.
  * Template comes with some example addons:
    * basicChatModeration*: Basic antispam which adds a ratelimit and chat message length limit to chat.
    * dreadv1 & dreadv2: Adds V1 and V2 dreadnoughts.
    * exampleAddon*: Showcases how addons can add custom definitions and interact with already existing ones.
    * labyFood*: Sets the food spawns to the Labyrinth ones.
    * \* = disabled by default, needs to be enabled.

* Ingame Chat.
  * 'Enter' in game to make and send messages.
  * 'Escape' to instantly close the message and clear the message content.
  * Messages disappear after 30 seconds, which can be changed with `CHAT_MESSAGE_DURATION` in the configuration.

* Multi-Colored Text.
  * You can now use section signs (`§`) to color different segments of rendered text in different colors.
  * Example: `Hello §37§World§reset§!`.
  * `SANITIZE_CHAT_MESSAGE_COLORS` to escape section signs in chat messages.

* Status Effects.
  * `StatusEffect`s can now be added to `Entity`s.
  * They can have a duration, body stats multipliers, and a function that runs every tick as long as the status effect lasts.
  * Can be added via `Entity.addStatusEffect(StatusEffect)`.
  * Multiple `StatusEffect`s can stack seamlessly.

* Split Upgrades.
  * `Entity.define()` can now take in an array of definitions as an argument.
  * If it receives an array of definitions, it applies the following attributes from any not-first definitions:
    * `LABEL`: Gets merged with the `LABEL` of previous entries in the definition array by concatenation with `-`.
    * `BODY`, `SIZE`: Values get multiplied with each other.
    * `GUNS`, `TURRETS`: Simply gets added as you would expect.
  * This means that `SPAWN_CLASS` in the config and upgrades in upgrade arrays can now be an array of multiple entities instead of a single one.

* 8 Team Support.
  * Also added the following constants: `TEAM_BLUE`, `TEAM_GREEN`, `TEAM_RED`, `TEAM_PURPLE`, `TEAM_YELLOW`, `TEAM_ORANGE`, `TEAM_BROWN`, `TEAM_CYAN`, `TEAM_ROOM`, `TEAM_ENEMIES`.
  * Added the following global methods: `getSpawnableArea(teamID)`, `getTeamName(teamID)`, `getTeamColor(teamID)`, `isPlayerTeam(teamID)`, `getWeakestTeam()`.
  * This is to prevent unreadable magic numbers in code.

* `SHAPE` supports decimal numbers.
  * Rotates the shape based on the decimal value.

* Custom Projectile Colors.
  * If your bullet has a `COLOR`, it overrides the inherited color.

* Invulnerability flicker.
  * When an entity has `.invuln` set to true, it flickers.

* Arguments to IO Controllers.
  * Allows you to configurate a controller.
  * `CONTROLLERS: [['spin', { speed: 0.1 }]]`.

* Entity Definition Attribute: `UPGRADE_COLOR`.
  * Lets you change the color of an entity's upgrade box.

* Entity Definition Attribute: `UPGRADE_LABEL`.
  * Lets you change an entity's upgrade box label.

* Entity Definition Attribute: `MIRROR_MASTER_ANGLE`.
  * If enabled, makes the turret's angle not lag behind the main entity's angle.
  * Enables uses of visual turrets that don't break visually if they rotate.

* Entity Definition Attribute: `IGNORED_BY_AI`.
  * Makes `io_nearestDifferentMaster` ignore you.
  * Base Protectors and Developer menus have them.

* Entity Definition Attribute: `LEVEL_SKILL_POINT_FUNCTION`.
  * Makes the entity use a custom LSPF then the one in the configuration file.

* Entity Definition Attribute: `RECALC_SKILL`.
  * Resets the spent skill upgrades as if they just spawned with their current level.
  * Runs after `LEVEL_SKILL_POINT_FUNCTION`.

* Entity Definition Attribute: `EXTRA_SKILL`.
  * How many extra skill points the entity gets to spend.
  * Runs after `RECALC_SKILL`.

* Entity Definition Attribute: `LEVEL_CAP`.
  * Overrides `LEVEL_CAP` in the configuration specifically for that entity.

* Entity Definition Attribute: `REROOT_UPGRADE_TREE`.
  * Changes the root tank of the player's Upgrade Tree.

* Gun Definition Attribute: `SHOOT_ON_DEATH`.
  * Makes the gun shoot if the entity it is attached to dies.

* Gun Definition Attribute: `DRAW_ABOVE`.
  * Makes a gun appear above the player but below top turrets.

* Gun Definition Attribute: `INDEPENDENT_CHILDREN`.
  * Spawns `TYPE` as an independent entity instead of a projectile.

* Definition Attribute: `BORDERLESS`.
  * Removes shape or gun borders, can be applied to both guns and entities.

* Definition Attribute: `DRAW_FILL`.
  * Fills a shape or gun when drawn.
  * `true` by default.

* Added Auras.
  * Comes with a new motionType `withMaster` and a facilitator `addAura`.

* Extensive Foods.
  * All labyrinth Foods.
  * All Relic variants of Old Food.
  * Sphere, Tetrahedron, Octahedron and Tesseract as Extradimensional Food.
  * Still kept the old Alpha/Beta Pentagons and Gems/Jewels.

* More Gamemodes: Train Wars, Manhunt, Space.

* Better Controllers, like `io_wanderAroundMap`, `io_stackGuns`, `io_spin` or `io_zoom`.

* Props - improved decorative turret system.
  * Turrets with `MIRROR_MASTER_ANGLE` forced to `true`.
  * Behaves identically to turrets but are less performance-heavy.
  * Can be placed on turrets but nothing can be placed on them.
  * FOV `ARC` value in `POSITION` omitted.

* Shape kill counter in the death screen.
* Auto LVL up.
* Split Health Bars.
* Auto-Alt, Suicide, Reverse Tank, Reverse Mouse, Inverse Mouse, Spin-Lock.
* Configurable Welcome Message.


## Changed

* General Codebase
  * Removed Immediately Invoked Function Expressions.

* Upgrade Tree Renderer
  * Move in all 4 directions with arrow keys.
  * Hold 'Shift' to move faster.
  * Supports theoretically infinite tiers.
  * Visually Upgraded.
  * Has tank labels.

* Configuration
  * All settings have a comment above them that explains what they do.
  * Certain settings were renamed to be less confusing.

* Moved animated colors to their own function.
  * Also added Lesbian (`29`) and Bi (`38`).

* Small options menu updates
  * Lists all key binds and also specifies which ones require tokens.

* Upgrade Menu Renderer
  * Now correctly renders various upgrade amounts.

* Developer Menu.
  * Has been completely reworked.
  * Includes Menus for Tools, Food Spawners, Unplayable Entities, Addon Entities, etc.

* Player Bots
  * They now upgrade classes and skill naturally.
  * Can be configured with `BOT_XP`, `BOT_SKILL_UPGRADE_CHANCES`, `BOT_CLASS_UPGRADE_CHANCES`.

* Token Management
  * Your actual token strings go into `.env`.
  * The permissions of your tokens go into `server/permissions.js`.
  * Tokens can have permissions like `infiniteLevelUp`.

* Definitions Management
  * Split up into numerous other files, all located in `server/modules/definitions`.
  * Entity definitions are in `/groups`.
  * "Facilitators" (makeAuto, combineStats, etc.), constants and gun values are in their own files.
  * As a requirement, you can now put `"strings"` as references instead of `Class.entity` references.
  * Added definition flattening, which would improve performance a bit by applying `PARENT`'s definitions directly to the definition.
  * Definition flattening also checks for entities that do not exist.
  * Needs `flattenDefintions` to be true in the configuration.

* `combineStats(StatsArray)`
  * Can now accept objects with values in them.
  * Example: `combineStats([g.drone, g.summoner, { size: 0.8 }])`.

* Gamemode Configurations
  * Gamemode configurations are now different files located in `server/modules/setup/gamemodeconfigs`.
  * Gamemode configs are loaded by `server/modules/setup/config.js`.
  * You can easily combine different gamemodes by loading multiple ones in `GAME_MODES` in config.
  * Also generates the gamemode's name.

* Upgrade Tiers
  * Instead of manually having to add tiers, you now change `MAX_UPGRADE_TIER`, `TIER_MULTIPLIER`.

* Default Class Tree
  * Up to date (as reasonably possible) with arras.io.

* `Gun`s now have IDs
  * Just like `yourEntity.id`, you can now get `yourGun.id`.

* `Entity` and `Gun` classes now extend from `EventEmitter`.
  * This specifically means that `Entity.ondead` is removed and instead fires an event for it.
  * `Entity` can now fire these events: `newStatusEffect`, `expiredStatusEffect`, `define`, `dead`.

* `PARENT`
  * If only one definition reference is inside `PARENT`, it is no longer required for it to be an array.
  * Example: `PARENT: "genericTank"`.

* `NECRO`
  * Can be a `SHAPE` number, or an array of them, which details what kind of shaped foods it can infect.

* `COLOR`
  * Can now support strings.
  * Can now use color names like `"red"`, `"animatedTrans"` or `"pureBlack"`.
  * Which now allows you to enter CSS color codes like `#F08842`.
  * Can also be an Object which contains HSL modification instructions for a basis color.
  * Can be `-1` or `mirror` to copy their parent's color.

* `ALPHA`
  * Can now be an array of 2 numbers.
  * First number defines the maximum alpha (max visibility).
  * Second number defines the minimum alpha (min visibility).

* `POSITION` (both for guns and turrets)
  * Can now be an object with the following (all optional) attributes:
  * Guns: `LENGTH`, `WIDTH`, `ASPECT`, `X`, `Y`, `ANGLE`, `DELAY`.
  * Turrets: `SIZE`, `X`, `Y`, `ANGLE`, `ARC`, `LAYER`

* `STAT_NAMES`
  * Can now be an object of key-string pairs with the following attributes: `BODY_DAMAGE`, `MAX_HEALTH`, `BULLET_SPEED`, `BULLET_HEALTH`, `BULLET_PEN`, `BULLET_DAMAGE`, `RELOAD`, `MOVE_SPEED`, `SHIELD_REGEN`, `SHIELD_CAP`.

* Shiny Sentries are now triangle.
  * Not even arras.io has this fixed iirc.

* Configuration Files.
  * `.json` files are in `.js` instead.

* Skills now support up to 255 stat points instead of 15.
  * Updated the skill upgrades UI renderer to compensate.

* Siege
  * Reworked how wave generation works.
  * Spawns friendly bosses.
  * Makes Healer branch accessible.

* Changelogs are now a HTML file instead of a MD file.


## Removed

* 3rd party packages.
  * All NPM packages besides `ws` have been optimised away.

* Food evolution.
  * It brings no real benefits outside of encouraging people to be selfish.
  * It brings 2 real downsides of screwing up Underseer-branch and making the code terrible to read.

* Removed skill bleeding, aswell as other redundant functions.
  * They did nothing of value anyway.

* Removed many settings that have done nothing.


## Fixes

* `public/lib/gameDraw.js` is now actually used.
* Turrets no longer shoot multiple times as fast than intended.
* Entities with 0 body damage don't get assist credit when they happen to ram something as it dies.
* Entities now die if they are dead but are touching a rock.
* Gun.shootSettings no longer is tied to the gun's definition.
* Bots spawn in their team's bases if there are bases.
* Bots fire alt-fire barrels.
* Bots can now use Trapper classes.
* Dominator Game Mode.
* Doesn't kick for invalid tokens, instead just does not give any perms.
* Level Bar now shows max level if you have exactly enough score to reach that level.
* Large `SHAPE`s now work.
