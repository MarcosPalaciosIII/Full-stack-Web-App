const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.locals.bodyClass = "homepage";
  res.render('index');
});

module.exports = router;
