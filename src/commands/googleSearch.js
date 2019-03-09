const google = require("google");

module.exports = async (msg, command) => {
  if (command.length === 1)
    return msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${process.env.PREFIX}google <search terms>${"```"}`
    );

  let results = "";
  const query = command.slice(1).join(" ");
  google.resultsPerPage = 7;
  var nextCounter = 0;

  google(query, (err, res) => {
    if (err) {
      console.log(new Date().toTimeString());
      console.error(err);
      return msg.channel.send("Search didn't yield results.");
    }

    for (var i = 0; i < res.links.length; ++i) {
      var link = res.links[i];
      if (link.href !== null && link.title !== null) {
        results += `${link.title} - <${link.href}>\n`;
      }
      if (i + 1 === res.links.length) return msg.channel.send(results);
    }
  });
};
