import { db } from "../models/index.js";
import { authConfig } from "../config/auth.config.js";
import { helper } from "../middleware/index.js";
import {validyChecks} from "../middleware/validyChecks.js";


import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const User = db.user;
const Role = db.role;
const Right = db.right;
const Validate = db.validate;

const Op = db.Sequelize.Op;

const url = process.env.FRONTEND_LOCATION;
const expireInSec = 86400; // 24 hours
//const expireInSec = 600 // 24 hours

export function signup(req, res) {
  // Save User to Database

  if(!req.body.username){
    return res.status(400).send({ message: "Username is empty." });
  }

  if(!req.body.email){
    return res.status(400).send({ message: "Email is empty." });
  }

  if (!validyChecks.combinedCheck(req.body.password)) {
    res.status(400).send({ message: "Password doesn't match password rules." });
    return;
  }
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    blocked: false,
    validated: false,
  })
    .then((user) => {
      var keyString = crypto.randomBytes(36).toString("hex");

      Validate.create({
        type: "valid",
        key: keyString,
        used: false,
      }).then((valid) => {
        valid.setUser(user).then(() => {
          var urlStr =
            url + "/user/validate?vk=" + keyString + "&" + "userid=" + user.id;
          var subject = "Please verify your email address";

          Role.findOne({
            where: { name: "USER" },
          }).then((role) => {
            user.setRoles(role).then(() => {
              helper.sendMailWithContent(urlStr, req.body.email, subject);

              res.send({ message: "User was registered successfully!" });
            });
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function signin(req, res) {
  const accessRights = [];
  User.findOne({
    include: [
      {
        model: Role,
        as: "roles",
        include: [
          {
            model: Right,
            as: "rights",
          },
        ],
      },
    ],
    where: {
      [Op.or]: [
        { username: req.body.identifier },
        { email: req.body.identifier },
      ],
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (user.blocked) {
        return res
          .status(404)
          .send({ message: "This user is blocked, please contact the admin!" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        helper.addUserLoginLog(user.id, false);

        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: expireInSec,
      });

      var expire = Math.floor(new Date().getTime() / 1000) + expireInSec;

      user.roles.forEach((role) => {
        role.rights.forEach((right) => {
          accessRights.push(right.name);
        });
      });

      helper.addUserLoginLog(user.id, true);

      res.status(200).send({
        id: user.id,
        username: user.username,
        expire: expire,
        rights: accessRights,
        validate: user.validated,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function forgottPassword(req, res) {
  console.log(req.body);

  res.status(200).send({ message: "forgott password" });
}

export function validateAccount(req, res) {
  Validate.findOne({
    where: {
      userId: req.body.userId,
      key: req.body.token,
      type: "valid",
      used: false,
    },
  })
    .then((valid) => {
      if (valid) {
        valid
          .update({
            used: true,
          })
          .then(() => {
            User.findByPk(req.body.userId).then((user) => {
              user
                .update({
                  validated: true,
                })
                .then(() => {
                  return res.status(200).send({ message: "validate account" });
                });
            });
          });
      } else {
        return res.status(400).send({ message: "The Url is no longer valid." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Something went wrong." });
    });
}
