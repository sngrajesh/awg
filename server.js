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
app.get("/data", function (req, res) {
  res.json({
    mode: mode,
    waterLevel: waterLevel,
    machineIsOn: machineIsOn,
  });
});

//Set Mode
app.get("/set-mode/:mode", (req, res) => {
  mode = req.params.mode === "auto";
  res.json({ success: true, mode: mode });
});

//Set Water Level
app.get("/set-water-level/:level", (req, res) => {
  waterLevel = req.params.level;
  res.json({ success: true, waterLevel: waterLevel });
});

app.get("/set-machine-status/:status", (req, res) => {
  machineIsOn = req.params.status === "on";
  res.json({ success: true, machineIsOn: machineIsOn });
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
