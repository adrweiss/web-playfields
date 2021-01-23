import jwt from "jsonwebtoken";
import { authConfig } from '../config/auth.config.js'
import { db } from '../models/index.js'

const User = db.user;
const Right = db.right;
const Role = db.role;

const Op = db.Sequelize.Op;

// Verify token
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
    if (chkBlocked(decoded.id)) {
      return res.status(404).send({ message: "This user is blocked, please contact the admin!" });
    }

    next();
  });
};

// check if user is blocked
function chkBlocked(userId) {
  User.findByPk(userId).then(user => {
    if (user.blocked) {
      return true;
    }
    return false;
  })
}

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

// Check if requested user is admin
function requireAdmin(req, res, next) {
  if (req.isAdmin) {
    next();
    return;
  }
  User.findOne({
    include: [
      {
        model: Role, as: 'roles',
        include: [{
          model: Right, as: 'rights',
          where: { [Op.not]: { name: "ADMIN" } }
        }],
      },
    ],
    where: { id: [req.body.userId] }
  }
  ).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User with admin rights can only be changed by other admins." });
    } else {
      next();
      return;
    }
  })

}

// READ_ROLE_MANAGEMENT
function getReadRoleManagement(req, res, next) {
  req.right = ['READ_ROLE_MANAGEMENT', 'ADMIN'];
  next();
}

// EDIT_ROLE
function getEditRole(req, res, next) {
  req.right = ['EDIT_ROLE', 'ADMIN'];
  next();
}

// WRITE_OWN_USR_SETTINGS
function getWriteOwnUsrSettings(req, res, next) {
  req.right = ['WRITE_OWN_USR_SETTINGS', 'ADMIN'];
  next();
}

// READ_USER_VIEW
function getReadUsrView(req, res, next) {
  req.right = ['READ_USER_VIEW', 'ADMIN'];
  next();
}

// READ_VIEW_LOGIN
function getReadViewLogin(req, res, next) {
  req.right = ['READ_VIEW_LOGIN', 'ADMIN'];
  next();
}

// READ_VIEW_DELETE
function getReadViewDelete(req, res, next) {
  req.right = ['READ_VIEW_DELETE', 'ADMIN'];
  next();
}

// READ_USER_MANAGEMENT
function getReadUserManagement(req, res, next) {
  req.right = ['READ_USER_MANAGEMENT', 'ADMIN'];
  next();
}

// WRITE_ROLE_USR
function getWriteRoleUsr(req, res, next) {
  req.right = ['WRITE_ROLE_USR', 'ADMIN'];
  next();
}

// WRITE_USR
function getWriteUsr(req, res, next) {
  req.right = ['WRITE_USR', 'ADMIN'];
  next();
}

// WRITE_USR_LEVEL_2
function getWriteUsrLevel2(req, res, next) {
  req.right = ['WRITE_USR_LEVEL_2', 'ADMIN'];
  next();
}

// TRIGGER_BUILD
function getTriggerBuild(req, res, next) {
  req.right = ['TRIGGER_BUILD', 'ADMIN'];
  next();
}

// WRITE_POST
function getWritePost(req, res, next) {
  req.right = ['WRITE_POST', 'ADMIN'];
  next();
}

// DELETE_ANY_POST
function getDeleteAnyPost(req, res, next) {
  req.right = ['DELETE_ANY_POST', 'ADMIN'];
  next();
}

// EDIT_ANY_POST
function getEditAnyPost(req, res, next) {
  req.right = ['EDIT_ANY_POST', 'ADMIN'];
  next();
}

const authJwt = {
  verifyToken,
  hasRights,
  isAdmin,
  requireAdmin,
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
  getTriggerBuild,
  getWritePost,
  getDeleteAnyPost,
  getEditAnyPost,
};

export { authJwt };