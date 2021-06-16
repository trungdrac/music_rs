require("dotenv").config();

const express = require("express");
const app = express();

// View engine setup
app.set("views", "../admin");
app.set("view engine", "ejs");

app.use(express.static("public"));

// Use body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use passport and session to authorization
const passport = require("passport");
const session = require("express-session");
app.use(
  session({
    secret: "process.env.APP_SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Use flash
const flash = require("connect-flash");
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Connect to DB
const db = require("./config/db");
db.connect();

// Schedule
const Schedule = require("./config/schedule");
Schedule.updateRecommendationData();
Schedule.updateCountForChart();

// Routes init
const route = require("./routes");
route(app);

// const path = require('path');
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
