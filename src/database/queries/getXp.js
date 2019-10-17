const database = require("../../config/database");
const createDatabaseError = require("../../helpers/createDatabaseError");

module.exports = async ({ serverId }, db = database) => {
  try {
    const response = (await db.query(
      /* SQL */ `
    SELECT
      members.name AS "member",
      xps.xp
    FROM
      xps
    JOIN members
      ON members.id = xps.member_id
    WHERE
      xps.server_id = $1
    ORDER BY
      xps.xp DESC
    LIMIT
      20`,
      [serverId]
    )).rows;

    if (!response) return null;

    return response;
  } catch (error) {
    throw createDatabaseError(error);
  }
};
