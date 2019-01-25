const botConfig = require("../botConfig.json");
const commandsConfig = require("./commandsConfig");

module.exports = function(msg) {
  try{
  function badInput(caller, command) {
    msg.channel.send(
      `${caller}
${command.name} usage:${"```"}${botConfig.prefix}${command.usage}${"```"}${
        command.name
      } aliases: ${"```"}${command.aliases
        .map(el => botConfig.prefix + el)
        .join(" ")}${"```"}`
    );
    return false;
  }

  const caller = msg.member;
  const args = msg.content
    .slice(1)
    .replace(/\s\s+/g, " ")
    .split(" ");

  const command =
    commandsConfig.commands[
      commandsConfig.commands.findIndex(el1 =>
        el1.aliases.some(el2 => el2.toLowerCase() === args[0].toLowerCase())
      )
    ];

  if (!command) {
    msg.channel.send(`${caller} Command does not exist.`);
    return false;
  }

  if (command.strictPropsNumber && args.length - 1 !== command.minNumberOfProps)
    return badInput(caller, command);

  if (args.length - 1 < command.minNumberOfProps)
    return badInput(caller, command);

  const newArgs = args
    .slice(1, 1 + command.minNumberOfProps)
    .concat(args.slice(command.minNumberOfProps + 1).join(" "))
    .filter(el => el !== "");

  if (!newArgs.every((el, index) => new RegExp(command.syntax[index]).test(el)))
    return badInput(caller, command);

  return {
    msg: msg,
    command: command,
    props: newArgs
  };
}
catch(error){
  console.error(error)
}
};

// "^([<][0-9]+[>])$"

//'<@244333150707122177>'
