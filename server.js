// server.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");

app.set("views", "views");

// Dummy water level data
let mode = false; // false = manual, true = auto
let waterLevel = 0;
let machineIsOn = false;
// Middleware
app.use(bodyParser.json());

// index page
app.get("/", function (req, res) {
  res.render("index", {
    mode: mode,
    waterLevel: waterLevel,
    machineIsOn: machineIsOn,
  });
});

//*****************For NodeMCU********************
// app.get("/data", function (req, res) {
//   res.json({
//     mode: mode,
//     waterLevel: waterLevel,
//     machineIsOn: machineIsOn,
//   });
// });
app.get("/data", function (req, res) {
  let data;
  if (mode && machineIsOn) {
    data = "11";
  } else if (mode && !machineIsOn) {
    data = "10";
  } else if (!mode && machineIsOn) {
    data = "01";
  } else {
    data = "00";
  }
  res.send(data);
});

//Set Mode
// app.get("/set-mode/:mode", (req, res) => {
//   mode = req.params.mode === "auto";
//   res.json({ success: true, mode: mode });
// });
app.get("/set-mode/:mode", (req, res) => {
  mode = req.params.mode === "auto";
  res.send(mode ? "1" : "0");
});

//Set Water Level
// app.get("/set-water-level/:level", (req, res) => {
//   waterLevel = req.params.level;
//   res.json({ success: true, waterLevel: waterLevel });
// });
app.get("/set-water-level/:level", (req, res) => {
  waterLevel = req.params.level;
  res.send(waterLevel);
});

//Set Machine Status
// app.get("/set-machine-status/:status", (req, res) => {
//   machineIsOn = req.params.status === "on";
//   res.json({ success: true, machineIsOn: machineIsOn });
// });

app.get("/set-machine-status/:status", (req, res) => {
  machineIsOn = req.params.status === "on";
  res.send(machineIsOn ? "1" : "0");
});

//*****************For Browser********************
app.post("/toggle-machine", (req, res) => {
  // Here you can add the logic to control your machine
  machineIsOn = !machineIsOn;
  res.json({ success: true, machineIsOn: machineIsOn });
});

app.post("/toggle-mode", (req, res) => {
  mode = !mode;
  res.json({ success: true, mode: mode });
});

//*****************Running Server********************
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
