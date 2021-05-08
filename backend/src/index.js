require("dotenv-safe").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRouter = require("./routes/auth.route");
const imageRouter = require("./routes/image.route");
// const authRouter = require('./routes/auth.route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/auth", authRouter);
app.use("/images", imageRouter);

app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

app.get("/", (req, res, next) => {
  res.send("Cloud image hosting app");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(1234, () => {
  console.log("App listening at", 1234);
});
