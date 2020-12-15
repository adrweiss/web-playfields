import { db } from '../models/index.js'

const User = db.user;
const Right = db.right;
const Role = db.role;

export const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

export const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

export const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

export const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

export const getRights = (req, res, next) => {
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