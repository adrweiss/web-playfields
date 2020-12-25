import { authJwt, verifySignUp } from "../middleware/index.js";
import views from "../controllers/view.controller.js";

export function routsViews(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/view/login",
    [authJwt.verifyToken,
    authJwt.getReadViewLogin,
    authJwt.hasRights],
    views.getLoginData,
  );

  app.get(
    "/api/view/delete",
    [authJwt.verifyToken,
    authJwt.getReadViewDelete,
    authJwt.hasRights],
    views.getDeleteData,
  );
};