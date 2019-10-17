const calculateLevel = require("../util/calculateLevel");
const updateXp = require("../database/queries/updateXp");
const levelUpMessage = require("../util/levelUpMessage");

module.exports = async msg => {
  const serverId = msg.guild.id;
  const memberId = msg.author.id;

  try {
    const addedXp = await updateXp({ serverId, memberId });

    if (!addedXp) return;

    const oldXp = addedXp.xp - 20;
    const newXp = addedXp.xp;

    const oldLevel = calculateLevel(oldXp);
    const newLevel = calculateLevel(newXp);

    if (newLevel === oldLevel) return;

    await msg.channel.send(`${msg.author} You leveled Up!`);
    await msg.channel.send(levelUpMessage(newLevel));
  } catch (error) {
    const newError = new Error();
    newError.cause = error;
    throw newError;
  }
};
