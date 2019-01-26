const axios = require("axios");

module.exports = async (msg, command) => {
  if (command.length === 1)
    return msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${process.env.PREFIX}youtube <search terms>${"```"}`
    );

  const BASE_URL = "https://www.googleapis.com/customsearch/v1?q=";
  const cx = "006656072422762840547:kixui82vfbg";
  const API_KEY = process.env.GOOGLE_API_KEY;
  const query = command.slice(1).join("+");
  const URL = `${BASE_URL}${query}&cx=${cx}&num=1&key=${API_KEY}`;

  try {
    const response = await axios.get(URL);
    if (response.data.items === undefined || response.data.items.length === 0)
      return msg.channel.send("Couldn't find video.");

    msg.channel.send(response.data.items[0].link);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    msg.channel.send("Couldn't find video.");
  }
};
