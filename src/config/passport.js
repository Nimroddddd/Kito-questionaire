const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          console.log("Login attempt:", {
            email,
            headers: req.headers,
            body: req.body,
            session: req.session,
          });

          const user = await User.findOne({ email });
          if (!user) {
            console.log("User not found:", email);
            return done(null, false, {
              message: "Incorrect email or password",
            });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          console.log("Password match:", isMatch);

          if (isMatch) {
            console.log("Login successful for user:", user.email);
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Incorrect email or password",
            });
          }
        } catch (error) {
          console.error("Login error:", error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user.id);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      console.log("Deserializing user ID:", id);
      const user = await User.findById(id);
      if (!user) {
        console.log("User not found during deserialization");
        return done(null, false);
      }
      console.log("Deserialized user:", user.email);
      done(null, user);
    } catch (error) {
      console.log("Error deserializing user:", error);
      done(error);
    }
  });
};
