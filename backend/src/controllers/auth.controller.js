import { db } from '../models/index.js'
import { authConfig } from '../config/auth.config.js'


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
  User.findOne({
    where: {
      username: req.body.username
      //email: req.body.username
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
        expiresIn: 86400 // 24 hours
      });

      const accessRights = [];
      const authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name);
        }

        Right.findAll({
          include: [
            { model: Role, as: 'roles', where: { name: authorities } },
          ],
        }
        ).then(rights => {
          for (let i = 0; i < rights.length; i++) {
            accessRights.push(rights[i].name)
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            rights: accessRights,
            accessToken: token
          });
        })
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

