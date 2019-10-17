const logger = require("../config/logger");
const addMember = require("../database/queries/addMember");
const addXp = require("../database/queries/addXp");

module.exports = async bot => {
  bot.on("guildMemberAdd", async member => {
    try {
      let channel;

      channel = await member.guild.channels.find(ch => ch.name === "main");

      if (!channel) {
        channel = await member.guild.channels.find(ch => ch.name === "general");
      }

      if (!channel) return;

      await channel.send(`Welcome to ${member.guild.name}, ${member}`);

      await addMember({
        id: member.user.id,
        name: member.user.username
      });

      await addXp({
        serverId: member.guild.id,
        memberId: member.user.id
      });
    } catch (error) {
      logger.error(error);
    }
  });
};
