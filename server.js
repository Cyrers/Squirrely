if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // import dotenv
}

// Import modules
const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose
const bodyParser = require("body-parser"); // import body-parser
const expressLayouts = require("express-ejs-layouts"); // import express-ejs-layouts
const methodOverride = require("method-override"); // import method-override

const app = express(); // initialize express

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(
  require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Require routes
const indexRouter = require("./routes/index"); // import routes/index.js
const authorRouter = require("./routes/authors"); // import authors.js
const bookRouter = require("./routes/books"); // import books.js
const accountRouter = require("./routes/account"); // import account.js

// Connect to database
mongoose.connect(process.env.DATABASE_URL, {}); // connect to database
const db = mongoose.connection; // initialize mongoose connection
db.on("error", (error) => console.error(error)); // log error
db.once("open", () => console.log("Connected to Mongoose")); // log success

// Use routes
app.use("/", indexRouter); // use index.js
app.use("/authors", authorRouter); // use authors.js
app.use("/books", bookRouter); // use books.js
app.use("/account", accountRouter); // use account.js

app.listen(process.env.PORT || 3000); // listen on port 3000
