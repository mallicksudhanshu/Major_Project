const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose.js");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy.js");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");

const flash = require("connect-flash");

const customMwar = require('./config/middleware.js');

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    // debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);

// extract style and scripts from sub pages into layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// session created for cookies
app.use(
  session({
    name: "codeial",
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    // mongo store is used to store the session cookie in the db
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/codeial_development",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMwar.setFlash);

// use express router
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running server:${err}`);
  }
  console.log(`Server is running on port:${port}`);
});
