const { createServer } = require("node:http");
const express = require("express");
const axios = require("axios"); // Import axios for making HTTP requests
const mongoose = require("mongoose"); // Import mongoose for MongoDB interactions
require("dotenv").config();

const app = express();
const hostname = process.env.HOSTNAME || "127.0.0.1";
const port = process.env.PORT || 3000;

const USERS_LIST =
  process.env.USERS_LIST || "https://jsonplaceholder.typicode.com/users";

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/kollegio"
);

const RequestLogSchema = new mongoose.Schema({
  timestamp: String,
  url: String,
  method: String,
  success: Boolean,
  error: String,
});

const RequestLog = mongoose.model("RequestLog", RequestLogSchema);

const fetchUsersMiddleware = async (req, res, next) => {
  const usersApiUrl = USERS_LIST;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] Fetching users from: ${usersApiUrl}`);

  try {
    const response = await axios.get(usersApiUrl);
    // Attach the fetched data to the request object
    req.usersData = response.data;
    console.log(
      `[${new Date().toLocaleTimeString()}] Successfully fetched ${
        req.usersData.length
      } users.`
    );
    await RequestLog.create({
      timestamp,
      url: req.originalUrl,
      method: req.method,
      success: true,
      error: null,
    });

    next();
  } catch (error) {
    console.error(
      `[${new Date().toLocaleTimeString()}] Error fetching users:`,
      error.message
    );

    await RequestLog.create({
      timestamp,
      url: req.originalUrl,
      method: req.method,
      success: false,
      error: error.message,
    });
  }
};

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

app.use(requestLogger);

app.get("/users", fetchUsersMiddleware, (req, res) => {
  // Access the data attached by the middleware
  const users = req.usersData;

  if (users) {
    res.status(200).json({
      message: "User data fetched successfully via middleware!",
      users: users,
    });
  } else {
    // This case should ideally be caught by the middleware's error handling,
    // but it's good to have a fallback.
    res.status(500).json({ message: "User data not available." });
  }
});

app.get("/logs", async (req, res) => {
  try {
    const logs = await RequestLog.find().sort({ timestamp: -1 }); // newest first
    res.status(200).json({ logs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch logs", error: error.message });
  }
});

const server = createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
