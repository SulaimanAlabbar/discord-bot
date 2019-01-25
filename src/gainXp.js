let constants = require("./constants");

function gainXp(msg) {
  try {
    const currentTime = new Date().getTime();

    const index = constants.membersXpTemp.findIndex(
      member => member.discordId === msg.author.id
    );

    if (index === -1) {
      constants.membersXpTemp.push({
        discordId: msg.author.id,
        xp: constants.messageXp,
        lastMessageTime: currentTime
      });
    } else if (
      currentTime - constants.membersXpTemp[index].lastMessageTime >
      constants.cooldownXp
    ) {
      constants.membersXpTemp[index] = {
        discordId: constants.membersXpTemp[index].discordId,
        xp: constants.membersXpTemp[index].xp + constants.messageXp,
        lastMessageTime: currentTime
      };
    }
  } catch (error) {
    console.log(new Date().toTimeString());
    console.error(error);
  }
}

module.exports = gainXp;
