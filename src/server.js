require('dotenv').config();
// const cors = require('cors');

const session = require('express-session');
const express = require('express');
const passport = require('passport');
const passportSetup = require('./Lib/passport');

const cookieParser = require('cookie-parser');

const apolloServer = require('./GQL/server');

const app = express();
apolloServer.applyMiddleware({ app, path: '/graphql' });
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
require('./Lib/router')(app);

// app.use(cors);

module.exports = app;