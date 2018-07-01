var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  //req.session.user = null;
  res.render('login');

});

router.post('/', function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  res.send('<script>alert("错误");</script>')
  res.end();
});

module.exports = router;