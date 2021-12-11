const debug = require("debug");

const BASE = "families-share";
const COLOURS = {
  trace: "lightblue",
  info: "blue",
  warn: "pink",
  error: "red"
}; // choose better colours :)

class Log {
  generateMessage = (level, message, source) => {
    // Set the prefix which will cause debug to enable the message
    let base = `${BASE}:${level}`;

    // Add the name of the source's class to make more clear
    // where the message is coming from
    if (source !== undefined && source !== null) {
      base += ` [${source.constructor.name}]`;
    }

    const createDebug = debug(base);

    // Set the colour of the message based on the level
    createDebug.color = COLOURS[level];

    if (source) {
      createDebug(source, message);
    } else {
      createDebug(message);
    }
  };

  trace(message, source) {
    return this.generateMessage("trace", message, source);
  }

  info(message, source) {
    return this.generateMessage("info", message, source);
  }

  warn(message, source) {
    return this.generateMessage("warn", message, source);
  }

  error(message, source) {
    return this.generateMessage("error", message, source);
  }
}

export default new Log();
