const { prefix } = require("../config");
const { CommandError } = require("../helpers/errors");
const addQuote = require("../database/queries/addQuote");
const getMemberAliases = require("../database/queries/getMemberAliases");

module.exports = async (msg, args) => {
  const badInput = async () => {
    await msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${prefix}addquote @user quote${"```"}`
    );
  };

  if (args.length < 2) return badInput();

  let user = args[0].replace(/[<@#!&>]/g, "");
  const quote = args.slice(1).join(" ");

  try {
    const memberId = await getMemberAliases({
      serverId: msg.guild.id,
      alias: user
    });

    if (memberId) {
      user = memberId;
    }

    const addedQuote = await addQuote({
      serverId: msg.guild.id,
      memberId: user,
      quote
    });

    if (!addedQuote) {
      await msg.channel.send("Didn't add quote.");
      return;
    }

    await msg.channel.send("Quote added.");
  } catch (error) {
    throw new CommandError("Couldn't add quote.", error);
  }
};
