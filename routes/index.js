var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let title = 'hello';
  if (!req.session.user)
    title = 'not a user';
  req.session.user = {username:"123123", password:"111111"};
  res.render('index', { title: title });
});
/*test1*/
module.exports = router;
