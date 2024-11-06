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

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://kito-questionaire.vercel.app", "https://kito-questionaire-pink.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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
