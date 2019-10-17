const database = require("../../config/database");
const createDatabaseError = require("../../helpers/createDatabaseError");

module.exports = async ({ id, name, serverId }, db = database) => {
  try {
    const response = (await db.query(
      /* SQL */ `
    INSERT INTO
      channels
        (
          id,
          name,
          server_id
        )
    VALUES
      ($1, $2, $3)
    ON CONFLICT(id) DO NOTHING
    RETURNING
      id AS "id"`,
      [id, name, serverId]
    )).rows[0];

    if (!response) return null;

    return response;
  } catch (error) {
    throw createDatabaseError(error);
  }
};
