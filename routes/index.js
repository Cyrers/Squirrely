const express = require("express"); // import express
const router = express.Router(); // initialize express router

// Create a route (root)
router.get("/", (req, res) => {
  res.render("index");
});

// Export router
module.exports = router;
