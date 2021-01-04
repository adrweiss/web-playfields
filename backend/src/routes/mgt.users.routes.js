import { authJwt } from "../middleware/index.js";
import mgtUserFunctions from "../controllers/mgt.users.controller.js";

export function routsMgtUsers(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // get all user infos 
  app.get(
    "/api/mgt/user",
    [authJwt.verifyToken,
    authJwt.getReadUserManagement,
    authJwt.hasRights,],
    mgtUserFunctions.getUserInfos,
  );

  // delete usr
  app.delete(
    "/api/mgt/user",
    [authJwt.verifyToken,
    authJwt.getWriteUsrLevel2,
    authJwt.hasRights,
    authJwt.isAdmin,
    authJwt.requireAdmin,],
    mgtUserFunctions.deleteUser,
  );

  // block usr 
  app.put(
    "/api/mgt/user",
    [authJwt.verifyToken,
    authJwt.getWriteUsr,
    authJwt.hasRights,
    authJwt.isAdmin,
    authJwt.requireAdmin,],
    mgtUserFunctions.changeBlockStatusFromUser,
  );

  // change pw 
  app.put(
    "/api/mgt/user/chgpw",
    [authJwt.verifyToken,
    authJwt.getWriteUsrLevel2,
    authJwt.hasRights,
    authJwt.isAdmin,
    authJwt.requireAdmin,],
    mgtUserFunctions.changePasswordFromUser,
  );

  // change role 
  app.put(
    "/api/mgt/user/role",
    [authJwt.verifyToken,
    authJwt.getWriteRoleUsr,
    authJwt.hasRights,
    authJwt.isAdmin,
    authJwt.requireAdmin,],
    mgtUserFunctions.changeRole,
  );
}



