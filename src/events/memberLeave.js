const logger = require("../config/logger");

module.exports = async bot => {
  bot.on("guildMemberRemove", async member => {
    try {
      let channel;

      channel = await member.guild.channels.find(ch => ch.name === "main");

      if (!channel) {
        channel = await member.guild.channels.find(ch => ch.name === "general");
      }

      if (!channel) return;

      await channel.send(`**${member}** has left the server. :frowning:`);
    } catch (error) {
      logger.error(error);
    }
  });
};
