exports.isAuthenticated = (req, res, next) => {
  console.log(req.user, req.isAuthenticated());
  if (req.user) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};
