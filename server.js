const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
//Mongoose Middleware
mongoose.set("useCreateIndex", true);
//Models
const User = new mongoose.model("User", require("./models/userModel"));
//Set up default mongoose connection
var mongoDB = "mongodb://localhost:27017/jwtTest";
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully connected to MongoDB");
    }
  }
);

const port = process.env.PORT || 5000;
const secret = "umairOnlyUsesBestPractices";
const mockUser = {
  id: 1,
  username: "umair",
  email: "umair@gmail.com",
};
const app = express();
//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    User.findOne({ email: req.body.user.email }, (err, doc) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        // console.log(doc[0].token);
        if (bearerToken === doc.token) {
          next();
        } else {
          res.sendStatus(403);
        }
        // req.token = bearerToken;
      }
    });
  } else {
    res.sendStatus(403);
  }
};

app.post("/api/login", (req, res) => {
  const { user } = req.body;
  User.findOne({ email: user.email }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      if (!doc) {
        res.status(200).json({ message: "No User Exist" });
      } else {
        if (user.password !== doc.password) {
          res.status(200).json({ message: "Wrong Password!" });
        } else {
          res.status(200).send(doc);
        }
      }
    }
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.post("/api/post", verifyToken, (req, res) => {
  jwt.verify(req.body.user.token, secret, (err, user) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        ...user,
        message: "Post created...",
      });
    }
  });
});

app.post("/api/register", (req, res) => {
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
});

app.listen(port, () => console.log("Server is starting", port));
