const path = require("path");
const { promisify } = require("bluebird");
const fs = require("fs");
const database = require("../../config/database");
const logger = require("../../config/logger");

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const getSqlFilesStr = async () => {
  let sqlFiles = "";
  const concatFolderFiles = async folder => {
    const folderFiles = await readdir(
      path.join(__dirname, `../sql/1568741423743-init/up/${folder}`)
    );

    for await (const file of folderFiles) {
      const sql = await readFile(
        path.join(__dirname, `../sql/1568741423743-init/up/${folder}/${file}`),
        "utf-8"
      );
      sqlFiles = `${sqlFiles}${sql}\n`;
    }
  };

  // EXTENSIONS
  await concatFolderFiles("extensions");
  // FUNCTIONS
  await concatFolderFiles("functions");
  // TABLES
  await concatFolderFiles("tables");
  // VIEWS
  await concatFolderFiles("views");
  // PROCS
  await concatFolderFiles("procs");
  // TRIGGERS
  await concatFolderFiles("triggers");
  // INDICES
  await concatFolderFiles("indices");

  return sqlFiles;
};

module.exports.up = async () => {
  const client = await database.connect();
  try {
    const sql = await getSqlFilesStr();

    await client.query("BEGIN");
    await client.query("CREATE SCHEMA IF NOT EXISTS public");
    await client.query(sql);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error(error);
  } finally {
    await client.release();
  }
};

module.exports.down = async () => {
  const client = await database.connect();
  try {
    const sql = await readFile(
      path.join(__dirname, "../sql/1568741423743-init/down/init-down.sql"),
      "utf-8"
    );

    await client.query("BEGIN");
    await client.query(sql);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error(error);
  } finally {
    await client.release();
  }
};

module.exports.description = "V1.0";
