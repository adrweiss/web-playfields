import bcrypt from 'bcrypt';

export function initialRole(Role) {
  Role.create({
    id: 1,
    name: "USER",
    description: "User role which is the defautl role for new users.",
  });

  Role.create({
    id: 2,
    name: "MANAGER",
    description: "Role for manager.",
  });

  Role.create({
    id: 3,
    name: "ADMIN",
    description: "Role for the system admin."
  });
  return initialRole
}

export function initialRight(Right) {
  Right.create({
    id: 1,
    name: "ADMIN", 
    description: "Its a admin right, everything is allowed.",
  }).then(right => {
    right.setRoles([3])
  });

  Right.create({
    id: 2,
    name: "READ_USER_VIEW",
    description: "Read access to the personal userpage.",
  }).then(right => {
    right.setRoles([1])
  });

  Right.create({
    id: 3,
    name: "READ_MANAGEMNT_VIEW",
    description: "Read access to the management overview.",
  }).then(right => {
    right.setRoles([2])
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
    username: "manager",
    email: "manager@ai.de",
    password: bcrypt.hashSync("test1234", 8)
  }).then(user => {
    user.setRoles([1])
    user.setRoles([2])
  })

  return initialUsr
}