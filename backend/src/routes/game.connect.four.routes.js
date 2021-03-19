import { authJwt } from "../middleware/index.js";
import gameCfController from "../controllers/game.connect.four.controller.js"

export function gameCfRoutes(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/game/cf/result",
    gameCfController.postGameResult,
  );

  app.post(
    "/api/game/personal/cf/result",
    authJwt.verifyToken,
    gameCfController.postGameResult,
  );
  
  app.get(
    "/api/game/cf/stats",
    gameCfController.getGameStats,
  );

  app.get(
    "/api/game/personal/cf/stats",
    authJwt.verifyToken,
    gameCfController.getGameStats,
  );
};