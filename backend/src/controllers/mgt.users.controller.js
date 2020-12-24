import { db } from '../models/index.js'
import { helper } from '../middleware/index.js'

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
  // function is missing  -> only admins can delete admins

  if (req.body.userId === req.userId) {
    return res.status(400).send({ message: 'Its not allowed to delete your own user' });
  }

  User.findByPk(req.body.userId).then(user => {

    user.getRoles().then(role => {
      if (req.isAdmin || !role[0].name === 'ADMIN') {
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
      } else {
        return res.status(404).send({ message: 'Requier admin rights.' });
      }
    })
  })
}

const changeBlockStatusFromUser = (req, res, next) => {
  console.log(req.body.userid)
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