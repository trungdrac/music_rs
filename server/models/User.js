const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      minLength: 4,
      required: true,
      trim: true,
    },
    password: { type: String, required: true, minLength: 6 },
    email: { type: String, unique: true, required: true, trim: true },
    role: { type: String, default: "user" },
    resettoken: String,
    expiretoken: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
