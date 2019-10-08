import { Client } from "pg";

const client = new Client();
client.connect();

const roleController = {
  createRole(req, res) {
    return res.send({
      status: "Reached here"
    });
  },
  getRoles(req, res) {
    client.query("select * from role order by id asc", (err, result) => {
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
