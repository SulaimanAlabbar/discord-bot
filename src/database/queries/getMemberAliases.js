const database = require("../../config/database");
const createDatabaseError = require("../../helpers/createDatabaseError");

module.exports = async ({ serverId, memberId, alias }, db = database) => {
  try {
    if (alias) {
      const response = (await db.query(
        /* SQL */ `
      SELECT
        member_id AS "memberId"
      FROM
        member_aliases
      WHERE
        server_id = $1
        AND alias = $2`,
        [serverId, alias]
      )).rows[0];

      if (!response) return null;

      return response.memberId;
    }

    const response = (await db.query(
      /* SQL */ `
    SELECT
      alias
    FROM
      member_aliases
    WHERE
      server_id = $1
      AND member_id = $2
    ORDER BY
      created_at`,
      [serverId, memberId]
    )).rows;

    if (!response) return null;

    const aliases = response.map(row => row.alias);

    return aliases;
  } catch (error) {
    throw createDatabaseError(error);
  }
};
