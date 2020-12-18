export const getRoleAndRight = (req, res, next) => {
  res.status(200).send({message: 'Get role and rights Endpoint'});
}

export const addNewRole = (req, res, next) => {
  res.status(200).send({message: 'Add new role Endpoint'});
}

export const changeRole = (req, res, next) => {
  res.status(200).send({message: 'Change existng role Endpoint'});
}

export const deleteRole = (req, res, next) => {
  res.status(200).send({message: 'Delte existing role Endpoint'});
}

const mgtRolesFunctions = {
  getRoleAndRight,
  addNewRole,
  changeRole,
  deleteRole,
};

export default mgtRolesFunctions;