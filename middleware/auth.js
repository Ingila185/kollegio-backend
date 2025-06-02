module.exports = (req, res, next) => {
  // Example: check for an API key in headers
  // if (!req.headers['x-api-key'] || req.headers['x-api-key'] !== process.env.API_KEY) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }
  next();
};
