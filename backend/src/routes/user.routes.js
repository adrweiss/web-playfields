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
    authJwt.hasWOUS,
    verifySignUp.checkDuplicateUsername,],
    userFunctions.changeUserName);

  app.put(
    "/api/usr/mgt/chgPW",
    [authJwt.verifyToken,
    authJwt.hasWOUS,
    verifySignUp.checkPassword,],
    userFunctions.changeUserPassword)

  app.delete(
    "/api/usr/mgt",
    [authJwt.verifyToken,
    authJwt.hasWOUS,],
    userFunctions.deleteUsr);

  app.get(
    "/api/usr/rights",
    [authJwt.verifyToken,
    authJwt.hasRUV],
    userFunctions.getRights);
};