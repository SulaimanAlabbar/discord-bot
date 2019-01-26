const fs = require("fs");
const logsMessageFormatter = require("./logsMessageFormatter");

module.exports = async msg => {
  try {
    const loggedMessage = await logsMessageFormatter(msg);
    fs.writeFile(
      `${process.env.LOGS_PATH}/#${msg.channel.name}.txt`,
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
};
