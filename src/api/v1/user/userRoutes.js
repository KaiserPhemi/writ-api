// third-party libraries
import express from "express";

// controllers
import userController from "./userController";

// router
const userRouter = express.Router();

// routes
userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
userRouter
  .route("/:id")
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default userRouter;
