const axios = require("axios");
const { prefix } = require("../config");
const config = require("../config");
const { CommandError } = require("../helpers/errors");

module.exports = async (msg, args) => {
  if (args.length !== 1) {
    await msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${prefix}dictionary word${"```"}`
    );
    return;
  }

  const baseUrl = "https://od-api.oxforddictionaries.com/api/v2/entries/en-us";
  const word = args.join().toLowerCase();
  const apiKey = config.dictionaryApiKey;
  const appId = config.dictionaryAppId;
  const URL = `${baseUrl}/${word}`;

  try {
    const response = await axios.get(URL, {
      headers: {
        app_id: appId,
        app_key: apiKey
      }
    });

    const definitions = response.data.results[0].lexicalEntries[0].entries[0].senses.map(
      (sense, index) => `${index + 1}) ${sense.definitions[0]}`
    );

    await msg.channel.send(definitions);
  } catch (error) {
    throw new CommandError("Couldn't find definition.", error);
  }
};
