const express = require("express");
const app = express();

const passport = require("passport");
const mongoose = require("mongoose");
const routes = require("./src/routes");
const authRoutes = require("./src/routes/auth");
const questionnaireRoutes = require("./src/routes/questionnaire");
const session = require("express-session");
const path = require("path");
const publicQuestionnaireRoutes = require("./src/routes/publicQuestionnaire");

require("./src/config/passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Change the server for a local or a cluster of your own

app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//
const server = process.env.MONGO_URI;

app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

app.use("/auth", authRoutes);
app.use("/q", publicQuestionnaireRoutes);
app.use("/questionnaire", questionnaireRoutes);

app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
    const port = process.env.PORT || 8000;

    app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
