const constants = require("../constants");
const { RichEmbed } = require("discord.js");

async function leaderboard({ msg }) {
  function sorter(a, b) {
    return b.xp - a.xp;
  }
  if (!constants.databaseReady) {
    await msg.channel.send(
      "Database not yet loaded. Try again in a few seconds."
    );
    return;
  }

  let members = [];
  const serverIcon = msg.guild.iconURL;
  let description = "";
  let symbols1 = [
    "🐪",
    "🐵",
    "🦊",
    "🐇",
    "🐔",
    "🐸",
    "🐴",
    "🐶",
    "🐢",
    "🐷",
    "🐭",
    "🐘",
    "🦉",
    "🦅",
    "🕊️"
  ];
  let symbols2 = "💩";

  try {
    for (let i = 0; i < constants.membersXp.length; i++) {
      const user = await msg.client.fetchUser(constants.membersXp[i].discordId);

      members.push({
        name: user.username,
        xp: constants.membersXp[i].xp,
        level: constants.membersXp[i].level
      });
    }

    members = members.sort(sorter);

    const indexOfKalvin = members.findIndex(
      member => member.name === "Deleted User 941f6ec8"
    );

    members = [
      ...members.slice(0, indexOfKalvin),
      {
        ...members[indexOfKalvin],
        name: "Kalvin"
      },
      ...members.slice(indexOfKalvin + 1)
    ];

    for (let index = 0; index < 30 && index < members.length; index++) {
      description = description.concat(
        `${"``"}
        ${index < 9 ? `0${index + 1}` : `${index + 1}`} ${
          index <= 14 ? symbols1[index] : symbols2
        } ➤ ${members[index].name} | Level: ${members[index].level} | XP: ${
          members[index].xp
        }${"``"}\n`
      );
    }

    const embed = new RichEmbed()
      .setAuthor("Heavy Leaderboard", serverIcon)
      .setDescription(description)
      .setColor("#ffffff");

    await msg.channel.send(embed);
  } catch (error) {
    console.log(error);
  }
}

module.exports = leaderboard;
