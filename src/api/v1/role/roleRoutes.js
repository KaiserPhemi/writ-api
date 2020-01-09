// third-party libraries
import express from "express";

// controllers
import roleController from "../role/roleController";

// router
const roleRouter = express.Router();

// routes
roleRouter
  .route("/")
  .post(roleController.createRole)
  .get(roleController.getRoles);

roleRouter
  .route("/:id")
  .put(roleController.updateRole)
  .delete(roleController.deleteRole);

export default roleRouter;
