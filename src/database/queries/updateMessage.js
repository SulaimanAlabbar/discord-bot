const database = require("../../config/database");
const createDatabaseError = require("../../helpers/createDatabaseError");

module.exports = async ({ id, message }, db = database) => {
  try {
    const response = (await db.query(
      /* SQL */ `
    UPDATE
      messages
    SET
      message = $2,
      updated_at = NOW()
    WHERE
      id = $1`,
      [id, message]
    )).rows[0];

    if (!response) return null;

    return response;
  } catch (error) {
    throw createDatabaseError(error);
  }
};
