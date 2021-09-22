const path = require('path');
const glob = require('glob');

// Generate entries list from modules
const configureEntries = (globPattern) => {
    const modules = glob
        .sync(globPattern)
        .map((file) => require(path.resolve(file)));

    const entries = {};
    modules.forEach((module) => {
        for (const [key, value] of Object.entries(module.entries)) {
            entries[key] = path.resolve(__dirname, value);
        }
    });
    return entries;
};

module.exports = configureEntries;