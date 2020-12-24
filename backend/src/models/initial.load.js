import bcrypt from 'bcrypt';

function role(Role) {
  Role.create({
    name: "USER",
    description: "User role which is the defautl role for new users.",
  });

  Role.create({
    name: "MANAGER",
    description: "Role for manager.",
  });

  Role.create({
    name: "ADMIN",
    description: "Role for the system admin."
  });

  return role
}

function right(Right, Role) {
  Right.create({
    name: "ADMIN",
    description: "Its a admin right, everything is allowed.",
  }).then(right => {
    Role.findOne({
      where: { name: 'ADMIN' }
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "READ_USER_VIEW",
    description: "Read access to the personal userpage.",
  }).then(right => {
    Role.findOne({
      where: { name: 'USER' }
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "WRITE_OWN_USR_SETTINGS",
    description: "Change your own user settings.",
  }).then(right => {
    Role.findOne({
      where: { name: 'USER' }
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "READ_MANAGEMNT_VIEW",
    description: "Read access to the management overview.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER' }
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "READ_USER_MANAGEMENT",
    description: "Get read access to the user overview.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER' }
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "READ_ROLE_MANAGEMENT",
    description: "Get read access to the role overview.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER' }
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "READ_VIEW_LOGIN",
    description: "Get access the Login logs.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER' }
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "READ_VIEW_DELETE",
    description: "Get access the deleted accounts logs.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER' }
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "EDIT_ROLE",
    description: "Changes roles (role name, role description, related rights) and delete roles.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER' }
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "WRITE_ROLE_USR",
    description: "You can remove or add roles from/users.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER' }
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "WRITE_USR",
    description: "You can block or unblock users.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER' }
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "WRITE_USR_LEVEL_2",
    description: "You can delete users or change their passwords.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER' }
    }).then(role => {
      right.setRoles(role)
    })
  });
  return right
}

function usr(User) {
  User.create({
    username: "admin",
    email: "admin@ai.de",
    password: bcrypt.hashSync("test1234", 8),
    blocked: false
  }).then(user => {
    user.setRoles([3])
  })

  User.create({
    username: "usr",
    email: "usr@ai.de",
    password: bcrypt.hashSync("test1234", 8), 
    blocked: false
  }).then(user => {
    user.setRoles([1])
  })

  User.create({
    username: "usr2",
    email: "usr2@ai.de",
    password: bcrypt.hashSync("test1234", 8),
    blocked: false
  }).then(user => {
    user.setRoles([1])
  })

  User.create({
    username: "usr3",
    email: "usr3@ai.de",
    password: bcrypt.hashSync("test1234", 8),
    blocked: true
  }).then(user => {
    user.setRoles([1])
  })

  User.create({
    username: "manager",
    email: "manager@ai.de",
    password: bcrypt.hashSync("test1234", 8),
    blocked: false
  }).then(user => {
    user.setRoles([1])
    user.setRoles([2])
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
    userId: 2
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

const initialLoad = {
  role,
  right,
  usr,
  usrLogs, 
  deleteLogs
}

export { initialLoad }
