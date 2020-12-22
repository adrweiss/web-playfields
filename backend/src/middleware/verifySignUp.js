import { db } from '../models/index.js'
import bcrypt from 'bcrypt';

//const ROLES = db.ROLES;
const User = db.user;
const Role = db.role;

/*
function checkDuplicateUsernameOrEmail (req, res, next) {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};
*/

function checkDuplicateUsername(req, res, next) {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    next();
  });
};

function checkDuplicateEmail(req, res, next) {
  // Email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return;
    }

    next();
  });
};

function checkDuplicateRoleName(req, res, next) {
  if(req.body.name === ""){
    res.status(400).send({message: "Role name was not set!"});
    return
  }
  
  // Role name
  Role.findOne({
    where: {
      name: req.body.name
    }
  }).then(role => {
    if (role && req.body.id === role.id){
      next();
      return;
    }
    if (role) {
      res.status(400).send({
        message: "Failed! Role name is already in use!"
      });
      return;
    }

    next();
  });
};


/*
function checkRolesExisted(req, res, next) {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }

  next();
};
*/

function checkPassword(req, res, next) {
  // Email
  User.findByPk(req.userId).then(user => {
    
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!"
      });
    }
    next();
  });
};

const verifySignUp = {
  //checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkDuplicateUsername,
  checkDuplicateEmail,
  checkPassword,
  checkDuplicateRoleName,
  //checkRolesExisted: checkRolesExisted
};

export { verifySignUp };