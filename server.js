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

app.get("/", function(req, res) {
  res.send("Hello world!");
});

app.post("/submit", function(req, res) {
  var book = req.body;
  book.read = true;

  db.books.save(book, function(error, saved) {
    if (error) {
      console.log(error);
    } else {
      res.send(saved);
    }
  });
});

app.get("/read", function(req, res) {
  db.books.find({ read: true }, function(error, found) {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.get("/unread", function(req, res) {
  db.books.find({ read: false }, function(error, found) {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.listen(3000, function() {
  console.log("app is listening on port 3000");
});
