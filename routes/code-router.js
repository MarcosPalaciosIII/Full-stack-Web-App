const express = require("express");

const CodeModel = require("../models/code-model");

const router = express.Router();

router.get("/code/new", (req, res, next) => {
  // redirect to log in if there is no logged in user
  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }
  res.render("./code-views/code-input-page");
});


router.post("/code-input", (req, res, next) => {
  // redirect to log in if there is no logged in user
  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }
  const theCode = new CodeModel({
    codeName: req.body.codeNameInput,
    codeAuthor: req.body.codeAuthorInput,
    codeLanguage: req.body.codeLanguageInput,
    codeDescription: req.body.codeDescriptionInput,
    codeLink: req.body.codeLinkInput,
    // "req.user" is the logged in user's document (defined by passport)
    owner: req.user._id
  });
  theCode.save()
  .then(() => {
    res.redirect("/my-codes");
  })
  .catch((err) => {
    next(err);
  });
});


router.get("/my-codes", (req, res, next) => {
  // redirect to log in if there is no logged in user
  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }
  CodeModel
  // retrieve all codes owned by the logged in user
  .find({ owner: req.user._id })
  .sort({ createdAt: -1 })
  .exec()
  .then((codeResults) => {
      res.locals.listOfCodes = codeResults;
      res.locals.bodyClass = "codesList";
      res.render("./code-views/code-list");
  })
  .catch((err) => {

  });

});

module.exports = router;
