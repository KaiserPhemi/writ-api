// third-party libraries
import express from "express";

// controllers
import userController from "./userController";

// middlewares
import auth from '../../../middlewares/authMiddleware';

// router
const userRouter = express.Router();

// routes
userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
userRouter
  .route("/:id")
  .put(auth.verifyToken, userController.updateUser)
  .delete(auth.verifyToken, userController.deleteUser);

export default userRouter;
