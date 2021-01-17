import { verifySignUp, authJwt } from "../middleware/index.js";
import userFunctions from "../controllers/user.controller.js";

export function routsUsr(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.put(
    "/api/usr/mgt/chgUN",
    [authJwt.verifyToken,
    authJwt.getWriteOwnUsrSettings,
    authJwt.hasRights,
    verifySignUp.checkDuplicateUsername,],
    userFunctions.changeUserName);

  app.put(
    "/api/usr/mgt/chgPW",
    [authJwt.verifyToken,
    authJwt.getWriteOwnUsrSettings,
    authJwt.hasRights,
    verifySignUp.checkPassword,],
    userFunctions.changeUserPassword)

  app.delete(
    "/api/usr/mgt",
    [authJwt.verifyToken,
    authJwt.getWriteOwnUsrSettings,
    authJwt.hasRights,
    authJwt.isAdmin,],
    userFunctions.deleteUsr);

  app.get(
    "/api/usr/roles",
    [authJwt.verifyToken,
    authJwt.getReadUsrView,
    authJwt.hasRights,],
    userFunctions.getRoles);

  app.get(
    "/api/usr/rights",
    [authJwt.verifyToken,],
    userFunctions.getRights);

  app.post("/api/usr/resetpw", userFunctions.resetPassword);  
  
  app.post("/api/usr/setforgottpw", userFunctions.sendNewPassword);  
};