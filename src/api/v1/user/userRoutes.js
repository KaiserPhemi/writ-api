// third-party libraries
import express from "express";

// controllers
import userController from "./userController";

// router
const userRouter = express.Router();

// routes
userRouter.route("/").get(userController.getAllUsers);
// .post();

userRouter.route("/:id").delete(userController.deleteUser);

export default userRouter;
