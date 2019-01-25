const commands = [
  {
    name: "server info",
    aliases: ["serverinfo"],
    description: "Displays information about the server.",
    usage: "serverinfo",
    minNumberOfProps: 0,
    strictPropsNumber: true,
    syntax: []
  },
  {
    name: "user info",
    aliases: ["userinfo"],
    description: "Displays information about the user.",
    usage: "userinfo <user>",
    minNumberOfProps: 0,
    strictPropsNumber: false,
    syntax: ["^([<][@][!]*[0-9]+[>])$"]
  },
  {
    name: "google",
    aliases: ["google", "g"],
    description: "Googles.",
    usage: "google <search terms>",
    minNumberOfProps: 1,
    strictPropsNumber: false,
    syntax: []
  },
  {
    name: "first google image",
    aliases: ["image", "gim"],
    description: "Links first google image.",
    usage: "image <search term>",
    minNumberOfProps: 1,
    strictPropsNumber: false,
    syntax: []
  },
  {
    name: "random google image",
    aliases: ["images", "gis"],
    description: "Links a random google image.",
    usage: "images <search term>",
    minNumberOfProps: 1,
    strictPropsNumber: false,
    syntax: []
  },
  {
    name: "youtube",
    aliases: ["youtube", "y"],
    description: "Links youtube video.",
    usage: "youtube <search terms>",
    minNumberOfProps: 1,
    strictPropsNumber: false,
    syntax: []
  },
  {
    name: "dictionary",
    aliases: ["dictionary", "d"],
    description: "Shows dictionary definitions.",
    usage: "dictionary <word>",
    minNumberOfProps: 1,
    strictPropsNumber: true,
    syntax: ["^([a-zA-Z]+)$"]
  },
  {
    name: "urban",
    aliases: ["urban", "u"],
    description: "Shows urban dictionary definitions.",
    usage: "urban <word>",
    // usage: "urban <word> <definition number>",
    minNumberOfProps: 1,
    strictPropsNumber: false,
    syntax: ["^([a-zA-Z]+)$", "^([0-9]+)$"]
  },
  {
    name: "metal tier list",
    aliases: ["mtl"],
    description: "Links Metal Tier List site.",
    usage: "mtl",
    minNumberOfProps: 0,
    strictPropsNumber: true,
    syntax: []
  },
  {
    name: "metal archives",
    aliases: ["metallum", "m"],
    description: "Links metal archives page.",
    usage: "metallum <band>",
    minNumberOfProps: 1,
    strictPropsNumber: false,
    syntax: []
  },
  {
    name: "lyrics",
    aliases: ["lyrics", "l"],
    description: "Fetches lyrics from darklyrics.",
    usage: "lyrics <band> / <song>",
    minNumberOfProps: 3,
    strictPropsNumber: false,
    syntax: []
  },
  {
    name: "quran",
    aliases: ["quran", "q"],
    description: "Fetches quranic verses.",
    usage: "quran <surrah number:verse number>",
    minNumberOfProps: 1,
    strictPropsNumber: true,
    syntax: ["^([0-9]+[:][0-9]+)$"]
  },
  {
    name: "bible",
    aliases: ["bible", "b"],
    description: "Fetches bible verses.",
    usage: "bible <book>:<chapter number>:<verse number>\n.bible books",
    minNumberOfProps: 1,
    strictPropsNumber: false,
    syntax: []
  },
  {
    name: "dice",
    aliases: ["dice", "die", "roll"],
    description: "Rolls dice.",
    usage: "dice",
    minNumberOfProps: 0,
    strictPropsNumber: true,
    syntax: []
  },
  {
    name: "log",
    aliases: ["log"],
    description: "Logs entire channel.",
    usage: "log",
    minNumberOfProps: 1,
    strictPropsNumber: true,
    syntax: ["^(<#([0-9]*)>)$"]
  },
  {
    name: "leaderboard",
    aliases: ["leaderboard", "top"],
    description: "Shows leaderboard.",
    usage: "leaderboard",
    minNumberOfProps: 0,
    strictPropsNumber: false,
    syntax: ["^([0-9]*)$"]
  },
  {
    name: "yt",
    aliases: ["yt"],
    description: "yt",
    usage: "yt",
    minNumberOfProps: 0,
    strictPropsNumber: false,
    syntax: []
  }
];

module.exports.commands = commands;
