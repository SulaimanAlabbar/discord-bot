const axios = require("axios");

module.exports = async (msg, command) => {
  if (command.length > 3 || (command.length === 2 && !isNaN(command[1])))
    return msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${
        process.env.PREFIX
      }urban <word> <definition number [optional]>${"```"}`
    );

  const BASE_URL = "http://api.urbandictionary.com/v0/define?term=";
  const query = command[1];
  const URL = `${BASE_URL}${query}`;
  let definitionNum =
    command.length === 2 || Number(command[2]) <= 1 ? 1 : Number(command[2]);

  try {
    const response = await axios.get(URL);
    if (response.data.list === undefined || response.data.list.length === 0)
      throw { name: "customError", message: "Definition not found." };

    if (definitionNum > response.data.list.length)
      definitionNum = response.data.list.length;

    const definition =
      `**Definition #${definitionNum} out of ${
        response.data.list.length
      }: **\n` +
      response.data.list[definitionNum - 1].definition +
      (response.data.list[definitionNum - 1].example !== ""
        ? `\n\n**Example: **${response.data.list[definitionNum - 1].example}`
        : "");

    msg.channel.send(definition);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    if (error.name === "customError") msg.channel.send(error.message);
  }
};
