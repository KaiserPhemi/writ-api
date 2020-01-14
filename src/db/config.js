/**
 * @desc database config 
 */
const dbConfig = {
  user: process.env.PG_USER,
  database:
    process.env.NODE_ENV === "production"
      ? process.env.PROD_DB
      : process.env.DEV_DB,
  password: process.env.PG_PWD,
  host: process.env.HOST,
  port: process.env.PG_PORT,
  max: process.env.PG_MAX_CONN
};

export default dbConfig;
