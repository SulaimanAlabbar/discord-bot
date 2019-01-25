const botConfig = require("../botConfig.json");
const mkdirp = require("mkdirp");
let constants = require("./constants");
function initLogs() {
  mkdirp(`${botConfig.logsPath}`, function(error) {
    if (error) {
      console.log(new Date().toTimeString());
      console.error(error);
    }

    constants.logsReady = true;
  });
}

module.exports = initLogs;
