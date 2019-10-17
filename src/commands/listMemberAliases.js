const { prefix } = require("../config");
const { CommandError } = require("../helpers/errors");
const getMemberAliases = require("../database/queries/getMemberAliases");

module.exports = async (msg, args) => {
  if (args.length !== 1) {
    await msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${prefix}listmemberaliases @user${"```"}`
    );
    return;
  }

  const userId = args[0].replace(/[<@#!&>]/g, "");

  try {
    const aliases = await getMemberAliases({
      serverId: msg.guild.id,
      memberId: userId
    });

    if (!aliases) {
      await msg.channel.send(`<@${userId}> has no aliases.`);
      return;
    }

    await msg.channel.send(`<@${userId}>'s aliases: ${aliases.join(", ")}.`);
  } catch (error) {
    throw new CommandError("Couldn't find member.", error);
  }
};
