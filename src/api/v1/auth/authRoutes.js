// third-party libraries
import express from 'express';

// controllers
import authController from './authController';

// router
const authRouter = express.Router();

// routes
authRouter.route('/login').post(authController.loginUser);


export default authRouter;
