const { RichEmbed } = require("discord.js");
const GoogleImages = require("google-images");

module.exports = async (msg, command) => {
  if (command.length === 1)
    return msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${process.env.PREFIX}image <search term>${"```"}`
    );

  const client = new GoogleImages(
    "006656072422762840547:aanrhbakns4",
    process.env.GOOGLE_API_KEY
  );
  const query = command.slice(1).join(" ");

  try {
    const response = await client.search(query);
    if (response[0] === undefined || response.length === 0)
      return await msg.channel.send("Couldn't find image.");

    const embed = new RichEmbed().setImage(response[0].url);
    msg.channel.send(embed);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    msg.channel.send("Couldn't find image.");
  }
};
