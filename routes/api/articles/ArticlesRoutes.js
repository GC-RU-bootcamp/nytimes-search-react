const router = require("express").Router();
const articleController = require("../../../controllers/articleContoller");

// Matches with "/api/articles"
router
  .route("/")
  .get(articleController.findAll)
  .post(articleController.create);

// Matches with "/api/article/:id"
router
  .route("/api/articles/:id")
  .get(articleController.findById)
  .put(articleController.update)
  .delete(articleController.remove);

module.exports = router;
