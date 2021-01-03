export const config = {
  HOST: process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USER ||"postgres",
  PASSWORD: process.env.DB_PASSWORD || "",
  DB: process.env.DB || "postgres",
  dialect: process.env.DB_DIALECT || "postgres",
  schema: process.env.DB_SCHEMA || "playfield",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};