export const config = {
  HOST: 'localhost',
  USER: "postgres",
  DB: "postgres",
  dialect: "postgres",
  schema: "playfield",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};