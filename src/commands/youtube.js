const axios = require("axios");
const botConfig = require("../../botConfig.json");

async function youtube({ msg, props }) {
  const BASE_URL = "https://www.googleapis.com/customsearch/v1?q=";
  const cx = "006656072422762840547:kixui82vfbg";
  const API_KEY = botConfig.googleApiKey;
  const query = props.join("+");
  const URL = `${BASE_URL}${query}&cx=${cx}&num=1&key=${API_KEY}`;

  try {
    const response = await axios.get(URL);
    if (response.data.items === undefined || response.data.items.length === 0) {
      await msg.channel.send("Couldn't find video.");
      return;
    }
    await msg.channel.send(response.data.items[0].link);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    await msg.channel.send("Couldn't find video.");
  }
}

module.exports = youtube;
