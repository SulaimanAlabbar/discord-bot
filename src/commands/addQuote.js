module.exports = async (msg, command, dbPool) => {
  const badInput = () =>
    msg.channel.send(
      `${msg.member}
    ${"```"}Usage: 
${process.env.PREFIX}addquote @user "quote"
${"```"}`
    );

  const cmnd = [...command]
    .slice(1)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  if (cmnd.length < 2) return badInput();

  const user = cmnd[0].replace(/[<>@#!]/g, "");
  let quote = cmnd.slice(1).join(" ");

  if (quote[0] !== '"' || quote[quote.length - 1] !== '"') return badInput();

  quote = quote.slice(1, -1);

  const client = await dbPool.connect();

  try {
    const response = await client.query(
      `INSERT INTO quotes(member_id, quote) 
        SELECT CAST($1 as VARCHAR), $2
        from stats s where s.id = $1
        ON CONFLICT (member_id, quote) DO NOTHING returning quote;`,
      [user, quote]
    );

    if (response.rows.length === 0)
      throw { name: "customError", message: "Couldn't add quote." };

    msg.channel.send("Quote added.");
  } catch (error) {
    console.log(new Date().toTimeString());
    console.error(error);
    if (error.name === "customError") msg.channel.send(error.message);
  } finally {
    client.release();
  }
};
