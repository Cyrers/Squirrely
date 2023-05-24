const mongoose = require("mongoose"); // import mongoose

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Author", authorSchema); // export Author model
