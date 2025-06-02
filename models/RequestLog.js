const mongoose = require("mongoose");

const RequestLogSchema = new mongoose.Schema({
  timestamp: String,
  url: String,
  method: String,
  success: Boolean,
  error: String,
});

module.exports = mongoose.model("RequestLog", RequestLogSchema);
