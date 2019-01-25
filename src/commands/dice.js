async function dice({ msg }) {
  const diceResults = [
    ":one:",
    ":two:",
    ":three:",
    ":four:",
    ":five:",
    ":six:"
  ];
  function getRndInteger(min, max) {
    return diceResults[Math.floor(Math.random() * (max - min + 1)) + min - 1];
  }
  await msg.channel.send("....:game_die:\t        :thinking:");
  await msg.channel.send("........:game_die:\t    :worried:");
  await msg.channel.send("............:game_die:\t:cold_sweat:");
  await msg.channel.send(
    `:game_die::game_die::game_die:\n:game_die:${getRndInteger(
      1,
      6
    )}:game_die:\n:game_die::game_die::game_die:`
  );
}

module.exports = dice;
