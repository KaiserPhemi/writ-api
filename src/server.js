// third-party libraries
import express from 'express';
import bodyParser from 'body-parser';

// instantiate express
const app = express();
const port = 5555;

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// disable logging server info
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.send('Hello Node!');
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
