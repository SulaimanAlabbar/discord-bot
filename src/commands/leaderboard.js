const { RichEmbed } = require("discord.js");
const { CommandError } = require("../helpers/errors");
const getXp = require("../database/queries/getXp");
const calculateLevel = require("../util/calculateLevel");

module.exports = async msg => {
  try {
    const xps = await getXp({ serverId: msg.guild.id });

    if (!xps) {
      await msg.channel.send("Couldn't return leaderboard.");
      return;
    }

    const header = [
      `${"```py\n"}Rank | Member                 | LvL | XP${"```"}`
    ];

    const board = xps
      .map((xp, index) => {
        const level = calculateLevel(xp.xp).toString();
        const newXp = xp.xp.toString();
        const name =
          xp.member.length > 20 ? `${xp.member.slice(0, 17)}...` : xp.member;
        return {
          rank: index < 9 ? `0${index + 1}` : `${index + 1}`,
          xp: newXp.length === 7 ? newXp : newXp + " ".repeat(7 - level.length),
          level:
            level.length === 3 ? level : level + " ".repeat(3 - level.length),
          name: name.length === 20 ? name : name + " ".repeat(20 - name.length)
        };
      })
      .map(
        row =>
          `${"```py\n"} ${row.rank} ➤ ${row.name}${" ".repeat(
            22 - row.name.length
          )} | ${row.level} | ${row.xp} ${"```"}`
      );

    const leaderBoard = [header, board.join("")].join("");

    await msg.channel.send(
      new RichEmbed()
        .setAuthor("Leaderboard", msg.guild.iconURL)
        .setDescription(leaderBoard)
        .setColor("#ffffff")
    );
  } catch (error) {
    throw new CommandError("Couldn't return leaderboard.", error);
  }
};
