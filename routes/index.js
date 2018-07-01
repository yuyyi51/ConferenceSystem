var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let title = 'hello';
  //console.log("index");
  //console.log(req.session);
  if (req.session.user)
    title = req.session.user.username;
  res.render('index', { title: title });
});
/*test1*/
module.exports = router;
