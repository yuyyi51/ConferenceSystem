var express = require('express');
var router = express.Router();
var mongodb = require('../lib/mongo');

router.get('/', (req, res, next) => {
  let page = req.query.page;
  let start = 0;
  if (page !== undefined){
    start = (page-1)*5;
  }
  mongodb.lastestConference(start,start+5,(result) => {
    res.render('meetinfo',{confer: result, page: (parseInt(page) || 1)});
  });

});

module.exports = router;