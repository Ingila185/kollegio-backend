const { createServer } = require("node:http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const hostname = process.env.HOSTNAME || "127.0.0.1";
const port = process.env.PORT || 3001;

connectDB();

app.use(cors());

app.use("/users", require("./routes/users"));
app.use("/logs", require("./routes/logs"));

const server = createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
