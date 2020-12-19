import { db } from '../models/index.js'
import bcrypt from 'bcrypt';

const User = db.user;
const Right = db.right;
const Role = db.role;

const deleteUsr = (req, res, next) => {
  User.destroy({
    where: {
      id: req.userId
    }
  }).then(count => {
    if (!count) {
      return res.status(404).send({ error: 'No user' });
    }
    res.status(204).send();
  });
}


const getRights = (req, res, next) => {
  User.findOne({
    include: [
      {
        model: Role, as: 'roles',
        include: [{
          model: Right, as: 'rights',
        }],
      },
    ],
    where: { id: [req.userId] }
  }
  ).then(user => {
    const resObj = user.roles.map(role => {
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

    res.status(200).send(resObj)
  })
}

const changeUserName = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    // Check if record exists in db
    if (user) {
      user.update({
        username: req.body.username
      })
    } else {
      res.status(400).send({ message: 'No user in database available.' });
    }
  })

  res.status(200).send({ username: req.body.username });
}

const changeUserPassword = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    // Check if record exists in db
    if (user) {
      if (typeof req.body.password_new === 'string') {
        user.update({
          password: bcrypt.hashSync(req.body.password_new, 8)
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

const userFunctions = {
  deleteUsr,
  getRights,
  changeUserName,
  changeUserPassword,
};

export default userFunctions;