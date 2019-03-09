const { RichEmbed } = require("discord.js");

module.exports = async (msg, command, dbPool) => {
  const badInput = () =>
    msg.channel.send(
      `${msg.member}
      ${"```"}Usage: 
${process.env.PREFIX}quote
${process.env.PREFIX}quote @user
${process.env.PREFIX}quote @user <number>
${"```"}`
    );

  function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const cmnd = [...command]
    .slice(1)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  let quote,
    userId,
    userQuotes,
    randomQuoteIndex,
    currentUserQuoteIndex,
    discordAccount,
    heavyAccount;

  const client = await dbPool.connect();

  try {
    const response = await client.query(
      `SELECT member_id, quote, quote_date
      FROM quotes
      ORDER BY quotes.quote_date;`
    );

    if (response.rows.length === 0)
      throw { name: "customError", message: "Couldn't find quote." };

    if (cmnd[0] === "") {
      randomQuoteIndex = randomNum(0, response.rows.length);
      userId = response.rows[randomQuoteIndex].member_id;
      quote = response.rows[randomQuoteIndex].quote;
      userQuotes = response.rows.filter(q => q.member_id === userId);
      discordAccount = await msg.client.fetchUser(userId);
      heavyAccount = await msg.guild.fetchMember(userId);
      currentUserQuoteIndex = userQuotes.findIndex(q => q.quote === quote);
    } else if (cmnd.length === 1) {
      userId = cmnd[0].replace(/[<>@#!]/g, "");
      userQuotes = response.rows.filter(q => q.member_id === userId);
      if (userQuotes.length === 0)
        throw { name: "customError", message: "User has no quotes." };
      randomQuoteIndex = randomNum(0, userQuotes.length);
      quote = userQuotes[randomQuoteIndex].quote;
      discordAccount = await msg.client.fetchUser(userId);
      heavyAccount = await msg.guild.fetchMember(userId);
      currentUserQuoteIndex = userQuotes.findIndex(q => q.quote === quote);
    } else if (cmnd.length === 2) {
      if (isNaN(cmnd[1])) return badInput();
      currentUserQuoteIndex = Number(cmnd[1]) - 1;

      userId = cmnd[0].replace(/[<>@#!]/g, "");
      userQuotes = response.rows.filter(q => q.member_id === userId);
      if (userQuotes.length === 0)
        throw { name: "customError", message: "User has no quotes." };

      if (currentUserQuoteIndex <= 0) currentUserQuoteIndex = 0;
      if (currentUserQuoteIndex > userQuotes.length)
        currentUserQuoteIndex = userQuotes.length - 1;
      quote = userQuotes[currentUserQuoteIndex].quote;
      discordAccount = await msg.client.fetchUser(userId);
      heavyAccount = await msg.guild.fetchMember(userId);
    } else badInput();

    msg.channel.send(
      new RichEmbed()
        .setThumbnail(discordAccount.avatarURL)
        .setColor(heavyAccount.displayHexColor)
        .setDescription(quote)
        .setAuthor(discordAccount.username)
        .setFooter(`${currentUserQuoteIndex + 1}/${userQuotes.length}`)
    );
  } catch (error) {
    console.log(new Date().toTimeString());
    console.error(error);
    if (error.name === "customError") msg.channel.send(error.message);
  } finally {
    client.release();
  }
};
