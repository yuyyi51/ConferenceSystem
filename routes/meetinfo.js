var express = require('express');
var router = express.Router();
var mongodb = require('../lib/mongo');

router.get('/', (req, res, next) => {
  mongodb.lastestConference(0,5,(result) => {
    console.log(result);
    res.render('meetinfo',{confer: result});
  });

});

module.exports = router;