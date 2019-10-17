const database = require("../../config/database");
const createDatabaseError = require("../../helpers/createDatabaseError");
const knex = require("../../config/knex");

module.exports = async ({ serverId, memberId, quoteNumber }, db = database) => {
  try {
    const quotesMemberId = knex.ref("quotes.member_id");

    const query = knex
      .select("quote", "member_id AS memberId", "created_at AS addedAt")
      .from("quotes")
      .where("server_id", serverId);

    query.select(q => {
      q.select("name AS member")
        .from("members")
        .where("members.id", quotesMemberId);
    });

    query.select(knex.raw('ROW_NUMBER() OVER () as "quoteIndex"'));

    query.select(q => {
      q.count("id AS totalQuotes")
        .from("quotes")
        .where("server_id", serverId);
      if (memberId) {
        q.andWhere("quotes.member_id", memberId);
      }
    });

    if (memberId) {
      query.where("member_id", memberId);
    }

    if (quoteNumber) {
      query.orderBy("created_at", "asc");
    } else {
      query.orderByRaw("RANDOM()");
    }

    query.limit(1);

    if (quoteNumber) {
      query.offset(quoteNumber - 1);
    }

    const response = (await db.query(query.toString())).rows[0];

    if (!response) return null;

    return response;
  } catch (error) {
    throw createDatabaseError(error);
  }
};
