import bcrypt from 'bcrypt';

export function initialRole(Role) {
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
  
  return initialRole
}

export function initialRight(Right, Role) {
  Right.create({
    name: "ADMIN", 
    description: "Its a admin right, everything is allowed.",
  }).then(right => {
    Role.findOne({
      where: { name: 'ADMIN'}
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "READ_USER_VIEW",
    description: "Read access to the personal userpage.",
  }).then(right => {
    Role.findOne({
      where: { name: 'USER'}
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "WRITE_OWN_USR_SETTINGS",
    description: "Change your own user settings.",
  }).then(right => {
    Role.findOne({
      where: { name: 'USER'}
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "READ_MANAGEMNT_VIEW",
    description: "Read access to the management overview.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER'}
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "READ_USER_MANAGEMENT",
    description: "Get read access to the user overview.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER'}
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "READ_ROLE_MANAGEMENT",
    description: "Get read access to the role overview.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER'}
    }).then(role => {
      right.setRoles(role)
    })
  });
  
  Right.create({
    name: "READ_VIEW_LOGIN",
    description: "Get access the Login logs.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER'}
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "READ_VIEW_DELETE",
    description: "Get access the deleted accounts logs.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER'}
    }).then(role => {
      right.setRoles(role)
    })
  });

  Right.create({
    name: "EDIT_ROLE",
    description: "Changes roles (role name, role description, related rights) and delete roles.",
  }).then(right => {
    Role.findOne({
      where: { name: 'MANAGER'}
    }).then(role => {
      right.setRoles(role)
    })
  });

  return initialRight
}

export function initialUsr(User) {
  User.create({
    username: "admin",
    email: "admin@ai.de",
    password: bcrypt.hashSync("test1234", 8)
  }).then(user => {
    user.setRoles([3])
  })

  User.create({
    username: "usr",
    email: "usr@ai.de",
    password: bcrypt.hashSync("test1234", 8)
  }).then(user => {
    user.setRoles([1])
  })

  User.create({
    username: "usr2",
    email: "usr2@ai.de",
    password: bcrypt.hashSync("test1234", 8)
  }).then(user => {
    user.setRoles([1])
  })

  User.create({
    username: "manager",
    email: "manager@ai.de",
    password: bcrypt.hashSync("test1234", 8)
  }).then(user => {
    user.setRoles([1])
    user.setRoles([2])
  })

  return initialUsr
}