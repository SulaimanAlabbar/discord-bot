const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const Discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const fs = require("fs");
const { Pool } = require("pg");
const xp = require("./xp");
const logs = require("./logs");
const errorLogsDir = process.env.ERROR_LOGS_PATH;
const commands = require("./commands");
const mosely = require("./mosely");

if (!fs.existsSync(process.env.LOGS_PATH)) {
  fs.mkdirSync(process.env.LOGS_PATH);
}

if (!fs.existsSync(errorLogsDir)) {
  fs.mkdirSync(errorLogsDir);
}

const filename = path.join(errorLogsDir, "results.log");

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${errorLogsDir}/%DATE%-results.log`,
  datePattern: "YYYY-MM-DD"
});

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.File({ filename }), dailyRotateFileTransport]
});

process.on("uncaughtException", error => {
  logger.log("error", error);
  process.exit(-1);
});

process.on("unhandledRejection", error => {
  logger.log("error", error);
  process.exit(-1);
});

process.on("warning", warning => {
  logger.log("warning", warning);
});

const dbPool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

dbPool.on("error", err => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const bot = new Discord.Client();

bot.on("ready", () => {
  console.log(`HeavyBot online.`);
});

bot.on("message", msg => {
  logs(msg);
  if (msg.author.bot) return;
  xp(msg, dbPool);
  mosely(msg);
  if (msg.content[0] !== process.env.PREFIX) return;
  if (msg.content.length === 1) return;
  if (!new RegExp("^[a-zA-Z]+").test(msg.content[1])) return;

  const command = msg.content.split(" ");

  switch (command[0].slice(1)) {
    case "serverinfo":
      commands.serverInfo(msg);
      break;
    case "userinfo":
      commands.userInfo(msg, command);
      break;
    case "google":
    case "g":
      commands.googleSearch(msg, command);
      break;
    case "image":
    case "gim":
      commands.gim(msg, command);
      break;
    case "images":
    case "gis":
      commands.gis(msg, command);
      break;
    case "youtube":
    case "y":
      commands.youtube(msg, command);
      break;
    case "dictionary":
    case "d":
      commands.dictionary(msg, command);
      break;
    case "urban":
    case "u":
      commands.urban(msg, command);
      break;
    case "mtl":
      commands.metalTierList(msg);
      break;
    case "metallum":
    case "m":
      commands.metallum(msg, command);
      break;
    case "lyrics":
    case "l":
      commands.lyrics(msg, command);
      break;
    case "quran":
    case "q":
      commands.quran(msg, command);
      break;
    case "bible":
    case "b":
      commands.bible(msg, command);
      break;
    case "dice":
    case "die":
    case "roll":
      commands.dice(msg);
      break;
    // case "log":
    //   commands.log(msg, command);
    //   break;
    case "leaderboard":
    case "top":
      commands.leaderboard(msg, dbPool);
      break;
    case "dla":
      commands.dla(msg, command);
      break;
    case "quote":
      commands.quote(msg, command, dbPool);
      break;
    case "addquote":
      commands.addQuote(msg, command, dbPool);
      break;
    default:
      msg.channel.send("Command does not exist.");
      break;
  }
});

bot.on("guildMemberAdd", member => {
  try {
    const channel = member.guild.channels.find(ch => ch.name === "main");
    if (!channel) return;
    channel.send(`Welcome to heavy, ${member}`);
    channel.send(
      new RichEmbed()
        .addField("Metal Tier List", process.env.MTL_SITE, false)
        .addField("Download link", process.env.MTL_DOWNLOAD, false)
        .setImage(process.env.MTL_IMAGE)
        .setThumbnail(member.guild.iconURL)
        .setColor(0xdd0000)
    );
  } catch (error) {
    console.log(new Date().toTimeString());
    console.error(error);
  }
});

bot.on("guildMemberRemove", member => {
  try {
    const channel = member.guild.channels.find(ch => ch.name === "main");
    if (!channel) return;
    channel.send(`**${member}** has left the server.`);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.error(error);
  }
});

bot.login(process.env.TOKEN);
