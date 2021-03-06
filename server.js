require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

const session = require("express-session");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const BatchController = require("./controllers/BatchController");
app.use("/batch", BatchController);

const ListingController = require("./controllers/ListingController");
app.use("/listing", ListingController);

const UserController = require("./controllers/UserController");
app.use("/user", UserController);

const sessionController = require("./controllers/SessionsController");
app.use("/session", sessionController);

app.get("/", (req, res) => {
  res.send("test");
});

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log("Server is listening on port" + port);
});
