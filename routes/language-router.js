const express = require("express");

const CodeModel = require("../models/code-model");

const router = express.Router();

router.get("/Angular", (req, res, next) => {
  if (req.user === undefined || req.user.userFavLanguages.includes('Angular') === false) {
    res.redirect("/login");
    return;
  }
  res.locals.bodyClass = "generalBackground";
  res.render("chat-views/Angular-page");
});

router.get("/CSS", (req, res, next) => {
  if (req.user === undefined || req.user.userFavLanguages.includes("CSS") === false) {
    res.redirect("/login");
    return;
  }
  res.locals.bodyClass = "generalBackground";
  res.render("chat-views/CSS-page");
});

router.get("/Javascript", (req, res, next) => {
  if (req.user === undefined || req.user.userFavLanguages.includes("Javascript") === false) {
    res.redirect("/login");
    return;
  }
  res.locals.bodyClass = "generalBackground";
  res.render("chat-views/Javascript-page");
});

router.get("/Mongo", (req, res, next) => {
  if (req.user === undefined || req.user.userFavLanguages.includes("Mongo") === false) {
    res.redirect("/login");
    return;
  }
  res.locals.bodyClass = "generalBackground";
  res.render("chat-views/Mongo-page");
});

router.get("/Node", (req, res, next) => {
  if (req.user === undefined || req.user.userFavLanguages.includes("Node") === false) {
    res.redirect("/login");
    return;
  }
  res.locals.bodyClass = "generalBackground";
  res.render("chat-views/Node-page");
});

router.get("/Python", (req, res, next) => {
  if (req.user === undefined || req.user.userFavLanguages.includes("Python") === false) {
    res.redirect("/login");
    return;
  }
  res.locals.bodyClass = "generalBackground";
  res.render("chat-views/Python-page");
});

router.get("/Ruby", (req, res, next) => {
  if (req.user === undefined || req.user.userFavLanguages.includes("Ruby") === false) {
    res.redirect("/login");
    return;
  }
  res.locals.bodyClass = "generalBackground";
  res.render("chat-views/Ruby-page");
});


module.exports = router;
