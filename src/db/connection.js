// third-party library
import { Pool } from "pg";

// database connection
const dbUrl =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB
    : process.env.DEV_DB;
const pool = new Pool({ dbUrl });
const client = pool.connect();

export default client;
