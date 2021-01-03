export function User(sequelize, Sequelize){
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    email: {
      type: Sequelize.STRING, 
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    blocked: {
      type: Sequelize.BOOLEAN
    }, 
    validated: {
      type: Sequelize.BOOLEAN
    }
  });
  return User
};
