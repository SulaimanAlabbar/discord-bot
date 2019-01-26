const { RichEmbed } = require("discord.js");

module.exports = async msg => {
  msg.channel.send(
    new RichEmbed()
      .addField("Metal Tier List", process.env.MTL_SITE, false)
      .addField("Download link", process.env.MTL_DOWNLOAD, false)
      .setImage(process.env.MTL_IMAGE)
      .setThumbnail(msg.guild.iconURL)
      .setColor(0xdd0000)
  );
};
