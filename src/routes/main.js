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

router.get("/filter-top-country", async function (req, res) {
  const top = await Report.aggregate([
    {
      $group: {
        _id: "$country",
        totalSales: { $sum: "$sale" },
      },
    },
    { $sort: { totalSales: 1 } },
    { $limit: 3 },
  ]);

  const least = await Report.aggregate([
    {
      $group: {
        _id: "$country",
        totalSales: { $sum: "$sale" },
      },
    },
    { $sort: { totalSales: -1 } },
    { $limit: 3 },
  ]);

  if (top && least) {
    console.log("top", top);
    console.log("least", least);
    res.json({ top, least });
  }
});

router.get("/average-sale", async function (req, res) {
  const av = await Report.aggregate([
    {
      $group: {
        _id: {
          product: "$petroleum_product",
          year: {
            $subtract: [
              Date.parse("$year"),
              { $mod: [Date.parse("$year"), 4] },
            ],
          },
        },
        totalSales: { $sum: "$sale" },
        count: { $sum: { $cond: [{ $ne: ["$sale", 0] }, 1, 0] } },
      },
    },
    { $match: { count: { $gt: 0 } } },
    {
      $project: {
        _id: 0,
        product: "$_id.product",
        year: "$_id.year",
        averageSale: { $divide: ["$totalSales", "$count"] },
      },
    },
  ]);

  if (av) {
    res.json(av);
  }
});
module.exports = router;
