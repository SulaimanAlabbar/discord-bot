const database = require("../../config/database");
const createDatabaseError = require("../../helpers/createDatabaseError");

module.exports = async ({ serverId, memberId }, db = database) => {
  try {
    const response = (await db.query(
      /* SQL */ `
    INSERT INTO
      xps
        (
          server_id,
          member_id
        )
    VALUES
      ($1, $2)
    ON CONFLICT(server_id, member_id) DO NOTHING
    RETURNING
      server_id AS "serverId",
      member_id AS "memberId"`,
      [serverId, memberId]
    )).rows[0];

    if (!response) return null;

    return response;
  } catch (error) {
    throw createDatabaseError(error);
  }
};
