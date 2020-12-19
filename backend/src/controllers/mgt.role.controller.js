import { db } from '../models/index.js'

const Right = db.right;
const Role = db.role;

const getRoleAndRight = (req, res, next) => {
  Role.findAll({
    include: [{
      model: Right, as: 'rights',
      attributes: ['id', 'name', 'description'],
    }],
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

const deleteRole = (req, res, next) => {
  Role.destroy({
    where: {
      id: req.body.roleid
    }
  }).then(count => {
    if (!count) {
      return res.status(404).send({ error: 'No Role' });
    }
    res.status(200).send({ message: "Role was deleted successfully." });
  });
}

const addNewRole = (req, res, next) => {
  Role.create({
    name: req.body.name,
    description: req.body.description
  }).then(role => {
    Right.findAll({
      where: {id: req.body.rights}
    }).then(right => {
      if (role) {
        role.setRights(right)
        res.status(200).send({ message: 'New Role is created.' });
        return 
      } else {
        res.status(400).send({ message: 'Assigned roles were not found.' });
        return 
      }      
    })
  });
}

const changeRole = (req, res, next) => {
  res.status(200).send({ message: 'Change existng role Endpoint' });
}



const mgtRolesFunctions = {
  getRoleAndRight,
  addNewRole,
  changeRole,
  deleteRole,
};

export default mgtRolesFunctions;