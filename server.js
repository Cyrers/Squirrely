if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // import dotenv
}









const express = require("express"); // import express
const app = express(); // initialize express
const expressLayouts = require("express-ejs-layouts"); // import express-ejs-layouts
const bodyParser = require("body-parser"); // import body-parser









// Require routes
const indexRouter = require("./routes/index"); // import routes/index.js
const authorRouter = require("./routes/authors"); // import authors.js
const bookRouter = require("./routes/books"); // import books.js








app.set("view engine", "ejs"); // set view engine to ejs
app.set("views", __dirname + "/views"); // set views directory
app.set("layout", "layouts/layout"); // set layout directory
app.use(expressLayouts); // use express-ejs-layouts
app.use(express.static("public")); // set public directory
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false })); // use body-parser








// Connect to database
const mongoose = require("mongoose"); // import mongoose
mongoose.connect(process.env.DATABASE_URL, {}); // connect to database








const db = mongoose.connection; // initialize mongoose connection
db.on("error", (error) => console.error(error)); // log error
db.once("open", () => console.log("Connected to Mongoose")); // log success








// Use routes
app.use("/", indexRouter); // use index.js
app.use("/authors", authorRouter); // use authors.js
app.use("/books", bookRouter); // use books.js







app.listen(process.env.PORT || 3000); // listen on port 3000
