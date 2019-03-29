// models
import db from '../../../db/models';

// controllers
const roleController = {

  /**
   * @desc creates a new role
   * @param {object} req
   * @param {object} res
   */
  createRole(req, res) {
    db.Role
      .create(req.body)
      .then((role) => {
        res
          .status(201)
          .send({
            message: 'Role created succesfully',
            role,
          })
      })
      .catch((err) => {
        console.log(err);
      });
  },

  /**
   * @desc gets all roles in the table
   * @param {object} req
   * @param {object} res
   */
  getAllRoles(req, res) {
    db.Role
      .findAll()
      .then(roles => {
        res
          .status(200)
          .send({
            message: 'All roles retrieved successfully!',
            roles
          });
      })
      .catch(err => {
        res
          .status(500)
          .send({
            message: err.message,
          });
      });
  }
};

export default roleController;
