var express = require('express');
var config = require('../lib/config');
var router = express.Router();

router.get('/', function (req, res, next) {
  //req.session.user = null;
  req.session.destroy((err) => {
    res.redirect('/');
  });

});

module.exports = router;