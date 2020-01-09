// third-party library
import bcrypt from "bcrypt";

// constant
const SALT_ROUNDS = 17;

/**
 * @desc hashes a password
 * @param {string} password
 */
export const hashPassword = password => {
  return bcrypt.hash(password, SALT_ROUNDS);
};
