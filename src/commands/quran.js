const axios = require("axios");

async function quran({ msg, props }) {
  const BASE_URL = "http://api.alquran.cloud/ayah/";
  const query = props[0];
  const URL = `${BASE_URL}${query}/en.asad`;

  try {
    const response = await axios.get(URL);
    await msg.channel.send(
      `**Quran [${props[0]}]: **\n` + response.data.data.text
    );
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    await msg.channel.send("Verse not found.");
  }
}

module.exports = quran;
