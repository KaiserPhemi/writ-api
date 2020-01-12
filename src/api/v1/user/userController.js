// database connection
import pool from "../../../db/connection";

// sql query string
import { getAll, createUser } from "../../../db/query";

// utilities
import { userSchema } from "../../../utils/schemaValidation";
import { hashPassword } from "../../../utils/encrypt";

const tableName = "user_account";

/**
 * @desc user controller
 */
const userController = {
  /**
   * @desc creates a user
   * @param {object} req
   * @param {object} res
   */
  async createUser(req, res) {
    const { body } = req;
    let hashedPwd;
    let userObject;
    let result;
    const { error } = userSchema.validate({ ...body });
    if (error) {
      return res.status(401)
        .send({
          message: "Invalid Input.",
          error: error.details[0].message
        });
    }
    try {
      hashedPwd = await hashPassword(body.password);
      userObject = await Object.assign({}, body, { password: hashedPwd });
      result = await pool.query(createUser(userObject));
    } catch (err) {
      return res.status(500).send({
        message: "Error encountered. User not created.",
        error: err
      });
    }
    return res.status(201).send({
      message: "User created successfully.",
      user: result.rows
    });
  },

  /**
   * @desc retrieves all users
   * @param {object} req
   * @param {object} res
   */
  async getAllUsers(req, res) {
    let result;
    try {
      result = await pool.query(getAll(tableName));
    } catch (err) {
      return res.status(500).send({
        message: "Error encountered.",
        err
      });
    }
    return res.status(200).send({
      message: "All users retrieved successfully.",
      users: result.rows
    });
  },

  /**
   * @desc deletes a user
   * @param {object} req
   * @param {object} res
   */
  async deleteUser(req, res) { },
  
  /**
   * @desc updates a user
   * @param {object} req
   * @param {object} res
   */
  async updateUser(req,res){}
};

export default userController;
