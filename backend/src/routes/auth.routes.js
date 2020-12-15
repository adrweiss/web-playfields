import { verifySignUp, authJwt } from "../middleware/index.js"
import { signup, signin } from "../controllers/auth.controller.js"

export function authRoutes(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      //verifySignUp.checkRolesExisted
    ],
    signup
  );

  app.post("/api/auth/signin", signin);

  app.get(
    "/api/auth/right",
    [authJwt.verifyToken,
    authJwt.getRights]);
};