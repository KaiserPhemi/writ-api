// database connection
import pool from "../../../db/connection";

// queries
import { getAll, createRole, deleteRole, getRole } from "../../../db/query";

const tableName = "user_role";

/**
 * @desc role controller
 */
const roleController = {
  /**
   * @desc creates a role
   * @param {object} req
   * @param {object} res
   */
  async createRole(req, res) {
    const { title, description } = req.body;
    let result;
    try {
      result = await pool.query(createRole(title, description));
    } catch (err) {
      if (!title || !description) {
        return res.status(401).send({
          message: "Role title or description cannot be blank."
        });
      }
      return res.status(404).send({
        message: "An error occured. Role not created",
        err
      });
    }
    return res.status(201).send({
      message: "Role created successfully.",
      role: result.rows[0]
    });
  },

  /**
   * @desc retrieves all roles in a table
   * @param {object} req
   * @param {object} res
   */
  async getRoles(req, res) {
    let result;
    try {
      result = await pool.query(getAll(tableName));
    } catch (err) {
      return res.status(404).send({
        message: "An error occured",
        err
      });
    }
    return res.send({
      message: "All roles retrieved successfully.",
      roles: result.rows
    });
  },

  /**
   * @desc updates a role
   * @param {object} req
   * @param {object} res
   */
  async updateRole(req, res) {
    const { id } = req.params;
  },

  /**
   * @desc deletes a role on the table
   * @param {object} req
   * @param {object} res
   */
  async deleteRole(req, res) {
    const { id } = req.params;
    let result;
    let roleExist = await pool.query(getRole(tableName, id));

    if (!roleExist.rows[0]) {
      return res.status(404).send({
        message: "Role does not exist."
      });
    }
    try {
      result = await pool.query(deleteRole(id));
    } catch (err) {
      return res.status(400).send({
        message: "An error occured.",
        err
      });
    }
    return res.status(200).send({
      message: "Role deleted successfully.",
      deletedRole: result.rows[0]
    });
  }
};

export default roleController;
