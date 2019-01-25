const botConfig = require("../botConfig.json");
const fs = require("fs");
const Discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const commandHandler = require("./commandHandler");
const verifyCommand = require("./verifyCommand");
const initDatabase = require("./database/initDatabase");
const gainXp = require("./gainXp");
const levelUp = require("./levelUp");
const initLogs = require("./initLogs");
let constants = require("./constants");
const logs = require("./logs");
const site = "https://metaltierlist.github.io/MTL/";
const download = "https://pastebin.com/raw/zDgawtNb";
const MTLImage =
  "https://metaltierlist.github.io/MTL/static/media/MTL.8ab11687.png";

const bot = new Discord.Client();
initDatabase();
initLogs();

bot.on("ready", () => {
  console.log(`HeavyBot online.`);
});

bot.on("message", msg => {
  try {
    logs(msg);
    if (msg.author.bot) return;
    if (
      constants.databaseReady &&
      msg.content.replace(/\s/g, "")[0] !== botConfig.prefix
    ) {
      gainXp(msg);
      levelUp(msg);
    }
    if (!(msg.content.length >= 2)) return;
    if (msg.content[0] !== botConfig.prefix) return;
    if (!(msg.content[1].toLowerCase() != msg.content[1].toUpperCase())) return;
    let command = verifyCommand(msg);
    if (!command) return;
    commandHandler(command);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.error(error);
  }
});

//Welcome Message
bot.on("guildMemberAdd", member => {
  try {
    const embed = new RichEmbed()
      .addField("Metal Tier List", site, false)
      .addField("Download link", download, false)
      .setImage(MTLImage)
      .setThumbnail(member.guild.iconURL)
      .setColor(0xdd0000);

    const channel = member.guild.channels.find(ch => ch.name === "main");
    if (!channel) return;
    channel.send(`Welcome to heavy, ${member}`);
    channel.send(embed);
  } catch (error) {
    console.log(new Date().toTimeString());
    console.error(error);
  }
});

bot.login(botConfig.token);
