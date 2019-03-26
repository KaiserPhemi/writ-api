// third-party libraries
import express from 'express';
import bodyParser from 'body-parser';
import db from './db/models';

// instantiate express
const app = express();
const port = process.env.PORT || 5555;

// checks for databse connection
db.sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error connecting to database: ${err}`));


// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// disable logging server info
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.send('Welcome to doqman Document Management System!');
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
