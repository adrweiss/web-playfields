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

const authJwt = {
  verifyToken,
  hasRights,
  isAdmin,
  getReadRoleManagement,
  getEditRole,
  getWriteOwnUsrSettings,
  getReadUsrView,
};

export { authJwt };