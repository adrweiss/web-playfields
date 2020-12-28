import { db } from '../models/index.js'
import { helper } from '../middleware/index.js'
import bcrypt from 'bcrypt';

const User = db.user;
const Right = db.right;
const Role = db.role;

const Op = db.Sequelize.Op;

const getUserInfos = (req, res, next) => {
  User.findAll({
    include: [
      {
        model: Role, as: 'roles',
        include: [{
          model: Right, as: 'rights',
        }],
      },
    ],
  }
  ).then(users => {

    if (users) {
      const resObj = users.map(user => {
        return Object.assign(
          {},
          {
            user_id: user.id,
            username: user.username,
            user_mail: user.email,
            blocked: user.blocked,
            created: user.createdAt,
            lastChange: user.updatedAt,
            roles: user.roles.map(role => {

              return Object.assign(
                {},
                {
                  role_id: role.id,
                  role_name: role.name,
                  role_description: role.description,
                  assignment_date: role.user_roles.createdAt,
                  rights: role.rights.map(right => {

                    return Object.assign(
                      {},
                      {
                        right_id: right.id,
                        right_name: right.name,
                        right_description: right.description
                      }
                    )
                  })
                }
              )
            })
          }
        )
      })
      res.status(200).send(resObj)
    } else {
      res.status(400).send({ message: 'No user in database available.' });
    }
  })
}

const deleteUser = (req, res, next) => {
  if (req.body.userId === req.userId) {
    return res.status(400).send({ message: 'Its not allowed to delete your own user' });
  }

  User.findByPk(req.body.userId).then(user => {
    helper.addDeletedUserToLogs(user.email, user.username)

    User.destroy({
      where: {
        id: req.body.userId
      }
    }).then(count => {
      if (!count) {
        return res.status(404).send({ error: 'No user' });
      }
      res.status(200).send({ message: "User was deleted successfull." });
    });
  })
}

const changeBlockStatusFromUser = (req, res, next) => {
  if (req.body.userId === req.userId) {
    return res.status(400).send({ message: 'Its not allowed to block your own user' });
  }

  User.findByPk(req.body.userId).then(user => {
    // Check if record exists in db
    if (user) {
      user.update({
        blocked: req.body.blocked
      })
      return res.status(200).send({ message: 'Change blocked status was successfull.' });
    } else {
      return res.status(400).send({ message: 'Change blocked status was not successfull.' });
    }
  })
}

const changePasswordFromUser = (req, res, next) => {
  if (req.body.userId === req.userId) {
    return res.status(400).send({ message: 'Its not allowed to change your own password on this side. Please your own user-overview.' });
  }

  User.findByPk(req.body.userId).then(user => {
    // Check if record exists in db
    if (user) {
      if (typeof req.body.pwd === 'string') {
        user.update({
          password: bcrypt.hashSync(req.body.pwd, 8)
        })

        res.status(200).send({ message: 'Password change was successfull.' });
      } else {
        res.status(400).send({ message: 'No new Password was provided.' });
      }
    } else {
      res.status(400).send({ message: 'No user in database available.' });
    }
  })
}

const changeRole = (req, res, next) => {
  if (req.body.userId === req.userId) {
    return res.status(400).send({ message: 'Its not allowed to change roles on your own user. Please contact a admin.' });
  }

  Role.findByPk(req.body.role).then(role => {
    if(role.name === 'ADMIN' && !req.isAdmin) {
      return res.status(400).send({ message: 'Only user with the role admin can add admin roles to other user.' });
    }
    User.findByPk(req.body.userId).then(user => {
      if (req.body.function === 'add') {
        user.addRoles([req.body.role]).then(() => {
          return res.status(200).send({ message: 'Add role successfull.' });
        }).catch(err => {
          return res.status(500).send({ message: 'Role does not exists.' });
        });
  
      } else if (req.body.function === 'remove') {
        user.removeRoles([req.body.role]).then(() => {
          return res.status(200).send({ message: 'Remove role successfull.' });
        }).catch(err => {
          return res.status(500).send({ message: 'Role does not exists.' });
        });
  
      } else {
        return res.status(200).send({ message: 'No valid function set.' });
      }
    })
  })
}

const mgtUserFunctions = {
  getUserInfos,
  changeRole,
  changePasswordFromUser,
  deleteUser,
  changeBlockStatusFromUser,
};

export default mgtUserFunctions;