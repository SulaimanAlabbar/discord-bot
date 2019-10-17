const database = require("../../config/database");
const createDatabaseError = require("../../helpers/createDatabaseError");

module.exports = async ({ id, name }, db = database) => {
  try {
    const response = (await db.query(
      /* SQL */ `
    INSERT INTO
      servers
        (
          id,
          name
        )
    VALUES
      ($1, $2)
    ON CONFLICT(id) DO NOTHING
    RETURNING
      id AS "id"`,
      [id, name]
    )).rows[0];

    if (!response) return null;

    return response;
  } catch (error) {
    throw createDatabaseError(error);
  }
};
