// database connection
import pool from "../../../db/connection";

// sql query string
import { getAll, createUser } from "../../../db/query";

// middleware
import { userSchema } from "../../../utils/schemaValidation";

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
    let result;
    try {
      const { error } = userSchema.validate({ ...body });
      if (error) {
        return res.status(401).send({
          message: "Invalid Input.",
          error: error.details[0].message
        });
      } else {
        result = await pool.query(createUser(body));
      }
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
      return res.status(404).send({
        message: "Error encountered.",
        err
      });
    }
    return res.status(200).send({
      message: "All users retrieved successfully.",
      users: result.rows
    });
  },
  async deleteUser(req, res) {}
};

export default userController;
