const axios = require("axios");
const config = require("../config");
const { prefix } = require("../config");
const { CommandError } = require("../helpers/errors");

module.exports = async (msg, args) => {
  if (args.length === 0)
    return msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${prefix}youtube search_terms${"```"}`
    );

  const baseUrl = "https://www.googleapis.com/customsearch/v1?q=";
  const query = args.join("+");
  const apiKey = config.googleSearchApiKey;
  const apiCx = config.googleYoutubeApiCx;
  const URL = `${baseUrl}${query}&key=${apiKey}&cx=${apiCx}&num=1`;

  try {
    const response = await axios.get(URL);
    const video = response.data.items[0].link;

    await msg.channel.send(video);
  } catch (error) {
    throw new CommandError("Couldn't find video.", error);
  }
};
