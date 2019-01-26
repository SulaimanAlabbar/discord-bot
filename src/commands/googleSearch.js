const google = require("google");

module.exports = async (msg, command) => {
  if (command.length === 1)
    return msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${process.env.PREFIX}google <search terms>${"```"}`
    );

  const query = command.slice(1).join(" ");
  google.resultsPerPage = 2;
  var nextCounter = 0;

  try {
    google(query, async function(err, res) {
      if (err) {
        console.log(new Date().toTimeString());
        console.error(err);
        return msg.channel.send("Search didn't yield results.");
      }

      for (var i = 0; i < res.links.length; ++i) {
        var link = res.links[i];
        if (link.href !== null && link.title !== null) {
          await msg.channel.send(link.title + " - " + `<${link.href}>\n`);
        }
      }

      if (nextCounter < 1) {
        nextCounter += 1;
        if (res.next) res.next();
      }
    });
  } catch (error) {
    console.log(new Date().toTimeString());
    console.error(error);
    msg.channel.send("Search didn't yield results.");
  }
};
