// third-party libraries
import express from 'express';
import roleController from '../controllers/roleController';

// router
const roleRouter = express.Router();

roleRouter.route('/')
  .get(roleController.getAllRoles)
