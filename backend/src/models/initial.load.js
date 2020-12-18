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
    name: "ADMIN", 
    description: "Its a admin right, everything is allowed.",
  }).then(right => {
    right.setRoles([3])
  });

  Right.create({
    name: "READ_USER_VIEW",
    description: "Read access to the personal userpage.",
  }).then(right => {
    right.setRoles([1])
  });

  Right.create({
    name: "WRITE_OWN_USR_SETTINGS",
    description: "Change your own user settings.",
  }).then(right => {
    right.setRoles([1])
  });

  Right.create({
    name: "READ_MANAGEMNT_VIEW",
    description: "Read access to the management overview.",
  }).then(right => {
    right.setRoles([2])
  });

  Right.create({
    name: "READ_USER_MANAGEMENT",
    description: "Get read access to the user overview.",
  }).then(right => {
    right.setRoles([2])
  });

  Right.create({
    name: "READ_ROLE_MANAGEMENT",
    description: "Get read access to the role overview.",
  }).then(right => {
    right.setRoles([2])
  });
  
  Right.create({
    name: "READ_VIEW_LOGIN",
    description: "Get access the Login logs.",
  }).then(right => {
    right.setRoles([2])
  });

  Right.create({
    name: "READ_VIEW_DELETE",
    description: "Get access the deleted accounts logs.",
  }).then(right => {
    right.setRoles([2])
  });

  Right.create({
    name: "EDIT_ROLE",
    description: "Changes roles (role name, role description, related rights) and delete roles.",
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