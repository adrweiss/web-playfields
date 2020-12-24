export function User(sequelize, Sequelize){
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    blocked: {
      type: Sequelize.BOOLEAN
    }
  });
  return User
};
