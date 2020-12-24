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

// default function to check necessary rights
function hasRights(req, res, next) {
  User.findOne({
    include: [
      {
        model: Role, as: 'roles',
        include: [{
          model: Right, as: 'rights',
          where: { name: req.right }
        }],
      },
    ],
    where: { id: [req.userId] }
  }
  ).then(users => {
    if (users === null) {
      return res.status(403).send({ message: "Require rights!" });
    }

    if (users.blocked) {
      return res.status(404).send({ message: "This user is blocked, please contact the admin!" });
    }

    next();
    return;
  })
}

function chkBlocked(req, res, next) {
  User.findByPk(req.userId).then(user => {
    if (user.blocked) {
      return res.status(404).send({ message: "This user is blocked, please contact the admin!" });
    }
    next();
    return;
  })
}

// Check if user is admin
function isAdmin(req, res, next) {
  User.findOne({
    include: [
      {
        model: Role, as: 'roles',
        include: [{
          model: Right, as: 'rights',
          where: { name: ['ADMIN'] }
        }],
      },
    ],
    where: { id: [req.userId] }
  }
  ).then(users => {
    if (users === null) {
      req.isAdmin = false
      next();
      return;
    } else {
      req.isAdmin = true
      next();
      return;
    }
  })
}

//READ_ROLE_MANAGEMENT
function getReadRoleManagement(req, res, next) {
  req.right = ['READ_ROLE_MANAGEMENT', 'ADMIN'];
  next();
}

//EDIT_ROLE
function getEditRole(req, res, next) {
  req.right = ['EDIT_ROLE', 'ADMIN'];
  next();
}

//WRITE_OWN_USR_SETTINGS
function getWriteOwnUsrSettings(req, res, next) {
  req.right = ['WRITE_OWN_USR_SETTINGS', 'ADMIN'];
  next();
}

//READ_USER_VIEW
function getReadUsrView(req, res, next) {
  req.right = ['READ_USER_VIEW', 'ADMIN'];
  next();
}

//READ_VIEW_LOGIN
function getReadViewLogin(req, res, next) {
  req.right = ['READ_VIEW_LOGIN', 'ADMIN'];
  next();
}

//READ_VIEW_DELETE
function getReadViewDelete(req, res, next) {
  req.right = ['READ_VIEW_DELETE', 'ADMIN'];
  next();
}

//READ_USER_MANAGEMENT
function getReadUserManagement(req, res, next) {
  req.right = ['READ_USER_MANAGEMENT', 'ADMIN'];
  next();
}

//WRITE_ROLE_USR
function getWriteRoleUsr(req, res, next) {
  req.right = ['WRITE_ROLE_USR', 'ADMIN'];
  next();
}

//WRITE_USR
function getWriteUsr(req, res, next) {
  req.right = ['WRITE_USR', 'ADMIN'];
  next();
}

//WRITE_USR_LEVEL_2
function getWriteUsrLevel2(req, res, next) {
  req.right = ['WRITE_USR_LEVEL_2', 'ADMIN'];
  next();
}

const authJwt = {
  verifyToken,
  hasRights,
  chkBlocked,
  isAdmin,
  getReadRoleManagement,
  getEditRole,
  getWriteOwnUsrSettings,
  getReadUsrView,
  getReadViewLogin,
  getReadViewDelete,
  getReadUserManagement,
  getWriteRoleUsr,
  getWriteUsr,
  getWriteUsrLevel2,
};

export { authJwt };