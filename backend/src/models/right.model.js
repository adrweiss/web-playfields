export function Right(sequelize, Sequelize){
  const Right = sequelize.define("right", {
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
  return Right
};