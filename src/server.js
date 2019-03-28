// third-party libraries
import express from 'express';
import db from './db/models';
import * as dotenv from 'dotenv';

// app
import app from './routes/app';

// disable logging
dotenv.config({ silent: true });

// checks for databse connection
db.sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error connecting to database: ${err}`));

// start app and listen on parsed port
if (!module.parent) {
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Application started. Listening on port: ${port}`);
  });
}
