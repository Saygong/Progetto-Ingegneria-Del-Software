/**
 * Returns the string version of the provided object,
 * beautified for readability.
 * @param object {Object}
 */
export function stringify(object) {
    return JSON.stringify(object, null, 4)
}