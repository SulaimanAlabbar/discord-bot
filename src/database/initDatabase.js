//const mysql = require("mysql2");
const databaseUpdate = require("./databaseUpdate");
let constants = require("../constants");
const calculateLevel = require("../calculateLevel");
const { Client } = require("pg");

async function initDatabase() {
  try {
    constants.databaseReady = false;
    const database = new Client({
      user: "heavybot",
      host: "localhost",
      database: "heavydb",
      password: "heavybot123",
      port: 5432
    });
    await database.connect();

    let members = await database.query(`SELECT * FROM stats`);

    members.rows.forEach(member => {
      constants.membersXp.push({
        discordId: member.id,
        xp: member.xp,
        level: calculateLevel(member.xp)
      });
    });
    await database.end();
    constants.databaseReady = true;
    databaseUpdate(constants.databaseUpdateInterval);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.error(error);
  }
}

module.exports = initDatabase;
