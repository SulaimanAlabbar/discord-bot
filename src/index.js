const bot = require("./config/discord");
const { mode, token } = require("./config");
const addServer = require("./database/queries/addServer");
const addChannel = require("./database/queries/addChannel");
const addMember = require("./database/queries/addMember");
const addXp = require("./database/queries/addXp");
const messageEvent = require("./events/message");
const messageUpdateEvent = require("./events/messageUpdate");
const memberJoinEvent = require("./events/memberJoin");
const memberLeaveEvent = require("./events/memberLeave");
const channelCreateEvent = require("./events/channelCreate");
const logger = require("./config/logger");
const database = require("./config/database");

/*
TODO: userinfo: add aliases, xp, level, rank
TODO: guildUpdate and channelUpdate events, for name changes
*/

bot.on("ready", async () => {
  logger.info(`Bot online in ${mode} mode.`);

  try {
    for await (const guild of bot.guilds.values()) {
      await addServer({
        id: guild.id,
        name: guild.name
      });

      for await (const channel of guild.channels.values()) {
        if (channel.type === "text" && !channel.deleted) {
          await addChannel({
            id: channel.id,
            name: channel.name,
            serverId: guild.id
          });
        }
      }

      for await (const member of guild.members.values()) {
        await addMember({
          id: member.user.id,
          name: member.user.username
        });

        await addXp({
          serverId: guild.id,
          memberId: member.user.id
        });
      }
    }

    messageEvent(bot);
    messageUpdateEvent(bot);
    memberJoinEvent(bot);
    memberLeaveEvent(bot);
    channelCreateEvent(bot);
  } catch (error) {
    logger.error(error);
  }
});

bot.login(token);

process.on("uncaughtException", async error => {
  logger.error(error);

  setTimeout(() => {
    logger.info("Forcefully closing server...");
    process.exit(1);
  }, 10000);

  await database.end();
  logger.info("Closing server...");
  process.exit(1);
});

process.on("unhandledRejection", async error => {
  logger.error(error);

  setTimeout(() => {
    logger.info("Forcefully closing server...");
    process.exit(1);
  }, 10000);

  await await database.end();
  logger.info("Closing server...");
  process.exit(1);
});
