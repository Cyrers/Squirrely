const express = require("express"); // import express
const router = express.Router(); // initialize express router
const Book = require("../models/book"); // import Author model

// All Books Routes
router.get("/", async (req, res) => {
  res.send("All Books");
});

// New Book Route
router.get("/new", (req, res) => {
  res.send("New Book");
});

// Create Book Route
router.post("/", async (req, res) => {
  res.send("Create Book");
});

module.exports = router;
