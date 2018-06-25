const router = require("express").Router();
const axios = require("axios");

require("dotenv").config();

// Geocoder API
const APIKey = "9e38d3001eee43ba8a1d2a51ab80a59a";

// Matches with "/api/nyt"
router
  .route("/")
  .get(function (req, res) {
    const qstr = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.nytAPI}`
    console.log(req.query);
    axios.get(qstr, {
        params: req.query
      })
      .then(function (articlesData) {
        res.json(articlesData.data);
      })
      .catch(function (err) {
        console.log(err);
        res.json(err)
      })

  });


module.exports = router;