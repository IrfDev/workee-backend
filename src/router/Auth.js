var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/signin', (req, res, next) => {
  passport.authenticate('azuread-openidconnect', {
    response: res,
    failureRedirect: '/',
    failureFlash: true,
    //successRedirect: 'https://workee.site',
    successRedirect: 'http://localhost:3000',
  })(req, res, next);
});

router.post('/callback', (req, res, next) => {
  passport.authenticate('azuread-openidconnect', {
    response: res,
    failureRedirect: '/',
    failureFlash: true,
    //successRedirect: 'https://workee.site',
    successRedirect: 'http://localhost:3000',
  })(req, res, next);
});

router.get('/great', (req, res) => {
  res.json({
    data: req.user,
  });
});

router.get('/signout', (req, res) => {
  req.session.destroy(function (err) {
    req.logout();
    res.redirect('/');
  });
});

module.exports = router;
