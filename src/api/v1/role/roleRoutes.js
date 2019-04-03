// third-party libraries
import express from 'express';

// controllers
import roleController from './roleController';

const roleRoutes = express.Router();

// creates or retrieve all roles
roleRoutes.route('/')
  .get(roleController.getAllRoles)
  .post(roleController.createRole);

// updates or deletes a role
roleRoutes.route('/:id')
  .get(roleController.getRole)
  .put(roleController.updateRole)
  .delete(roleController.deleteRole);

export default roleRoutes;
