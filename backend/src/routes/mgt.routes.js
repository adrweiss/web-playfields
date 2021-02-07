import { authJwt } from "../middleware/index.js";
import mgtController from "../controllers/mgt.controller.js";

export function routsMgt(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/mgt/build",
    [authJwt.verifyToken,
    authJwt.getTriggerBuild,
    authJwt.hasRights],
    mgtController.buildProd,
  );
};

