import { db } from '../models/index.js'

const Right = db.right;
const Role = db.role;

const Op = db.Sequelize.Op;


const getRoleAndRight = (req, res, next) => {
  var allData = 'ADMIN'
  if (req.isAdmin) {
    allData = ''
  }
  
  Role.findAll({
    where: { 
       [Op.not]:  {name: allData}
    },
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
      id: req.body.id
    }
  }).then(count => {
    if (!count) {
      return res.status(404).send({ error: 'Role not found.' });
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
      where: { id: req.body.rights }
    }).then(right => {
      role.setRights(right).then(() => {
        res.status(200).send({ message: 'New Role is created.' });
      }).catch(error =>
        res.status(400).send({ error: 'Rights are not available.' })
      )
    })
  });
}

const changeRole = (req, res, next) => {
  Role.findByPk(req.body.id).then(role => {
    if (role) {
      role.update({
        name: req.body.name,
        description: req.body.description,
      })

      role.setRights(req.body.rights).then(() => {
        res.status(200).send({ message: 'Change existing role successfull.' })
      }).catch(error =>
        res.status(400).send({ error: 'Rights are not available.' })
      )
    } else {
      res.status(400).send({ error: 'Role not found.' });
    }
  })
}

const mgtRolesFunctions = {
  getRoleAndRight,
  addNewRole,
  changeRole,
  deleteRole,
};

export default mgtRolesFunctions;