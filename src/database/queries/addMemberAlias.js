const database = require("../../config/database");
const createDatabaseError = require("../../helpers/createDatabaseError");

module.exports = async ({ serverId, memberId, alias }, db = database) => {
  try {
    const response = (await db.query(
      /* SQL */ `
    INSERT INTO
      member_aliases
        (
          server_id,
          member_id,
          alias
        )
    VALUES
      ($1, $2, $3)
    ON CONFLICT(server_id, member_id, alias) DO NOTHING
    RETURNING
      id AS "id"`,
      [serverId, memberId, alias]
    )).rows[0];

    if (!response) return null;

    return response;
  } catch (error) {
    throw createDatabaseError(error);
  }
};
