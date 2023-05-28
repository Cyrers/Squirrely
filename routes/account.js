const express = require("express");
const router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
const User = require("../models/user");
var app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Show account home page
router.get("/", (req, res) => {
  // Render index.ejs
  res.render("account/home");
});

// Show login page
router.get("/login", (req, res) => {
  // Render login.ejs
  res.render("account/login");
});

// Handle login
router.post("/login", async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      if (result) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Show register page
router.get("/register", (req, res) => {
  // Render register.ejs
  res.render("account/register");
});

// Handle register
router.post("/register", async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
  });

  return res.status(200).json(user);
});

// Export router
module.exports = router;
