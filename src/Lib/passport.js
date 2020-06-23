require('dotenv').config();
const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const graph = require('../Lib/graph');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});

const oauth2 = require('../Lib/oauth2');

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
            console.log(oauthToken);
            const userObject = {
                ...profile,
                ...userData,
                oauthToken,
                accessToken,
                refreshToken,
            };
            console.log(userObject);
            return done(null, userObject);
        },
    ),
);