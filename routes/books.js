const express = require("express"); // import express
const router = express.Router(); // initialize express router
const Book = require("../models/book"); // import Author model
const Author = require("../models/author"); // import Author model

// All Books Routes
router.get("/", async (req, res) => {
  res.send("All Books");
});

// New Book Route
router.get("/new", async (req, res) => {
  try {
    const authors = await Author.find({});
    const book = new Book();
    res.render("books/new", {
       authors: authors,
        book: book 
      });
  } catch {
    res.redirect("/books");
  }
  // res.send("New Book");
});

// Create Book Route
router.post("/", async (req, res) => {
  res.send("Create Book");
});

module.exports = router;
