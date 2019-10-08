// third-party libraries
import express from 'express';

// routers
import roleRouter from './role/roleRoutes';
const mainRouter = express.Router();

mainRouter.use('/role', roleRouter);

export default mainRouter;
