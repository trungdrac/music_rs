const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connect DB successfully !!!");
  } catch (error) {
    console.log("Connect DB failure !!!");
  }
}

module.exports = { connect };
