const botConfig = require("../../botConfig");
const axios = require("axios");

async function lyrics({ msg, command, props }) {
  const bandAndSong = props.join(" ");
  const indexOfSeperator = bandAndSong.indexOf("/");

  try {
    if (indexOfSeperator === -1) {
      await msg.channel.send(
        `${msg.author}
${command.name} usage:${"```"}${botConfig.prefix}${command.usage}${"```"}${
          command.name
        } aliases: ${"```"}${command.aliases
          .map(el => botConfig.prefix + el)
          .join(" ")}${"```"}`
      );
      return;
    }

    const band = bandAndSong.slice(0, indexOfSeperator).trim();
    const song = bandAndSong
      .slice(indexOfSeperator + 1, bandAndSong.length)
      .trim();
    const BASE_URL = "http://www.darklyrics.com/";
    const URL1 = `${BASE_URL}search?q=${song.split(" ").join("+")}`;

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

    console.log(result2);

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
    await msg.channel.send("===");
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    await msg.channel.send("Lyrics not found.");
  }
}

module.exports = lyrics;
