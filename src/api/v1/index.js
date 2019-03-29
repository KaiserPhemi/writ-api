// dependencies
import express from 'express';

// router
const mainRouter = express.Router();

// routes
import roleRoutes from './role/roleRoutes';
import userRoutes from './user/userRoutes';

// mount all routes for resources
mainRouter.use('/roles', roleRoutes);
mainRouter.use('/users', userRoutes);

export default mainRouter;
