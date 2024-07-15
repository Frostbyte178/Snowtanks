let fs = require('fs'),
    path = require('path'),
    groups = fs.readdirSync(path.join(__dirname, './groups')),
    definitionCount = 0,
    definitionGroupsLoadStart = performance.now();

console.log(`Loading ${groups.length} groups...`);

for (let filename of groups) {
    console.log(`Loading group: ${filename}`);
    require('./groups/' + filename);
}

let definitionGroupsLoadEnd = performance.now();
console.log("Loaded definitions in " + util.rounder(definitionGroupsLoadEnd - definitionGroupsLoadStart, 3) + " milliseconds. \n");

console.log(`Loading addons...`);

function processAddonFolder(directory) {
    let folder = fs.readdirSync(directory);
    for (let filename of folder) {
        let filepath = directory + `/${filename}`;
        let isDirectory = fs.statSync(filepath).isDirectory();
        if (isDirectory) {
            processAddonFolder(filepath);
        }

        if (!filename.endsWith('.js')) continue;
        
        console.log(`Loading addon: ${filename}`);
        let result = require(filepath);
        if ('function' === typeof result) {
            result({ Class, Config, Events });
        }
        loadedAddons.push(filename.slice(0, -3));
    }
}
processAddonFolder(path.join(__dirname, './addons'));
definitionCount = Object.keys(Class).length;

let addonsLoadEnd = performance.now();
console.log("Loaded addons in " + util.rounder(addonsLoadEnd - definitionGroupsLoadEnd, 3) + " milliseconds. \n");

// "Flattening" refers to removing PARENT attributes and applying the parents' attributes to the definition themselves, if not overwritten later on.
if (Config.flattenDefintions) {
    console.log(`Flattening ${definitionCount} definitions...`);
    
    let flattened = {};
    for (let key in Class) {
        let output = {};
        util.flattenDefinition(output, Class[key]);
        flattened[key] = output;
    }
    Class = flattened;
    console.log("Definitions flattened in " + (performance.now() - addonsLoadEnd) + " milliseconds. \n");
}

console.log(`Combined ${groups.length} definition groups and ${loadedAddons.length} addons into ${definitionCount} ${Config.flattenDefintions ? 'flattened ' : ''}definitions!\n`);
// Index the definitions
let i = 0;
for (let key in Class) {
    if (!Class.hasOwnProperty(key)) continue;
    Class[key].index = i++;
}
