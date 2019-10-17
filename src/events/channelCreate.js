const addChannel = require("../database/queries/addChannel");
const logger = require("../config/logger");

module.exports = async bot => {
  bot.on("channelCreate", async channel => {
    try {
      if (channel.type === "text") {
        await addChannel({
          id: channel.id,
          name: channel.name,
          serverId: channel.guild.id
        });
      }
    } catch (error) {
      logger.error(error);
    }
  });
};
