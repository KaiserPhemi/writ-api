// third-party libraries
import express from "express";

// routers
import roleRouter from "./role/roleRoutes";
import userRouter from "./user/userRoutes";
import authRouter from "./auth/authRoutes";

const mainRouter = express.Router();

// mount routes
mainRouter.use("/roles", roleRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/auth", authRouter);

export default mainRouter;
