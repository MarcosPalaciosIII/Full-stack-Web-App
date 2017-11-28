const express = require("express");

const CodeModel = require("../models/code-model");
const UserModel = require("../models/user-model");

const router = express.Router();

router.get("/Angular", (req, res, next) => {
  UserModel
  .find({ loggedIn: true, userFavLanguages: "Angular" })
  .sort()
  .exec()
  .then((userFromDb) => {

  if (req.user === undefined ) {
    res.redirect("/login");
    return;
  } if (req.user.userFavLanguages.includes("Angular") === false) {

    res.redirect('/no-entry');
    return;
  }

  res.locals.listOfUsers = userFromDb;

  res.render("chat-views/Angular-page");
  });
});


router.get("/CSS", (req, res, next) => {
  UserModel
  .find({ loggedIn: true, userFavLanguages: "CSS" })
  .sort()
  .exec()
  .then((userFromDb) => {

  if (req.user === undefined) {
    res.redirect("/login");
    return;
  } if (req.user.userFavLanguages.includes("CSS") === false) {

    res.redirect('/no-entry');
    return;
  }
    res.locals.listOfUsers = userFromDb;
    res.locals.bodyClass = "discussion-page";

    res.render("chat-views/CSS-page");
  });
});


router.get("/Javascript", (req, res, next) => {
  UserModel
  .find({ loggedIn: true, userFavLanguages: "Javascript" })
  .sort()
  .exec()
  .then((userFromDb) => {

  if (req.user === undefined) {
    res.redirect("/login");
    return;
  } if (req.user.userFavLanguages.includes("Javascript") === false) {

    res.redirect('/no-entry');
    return;
  }

  res.locals.listOfUsers = userFromDb;

  res.render("chat-views/Javascript-page");
  });
});


router.get("/Mongo", (req, res, next) => {
  UserModel
  .find({ loggedIn: true, userFavLanguages: "Mongo" })
  .sort()
  .exec()
  .then((userFromDb) => {

  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }  if (req.user.userFavLanguages.includes("Mongo") === false) {

    res.redirect('/no-entry');
    return;
  }

  res.locals.listOfUsers = userFromDb;

  res.render("chat-views/Mongo-page");
  });
});


router.get("/Node", (req, res, next) => {
  UserModel
  .find({ loggedIn: true, userFavLanguages: "Node" })
  .sort()
  .exec()
  .then((userFromDb) => {

  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }  if (req.user.userFavLanguages.includes("Node") === false) {

    res.redirect('/no-entry');
    return;
  }

  res.locals.listOfUsers = userFromDb;

  res.render("chat-views/Node-page");
  });
});


router.get("/Python", (req, res, next) => {
  UserModel
  .find({ loggedIn: true, userFavLanguages: "Python" })
  .sort()
  .exec()
  .then((userFromDb) => {

  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }  if (req.user.userFavLanguages.includes("Python") === false) {

    res.redirect('/no-entry');
    return;
  }

  res.locals.listOfUsers = userFromDb;

  res.render("chat-views/Python-page");
  });
});

router.get("/Ruby", (req, res, next) => {
  UserModel
  .find({ loggedIn: true, userFavLanguages: "Ruby" })
  .sort()
  .exec()
  .then((userFromDb) => {

  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }  if (req.user.userFavLanguages.includes("Ruby") === false) {

    res.redirect('/no-entry');
    return;
  }

  res.locals.listOfUsers = userFromDb;

  res.render("chat-views/Ruby-page");
  });
});

router.get("/no-entry", (req, res, next) => {
  if (req.user === undefined) {
    res.redirect("/login");
  }
  res.render("chat-views/not-allowed");
});


module.exports = router;
