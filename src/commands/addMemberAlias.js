const { prefix } = require("../config");
const { CommandError } = require("../helpers/errors");
const addMemberAlias = require("../database/queries/addMemberAlias");

module.exports = async (msg, args) => {
  if (args.length !== 2) {
    await msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${prefix}addmemberalias @user alias${"```"}`
    );
    return;
  }

  const userId = args[0].replace(/[<@#!&>]/g, "");
  const alias = args[1];

  try {
    const addedAlias = await addMemberAlias({
      serverId: msg.guild.id,
      memberId: userId,
      alias
    });

    if (!addedAlias) {
      await msg.channel.send("Alias already exists.");
      return;
    }

    await msg.channel.send("Member alias added.");
  } catch (error) {
    throw new CommandError("Couldn't add alias.", error);
  }
};
