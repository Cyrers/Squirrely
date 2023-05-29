var express = require("express");
var passport = require("passport"); // import passport
//var bodyParser = require("body-parser"); // import body-parser
var LocalStrategy = require("passport-local"); // import passport-local
var passportLocalMongoose = require("passport-local-mongoose"); // import passport-local-mongoose
const router = express.Router();
const User = require("../models/user");

var app = express(); // initialize express

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
    // Authenticate user
    await passport.authenticate("local", {
      successRedirect: "/", // Redirect to home page
      failureRedirect: "login", // Redirect to login page
    })(req, res);
    //console.log("Success");
  } catch {
    res.redirect("/account/login");
    //console.log("Error");
  }
});

// Show register page
router.get("/register", (req, res) => {
  // Render register.ejs
  res.render("account/register");
});

// Handle register
router.post("/register", async (req, res) => {
  try {
    // Create a new user
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    // Save user
    await user.save();
    // Redirect to login page
    res.redirect("login");
  } catch {
    res.redirect("/account/register");
  }
});

// Export router
module.exports = router;
