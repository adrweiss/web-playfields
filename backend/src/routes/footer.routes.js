import footer from "../controllers/footer.controller.js"

export function routsFooter(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/footer/contact", footer.postContactForm);  
  
  app.post("/api/footer/bug", footer.postBug);  
};