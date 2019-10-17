const database = require("../../config/database");
const createDatabaseError = require("../../helpers/createDatabaseError");

module.exports = async ({ serverId, memberId }, db = database) => {
  try {
    const response = (await db.query(
      /* SQL */ `
    UPDATE
      xps
    SET
      xp = xp + 20,
      updated_at = NOW()
    WHERE
      server_id = $1
      AND member_id = $2
      AND (NOW() - updated_at) > time '00:02:00'
    RETURNING
      xp,
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
