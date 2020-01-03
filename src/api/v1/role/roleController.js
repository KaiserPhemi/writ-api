// database connection
import pool from "../../../db/connection";

const roleController = {
  createRole(req, res) {
    console.log("got here", req.body);
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
  getRoles(req, res) {
    pool.query("select * from role order by id asc", (err, result) => {
      if (err) {
        return res.status(404).send({
          message: "Roles not found",
          error: err
        });
      }
      return res.status(200).send({
        roles: result,
        message: "All roles"
      });
    });
  }
};

export default roleController;
