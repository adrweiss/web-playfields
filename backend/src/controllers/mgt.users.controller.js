const getUserInfos = (req, res, next) => {
  res.status(200).send({ message: "get all information." });
}

const removeRoleFromUser = (req, res, next) => {
  res.status(200).send({ message: "remove role from user." });
}

const addRoleToUser = (req, res, next) => {
  res.status(200).send({ message: "add role to user." });
}

const changePasswordFromUser = (req, res, next) => {
  res.status(200).send({ message: "change Password from user." });
}

const deleteUser = (req, res, next) => {
  res.status(200).send({ message: "Delte user." });
}

const changeBlockStatusFromUser = (req, res, next) => {
  res.status(200).send({ message: "Change block satus from user." });
}

const mgtUserFunctions = {
  getUserInfos,
  removeRoleFromUser,
  addRoleToUser,
  changePasswordFromUser,
  deleteUser,
  changeBlockStatusFromUser,
};

export default mgtUserFunctions;