// Questin no 1 )    Simply call the data from api

const https = require("https");

const options = {
  hostname: "raw.githubusercontent.com",
  path: "/younginnovations/internship-challenges/master/programming/petroleum-report/data.json",
  method: "GET",
};

// const req = https.request(options, (res) => {
//   console.log(`statusCode: ${res.statusCode}`);

//   res.on("data", (d) => {
//     // const data = JSON.parse(d);
//     // const data = process.stdout.write(d);
//     // console.log(data);
//   });
// });

// req.on("error", (error) => {
//   console.error(error);
// });

// req.end();
