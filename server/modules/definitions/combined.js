let fs = require('fs'),
    path = require('path'),
    groups = fs.readdirSync(path.resolve(__dirname, './groups')),
    addons = fs.readdirSync(path.resolve(__dirname, './addons')),
    definitionCount = 0,
    definitionGroupsLoadStart = Date.now();
console.log(`Loading ${groups.length} groups...`);
for (let filename of groups) {
    console.log(`Loading group: ${filename}`);
    require('./groups/' + filename);
}

let definitionGroupsLoadEnd = Date.now();
console.log("Loaded definitions in " + (definitionGroupsLoadEnd - definitionGroupsLoadStart) + " milliseconds. \n");

console.log(`Loading ${addons.length} addons...`);
for (let filename of addons) {
    if (!filename.endsWith('.js')) continue;
    
    console.log(`Loading addon: ${filename}`);
    let result = require('./addons/' + filename);
    if ('function' === typeof result) {
        result({ Config: c, Events: events });
    }
    global.loadedAddons.push(filename.replace(/\.js$/, ""));
}
definitionCount = Object.keys(Class).length;

let addonsLoadEnd = Date.now();
console.log("Loaded addons in " + (addonsLoadEnd - definitionGroupsLoadEnd) + " milliseconds. \n");

// "Flattening" refers to removing PARENT attributes and applying the parents' attributes to the definition themselves, if not overwritten later on.
if (c.flattenDefintions) {
    console.log(`Flattening ${definitionCount} definitions...`);
    let flattenDefinition = (output, definition) => {
        definition = ensureIsClass(definition);

        if (definition.PARENT) {
            if (!Array.isArray(definition.PARENT)) {
                flattenDefinition(output, definition.PARENT);
            } else for (let parent in definition.PARENT) {
                flattenDefinition(output, definition.PARENT[parent]);
            }
        }

        for (let key in definition) {
            if (key !== "PARENT") {
                output[key] = definition[key];
            }
        }

        return output;
    };

    let flattened = {};
    for (let key in Class) {
        let output = {};
        flattenDefinition(output, Class[key]);
        flattened[key] = output;
    }
    Class = flattened;
    definitionCount = Object.keys(Class).length;
    console.log("Definitions flattened in " + (Date.now() - addonsLoadEnd) + " milliseconds. \n");
}

console.log(`Combined ${groups.length} definition groups and ${addons.length} addons into ${definitionCount} ${c.flattenDefintions ? 'flattened ' : ''}definitions!\n`);

// Index the definitions
let i = 0;
for (let key in Class) {
    if (!Class.hasOwnProperty(key)) continue;
    Class[key].index = i++;
}
