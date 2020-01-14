// third-party libraries
import express from "express";

// controllers
import roleController from "../role/roleController";

// middleware
import auth from '../../../middlewares/authMiddleware'

// router
const roleRouter = express.Router();

// routes
roleRouter
  .route("/")
  .post(auth.verifyToken, auth.checkAdminRights,  roleController.createRole)
  .get(auth.verifyToken, auth.checkAdminRights, roleController.getRoles);
roleRouter
  .route("/:id")
  .put(auth.verifyToken, auth.checkAdminRights, roleController.updateRole)
  .delete(auth.verifyToken, auth.checkAdminRights,roleController.deleteRole);

export default roleRouter;
