require("dotenv").config();

const express = require("express");
const app = express();

const route = require("./routes");
const db = require("./config/db");

// View engine setup
app.set("views", "../admin");
app.set("view engine", "ejs");

app.use(express.static("public"));

// body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to DB
db.connect();

// Routes init
route(app);

// Handle error middleware
app.use(function (err, req, res, next) {
  res.json({ message: err });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
