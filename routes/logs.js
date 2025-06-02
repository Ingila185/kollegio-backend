const express = require("express");
const RequestLog = require("../models/RequestLog");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const logs = await RequestLog.find().sort({ timestamp: -1 });
    res.status(200).json({ logs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch logs", error: error.message });
  }
});

module.exports = router;
