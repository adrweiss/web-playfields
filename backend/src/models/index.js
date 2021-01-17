import { config } from '../config/db.config.js'
import Sequelize from 'sequelize';

import { User } from './user.model.js'
import { Role } from './role.model.js'
import { Right } from './right.model.js'
import { LogsDeleted, Logs } from './logs.model.js'
import { Validate } from './validate.model.js'

import { initialLoad } from './initial.SQL.load.js'

// start mongodb
import mongoose from 'mongoose';
import { mongodbConfig } from '../config/mongo.db.config.js'
import blogPost from '../models/blog.model.js';

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
db.deletedUser = LogsDeleted(sequelize, Sequelize);
db.logs = Logs(sequelize, Sequelize);
db.validate = Validate(sequelize, Sequelize)


//--
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

//--
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

//--
db.user.hasMany(db.logs, {
  as: 'logs'
})
db.logs.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

//--
db.user.hasMany(db.validate, {
  as: 'valid'
})
db.validate.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

const mongodb = {};

const mongo = mongoose.connect(mongodbConfig.connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

if (process.env.PLAYFIELD === 'dev') {
  blogPost.collection.drop().then(() => {
    console.log('Existing mongodb schema blogPost is deleted.')
  },
  (error) => {
    console.log('There is no mongodb schema with the name blogpost available.')
  })
}

mongodb.mongoose = mongo
mongodb.blogPost = blogPost

function dataDevInit() {
  initialLoad.role(db.role)
  initialLoad.right(db.right, db.role)
  initialLoad.usr(db.user, db.role)
  initialLoad.usrLogs(db.logs)
  initialLoad.deleteLogs(db.deletedUser)
}

function dataProdInit() {
  initialLoad.role(db.role)
  initialLoad.right(db.right, db.role)
  initialLoad.usrProd(db.user, db.role)
}

export { db, mongodb, dataDevInit, dataProdInit };