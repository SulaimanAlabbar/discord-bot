const calculateLevel = require("./calculateLevel");

module.exports = async (msg, dbPool) => {
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

  const client = await dbPool.connect();

  try {
    const response = await client.query(
      `INSERT INTO stats (id) VALUES ($1)
      ON CONFLICT (id)
      DO UPDATE SET xp = stats.xp + 20, last_msg = NOW()
      WHERE (EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM stats.last_msg)) >= 120
      RETURNING xp`,
      [msg.author.id]
    );

    if (response.rows.length === 0) return;

    const newLevel = calculateLevel(response.rows[0].xp);
    const oldLevel = calculateLevel(response.rows[0].xp - 20);

    if (newLevel === oldLevel) return;

    let levelEmoji = "";
    newLevel
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
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};
