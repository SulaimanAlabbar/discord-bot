const axios = require("axios");
const { prefix } = require("../config");
const { CommandError } = require("../helpers/errors");

module.exports = async (msg, args) => {
  const badInput = async () => {
    await msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${prefix}urban word${"```"}`
    );
  };

  if (args.length > 2) return badInput();

  const baseUrl = "http://api.urbandictionary.com/v0/define?term=";
  const word = args.join().toLowerCase();
  let number = args.length === 2 ? args[1] : 1;
  const URL = `${baseUrl}${word}`;

  if (isNaN(number)) return badInput();

  try {
    const response = await axios.get(URL);
    const definitions = response.data.list;

    if (definitions.length < number) {
      number = definitions.length;
    } else if (number <= 0) {
      number = 1;
    }

    await msg.channel.send(
      `**Definition #${number} out of ${definitions.length}:**\n${definitions[number - 1].definition}\n**Example:** ${definitions[number - 1].example}`
    );
  } catch (error) {
    throw new CommandError("Couldn't find definition.", error);
  }
};
