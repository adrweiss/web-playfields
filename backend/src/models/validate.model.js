export function Validate(sequelize, Sequelize){
  const User = sequelize.define("validate", {
    type: {
      type: Sequelize.STRING
    },
    key: {
      type: Sequelize.STRING
    },
    expire: {
      type: Sequelize.INTEGER
    },
    used: {
      type: Sequelize.BOOLEAN
    }
  });
  return User
};
