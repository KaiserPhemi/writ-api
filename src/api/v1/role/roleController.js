// database connection
import pool from "../../../db/connection";

// queries
import { getAll } from "../../../db/query";

const tableName = "role";

const roleController = {
  createRole(req, res) {
    const { title, description } = req.body;
    pool.query(
      `insert into role (title, description) values(${title}, ${description})`,
      (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Role not created",
            error: err
          });
        }
        return res.status(200).send({
          message: "Role created",
          result
        });
      }
    );
  },
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
      data: result.rows
    });
  }
};

export default roleController;
