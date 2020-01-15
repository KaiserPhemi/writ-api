// third-party library
import Joi from "@hapi/joi";

/**
 * @desc validates the user data for creation of a user
 */
export const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  firstName: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .required(),
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .required(),
  userName: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
  repeatPassword: Joi.ref("password"),
  avatarUrl: Joi.string()
});

/**
 * @desc validates user details for login
 */
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(8)
    .required()
});
