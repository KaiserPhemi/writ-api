// database connection
import pool from "../../../db/connection";

// sql query string
import { getAll } from "../../../db/query";

const tableName = "user_account";

/**
 * @desc user controller
 */
const userController = {
  async creatUser(req, res) {},

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
