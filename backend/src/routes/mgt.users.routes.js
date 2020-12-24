import { authJwt, verifySignUp } from "../middleware/index.js";
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
    authJwt.hasRights,
    authJwt.isAdmin,],
    mgtUserFunctions.getUserInfos,
  );

  // remove role 
  app.put(
    "/api/mgt/user/removerole",
    [authJwt.verifyToken,
    authJwt.getWriteRoleUsr,
    authJwt.hasRights,
    authJwt.isAdmin,],
    mgtUserFunctions.removeRoleFromUser,
  );

  // add role 
  app.put(
    "/api/mgt/user/addrole",
    [authJwt.verifyToken,
    authJwt.getWriteRoleUsr,
    authJwt.hasRights,
    authJwt.isAdmin,],
    mgtUserFunctions.addRoleToUser,
  );

  // change pw 
  app.put(
    "/api/mgt/user/chgpw",
    [authJwt.verifyToken,
    authJwt.getWriteUsrLevel2,
    authJwt.hasRights,
    authJwt.isAdmin,],
    mgtUserFunctions.changePasswordFromUser,
  );

  // delete usr
  app.delete(
    "/api/mgt/user",
    [authJwt.verifyToken,
    authJwt.getWriteUsrLevel2,
    authJwt.hasRights,
    authJwt.isAdmin,],
    mgtUserFunctions.deleteUser,
  );

  // block usr 
  app.delete(
    "/api/mgt/user",
    [authJwt.verifyToken,
    authJwt.getWriteUsr,
    authJwt.hasRights,
    authJwt.isAdmin,],
    mgtUserFunctions.changeBlockStatusFromUser,
  );
}



