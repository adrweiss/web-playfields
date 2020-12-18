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
          where: { name: ['ADMIN', 'READ_USER_VIEW'] }
        }],
      },
    ],
    where: { id: [req.userId] }
  }
  ).then(users => {
    if (users === null) {
      res.status(403).send({
        message: "Require rights!"
      });
      return;
    } else {
      next();
      return;
    }
  })
};

// has WRITE_OWN_USR_SETTINGS right 
function hasWOUS(req, res, next) {
  User.findOne({
    include: [
      {
        model: Role, as: 'roles',
        include: [{
          model: Right, as: 'rights',
          where: { name: ['ADMIN', 'WRITE_OWN_USR_SETTINGS'] }
        }],
      },
    ],
    where: { id: [req.userId] }
  }
  ).then(users => {
    if (users === null) {
      res.status(403).send({
        message: "Require rights!"
      });
      return;
    } else {
      next();
      return;
    }
  })
}


//READ_ROLE_MANAGEMENT
//EDIT_ROLE

const authJwt = {
  verifyToken: verifyToken,
  hasRUV: hasRUV,
  hasWOUS: hasWOUS,
};

export { authJwt };