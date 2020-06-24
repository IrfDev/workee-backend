require('dotenv').config();
const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const graph = require('../Lib/graph');
const oauth2 = require('simple-oauth2').create({
    client: {
        id: process.env.OAUTH_APP_ID,
        secret: process.env.OAUTH_APP_PASSWORD,
    },
    auth: {
        tokenHost: process.env.OAUTH_AUTHORITY,
        authorizePath: process.env.OAUTH_AUTHORIZE_ENDPOINT,
        tokenPath: process.env.OAUTH_TOKEN_ENDPOINT,
    },
});

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new OIDCStrategy({
            identityMetadata: `${process.env.OAUTH_AUTHORITY}${process.env.OAUTH_ID_METADATA}`,
            clientID: process.env.OAUTH_APP_ID,
            responseType: 'code id_token',
            responseMode: 'form_post',
            redirectUrl: process.env.OAUTH_REDIRECT_URI,
            allowHttpForRedirectUrl: true,
            clientSecret: process.env.OAUTH_APP_PASSWORD,
            validateIssuer: false,
            passReqToCallback: false,
            scope: [
                'Notes.Read',
                'openid',
                'profile',
                'Calendars.Read',
                'User.Read',
                'Notes.Read.All',
                'Tasks.ReadWrite ',
                'offline_access',
            ],
        },
        async(iss, sub, profile, accessToken, refreshToken, params, done) => {
            let userData = {};
            try {
                const user = await graph.getUserDetails(accessToken);
                userData = user;
            } catch (err) {
                return done(err);
            }

            let oauthToken = await oauth2.accessToken.create(params);
            const userObject = {
                ...userData,
                oauthToken,
            };
            return done(null, userObject);
        },
    ),
);