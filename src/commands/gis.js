const { RichEmbed } = require("discord.js");
const botConfig = require("../../botConfig.json");
const GoogleImages = require("google-images");

async function gim({ msg, props }) {
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  try {
    const client = new GoogleImages(
      "006656072422762840547:aanrhbakns4",
      botConfig.googleApiKey
    );
    const query = props.join(" ");
    const response = await client.search(query);
    if (response[0] === undefined || response.length === 0) {
      await msg.channel.send("Couldn't find image.");
      return;
    }
    const embed = new RichEmbed().setImage(
      response[getRandom(0, response.length - 1)].url
    );
    await msg.channel.send(embed);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    await msg.channel.send("Couldn't find image.");
  }
}

module.exports = gim;
