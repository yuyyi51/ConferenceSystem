var express = require('express');
var router = express.Router();
var mongodb = require('../lib/mongo');

router.get('/', function(req, res, next) {
  res.redirect('/signin');
  /*
  let title = 'hello';
  //console.log("index");
  //console.log(req.session);
  if (req.session.user)
    title = req.session.user.username;
  res.render('index', { title: title });
  */
});

router.get('/post', (req, res, next) => {
  res.render('post');
});

router.get('/meetinfo', (req, res, next) => {
  let page = req.query.page;
  let start = 0;
  if (page !== undefined){
    start = (page-1)*5;
  }
  mongodb.lastestConference(start,start+5,-1,(result) => {
    res.render('meetinfo',{confer: result, page: (parseInt(page) || 1)});
  });

});

router.get('/logout', function (req, res, next) {
  //req.session.user = null;
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

router.get('/signin', function (req, res, next) {
  res.render('signin');
});

router.get('/uploadcontribution', function (req, res, next) {
    res.render('UploadContribution');
});

module.exports = router;