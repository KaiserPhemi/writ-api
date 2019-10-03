// dependencies
import * as dotenv from "dotenv";
import { Client } from "pg";
import app from "./src/server";

// port
const port = process.env.PORT || 5555;
app.set("port", port);

// disable logging
dotenv.config({ silent: true });

// database connection
const dbUrl =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DATABASE
    : process.env.DEV_DATABASE;
const client = new Client({ dbUrl });
client.connect();

// start app and listen on parsed port
if (!module.parent) {
  app.listen(port, error => {
    if (error) {
      throw error;
    }
    console.log(`App started. Listening on port ${port}...`);
  });
}
