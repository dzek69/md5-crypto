import crypto from "crypto";

/**
 * Returns md5 hash of given string, TypedArray or DataView using node `crypto` module.
 * @param {string|TypedArray|DataView} string - source data
 * @returns {string} - hash
 *
 * @example md5("hi"); // returns "49f68a5c8493ec2c0bf489821c21fc3b"
 */
const md5 = string => crypto.createHash("md5").update(string).digest("hex");

export default md5;
