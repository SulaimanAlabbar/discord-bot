const commands = require("./commands");

module.exports = function(com) {
  switch (com.command.name) {
    case "server info":
      commands.serverInfo(com);
      break;
    case "user info":
      commands.userInfo(com);
      break;
    case "google":
      commands.googleSearch(com);
      break;
    case "first google image":
      commands.gim(com);
      break;
    case "random google image":
      commands.gis(com);
      break;
    case "youtube":
      commands.youtube(com);
      break;
    case "dictionary":
      commands.dictionary(com);
      break;
    case "urban":
      commands.urban(com);
      break;
    case "metal tier list":
      commands.metalTierList(com);
      break;
    case "metal archives":
      commands.metallum(com);
      break;
    case "lyrics":
      commands.lyrics(com);
      break;
    case "quran":
      commands.quran(com);
      break;
    case "bible":
      commands.bible(com);
      break;
    case "dice":
      commands.dice(com);
      break;
    case "log":
      commands.log(com);
      break;
    case "leaderboard":
      commands.leaderboard(com);
      break;
    case "yt":
      commands.yt(com);
      break;
    default:
      break;
  }
};
