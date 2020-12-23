import { db } from '../models/index.js'
import { authConfig } from '../config/auth.config.js'
import Sequelize from 'sequelize';

const expireInSec = 86400 // 24 hours
//const expireInSec = 600 // 24 hours

const User = db.user;
const Role = db.role;
const Right = db.right;

const Op = db.Sequelize.Op;

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export function signup(req, res) {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      user.setRoles([1]).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

export function signin(req, res) {
  const accessRights = [];
  User.findOne({
    include: [
      {
        model: Role, as: 'roles',
        include: [{
          model: Right, as: 'rights',
        }],
      },
    ],
    where: {
      [Op.or]:[
        {username: req.body.identifier},
        {email: req.body.identifier }
      ]
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: expireInSec
      });

      var expire = Math.floor(new Date().getTime() / 1000) + expireInSec

      user.roles.forEach(role => {
        role.rights.forEach(right => {
          accessRights.push(right.name);
        });
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        expire: expire,
        rights: accessRights,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
