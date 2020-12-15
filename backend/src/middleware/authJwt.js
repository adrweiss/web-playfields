import jwt from "jsonwebtoken";
import { authConfig } from '../config/auth.config.js'
import { db } from '../models/index.js'

const User = db.user;
const Right = db.right;
const Role = db.role;

function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

// has READ_USER_VIEW right 
function hasRUV(req, res, next) {
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
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < users[i].roles.length; j++) {
        for (let k = 0; k < users[i].roles[j].rights.length; k++) {
          if (users[i].roles[j].rights[k].name === 'READ_USER_VIEW' ||
            users[i].roles[j].rights[k].name === 'ADMIN') {
            next();
            return;
          }
        }
      }
    }
    res.status(403).send({
      message: "Require rights!"
    });
    return;
  })
};


function isAdmin(req, res, next) {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

function isModerator(req, res, next) {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

function isModeratorOrAdmin(req, res, next) {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  hasRUV: hasRUV,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin

};
export { authJwt };