const { RichEmbed } = require("discord.js");

async function metalTierList({ msg }) {
  const site = "https://metaltierlist.github.io/MTL/";
  const download = "https://pastebin.com/raw/zDgawtNb";
  const MTLImage =
    "https://metaltierlist.github.io/MTL/static/media/MTL.8ab11687.png";

  const embed = new RichEmbed()
    .setTitle("Metal Tier List")
    .addField("Site", site, false)
    .addField("Download link", download, false)
    .setImage(MTLImage)
    .setThumbnail(msg.guild.iconURL)
    .setColor(0xdd0000);

  await msg.channel.send(embed);
}

module.exports = metalTierList;
