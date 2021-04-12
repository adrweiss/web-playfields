import { db } from "../models/index.js";
import { helper } from "../middleware/index.js";
import { format } from "date-fns";

import bcrypt from "bcrypt";
import crypto from "crypto";

import { validyChecks } from "../middleware/validyChecks.js";

const User = db.user;
const Right = db.right;
const Role = db.role;
const Validate = db.validate;

const Op = db.Sequelize.Op;

const url = process.env.FRONTEND_LOCATION;

const deleteUsr = (req, res, next) => {
  // function is missing  -> admins can't delete his self
  if (req.isAdmin) {
    return res
      .status(400)
      .send({
        message:
          "With the role/right admin it is not allowes to delete his account by hisself. Ask another admin.",
      });
  }

  User.findByPk(req.userId).then((user) => {
    helper.addDeletedUserToLogs(user.email, user.username);

    User.destroy({
      where: {
        id: req.userId,
      },
    }).then((count) => {
      if (!count) {
        return res.status(404).send({ error: "No user" });
      }
      res.status(200).send({ message: "User was deleted successfull." });
    });
  });
};

const getRoles = (req, res, next) => {
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
    where: { id: [req.userId] },
  }).then((user) => {
    if (user) {
      const resObj = user.roles.map((role) => {
        return Object.assign(
          {},
          {
            role_id: role.id,
            role_name: role.name,
            role_description: role.description,
            assignment_date: format(role.user_roles.createdAt, "dd.MM.yyy"),
            rights: role.rights.map((right) => {
              return Object.assign(
                {},
                {
                  right_id: right.id,
                  right_name: right.name,
                  right_description: right.description,
                }
              );
            }),
          }
        );
      });
      res.status(200).send(resObj);
    } else {
      res.status(400).send({ message: "No user in database available." });
    }
  });
};

const changeUserName = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    // Check if record exists in db
    if (user) {
      user.update({
        username: req.body.username,
      });
    } else {
      res.status(400).send({ message: "No user in database available." });
    }
  });

  res.status(200).send({ message: "Username change was successfull." });
};

const changeUserPassword = (req, res, next) => {
  var checkResult = validyChecks.combinedCheck(req.body.password_new)
  if (checkResult) {
    return res.status(400).send({ message: checkResult });
  }

  User.findByPk(req.userId).then((user) => {
    // Check if record exists in db
    if (user) {
      if (typeof req.body.password_new === "string") {
        user.update({
          password: bcrypt.hashSync(req.body.password_new, 8),
        });

        res.status(200).send({ message: "Password change was successfull." });
      } else {
        res.status(400).send({ message: "No new Password was provided." });
      }
    } else {
      res.status(400).send({ message: "No user in database available." });
    }
  });
};

const getRights = (req, res, next) => {
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
    where: { id: [req.userId] },
  }).then((user) => {
    const accessRights = [];
    if (!user) {
      return res
        .status(400)
        .send({ message: "No user in database available." });
    }

    user.roles.forEach((role) => {
      role.rights.forEach((right) => {
        accessRights.push(right.name);
      });
    });
    return res.status(200).send(accessRights);
  });
};

const resetPassword = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email },
  }).then((user) => {
    if (user) {
      var keyString = crypto.randomBytes(36).toString("hex");

      Validate.create({
        type: "resetpw",
        key: keyString,
        expire: Math.floor(Date.now() / 1000) + 86400,
        used: false,
      }).then((valid) => {
        var urlStr = url + "/user/forgott?fp=" + keyString;
        var subject = "Link to reset your password.";
        helper.sendMailWithContent(urlStr, req.body.email, subject);

        valid.setUser(user);
      });
    }
    return res.status(200).send();
  });
};

const sendNewPassword = (req, res, next) => {
  var checkResult = validyChecks.combinedCheck(req.body.password)
  if (checkResult) {
    return res.status(400).send({ message: checkResult });
  }

  if (typeof req.body.key !== "string") {
    res.status(400).send({ message: "Key is empty." });
    return;
  }
  Validate.findOne({
    where: {
      key: req.body.key,
      type: "resetpw",
      used: false,
      expire: {
        [Op.gt]: Math.floor(Date.now() / 1000),
      },
    },
  }).then((valid) => {
    if (valid) {
      valid
        .update({
          used: true,
        })
        .then(() => {
          User.findByPk(valid.userId).then((user) => {
            user
              .update({
                password: bcrypt.hashSync(req.body.password, 8),
              })
              .then(() => {
                return res
                  .status(200)
                  .send({ message: "password successfull changed." });
              });
          });
        });
    } else {
      return res.status(400).send({ message: "No valid key used." });
    }
  });
};

const userFunctions = {
  deleteUsr,
  getRights,
  getRoles,
  changeUserName,
  changeUserPassword,
  resetPassword,
  sendNewPassword,
};

export default userFunctions;
