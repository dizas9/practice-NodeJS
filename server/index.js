const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const mongoURI =
  "mongodb+srv://dizas9:yoyo@cluster0.kxj2bsu.mongodb.net/?retryWrites=true&w=majority";

//connect mongodb
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

//session Store
const store = new MongoDBStore({
  uri: mongoURI,
  databaseName: "Session",
  collection: "session",
});

app.use(
  session({
    secret: "hello secret",
    cookie: {
      maxAge: 5000,
      httpOnly: false,
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello Express again" + JSON.stringify(req.session));
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
