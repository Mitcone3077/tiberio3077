const path = require("path");
const glob = require("glob");

// Generate entries list from modules
const mapModules = (globPattern) => {
  return glob.sync(globPattern).map((moduleEntryFile) => {
    const entryFileSplitPath = moduleEntryFile.split("/");
    const root = entryFileSplitPath[entryFileSplitPath.length - 2];
    const moduleEntry = require(path.resolve(moduleEntryFile));

    return {
      key: root,
      ...moduleEntry,
    };
  });
};

module.exports = mapModules;
