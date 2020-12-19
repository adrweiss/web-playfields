import { db } from '../models/index.js'

const Right = db.right;
const Role = db.role;

const getRoleAndRight = (req, res, next) => {
  Role.findAll({
    include: [{ 
      model: Right, as: 'rights', 
      attributes: ['id', 'name', 'description'],}],
    attributes: ['id', 'name', 'description', 'createdAt']
  }).then(roles => {
    if (roles) {
      const resObj = roles.map(role => {

        return Object.assign(
          {},
          {
            role_id: role.id,
            role_name: role.name,
            role_description: role.description,
            role_created_at: role.createdAt,
            rights: role.rights.map(right => {

              return Object.assign(
                {},
                {
                  right_id: right.id,
                  right_name: right.name,
                  right_description: right.description,
                  right_assigned_to: right.roles_right.createdAt
                  
                }
              )
            })
          }
        )
      })
      res.status(200).send(resObj)
    } else {
      res.status(400).send({ message: "No roles available." });
    }
  })
}

const addNewRole = (req, res, next) => {
  res.status(200).send({ message: 'Add new role Endpoint' });
}

const changeRole = (req, res, next) => {
  res.status(200).send({ message: 'Change existng role Endpoint' });
}

const deleteRole = (req, res, next) => {
  res.status(200).send({ message: 'Delte existing role Endpoint' });
}

const mgtRolesFunctions = {
  getRoleAndRight,
  addNewRole,
  changeRole,
  deleteRole,
};

export default mgtRolesFunctions;