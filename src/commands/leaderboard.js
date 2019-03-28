const { RichEmbed } = require("discord.js");
const calculateLevel = require("../calculateLevel");

module.exports = async (msg, dbPool) => {
  const client = await dbPool.connect();

  let members = [];
  const serverIcon = msg.guild.iconURL;
  let description = "";
  let symbols1 = [
    "🐵",
    "🐪",
    "🦊",
    "🐸",
    "🐔",
    "🐇",
    "🐢",
    "🐶",
    "🐷",
    "🐭",
    "🐴",
    "🐘",
    "🦉",
    "🦅",
    "🦅
  ];
  let symbols2 = "🕊️";

  try {
    const response = await client.query(
      "select id, xp from stats order by xp desc limit 30;"
    );

    for (let index = 0; index < response.rows.length; index++) {
      let memberName = await msg.client.fetchUser(response.rows[index].id);

      members.push({
        name: memberName.username,
        xp: response.rows[index].xp,
        level: calculateLevel(response.rows[index].xp)
      });
    }

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

    msg.channel.send(
      new RichEmbed()
        .setAuthor("Leaderboard", serverIcon)
        .setDescription(description)
        .setColor("#ffffff")
    );
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};
