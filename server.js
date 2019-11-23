var express = require("express");
var mongojs = require("mongojs");
var path = require("path");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
var databaseUrl = "warmup";
var collections = ["books"];

var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log(error);
});

app.listen(3000, function() {
  console.log("app is listening on port 3000");
});
