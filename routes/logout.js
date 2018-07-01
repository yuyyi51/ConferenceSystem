var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  //req.session.user = null;
  req.session.destroy(function (err) {
    res.redirect('/');
  });

});

module.exports = router;