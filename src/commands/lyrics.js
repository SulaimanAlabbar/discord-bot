const axios = require("axios");

module.exports = async (msg, command) => {
  const badInput = () =>
    msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${process.env.PREFIX}lyrics <band> / <song>${"```"}`
    );

  if (command.length === 1) return badInput();

  const bandAndSong = command
    .slice(1)
    .join(" ")
    .split("/")
    .map(str => str.trim());

  if (bandAndSong.length !== 2) return badInput();

  const band = bandAndSong[0];
  const song = bandAndSong[1];

  const BASE_URL = "http://www.darklyrics.com/";
  const URL1 = `${BASE_URL}search?q=${(band + " " + song)
    .split(" ")
    .join("+")}`;

  try {
    const response1 = await axios.get(URL1);
    const result1 = response1.data
      .match(/Songs[\s\S]*/gms)
      .map(result => result.match(/((?<=<a href=").*?(?=" target))/gms))[0]
      .filter(result =>
        result.includes(
          band
            .toLowerCase()
            .split(" ")
            .join("")
        )
      );

    const trackNumber = result1[0].match(/(?<=#).*/g)[0];
    const URL2 = `${BASE_URL}${result1[0]}`;
    const response2 = await axios.get(URL2);
    const result2 = response2.data
      .match(
        new RegExp(
          `((?<=<h3><a name="${trackNumber}">).*?(?=(<h3>|<div)))`,
          "gms"
        )
      )[0]
      .replace(/<\/a>|<\/h3>|<br \/>|<i>|<\/i>/gms, "")
      .split("\n");

    const linesPerMessage = 15;
    let index = 0;
    await msg.channel.send("===");
    while (true) {
      if (index > result2.length - linesPerMessage) {
        msg.channel.send(
          result2.slice(index, index + (result2.length - index))
        );
        break;
      } else {
        await msg.channel.send(result2.slice(index, index + linesPerMessage));
        index = index + linesPerMessage;
      }
    }
    msg.channel.send("===");
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    msg.channel.send("Lyrics not found.");
  }
};
