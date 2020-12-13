export const config = {
  HOST: 'playfield-db.caz3wq73d2qn.eu-central-1.rds.amazonaws.com',
  USER: "karl",
  PASSWORD: "RvUVC0gObAlQp74hgnUJ",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};