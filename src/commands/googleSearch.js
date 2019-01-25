const google = require("google");

async function googleSearch({ msg, props }) {
  const query = `${props[0]} ${props[1]}`;
  google.resultsPerPage = 2;
  var nextCounter = 0;

  try {
    google(query, async function(err, res) {
      if (err) {
        console.log(new Date().toTimeString());
        console.error(err);
        await msg.channel.send("Search didn't yield results.");
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
  }
}

module.exports = googleSearch;
