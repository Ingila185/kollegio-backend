const express = require("express");
const fetchUsers = require("../middleware/fetchUsers");
const router = express.Router();

router.get("/", fetchUsers, (req, res) => {
  const users = req.usersData;
  res.status(200).json({
    message: "User data fetched successfully via middleware!",
    users: users,
  });
});

module.exports = router;
