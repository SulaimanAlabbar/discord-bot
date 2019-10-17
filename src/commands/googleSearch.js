const axios = require("axios");
const { prefix } = require("../config");
const { CommandError } = require("../helpers/errors");
const config = require("../config");

module.exports = async (msg, args) => {
  if (args.length === 0) {
    await msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${prefix}google search_terms${"```"}`
    );
    return;
  }

  const baseUrl = "https://www.googleapis.com/customsearch/v1?q=";
  const query = args.join("+");
  const apiKey = config.googleSearchApiKey;
  const apiCx = config.googleSearchApiCx;
  const URL = `${baseUrl}${query}&key=${apiKey}&cx=${apiCx}&num=5`;

  try {
    const response = await axios.get(URL);
    const { items } = response.data;

    await msg.channel.send(`
${items[0].title}: <${items[0].link}>
${items[1].title}: <${items[1].link}>
${items[2].title}: <${items[2].link}>
${items[3].title}: <${items[3].link}>
${items[4].title}: <${items[4].link}>
    `);
  } catch (error) {
    throw new CommandError("Search didn't yield results.", error);
  }
};
