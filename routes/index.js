var express = require("express");
var passport = require("passport");
var Account = require("../models/account");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("login", { user: req.user });
});

router.get("/login", function(req, res) {
  res.render("login", { user: req.user });
});

router.post("/login", passport.authenticate("local"), function(req, res) {
  res.redirect("/profile");
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/ping", function(req, res) {
  res.status(200).send("pong!");
});

router.get("/profile", (req, res) => {
  res.render("profile", { user: req.user });
});

router.get("/register", (req, res) => {
  res.render("register", {});
});

router.post("/register", (req, res) => {
  Account.register(
    new Account({ username: req.body.username, name: req.body.name }),
    req.body.password,
    function(err, account) {
      if (err) {
        return res.render("register", { account: account });
      }

      passport.authenticate("local")(req, res, function() {
        res.redirect("/");
      });
    }
  );
});

module.exports = router;
