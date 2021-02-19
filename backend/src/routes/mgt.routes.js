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

  app.get(
    "/api/mgt/bug/messages",
    [authJwt.verifyToken,
    authJwt.getReadBugReports,
    authJwt.hasRights],
    mgtController.getPostedBugs,
  );

  app.put(
    "/api/mgt/bug/status",
    [authJwt.verifyToken,
    authJwt.getReadBugReports,
    authJwt.hasRights],
    mgtController.setSolvedStatusPostedBugs,
  );

  app.get(
    "/api/mgt/bug/amount",
    [authJwt.verifyToken,
    authJwt.getReadBugReports,
    authJwt.hasRights],
    mgtController.getAmountPostedBugs,
  );

  app.get(
    "/api/mgt/report/messages",
    [authJwt.verifyToken,
    authJwt.getReadPostReports,
    authJwt.hasRights],
    mgtController.getReportedPosts,
  );

  app.put(
    "/api/mgt/report/status",
    [authJwt.verifyToken,
    authJwt.getReadPostReports,
    authJwt.hasRights],
    mgtController.setSolvedStatusReportedPosts,
  );

  app.put(
    "/api/mgt/report/blocked",
    [authJwt.verifyToken,
    authJwt.getReadPostReports,
    authJwt.hasRights],
    mgtController.setBlockedStatusReportedPosts,
  );

  app.get(
    "/api/mgt/report/amount",
    [authJwt.verifyToken,
    authJwt.getReadPostReports,
    authJwt.hasRights],
    mgtController.getAmountReportedPosts,
  );

  app.get(
    "/api/mgt/contact/messages",
    [authJwt.verifyToken,
    authJwt.getReadContactRequests,
    authJwt.hasRights],
    mgtController.getContactMessages,
  );

  app.put(
    "/api/mgt/contact/status",
    [authJwt.verifyToken,
    authJwt.getReadContactRequests,
    authJwt.hasRights],
    mgtController.setSolvedStatusContactMessages,
  );

  app.get(
    "/api/mgt/contact/amount",
    [authJwt.verifyToken,
    authJwt.getReadContactRequests,
    authJwt.hasRights],
    mgtController.getAmountContactMessages,
  );
};
