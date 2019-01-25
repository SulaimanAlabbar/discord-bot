const { Client } = require("pg");
let constants = require("../constants");
const calculateLevel = require("../calculateLevel");

async function databaseUpdate(databaseUpdateInterval) {
  setInterval(async () => {
    try {
      let membersXp = [...constants.membersXpTemp];
      constants.membersXpTemp = [];
      constants.databaseReady = false;
      const database = new Client({
        user: "heavybot",
        host: "localhost",
        database: "heavydb",
        password: "heavybot123",
        port: 5432
      });
      await database.connect();

      for (const member of membersXp) {
        await database.query(
          `INSERT INTO stats 
(id, xp) VALUES ('${member.discordId}', ${member.xp}) 
ON CONFLICT (id) DO UPDATE SET xp = stats.xp + ${member.xp}`
        );
      }

      let members = await database.query(`SELECT * FROM stats`);

      constants.membersXp = [];
      members.rows.forEach(member =>
        constants.membersXp.push({
          discordId: member.id,
          xp: member.xp,
          level: calculateLevel(member.xp)
        })
      );

      await database.end();
      constants.databaseReady = true;
    } catch (error) {
      console.log(new Date().toTimeString());
      console.log(error);
    }
  }, databaseUpdateInterval);
}

module.exports = databaseUpdate;
