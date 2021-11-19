const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
require("dotenv/config");
require("./utils/passport")(passport);

const app = express();
const PORT = process.env.PORT || 8000;
const registerRoute = require("./routes/register");
const favouriteRoute = require("./routes/favourite");
const profileRoute = require("./routes/profile");
const loginRoute = require("./routes/login");

app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//login route
app.use("/login", loginRoute);

//register route
app.use("/register", registerRoute);

//file route
app.use(
  "/favourite",
  passport.authenticate("jwt", { session: false }),
  favouriteRoute
);

// profile route
app.use(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profileRoute
);

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("dbConnected");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
