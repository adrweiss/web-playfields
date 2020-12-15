export function Right(sequelize, Sequelize){
  const Right = sequelize.define("right", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
  });
  return Right
};