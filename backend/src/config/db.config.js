export const config = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.DB_PORT,
  DB: process.env.DB,
  dialect: process.env.DB_DIALECT,
  schema: process.env.DB_SCHEMA,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};