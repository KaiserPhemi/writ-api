// dependencies
import * as dotenv from 'dotenv';
import app from './src/server';

// port
const port = process.env.PORT || 5555;
app.set('port', port);

// disable logging
dotenv.config({ silent: true });

// start app and listen on parsed port
if (!module.parent) {
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`App started. Listening on port ${port}...`);
  });
}
