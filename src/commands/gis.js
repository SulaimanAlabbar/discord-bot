const { RichEmbed } = require("discord.js");
const GoogleImages = require("google-images");

module.exports = async (msg, command) => {
  function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  if (command.length === 1)
    return msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${process.env.PREFIX}images <search term>${"```"}`
    );

  try {
    const client = new GoogleImages(
      "006656072422762840547:aanrhbakns4",
      process.env.GOOGLE_API_KEY
    );
    const query = command.slice(1).join(" ");
    const response = await client.search(query);
    if (response[0] === undefined || response.length === 0)
      throw { name: "customError", message: "Couldn't find image." };

    msg.channel.send(
      new RichEmbed().setImage(response[randomNum(0, response.length)].url)
    );
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    if (error.name === "customError") msg.channel.send(error.message);
  }
};
