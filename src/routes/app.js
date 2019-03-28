// third-party libraries
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// routes
import roleRouter from '../routes/v1/roleRouter';

// instantiate express
const app = express();

// port
const port = process.env.PORT || 5555;

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');

// routes
app.use('/roles', roleRouter);

// default routes
app.get('/', (req, res) => {
  res.send('Welcome to doqman Document Management System!');
});


export default app;
