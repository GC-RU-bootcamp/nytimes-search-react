const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");

//define middelware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Server up static assests (usally on Heroku)
if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
}


//Define API routes here
app.use(routes);
// Send every other reqiest to the React app
//Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, ".client/build/index.html"));
});

mongoose.connect(process.env.MONGODB_URI||
  "mongodb://localhost/nytreact");

app.listen(PORT, () => {
  console.log(`Node Server listening on port ${PORT}`);
});
