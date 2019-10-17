const { openSync, closeSync } = require("fs");
const { resolve } = require("path");
const l0gg3r = require("l0gg3r");

const { transports, serializers } = l0gg3r;
const config = require(".");

let logger;

if (config.mode === "production") {
  const logFile = resolve(config.logsPath, "./logs.log");
  closeSync(openSync(logFile, "a"));

  logger = l0gg3r({
    transports: [
      transports.fileTransport({
        level: "error",
        serializer: serializers.prettyFile(),
        file: logFile
      })
    ]
  });
} else {
  const logFile = resolve(config.logsPath, "./logs.log");
  closeSync(openSync(logFile, "a"));

  logger = l0gg3r({
    transports: [
      transports.consoleTransport({
        level: "debug",
        serializer: serializers.prettyConsole()
      }),
      transports.fileTransport({
        level: "debug",
        serializer: serializers.prettyFile(),
        file: logFile
      })
    ]
  });
}

module.exports = logger;
