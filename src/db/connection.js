// third-party library
import { Pool } from "pg";

// db config
import dbConfig from "./config";

// create pool of connection
const pool = new Pool(dbConfig);

export default pool;
