const path = require("path");
const glob = require("glob");

// Generate entries list from modules
module.exports = (globPattern) => {
  return glob.sync(globPattern).map(entryFile => require(path.resolve(entryFile)));
};
