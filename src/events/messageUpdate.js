const updateMessage = require("../database/queries/updateMessage");
const logger = require("../config/logger");

module.exports = async bot => {
  bot.on("messageUpdate", async (oldMsg, newMsg) => {
    try {
      await updateMessage({ id: oldMsg.id, message: newMsg.content });
    } catch (error) {
      logger.error(error);
    }
  });
};
