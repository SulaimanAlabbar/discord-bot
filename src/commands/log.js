const botConfig = require("../../botConfig.json");
const logsMessageFormatter = require("../logsMessageFormatter");
const fs = require("fs");
let logsArray = [];
async function log({ msg, props }) {
  if (botConfig.adminId !== msg.author.id) {
    await msg.channel.send("Only an admin can use this command.");
    return;
  }
  const channel = await msg.client.channels.get(
    props[0].slice(2, props[0].length - 1)
  );

  if (!channel) {
    await msg.channel.send("Channel doesn't exist.");
    return;
  }

  await msg.channel.send("Logging started.");

  let options = { limit: 100 };
  let lastMessageId = "";
  let oldLastMessageId = " ";
  let time = new Date().getTime();

  while (lastMessageId !== oldLastMessageId) {
    oldLastMessageId = lastMessageId;

    try {
      let messages = await channel.fetchMessages(options);

      lastMessageId = messages.last().id;

      messages = messages
        .map(async message => await logsMessageFormatter(message))
        .reverse();

      logsArray.unshift(await Promise.all(messages));

      options = { limit: 100, before: lastMessageId };
    } catch (error) {
      console.log(new Date().toTimeString());
      console.log(error);
    } finally {
      fs.writeFile(
        `../#${channel.name}.txt`,
        logsArray[0].join(""),
        { flag: "w" },
        function(error) {
          if (error) {
            console.log(new Date().toTimeString());
            console.log(error);
          }
        }
      );
    }
  }

  await msg.channel.send("Logging finished.");
  await msg.channel.send(
    `Took ${((new Date().getTime() - time) / 1000 / 60)
      .toString()
      .slice(0, 8)} minutes`
  );
  logsArray = [];
}

module.exports = log;
