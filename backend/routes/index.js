var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");
mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();


router.get("/", function (req, res) {
  res.send("login");
});

router.get("/register", function (req, res) {
  res.send("Registrar");
});

router.get("/home", function (req, res) {
  res.send("Logged In");
});


app.use(router);

app.listen(3000, function () {
  console.log("Node server running on http://localhost:3000");
});