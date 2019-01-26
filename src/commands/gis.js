const { RichEmbed } = require("discord.js");
const GoogleImages = require("google-images");

module.exports = async (msg, command) => {
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
      return msg.channel.send("Couldn't find image.");

    const embed = new RichEmbed().setImage(
      response[getRandom(0, response.length - 1)].url
    );
    msg.channel.send(embed);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    msg.channel.send("Couldn't find image.");
  }
};
