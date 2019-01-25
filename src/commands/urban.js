const axios = require("axios");

async function urban({ msg, props }) {
  const BASE_URL = "http://api.urbandictionary.com/v0/define?term=";
  const query = props[0];
  const URL = `${BASE_URL}${query}`;
  let definition,
    definitionNum = props.length === 1 ? 0 : Number(props[1] - 1);

  try {
    const response = await axios.get(URL);
    if (!response) return;

    if (definitionNum > response.data.list.length || definitionNum < 0) {
      await msg.channel.send(`There is no definition #${definitionNum + 1}`);
      return;
    }

    definition =
      `**Definition #${definitionNum + 1} out of ${
        response.data.list.length
      }: **\n` +
      response.data.list[definitionNum].definition +
      (response.data.list[definitionNum].example !== ""
        ? `\n\n**Example: **${response.data.list[definitionNum].example}`
        : "");

    await msg.channel.send(definition);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    await msg.channel.send("Definition not found.");
  }
}

module.exports = urban;
