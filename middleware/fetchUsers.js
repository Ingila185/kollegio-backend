const axios = require("axios");
const RequestLog = require("../models/RequestLog"); // See below for model extraction

const USERS_LIST =
  process.env.USERS_LIST || "https://jsonplaceholder.typicode.com/users";

module.exports = async (req, res, next) => {
  const usersApiUrl = USERS_LIST;
  const timestamp = new Date().toISOString();

  try {
    const response = await axios.get(usersApiUrl);
    req.usersData = response.data;
    await RequestLog.create({
      timestamp,
      url: req.originalUrl,
      method: req.method,
      success: true,
      error: null,
    });
    next();
  } catch (error) {
    await RequestLog.create({
      timestamp,
      url: req.originalUrl,
      method: req.method,
      success: false,
      error: error.message,
    });
    res
      .status(500)
      .json({ message: "User data not available.", error: error.message });
  }
};
