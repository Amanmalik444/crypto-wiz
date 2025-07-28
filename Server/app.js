const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
require("dotenv/config");
require("./utils/passport")(passport);

const app = express();
const PORT = process.env.PORT || 8000;
const favouriteRoute = require("./routes/favourite");
const profileRoute = require("./routes/profile");
const connectRoute = require("./routes/connect");
const messageRoute = require("./routes/message");
const credentialsRoute = require("./routes/credentials");

app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//credentials route
app.use("/credentials", credentialsRoute);

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

// connect route
app.use(
  "/connect",
  passport.authenticate("jwt", { session: false }),
  connectRoute
);

// message route
app.use(
  "/message",
  passport.authenticate("jwt", { session: false }),
  messageRoute
);

const presentWorkingDir = process.cwd();
const path = require("path");

// set static folder
app.use(express.static("../Client/build"));
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(`${presentWorkingDir}/../Client/`, "build", "index.html")
  );
});

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
