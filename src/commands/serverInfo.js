const { RichEmbed } = require("discord.js");

module.exports = msg => {
  const serverName = msg.guild.name;
  const { memberCount } = msg.guild;
  const creationDate = new Date(msg.guild.createdAt).toDateString();
  const textChannels = msg.guild.channels
    .filter(channel => channel.type === "text" && !channel.deleted)
    .map(channel => channel.name)
    .join(", ");
  const { region } = msg.guild;

  msg.channel.send(
    new RichEmbed()
      .setTitle(serverName)
      .addField("Creation Date:", creationDate, true)
      .addField("Region:", region, true)
      .addField("Members:", memberCount, true)
      .addField("Channels:", textChannels, true)
      .setThumbnail(msg.guild.iconURL)
      .setColor(0xdd0000)
  );
};
