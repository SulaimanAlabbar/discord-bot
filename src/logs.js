let constants = require("./constants");
const fs = require("fs");
const botConfig = require("../botConfig.json");
const logsMessageFormatter = require("./logsMessageFormatter");

async function logs(msg) {
  if (!constants.logsReady) return;

  try {
    const loggedMessage = await logsMessageFormatter(msg);
    fs.writeFile(
      `${botConfig.logsPath}/#${msg.channel.name}.txt`,
      loggedMessage,
      { flag: "a" },
      function(error) {
        if (error) {
          console.log(new Date().toTimeString());
          console.log(error);
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = logs;
