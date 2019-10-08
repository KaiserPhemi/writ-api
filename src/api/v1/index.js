// third-party libraries
import express from 'express';

// routers
import roleRouter from './role/roleRoutes';
const mainRouter = express.Router();

// mount routes
mainRouter.use('/role', roleRouter);

export default mainRouter;
