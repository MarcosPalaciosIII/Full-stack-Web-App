const express = require("express");

const CodeModel = require("../models/code-model");

const router = express.Router();

router.get("/Angular", (req, res, next) => {
  res.render("chat-views/Angular-page");
});

router.get("/CSS", (req, res, next) => {
  res.render("chat-views/CSS-page");
});

router.get("/Express", (req, res, next) => {
  res.render("chat-views/Express-page");
});

router.get("/Javascript", (req, res, next) => {
  res.render("chat-views/Javascript-page");
});

router.get("/Mongo", (req, res, next) => {
  res.render("chat-views/Mongo-page");
});

router.get("/Node", (req, res, next) => {
  res.render("chat-views/Node-page");
});

router.get("/Ruby", (req, res, next) => {
  res.render("chat-views/Ruby-page");
});


module.exports = router;
