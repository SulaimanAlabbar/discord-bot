let constants = require("./constants");
const calculateLevel = require("./calculateLevel");

module.exports = function(msg) {
  try {
    const indexFirst = constants.membersXp.findIndex(
      member => member.discordId === msg.author.id
    );

    if (indexFirst == -1) return;

    const indexSecond = constants.membersXpTemp.findIndex(
      member => member.discordId === msg.author.id
    );

    const totalXp =
      constants.membersXp[indexFirst].xp +
      constants.membersXpTemp[indexSecond].xp;
    // Instead of having a level property, subtract xp by 20 then pass it as arg to calculateLevel, then compare the two
    if (calculateLevel(totalXp) > constants.membersXp[indexFirst].level) {
      constants.membersXp[indexFirst] = {
        discordId: constants.membersXp[indexFirst].discordId,
        xp: constants.membersXp[indexFirst].xp,
        level: constants.membersXp[indexFirst].level + 1
      };

      const emojiNumbers = [
        ":zero:",
        ":one:",
        ":two:",
        ":three:",
        ":four:",
        ":five:",
        ":six:",
        ":seven:",
        ":eight:",
        ":nine:"
      ];
      let levelEmoji = "";
      constants.membersXp[indexFirst].level
        .toString()
        .split("")
        .forEach(el => {
          levelEmoji = levelEmoji.concat(emojiNumbers[Number(el)]);
        });
      msg.channel.send(`${msg.author} You leveled Up!`);
      msg.channel.send(
        ":regional_indicator_l::regional_indicator_e::regional_indicator_v::regional_indicator_e::regional_indicator_l:" +
          levelEmoji
      );
    }
  } catch (error) {
    console.log(new Date().toTimeString());
    console.error(error);
  }
};
