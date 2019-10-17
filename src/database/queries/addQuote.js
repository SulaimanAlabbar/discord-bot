const database = require("../../config/database");
const createDatabaseError = require("../../helpers/createDatabaseError");

module.exports = async ({ serverId, memberId, quote }, db = database) => {
  try {
    const response = (await db.query(
      /* SQL */ `
    INSERT INTO
      quotes
        (
          server_id,
          member_id,
          quote
        )
    VALUES
      ($1, $2, $3)
    RETURNING
      quote,
      server_id AS "serverId",
      member_id AS "memberId"`,
      [serverId, memberId, quote]
    )).rows[0];

    if (!response) return null;

    return response;
  } catch (error) {
    throw createDatabaseError(error);
  }
};
