require('dotenv').config();
// const cors = require('cors');

const session = require('express-session');
const express = require('express');
const passport = require('passport');
const passportSetup = require('./Lib/passport');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'Workeee',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use(passport.initialize(passportSetup));
app.use(passport.session());

var corsOptions = {
  credentials: true, // <-- REQUIRED backend setting
  //origin: 'http://localhost:9000',
  origin: 'http://localhost:3000',
};

// app.use(cors(corsOptions));

const apolloServer = require('./GQL/server');
apolloServer.applyMiddleware({
  app,
  cors: corsOptions,
});
console.log('🚀 Apollo server running on path /graphql');

require('./Lib/router')(app);

// app.use(cors);

module.exports = app;
