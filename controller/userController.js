const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = new mongoose.model("User", require("../models/userModel"));
const secret = "umairOnlyUsesBestPractices";
exports.createUser = (req, res, next) => {
  const { user } = req.body;

  if (typeof user === "undefined") {
    res.status(200).json({ message: "please provide email and password" });
  } else {
    const newUser = new User(user);
    jwt.sign({ newUser }, secret, (err, token) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        newUser.token = token;
        newUser.save();
        res.status(200).send(newUser);
      }
    });
  }
};
exports.updateUser = (req, res, next) => {
  console.log("User Updated");
};
exports.readUser = (req, res, next) => {
  console.log("User Fetched");
};
exports.deleteUser = (req, res, next) => {
  console.log("User Deleted");
};

exports.getAllUser = (req, res, next) => {
  console.log("All Users Fetched");
};
