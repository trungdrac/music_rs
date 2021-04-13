const express = require("express");
const app = express();
const port = 5000;

const route = require('./routes/api');
const db = require("./config/db");

//Connect to DB
db.connect();

// Routes init
route(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
