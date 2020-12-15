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
  const accessRights = [];
  User.findAll({
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
  ).then(users => {
    users.forEach(user => {
      user.roles.forEach(role => {
        role.rights.forEach(right => {
          accessRights.push(right.name);
        })
      });
    });
    res.status(200).send({ rights: accessRights })
  })
}