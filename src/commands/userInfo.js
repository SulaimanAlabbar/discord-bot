const { RichEmbed } = require("discord.js");

async function userInfo({ msg, props }) {
  const userId =
    props.length === 0
      ? msg.author.id
      : props[0][2] === "!"
      ? props[0].slice(3, props[0].length - 1)
      : props[0].slice(2, props[0].length - 1);

  try {
    const user = await msg.client.users.get(userId);
    const guildMember = await msg.guild.members.get(userId);
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

    const embed = new RichEmbed()
      .addField("Name:", name, true)
      .addField("Tag:", tag, true)
      .addField("Joined Discord:", joinedDiscord, true)
      .addField("Joined Server:", joinedServer, true)
      .addField("Last Seen:", lastSeen, true)
      .addField("Roles:", roles, true)
      .setThumbnail(user.avatarURL)
      .setColor(guildMember.displayHexColor);

    await msg.channel.send(embed);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    await msg.channel.send("Couldn't get user's info");
  }
}

module.exports = userInfo;
