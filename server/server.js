require("dotenv").config();

const express = require("express");
const app = express();

const route = require("./routes");
const db = require("./config/db");
var bodyParser = require("body-parser");

// Connect to DB
db.connect();

// body-parser
app.use(express.json());

// Routes init
route(app);

const port = 5000;
app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${port}`);
});
