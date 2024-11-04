const express = require("express");
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
const routes = require("./src/routes");
const authRoutes = require("./src/routes/auth");
const questionnaireRoutes = require("./src/routes/questionnaire");
const publicQuestionnaireRoutes = require("./src/routes/publicQuestionnaire");
const session = require("express-session");
const path = require("path");
const cors = require("cors");

const initializePassport = require("./src/config/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  console.log("📥 Incoming request:", {
    method: req.method,
    path: req.path,
    body: req.body,
    headers: req.headers,
  });

  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // Must be false for non-HTTPS local development
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
    proxy: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);

// API routes with /api prefix

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api", routes);
app.use("/api/auth", authRoutes);
app.use("/api/q", publicQuestionnaireRoutes);
app.use("/api/questionnaire", questionnaireRoutes);

const server =
  "mongodb+srv://Symplyauf:Simplyauf13@nodeexpressproject.k1ejj.mongodb.net/kito?retryWrites=true&w=majority&";

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ error: err.message });
});

mongoose
  .connect(server)
  .then(() => {
    console.log("Database connected");
    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.log(err));
