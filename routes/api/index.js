const router = require("express").Router();
const articlesRoutes = require("./articles/ArticlesRoutes");
const nytRoutes = require("./nyt/nytRoutes");

router.use("/articles", articlesRoutes);
router.use("/nyt", nytRoutes);

module.exports = router;