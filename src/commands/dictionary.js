const axios = require("axios");

//FIXME: It's broken

module.exports = async (msg, command) => {
  if (command.length === 1 || command.length > 2 || !isNaN(command[1]))
    return msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${process.env.PREFIX}dictionary <word>${"```"}`
    );

  const BASE_URL = "https://googledictionaryapi.eu-gb.mybluemix.net/?define=";
  const query = command[1];
  const URL = `${BASE_URL}${query}`;
  let nouns, adjectives, verbs;

  try {
    const response = await axios.get(URL);

    if (!response) return;

    nouns =
      response.data.meaning.noun !== undefined
        ? response.data.meaning.noun.map(
            (el, index) =>
              `**Definition #${index + 1}: ** ${el.definition}
${el.example !== undefined ? "    **Example: **" + el.example : ""}
${
  el.synonyms !== undefined ? "    **Synonyms: **" + el.synonyms.join(", ") : ""
}
`
          )
        : "";

    adjectives =
      response.data.meaning.adjective !== undefined
        ? response.data.meaning.adjective.map(
            (el, index) =>
              `**Definition #${index + 1}: ** ${el.definition}
${el.example !== undefined ? "    **Example: **" + el.example : ""}
${
  el.synonyms !== undefined ? "    **Synonyms: **" + el.synonyms.join(", ") : ""
}
`
          )
        : "";

    verbs =
      response.data.meaning.verb !== undefined
        ? response.data.meaning.verb.map(
            (el, index) =>
              `**Definition #${index + 1}: ** ${el.definition}
${el.example !== undefined ? "    **Example: **" + el.example : ""}
${
  el.synonyms !== undefined ? "    **Synonyms: **" + el.synonyms.join(", ") : ""
}
`
          )
        : "";

    //NOUNS
    if (nouns.length !== 0) {
      await msg.channel.send("===\n**Nouns:**\n===");

      nouns.forEach(async noun => {
        await msg.channel.send(noun + "\n");
      });
    }

    //ADJECTIVES
    if (adjectives.length !== 0) {
      await msg.channel.send("===\n**Adjectives:**\n===");

      adjectives.forEach(async adjective => {
        await msg.channel.send(adjective + "\n");
      });
    }

    //VERBS
    if (verbs.length !== 0) {
      await msg.channel.send("===\n**Verbs:**\n===");

      verbs.forEach(async verb => {
        await msg.channel.send(verb + "\n");
      });
    }

    msg.channel.send("===");
  } catch (err) {
    console.log(err);
    msg.channel.send("Definition not found.");
  }
};
