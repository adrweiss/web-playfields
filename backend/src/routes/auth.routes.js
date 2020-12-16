import { verifySignUp } from "../middleware/index.js"
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
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkDuplicateEmail,
      //verifySignUp.checkDuplicateUsernameOrEmail,
      //verifySignUp.checkRolesExisted
    ],
    signup
  );

  app.post("/api/auth/signin", signin);
};