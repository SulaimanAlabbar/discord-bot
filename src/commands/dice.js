const randomNum = require("../util/randomNum");

module.exports = async msg => {
  const diceResults = [
    ":one:",
    ":two:",
    ":three:",
    ":four:",
    ":five:",
    ":six:"
  ];

  await msg.channel.send("....:game_die:\t        :thinking:");
  await msg.channel.send("........:game_die:\t    :worried:");
  await msg.channel.send("............:game_die:\t:cold_sweat:");
  await msg.channel.send(
    `:game_die::game_die::game_die:\n:game_die:${
      diceResults[randomNum(0, 5)]
    }:game_die:\n:game_die::game_die::game_die:`
  );
};
