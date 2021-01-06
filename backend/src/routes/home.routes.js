import { authJwt } from "../middleware/index.js";
import homeController from "../controllers/home.controller.js";

export function routsHome(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/home/post/user",
    [],
    homeController.writePost,
  );

  app.post(
    "/api/home/post/any",
    homeController.writePost,
  );

  app.get(
    "/api/home/post",
    homeController.getPost,
  );

  app.delete(
    "/api/home/post",
    [],
    homeController.deletePost,
  );

  app.get(
    "/api/home/posts",
    [],
    homeController.getAmount,
  );
};