import { authJwt } from "../middleware/index.js";
import mgtRolesFunctions from "../controllers/mgt.role.controller.js";

export function routsMgtRoles(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/mgt/role",
    [],
    mgtRolesFunctions.getRoleAndRight,
  );

  app.post(
    "/api/mgt/role",
    [],
    mgtRolesFunctions.addNewRole
  );

  app.put(
    "/api/mgt/role",
    [],
    mgtRolesFunctions.changeRole
  );

  app.delete(
    "/api/mgt/role",
    [],
    mgtRolesFunctions.deleteRole
  );
};