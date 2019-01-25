const { RichEmbed } = require("discord.js");

async function serverInfo({ msg }) {
  const serverName = `${msg.guild.name}`;
  const memberCount = `${msg.guild.memberCount}`;
  const creationDate = `${msg.guild.createdAt
    .toString()
    .split(" ")
    .slice(0, 4)
    .join(" ")}`;
  const textChannels = `${msg.guild.channels
    .map(channel => channel.name)
    .join(", ")}`;
  const region = `${msg.guild.region}`;

  const embed = new RichEmbed()
    .setTitle(serverName)
    .addField("Creation Date:", creationDate, true)
    .addField("Region:", region, true)
    .addField("Members:", memberCount, true)
    .addField("Channels:", textChannels, true)
    .setThumbnail(msg.guild.iconURL)
    .setColor(0xdd0000);

  await msg.channel.send(embed);
}

module.exports = serverInfo;
