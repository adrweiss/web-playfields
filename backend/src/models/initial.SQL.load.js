import bcrypt from 'bcrypt';

function role(Role) {
  Role.findOne({
    where: { name: 'USER' }
  }).then(role => {
    if (!role) {
      Role.create({
        name: "USER",
        description: "User role which is the defautl role for new users.",
      }).catch(function (err) {
        console.log('Error creation "USER" role.')
      });
    } else {
      console.log('role "USER" already exists.')
    }
  })
  Role.findOne({
    where: { name: 'MANAGER' }
  }).then(role => {
    if (!role) {
      Role.create({
        name: "MANAGER",
        description: "Role for manager.",
      }).catch(function (err) {
        console.log('Error creation "MANAGER" role.')
      });
    } else {
      console.log('role "MANAGER" already exists.')
    }
  })

  Role.findOne({
    where: { name: 'ADMIN' }
  }).then(role => {
    if (!role) {
      Role.create({
        name: "ADMIN",
        description: "Role for the system admin."
      }).catch(function (err) {
        console.log('Error creation "ADMIN" role.')
      });
    } else {
      console.log('role "ADMIN" already exists.')
    }
  })

  return role
}

function right(Right, Role) {
  Right.findOne({
    where: { name: 'ADMIN' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "ADMIN",
        description: "Its a admin right, everything is allowed.",
      }).then(right => {
        Role.findOne({
          where: { name: 'ADMIN' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "ADMIN" right.')
      });
    } else {
      console.log('right "ADMIN" already exists.')
    }
  })
  //----------------------------
  Right.findOne({
    where: { name: 'READ_USER_VIEW' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "READ_USER_VIEW",
        description: "Read access to the personal userpage.",
      }).then(right => {
        Role.findOne({
          where: { name: 'USER' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "READ_USER_VIEW" right.')
      });
    } else {
      console.log('right "READ_USER_VIEW" already exists.')
    }
  })
  //----------------------------
  Right.findOne({
    where: { name: 'WRITE_OWN_USR_SETTINGS' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "WRITE_OWN_USR_SETTINGS",
        description: "Change your own user settings.",
      }).then(right => {
        Role.findOne({
          where: { name: 'USER' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "WRITE_OWN_USR_SETTINGS" right.')
      });
    } else {
      console.log('right "WRITE_OWN_USR_SETTINGS" already exists.')
    }
  })
  //----------------------------
  Right.findOne({
    where: { name: 'READ_MANAGEMNT_VIEW' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "READ_MANAGEMNT_VIEW",
        description: "Read access to the management overview.",
      }).then(right => {
        Role.findOne({
          where: { name: 'MANAGER' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "READ_MANAGEMNT_VIEW" right.')
      });
    } else {
      console.log('right "READ_MANAGEMNT_VIEW" already exists.')
    }
  })
  //----------------------------
  Right.findOne({
    where: { name: 'READ_USER_MANAGEMENT' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "READ_USER_MANAGEMENT",
        description: "Get read access to the user overview.",
      }).then(right => {
        Role.findOne({
          where: { name: 'MANAGER' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "READ_USER_MANAGEMENT" right.')
      });
    } else {
      console.log('right "READ_USER_MANAGEMENT" already exists.')
    }
  })
  //----------------------------
  Right.findOne({
    where: { name: 'READ_ROLE_MANAGEMENT' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "READ_ROLE_MANAGEMENT",
        description: "Get read access to the role overview.",
      }).then(right => {
        Role.findOne({
          where: { name: 'MANAGER' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "READ_ROLE_MANAGEMENT" right.')
      });
    } else {
      console.log('right "READ_ROLE_MANAGEMENT" already exists.')
    }
  })
  //----------------------------
  Right.findOne({
    where: { name: 'READ_VIEW_LOGIN' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "READ_VIEW_LOGIN",
        description: "Get access the Login logs.",
      }).then(right => {
        Role.findOne({
          where: { name: 'MANAGER' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "READ_VIEW_LOGIN" right.')
      });
    } else {
      console.log('right "READ_VIEW_LOGIN" already exists.')
    }
  })
  //----------------------------
  Right.findOne({
    where: { name: 'READ_VIEW_DELETE' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "READ_VIEW_DELETE",
        description: "Get access the deleted accounts logs.",
      }).then(right => {
        Role.findOne({
          where: { name: 'MANAGER' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "READ_VIEW_DELETE" right.')
      });
    } else {
      console.log('right "READ_VIEW_DELETE" already exists.')
    }
  })
  //----------------------------
  Right.findOne({
    where: { name: 'EDIT_ROLE' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "EDIT_ROLE",
        description: "Changes roles (role name, role description, related rights) and delete roles.",
      }).then(right => {
        Role.findOne({
          where: { name: 'MANAGER' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "EDIT_ROLE" right.')
      });
    } else {
      console.log('right "EDIT_ROLE" already exists.')
    }
  })
  //----------------------------
  Right.findOne({
    where: { name: 'WRITE_ROLE_USR' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "WRITE_ROLE_USR",
        description: "You can remove or add roles from/users.",
      }).then(right => {
        Role.findOne({
          where: { name: 'MANAGER' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "WRITE_ROLE_USR" right.')
      });
    } else {
      console.log('right "WRITE_ROLE_USR" already exists.')
    }
  })
  //----------------------------
  Right.findOne({
    where: { name: 'WRITE_USR' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "WRITE_USR",
        description: "You can block or unblock users.",
      }).then(right => {
        Role.findOne({
          where: { name: 'MANAGER' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "WRITE_USR" right.')
      });
    } else {
      console.log('right "WRITE_USR" already exists.')
    }
  })
  //----------------------------
  Right.findOne({
    where: { name: 'WRITE_USR_LEVEL_2' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "WRITE_USR_LEVEL_2",
        description: "You can delete users or change their passwords.",
      }).then(right => {
        Role.findOne({
          where: { name: 'MANAGER' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "WRITE_USR_LEVEL_2" right.')
      });
    } else {
      console.log('right "WRITE_USR_LEVEL_2" already exists.')
    }
  })
  //----------------------------
  Right.findOne({
    where: { name: 'TRIGGER_BUILD' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "TRIGGER_BUILD",
        description: "You can trigger the build process for production deployment.",
      }).then(right => {
        Role.findOne({
          where: { name: 'MANAGER' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "TRIGGER_BUILD" right.')
      });
    } else {
      console.log('right "TRIGGER_BUILD" already exists.')
    }
  })
  //----------------------------
  Right.findOne({
    where: { name: 'WRITE_POST' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "WRITE_POST",
        description: "You can write a post regarding to your user.",
      }).then(right => {
        Role.findOne({
          where: { name: 'USER' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "WRITE_POST" right.')
      });
    } else {
      console.log('right "WRITE_POST" already exists.')
    }
  })
  //----------------------------
  Right.findOne({
    where: { name: 'DELETE_ANY_POST' }
  }).then(right => {
    if (!right) {
      Right.create({
        name: "DELETE_ANY_POST",
        description: "You can delete each post.",
      }).then(right => {
        Role.findOne({
          where: { name: 'MANAGER' }
        }).then(role => {
          right.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "DELETE_ANY_POST" right.')
      });
    } else {
      console.log('right "DELETE_ANY_POST" already exists.')
    }
  })

  return right
}

function usr(User, Role) {
  User.create({
    username: "admin",
    email: "admin@ai.de",
    password: bcrypt.hashSync("test1234", 8),
    blocked: false,
    validated: true
  }).then(user => {
    Role.findOne({
      where: { name: 'ADMIN' }
    }).then(role => {
      user.setRoles(role)
    })
  })

  User.create({
    username: "admin2",
    email: "admin2@ai.de",
    password: bcrypt.hashSync("test1234", 8),
    blocked: false,
    validated: true
  }).then(user => {
    Role.findOne({
      where: { name: 'ADMIN' }
    }).then(role => {
      user.setRoles(role)
    })
  })

  User.create({
    username: "usr",
    email: "usr@ai.de",
    password: bcrypt.hashSync("test1234", 8),
    blocked: false,
    validated: true
  }).then(user => {
    Role.findOne({
      where: { name: 'USER' }
    }).then(role => {
      user.setRoles(role)
    })
  })

  User.create({
    username: "usr2",
    email: "usr2@ai.de",
    password: bcrypt.hashSync("test1234", 8),
    blocked: false,
    validated: false
  }).then(user => {
    Role.findOne({
      where: { name: 'USER' }
    }).then(role => {
      user.setRoles(role)
    })
  })

  User.create({
    username: "usr3",
    email: "usr3@ai.de",
    password: bcrypt.hashSync("test1234", 8),
    blocked: true,
    validated: false
  }).then(user => {
    Role.findOne({
      where: { name: 'USER' }
    }).then(role => {
      user.setRoles(role)
    })
  })

  User.create({
    username: "manager",
    email: "manager@ai.de",
    password: bcrypt.hashSync("test1234", 8),
    blocked: false,
    validated: true
  }).then(user => {
    Role.findOne({
      where: { name: 'USER' }
    }).then(role => {
      user.setRoles(role)
    })
    Role.findOne({
      where: { name: 'MANAGER' }
    }).then(role => {
      user.setRoles(role)
    })
  })

  return usr
}


function usrLogs(Logs) {
  Logs.create({
    successfull: true,
    userId: 1
  })

  Logs.create({
    successfull: true,
    userId: 2
  })

  Logs.create({
    successfull: false,
    userId: 1
  })

  Logs.create({
    successfull: false,
    userId: 3
  })

  Logs.create({
    successfull: false,
    userId: null
  })

  Logs.create({
    successfull: true,
    userId: null
  })

  return usrLogs
}

function deleteLogs(DeletedUser) {
  DeletedUser.create({
    mail: "test-1@test.de",
    username: "test-1"
  })
  DeletedUser.create({
    mail: "test-2@test.de",
    username: "test-2"
  })
}

function usrProd(User, Role) {
  User.findOne({
    where: { email: 'admin@ai.de' }
  }).then(usr => {
    if (!usr) {
      User.create({
        username: "admin",
        email: "admin@ai.de",
        password: bcrypt.hashSync("test1234", 8),
        blocked: false,
        validated: false
      }).then(user => {
        Role.findOne({
          where: { name: 'ADMIN' }
        }).then(role => {
          user.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "admin" user.')
      });
    } else {
      console.log('user "admin" already exists.')
    }
  })

  User.findOne({
    where: { email: 'usr@ai.de' }
  }).then(usr => {
    if (!usr) {
      User.create({
        username: "usr",
        email: "usr@ai.de",
        password: bcrypt.hashSync("test1234", 8),
        blocked: false,
        validated: false
      }).then(user => {
        Role.findOne({
          where: { name: 'USER' }
        }).then(role => {
          user.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "usr" user.')
      });
    } else {
      console.log('user "usr" already exists.')
    }
  })

  User.findOne({
    where: { email: 'manager@ai.de' }
  }).then(usr => {
    if (!usr) {
      User.create({
        username: "manager",
        email: "manager@ai.de",
        password: bcrypt.hashSync("test1234", 8),
        blocked: false,
        validated: false
      }).then(user => {
        Role.findOne({
          where: { name: 'USER' }
        }).then(role => {
          user.setRoles(role)
        })
        Role.findOne({
          where: { name: 'MANAGER' }
        }).then(role => {
          user.setRoles(role)
        })
      }).catch(function (err) {
        console.log('Error creating "manager" user.')
      });
    } else {
      console.log('user "manager" already exists.')
    }
  })

  return usr
}

const initialLoad = {
  role,
  right,
  usr,
  usrProd,
  usrLogs,
  deleteLogs
}

export { initialLoad }
