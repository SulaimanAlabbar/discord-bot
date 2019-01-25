const { RichEmbed } = require("discord.js");
const axios = require("axios");
const botConfig = require("../../botConfig.json");

async function metallum({ msg, props }) {
  const BASE_URL = "https://www.googleapis.com/customsearch/v1?q=";
  const cx = "006656072422762840547%3Auw9awt530ba";
  const API_KEY = botConfig.googleApiKey;
  const query = props.join("+");
  const URL = `${BASE_URL}${query}&cx=${cx}&num=1&key=${API_KEY}`;

  try {
    const response = await axios.get(URL);
    const embed = new RichEmbed()
      .setTitle(
        `**${props.join(" ").toUpperCase()}:**\n${response.data.items[0].link}`
      )
      .setImage(response.data.items[0].pagemap.cse_image[0].src)
      .setColor("#321414")
      .setURL(response.data.items[0].link);

    await msg.channel.send(embed);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    await msg.channel.send("Band not found.");
  }
}

module.exports = metallum;
