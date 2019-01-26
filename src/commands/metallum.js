const { RichEmbed } = require("discord.js");
const axios = require("axios");

module.exports = async (msg, command) => {
  if (command.length === 1)
    return msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${process.env.PREFIX}metallum <band>${"```"}`
    );

  const BASE_URL = "https://www.googleapis.com/customsearch/v1?q=";
  const cx = "006656072422762840547%3Auw9awt530ba";
  const API_KEY = process.env.GOOGLE_API_KEY;
  const query = command.slice(1).join("+");
  const URL = `${BASE_URL}${query}&cx=${cx}&num=1&key=${API_KEY}`;

  try {
    const response = await axios.get(URL);

    msg.channel.send(
      new RichEmbed()
        .setTitle(
          `**${command
            .slice(1)
            .join(" ")
            .toUpperCase()}:**\n${response.data.items[0].link}`
        )
        .setImage(response.data.items[0].pagemap.cse_image[0].src)
        .setColor("#321414")
        .setURL(response.data.items[0].link)
    );
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    msg.channel.send("Band not found.");
  }
};
