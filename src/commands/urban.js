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
  const definitionNum =
    command.length === 2 || Number(command[2]) === 0 || Number(command[2]) === 1
      ? 0
      : Number(command[2]);

  try {
    const response = await axios.get(URL);
    if (!response) return;

    if (definitionNum > response.data.list.length || definitionNum < 0)
      return msg.channel.send(`There is no definition #${definitionNum}`);

    const definition =
      `**Definition #${definitionNum} out of ${
        response.data.list.length
      }: **\n` +
      response.data.list[definitionNum].definition +
      (response.data.list[definitionNum].example !== ""
        ? `\n\n**Example: **${response.data.list[definitionNum].example}`
        : "");

    msg.channel.send(definition);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    msg.channel.send("Definition not found.");
  }
};
