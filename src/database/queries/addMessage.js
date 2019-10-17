const database = require("../../config/database");
const createDatabaseError = require("../../helpers/createDatabaseError");

module.exports = async (
  { id, channelId, memberId, message },
  db = database
) => {
  try {
    const response = (await db.query(
      /* SQL */ `
    INSERT INTO
      messages
        (
          id,
          channel_id,
          member_id,
          message
        )
    VALUES
      ($1, $2, $3, $4)`,
      [id, channelId, memberId, message]
    )).rows[0];

    if (!response) return null;

    return response;
  } catch (error) {
    throw createDatabaseError(error);
  }
};
