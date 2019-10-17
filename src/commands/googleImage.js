const { RichEmbed } = require("discord.js");
const axios = require("axios");
const config = require("../config");
const { prefix } = require("../config");
const { CommandError } = require("../helpers/errors");
const randomNum = require("../util/randomNum");

module.exports = async (msg, args, opts = {}) => {
  if (args.length === 0) {
    await msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${prefix}image search_term${"```"}`
    );
    return;
  }

  const { random } = opts;
  const baseUrl = "https://www.googleapis.com/customsearch/v1?q=";
  const query = args.join("+");
  const apiKey = config.googleImageApiKey;
  const apiCx = config.googleImageApiCx;
  const num = random ? 10 : 1;
  const URL = `${baseUrl}${query}&key=${apiKey}&cx=${apiCx}&searchType=image&num=${num}`;

  try {
    const response = await axios.get(URL);
    const { items } = response.data;
    const image = random ? items[randomNum(0, num - 1)].link : items[0].link;

    await msg.channel.send(new RichEmbed().setImage(image));
  } catch (error) {
    throw new CommandError("ouldn't find image.", error);
  }
};
