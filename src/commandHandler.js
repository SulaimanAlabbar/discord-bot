const commands = require("./commands");
const config = require("./config");

module.exports = async (msg, command, args) => {
  if (command === "serverinfo") await commands.serverInfo(msg);
  if (command === "userinfo") await commands.userInfo(msg, args);
  if (command === "google" || command === "g")
    await commands.googleSearch(msg, args);
  if (command === "image" || command === "gim")
    await commands.googleImage(msg, args);
  if (command === "images" || command === "gis")
    await commands.googleImage(msg, args, { random: true });
  if (command === "youtube" || command === "y" || command === "yt")
    await commands.youtube(msg, args);
  if (command === "dictionary" || command === "d")
    await commands.dictionary(msg, args);
  if (command === "urban" || command === "u") await commands.urban(msg, args);
  if (command === "addquote") await commands.addQuote(msg, args);
  if (command === "quote") await commands.quote(msg, args);
  if (command === "leaderboard" || command === "top")
    await commands.leaderboard(msg, args);
  if (command === "dice") await commands.dice(msg, args);

  if (msg.author.id === config.adminId) {
    if (command === "addmemberalias") await commands.addMemberAlias(msg, args);
    if (command === "listmemberaliases")
      await commands.listMemberAliases(msg, args);
  }
};
