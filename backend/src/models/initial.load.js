import bcrypt from 'bcrypt';

export function initialRole(Role) {
  Role.create({
    id: 1,
    name: "USER"
  });

  Role.create({
    id: 2,
    name: "MANAGER"
  });

  Role.create({
    id: 3,
    name: "ADMIN"
  });
  return initialRole
}

export function initialRight(Right) {
  Right.create({
    id: 1,
    name: "ADMIN"
  }).then(right => {
    right.setRoles([3])
  });

  Right.create({
    id: 2,
    name: "READ_USER_VIEW"
  }).then(right => {
    right.setRoles([1])
  });

  Right.create({
    id: 3,
    name: "READ_MANAGEMNT_VIEW"
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