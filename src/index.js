// dependencies
import dotenv from "dotenv";
import express from "express";
import "babel-polyfill";

// middlewares
import appMiddlewares from "./middlewares/appMiddleware";

// database client connection
import pool from "./db/connection";

// routes
import mainRouter from "./api/v1";

// instantiate app
const app = express();
appMiddlewares(app);

// load env variables & disable logging
dotenv.config({ silent: true });

// port
const port = process.env.PORT || 5000;
app.set("port", port);

// database connection
(async () => {
  const client = await pool.connect();
  try {
    const response = await client.query('select now() as "Current_Time"');
    console.log("Connected to database at: ", response.rows[0].Current_Time);
  } finally {
    client.release();
  }
})().catch((err) => console.log(err.stack));

// routes
app.use("/api/v1", mainRouter);
app.get("*", (req, res) => {
  res.status(200).json({
    message: "Welcome to Writ Document Management System!",
  });
});

// start app and listen on parsed port
if (!module.parent) {
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`App started. Listening on port ${port}...`);
  });
}
