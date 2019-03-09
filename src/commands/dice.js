module.exports = async msg => {
  const diceResults = [
    ":one:",
    ":two:",
    ":three:",
    ":four:",
    ":five:",
    ":six:"
  ];

  function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  await msg.channel.send("....:game_die:\t        :thinking:");
  await msg.channel.send("........:game_die:\t    :worried:");
  await msg.channel.send("............:game_die:\t:cold_sweat:");
  await msg.channel.send(
    `:game_die::game_die::game_die:\n:game_die:${
      diceResults[randomNum(0, 6)]
    }:game_die:\n:game_die::game_die::game_die:`
  );
};
