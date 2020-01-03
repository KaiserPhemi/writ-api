// third-party libraries
import express from "express";

// controllers
import roleController from "../role/roleController";

const roleRouter = express.Router();

// routes
roleRouter
  .route("/")
  .post(roleController.createRole)
  .get(roleController.getRoles);

export default roleRouter;
