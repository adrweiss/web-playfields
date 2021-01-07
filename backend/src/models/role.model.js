export function Role(sequelize, Sequelize){
  const Role = sequelize.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    description: {
      type: Sequelize.STRING
    },
  });
  return Role
};