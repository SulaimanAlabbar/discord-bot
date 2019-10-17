/* eslint-disable no-param-reassign */
const { DatabaseError, CommandError } = require("./errors");
const logger = require("../config/logger");

module.exports = async (msg, error) => {
  if (error instanceof CommandError) {
    await msg.channel.send(error.message);
    error.userMessage = msg.content;
    if (error.cause && error.cause.isAxiosError) {
      error.cause.config = "[OMITTED]";
      error.cause.request = "[OMITTED]";
      error.cause.response = "[OMITTED]";
    }
    logger.error(error);
  } else if (error instanceof DatabaseError) {
    logger.error(error);
  } else {
    await msg.channel.send("¯\\_(ツ)_/¯");
    error.userMessage = msg.content;
    logger.error(error);
  }
};
