// dependencies
import * as dotenv from "dotenv";
import { Pool } from "pg";
import app from "./src/server";

// database client connection
import client from "./src/db/connection";

// port
const port = process.env.PORT || 5555;
app.set("port", port);

// disable logging
dotenv.config({ silent: true });

// database connection
(async () => {
  try {
    const result = await client.query('select now() as "Current_Time"');
    console.log("Connected to database at: ", result.rows[0].Current_Time);
  } finally {
    // client.release();
  }
})().catch(err => console.log(err.stack));

// start app and listen on parsed port
if (!module.parent) {
  app.listen(port, error => {
    if (error) {
      throw error;
    }
    console.log(`App started. Listening on port ${port}...`);
  });
}
