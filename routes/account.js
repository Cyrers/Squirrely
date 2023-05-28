const express = require("express"); // import express
const router = express.Router(); // initialize express router

// Create a route
router.get("/", (req, res) => {
  //render home.ejs
  res.render("account/login");
});

router.get("/register", (req, res) => {
  // render register.ejs
  res.render("account/register");
});

router.get("/login", (req, res) => {
  // render forgot-password.ejs
  res.render("account/login");
});

// Export router
module.exports = router;
