import { authJwt, verifySignUp } from "../middleware/index.js";
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
    [authJwt.verifyToken,
    authJwt.getReadRoleManagement,
    authJwt.hasRights,
    authJwt.isAdmin,],
    mgtRolesFunctions.getRoleAndRight,
  );

  app.get(
    "/api/mgt/right",
    [authJwt.verifyToken,
    authJwt.getEditRole,
    authJwt.hasRights],
    mgtRolesFunctions.getRights,
  );

  app.post(
    "/api/mgt/role",
    [authJwt.verifyToken,
    authJwt.getEditRole,
    authJwt.hasRights,
    verifySignUp.checkDuplicateRoleName,],
    mgtRolesFunctions.addNewRole
  );

  app.put(
    "/api/mgt/role",
    [authJwt.verifyToken,
    authJwt.getEditRole,
    authJwt.hasRights,],
    mgtRolesFunctions.changeRole
  );

  app.delete(
    "/api/mgt/role",
    [authJwt.verifyToken,
    authJwt.getEditRole,
    authJwt.hasRights,],
    mgtRolesFunctions.deleteRole
  );
};