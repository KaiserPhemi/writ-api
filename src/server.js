// dependencies
import * as dotenv from 'dotenv';
import express from 'express';

// routes
import mainRouter from './api/v1';

// instantiate express
const app = express();

// disable logging
dotenv.config({ silent: true });

// port
const port = process.env.PORT || 5555;
app.set('port', port);

// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

// routes
app.use('/api/v1', mainRouter)
app.get('/', (req, res) => {
  res
    .status(200)
    .send({
      message: 'Welcome to doqman Document Management System!',
    });
});

// start app and listen on parsed port
if (!module.parent) {
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Application started. Listening on port: ${port}`);
  });
}
