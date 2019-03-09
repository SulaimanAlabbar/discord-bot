const axios = require("axios");

module.exports = async (msg, command) => {
  const badInput = () =>
    msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${
        process.env.PREFIX
      }quran <surrah number> / <verse number>${"```"}`
    );

  if (command.length === 1) return badInput();

  const chapterAndVerse = command
    .slice(1)
    .join(" ")
    .split("/")
    .map(str => str.trim());

  if (chapterAndVerse.length !== 2) return badInput();

  const chapter = chapterAndVerse[0];
  const verse = chapterAndVerse[1];

  if (isNaN(chapter) || isNaN(verse)) return badInput();

  const BASE_URL = "http://api.alquran.cloud/ayah/";
  const URL = `${BASE_URL}${chapter}:${verse}/en.asad`;

  try {
    const response = await axios.get(URL);

    if (response.data.data === undefined || response.data.data.length === 0)
      throw { name: "customError", message: "Band not found." };

    msg.channel.send(
      `**Quran [${chapter}:${verse}]: **\n` + response.data.data.text
    );
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    if (error.name === "customError") msg.channel.send(error.message);
  }
};
