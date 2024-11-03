const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res
        .status(401)
        .json({ error: info?.message || "Authentication failed" });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        user,
        sessionID: req.sessionID,
        message: "Login successful",
      });
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Logged out successfully" });
  });
});

router.get("/check", (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
    sessionID: req.sessionID,
  });
});

module.exports = router;
