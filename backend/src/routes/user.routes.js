import { authJwt } from "../middleware/index.js";
import { getRights } from "../controllers/user.controller.js";

export function routsUsr(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/usr/rights",
    [authJwt.verifyToken,
    authJwt.hasRUV],
    getRights);
};