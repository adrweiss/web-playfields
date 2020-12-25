export function LogsDeleted(sequelize, Sequelize){
  const Right = sequelize.define("deleted_user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    mail: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
  });
  return Right
};

export function Logs(sequelize, Sequelize){
  const Right = sequelize.define("logs", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    successfull: {
      type: Sequelize.BOOLEAN
    }
  });
  return Right
};