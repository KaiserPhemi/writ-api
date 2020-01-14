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

/**
 * @desc  checks for valid password
 * @param {string} password 
 * @param {string} hashedPwd 
 */
export const comparePassword = (password, hashedPwd) => { 
  console.log('we here', password, hashedPwd)
  return bcrypt.compare(password, hashedPwd);
};
