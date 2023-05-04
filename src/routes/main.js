const express = require("express");
const report = express();
const router = express.Router();
const https = require("https");
const fs = require("fs");
const axios = require("axios");
const Report = require("../models/dataModel.js");

router.get("/data/add", async (req, res) => {
  const options = {
    hostname: "raw.githubusercontent.com",
    path: "/younginnovations/internship-challenges/master/programming/petroleum-report/data.json",
    method: "GET",
  };

  let ax = await axios.get(
    "https://raw.githubusercontent.com/younginnovations/internship-challenges/master/programming/petroleum-report/data.json"
  );

  //   console.log(ax);
  try {
    if (ax) {
      const resAx = await Report.create(ax.data);

      if (resAx) {
        res.json(resAx);
      } else {
        res.status(500).send("Error");
      }
    }
  } catch (error) {
    console.log("adding report error", error);
  }
});

router.get("/get-reports", async function (req, res) {
  const response = await Report.find();
  // console.log(response);
  if (response) {
    res.json(response);
  } else {
    res.status(500).send("Error");
  }
});

router.get("/total-sale-each-petroleum", function (req, res) {
  Report.aggregate([
    {
      $group: {
        _id: "$petroleum_product",
        total: {
          $sum: "$sale",
        },
      },
    },
  ]).then(function (err, result) {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.json(result);
    }
  });
});

module.exports = router;
