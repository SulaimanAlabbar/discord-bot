const { RichEmbed } = require("discord.js");
const { prefix } = require("../config");
const { CommandError } = require("../helpers/errors");

module.exports = async (msg, args) => {
  if (args.length > 1) {
    await msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${prefix}userinfo @user${"```"}`
    );
    return;
  }

  const userId =
    args.length === 0 ? msg.author.id : args[0].replace(/[<@#!&>]/g, "");

  try {
    const discordUser = await msg.client.fetchUser(userId);
    const guildMember = await msg.guild.member(userId);

    const name = guildMember.displayName;
    const { tag } = discordUser;
    const joinedServer = new Date(guildMember.joinedAt).toDateString();
    const joinedDiscord = new Date(discordUser.createdAt).toDateString();
    const lastSeen = guildMember.lastMessage
      ? new Date(guildMember.lastMessage.createdAt).toDateString()
      : "¯\\_(ツ)_/¯";
    const lastMessage = guildMember.lastMessage
      ? `https://discordapp.com/channels/${msg.guild.id}/${guildMember.lastMessage.channel.id}/${guildMember.lastMessage.id}`
      : "¯\\_(ツ)_/¯";
    const roles = guildMember.roles.map(role => role.name).join(", ");

    msg.channel.send(
      new RichEmbed()
        .addField("Name:", name, true)
        .addField("Tag:", tag, true)
        .addField("Joined Discord:", joinedDiscord, true)
        .addField("Joined Server:", joinedServer, true)
        .addField("Last Seen:", lastSeen, true)
        .addField("Roles:", roles, true)
        .addField("Last Message:", lastMessage, true)
        .setThumbnail(discordUser.avatarURL)
        .setColor(guildMember.displayHexColor)
    );
  } catch (error) {
    throw new CommandError("Couldn't get user's info.", error);
  }
};
