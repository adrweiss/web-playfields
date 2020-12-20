import { config } from '../config/db.config.js'
import Sequelize from 'sequelize';

import { User } from './user.model.js'
import { Role } from './role.model.js'
import { Right } from './right.model.js'

import { initialRole, initialRight, initialUsr } from './initial.load.js'

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    schema: config.schema,
    dialect: config.dialect,
    operatorsAliases: 0,
    logging: 0,
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

db.role = Role(sequelize, Sequelize);
db.user = User(sequelize, Sequelize);
db.right = Right(sequelize, Sequelize);

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

db.role.belongsToMany(db.right, {
  through: "roles_right",
  foreignKey: "roleId",
  otherKey: "rightId"
});
db.right.belongsToMany(db.role, {
  through: "roles_right",
  foreignKey: "rightId",
  otherKey: "roleId"
});

function roleInit(role, right, user){
  initialRole(role)
  initialRight(right, role)
  initialUsr(user)
}

//db.ROLES = ["user", "admin", "manager"];
//db.RIGHTS = ["admin", "READ_USER_VIEW", "READ_MANAGEMNT_VIEW"];

export { db, roleInit };
