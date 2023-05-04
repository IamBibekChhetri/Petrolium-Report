const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const report = express();
const Data = require("./models/Datas.js");
const routes = require("./routes/main.js");

report.use("/", routes);

report.listen(process.env.PORT | 5555, () => {
  console.log("Server is running");

  try {
    const db = mongoose.connect("mongodb://127.0.0.1:27017/petrolium_report", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (db) {
      console.log("Connected to database");
    } else {
      console.log("Could not connect to database");
    }
  } catch (error) {
    console.log("Could not connect to database");
  }
});
