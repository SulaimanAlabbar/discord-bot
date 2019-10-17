const { RichEmbed } = require("discord.js");
const { prefix } = require("../config");
const { CommandError } = require("../helpers/errors");
const getQuote = require("../database/queries/getQuote");
const getMemberAliases = require("../database/queries/getMemberAliases");

module.exports = async (msg, args) => {
  const badInput = async () => {
    await msg.channel.send(`
    ${msg.member}
${"```"}Usage:
${prefix}quote
${prefix}quote member
${prefix}quote member number
${"```"}`);
  };

  if (args.length > 2) return badInput();

  try {
    let quote;
    let user;

    if (args.length === 0) {
      quote = await getQuote({ serverId: msg.guild.id });
    } else if (args.length === 1) {
      user = args[0].replace(/[<@#!&>]/g, "");

      const memberId = await getMemberAliases({
        serverId: msg.guild.id,
        alias: user
      });

      if (memberId) {
        user = memberId;
      }

      quote = await getQuote({ serverId: msg.guild.id, memberId: user });
    } else if (args.length === 2) {
      user = args[0].replace(/[<@#!&>]/g, "");

      const memberId = await getMemberAliases({
        serverId: msg.guild.id,
        alias: user
      });

      if (memberId) {
        user = memberId;
      }

      const quoteNumber = args[1];

      if (isNaN(quoteNumber)) return badInput();

      quote = await getQuote({
        serverId: msg.guild.id,
        memberId: user,
        quoteNumber
      });
    }

    const discordUser = await msg.author.client.fetchUser(quote.memberId);
    const guildMember = await msg.guild.member(quote.memberId);

    await msg.channel.send(
      new RichEmbed()
        .setThumbnail(discordUser.avatarURL)
        .setColor(guildMember ? guildMember.displayHexColor : 0xdd0000)
        .setDescription(quote.quote)
        .setAuthor(quote.member)
        .setFooter(`${quote.quoteIndex}/${quote.totalQuotes}`)
        .setTimestamp(new Date(quote.addedAt))
    );
  } catch (error) {
    throw new CommandError("Couldn't fetch quote.", error);
  }
};
