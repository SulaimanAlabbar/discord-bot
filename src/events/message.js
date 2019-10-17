const addMessage = require("../database/queries/addMessage");
const levelUp = require("../helpers/levelUp");
const config = require("../config");
const commandHandler = require("../commandHandler");
const errorHandler = require("../helpers/errorHandler");

module.exports = async bot => {
  bot.on("message", async msg => {
    // const serverId = msg.guild.id;
    // const serverName = msg.guild.name;
    const channelId = msg.channel.id;
    // const channelName = msg.channel.name;
    const memberId = msg.author.id;
    // const memberName = msg.author.username;
    const messageId = msg.id;
    const messageContent = msg.content;

    try {
      await addMessage({
        id: messageId,
        channelId,
        memberId,
        message: messageContent
      });

      if (msg.author.bot) return;

      await levelUp(msg);

      if (msg.content[0] !== config.prefix) return;
      if (msg.content.length === 1) return;
      if (!new RegExp("^[a-zA-Z]+").test(msg.content[1])) return;

      const args = msg.content
        .slice(1)
        .trim()
        .split(/ +/g);
      const command = args.shift().toLowerCase();

      await commandHandler(msg, command, args);
    } catch (error) {
      await errorHandler(msg, error);
    }
  });
};
