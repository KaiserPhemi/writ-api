// third-party libraries
import express from 'express';

// controllers
import roleController from './roleController';

const roleRoutes = express.Router();

// routes
roleRoutes.route('/')
  .get(roleController.getAllRoles)
  .post(roleController.createRole);

export default roleRoutes;
