const { RichEmbed } = require("discord.js");

module.exports = async (msg, command) => {
  if (command.length > 2)
    return msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${process.env.PREFIX}userinfo <user>${"```"}`
    );

  const userId =
    command.length === 1 ? msg.author.id : command[1].replace(/[<>@#!]/g, "");

  try {
    const user = await msg.client.fetchUser(userId);
    const guildMember = await msg.guild.fetchMember(userId);

    if (!user || !guildMember)
      return msg.channel.send("Couldn't get user's info");

    const name = `${guildMember.displayName}`;
    const tag = `${user.tag}`;
    const joinedServer = `${guildMember.joinedAt
      .toString()
      .split(" ")
      .slice(0, 5)
      .join(" ")}`;
    const joinedDiscord = `${user.createdAt
      .toString()
      .split(" ")
      .slice(0, 5)
      .join(" ")}`;
    let lastSeen = guildMember.lastMessage
      ? `${guildMember.lastMessage.createdAt
          .toString()
          .split(" ")
          .slice(0, 5)
          .join(" ")}`
      : "¯\\_(ツ)_/¯";

    const roles = `${guildMember.roles.map(role => `${role.name}`).join(", ")}`;

    msg.channel.send(
      new RichEmbed()
        .addField("Name:", name, true)
        .addField("Tag:", tag, true)
        .addField("Joined Discord:", joinedDiscord, true)
        .addField("Joined Server:", joinedServer, true)
        .addField("Last Seen:", lastSeen, true)
        .addField("Roles:", roles, true)
        .setThumbnail(user.avatarURL)
        .setColor(guildMember.displayHexColor)
    );
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    msg.channel.send("Couldn't get user's info");
  }
};
