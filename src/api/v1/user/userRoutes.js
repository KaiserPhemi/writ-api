// dependencies
import express from 'express';

// controllers
import userController from './userController';

// middlewares
import auth from '../../../middlewares/authentication';

// route
const userRoutes = express.Router();

// retrieve & create users
userRoutes.route('/')
  .get(auth.checkAdminRights, userController.getAllUsers)
  .post(auth.verifyInputs, userController.createUser);

// user login
userRoutes.route('/login')
  .post(auth.verifyLogin, userController.loginUser);

// user logout
userRoutes.route('/logout')
  .post(userController.logoutUser);


export default userRoutes;
