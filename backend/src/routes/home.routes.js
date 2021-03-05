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
    "/api/home/post/any",
    homeController.writePost,
  );

  app.get(
    "/api/home/posts",
    homeController.getAmount,
  );

  app.get(
    "/api/home/post",
    homeController.getPost,
  );

  app.get(
    "/api/home/desc",
    homeController.getDescriptions,
  );

  app.post(
    "/api/home/report",
    homeController.putReportPost,
  );

  app.post(
    "/api/home/post/user",
    [authJwt.verifyToken,
    authJwt.getWritePost,
    authJwt.hasRights
    ],
    homeController.writePost,
  );

  app.delete(
    "/api/home/post/user",
    [authJwt.verifyToken,
    authJwt.getWritePost,
    authJwt.hasRights
    ],
    homeController.deletePost,
  );

  app.delete(
    "/api/home/post/any",
    [authJwt.verifyToken,
    authJwt.getDeleteAnyPost,
    authJwt.hasRights
    ],
    homeController.deleteAnyPost,
  );

  app.put(
    "/api/home/post/user",
    [authJwt.verifyToken,
    authJwt.getWritePost,
    authJwt.hasRights
    ],
    homeController.editPost,
  );

  app.put(
    "/api/home/post/any",
    [authJwt.verifyToken,
    authJwt.getEditAnyPost,
    authJwt.hasRights
    ],
    homeController.editAnyPost,
  );

  app.get(
    "/api/home/desc/all",
    [authJwt.verifyToken,
    authJwt.getEditDescriptionHome,
    authJwt.hasRights
    ],
    homeController.getAllDescriptions,
  );

  app.delete(
    "/api/home/desc",
    [authJwt.verifyToken,
    authJwt.getEditDescriptionHome,
    authJwt.hasRights
    ],
    homeController.deleteDescriptions,
  );

  app.put(
    "/api/home/desc/status",
    [authJwt.verifyToken,
    authJwt.getEditDescriptionHome,
    authJwt.hasRights
    ],
    homeController.putVisibleStatus,
  );

  app.put(
    "/api/home/desc",
    [authJwt.verifyToken,
    authJwt.getEditDescriptionHome,
    authJwt.hasRights
    ],
    homeController.editDescription,
  );  
  
  // re-order description 
  // add description 
};