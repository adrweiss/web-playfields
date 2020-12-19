const getRoleAndRight = (req, res, next) => {
  res.status(200).send({message: 'Get role and rights Endpoint'});
}

const addNewRole = (req, res, next) => {
  res.status(200).send({message: 'Add new role Endpoint'});
}

const changeRole = (req, res, next) => {
  res.status(200).send({message: 'Change existng role Endpoint'});
}

const deleteRole = (req, res, next) => {
  res.status(200).send({message: 'Delte existing role Endpoint'});
}

const mgtRolesFunctions = {
  getRoleAndRight,
  addNewRole,
  changeRole,
  deleteRole,
};

export default mgtRolesFunctions;