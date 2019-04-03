// dependencies
import express from 'express';

// middlewares
import appMiddlewares from './middlewares/appMiddleware';

// routes
import mainRouter from './api/v1';

// instantiate express
const app = express();
appMiddlewares(app);

// routes
app.use('/api/v1', mainRouter);
app.get('/', (req, res) => {
  res
    .status(200)
    .send({
      message: 'Welcome to doqman Document Management System!',
    });
});

export default app;
