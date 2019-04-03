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
        return res
          .status(201)
          .send({
            message: 'Role created succesfully',
            role,
          });
      })
      .catch((err) => {
        if (!req.body.title || !req.body.description) {
          return res
            .status(400)
            .send({
              message: 'Please state a valid role title & description',
            })
        }
        return res
          .status(500)
          .send({
            message: err
          })
      });
  },

  /**
   * @desc updates a single role
   * @param {object} req
   * @param {object} res
   */
  updateRole(req, res) {
    db.Role
      .findByPk(req.params.id)
      .then(role => {
        if (!role) {
          return res
            .status(404)
            .send({
              message: `Role with id: ${req.params.id} not found`
            });
        }
        return role
          .update(req.body, { where: { id: req.params.id } })
          .then(role => {
            return res
              .status(200)
              .send({
                message: 'Role was updated successfully.',
                role
              });
          })
          .catch(err => {
            return res
              .status(500)
              .send({
                message: err
              })
          })
      })
      .catch(err => {
        if (!err) {
          return res
            .status(404)
            .send({
              message: `Role with id: ${request.params.id} not found`
            });
        }
        return res
          .status(500)
          .send({
            message: err
          });
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
        return res
          .status(200)
          .send({
            message: 'All roles retrieved successfully!',
            roles
          });
      })
      .catch(err => {
        return res
          .status(500)
          .send({
            message: err,
          });
      });
  },

  /**
   * @desc gets a single role from the db
   * @param {object} req
   * @param {object} res
   */
  getRole(req, res) {
    db.Role
      .findById(req.params.id)
      .then(role => {
        if (!role) {
          return res
            .status(404)
            .send({
              message: 'Role does not exist.'
            });
        }
        return res
          .status(200)
          .send({
            message: 'Role was retrieved successfully.',
            role
          });
      })
      .catch(err => {
        return res
          .status(500)
          .send({
            message: err
          });
      });
  },

  /**
   * @desc deletes a role
   * @param {object} req
   * @param {object} res
   */
  deleteRole(req, res) {
    db.Role
      .findByPk(req.params.id)
      .then(role => {
        if (!role) {
          return res
            .status(404)
            .send({
              message: `Role with id: ${req.params.id} not found`
            });
        }
        const deletedRole = role;
        role.destroy()
          .then(() => {
            return res
              .status(200)
              .send({
                message: 'Role was deleted successfully.',
                deletedRole,
              });
          });
      });
  },
};

export default roleController;
