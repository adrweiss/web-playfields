//const config = require("../config/db.config.js");
import { config } from '../config/db.config.js'

//const Sequelize = require("sequelize");
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import { User } from './user.model.js'
//import { Role } from './roel.model.js'
//db.user = require("./user.model.js")(sequelize, Sequelize);
//db.role = require("./role.model.js.js")(sequelize, Sequelize);
//db.user = User(sequelize, Sequelize);
//db.role = Role(sequelize, Sequelize);

db.role = sequelize.define("roles", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }
});

db.user = sequelize.define("users", {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

export { db };