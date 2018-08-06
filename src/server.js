// third-party libraries
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';

// instantiate express
const app = express();
const port = 5555;

// parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// disable logging server info
app.disable('x-powered-by');

// start app and listen on port 5555
app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server started on port ${port}`);
});
