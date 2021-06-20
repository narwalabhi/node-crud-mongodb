const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const mongodbUrl =
  "mongodb+srv://m001-student:realunited@sandbox.5ke5h.mongodb.net/BookDb?retryWrites=true&w=majority";

const app = express();
const db = mongoose.connect(mongodbUrl);
const port = process.env.PORT || 3000;
const Book = require("./models/bookModel");

const bookRouter = require("./routes/bookRouter")(Book);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my first node API!");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
