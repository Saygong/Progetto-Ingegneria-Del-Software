import chalk from "chalk";

/**
 * Returns the string version of the provided object,
 * beautified for readability.
 * @param object {Object}
 */
export function stringify(object) {
    return JSON.stringify(object, null, 4)
}

function logInternal(message, source) {
    let sourceClass = "";
    if (source !== null && source !== undefined) {
        sourceClass = `[${source.constructor.name}] `;
    }

    console.log(`${sourceClass}${message}`);
}

const traceMessageBuilder = chalk.bold.white;
const infoMessageBuilder = chalk.bold.hex("#1f4e99"); // blue
const warningMessageBuilder = chalk.bold.hex("#ffa500"); // orange
const errorMessageBuilder = chalk.bold.hex("#8f242e"); // red

export const Log = class {
    static trace(message, source=null) {
        logInternal(traceMessageBuilder(`[TRACE] ${message}`), source);
    }

    static info(message, source=null) {
        logInternal(infoMessageBuilder(`[INFO] ${message}`), source);
    }

    static warning(message, source=null) {
        logInternal(warningMessageBuilder(`[WARNING] ${message}`), source);
    }

    static error(message, source=null) {
        logInternal(errorMessageBuilder(`[ERROR] ${message}`), source);
    }
}