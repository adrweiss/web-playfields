export function initial(Role) {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "manager"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
  return initial
}
