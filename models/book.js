const mongoose = require("mongoose"); // import mongoose

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  decsription: {
    type: String,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  coverImageName: {
    type: String,
    required: true,
  },
  author: { // author is a reference to the Author model
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
});

module.exports = mongoose.model("Book", bookSchema); // export Book model