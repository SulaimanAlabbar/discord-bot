const axios = require("axios");

module.exports = async (msg, command) => {
  const badInput = () =>
    msg.channel.send(
      `${msg.member}
    ${"```"}Usage: ${process.env.PREFIX}dla <band> / <album>${"```"}`
    );

  const formatter = str =>
    str
      .toLowerCase()
      .trim()
      .replace(/[\.\ \:\-\'\!\,]/g, "_")
      .replace(/[_]+/g, "_")
      .replace(/^[_]+|[_]+$/g, "");

  if (command.length === 1) return badInput();

  const onlyBand = !command
    .slice(1)
    .join(" ")
    .includes("/");

  const bandAndAlbum = onlyBand
    ? false
    : command
        .slice(1)
        .join(" ")
        .split("/");

  if (!onlyBand && bandAndAlbum.length !== 2) return badInput();

  const band = onlyBand
    ? formatter(command.slice(1).join(" "))
    : formatter(bandAndAlbum[0]);
  const album = onlyBand ? false : formatter(bandAndAlbum[1]);
  const BASE_URL = "https://darklegionsarchive.neocities.org/metal";
  const DLA_URL = onlyBand
    ? `${BASE_URL}/${band}`
    : `${BASE_URL}/${band}/#${album}`;
  try {
    axios.get(DLA_URL);
    msg.channel.send(DLA_URL);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    msg.channel.send("Couldn't find band or album.");
  }
};
