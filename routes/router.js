var express = require('express');
var router = express.Router();
var mongodb = require('../lib/mongo');
var moment = require('moment');

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
  let page = req.query.page || 1;
  let order = req.query.order || -1;
  order = parseInt(order);
  console.log(order);
  let keywords = req.query.keywords || '.';
  keywords = keywords.split('+');
  let startdate = req.query.start || '1970-1-1';
  startdate = new Date(startdate);
  let enddate = req.query.end || '3000-1-1';
  enddate = new Date(enddate);

  let skip = 0 ;
  if (page !== undefined){
    skip = (page-1)*5;
  }
  mongodb.searchConference(keywords, startdate, enddate, skip, 5, order, (result) => {
    //console.log(result);
    result.forEach((item, index)=>{
      item.important_dates.conference_start = moment(item.important_dates.conference_start).format('YYYY年MM月DD日');
      item.important_dates.conference_end = moment(item.important_dates.conference_end).format('YYYY年MM月DD日');
    });
    res.render('meetinfo', {confer: result, page: (parseInt(page) || 1)});
  });
  /*
  mongodb.lastestConference(skip,skip+5,-1,(result) => {
    res.render('meetinfo',{confer: result, page: (parseInt(page) || 1)});
  });
  */
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
router.get('/updateinfo',function (req, res, next) {
    res.render('updateinfo');
});
router.get('/uploadcontribution', function (req, res, next) {
    res.render('UploadContribution');
});
router.get('/mymeetings',function (req, res, next) {
   res.render('mymeetings');
});

router.get('/conference/:confer_id' , function(req, res, next){
  //res.send(req.param('confer_id'));
  res.send(req.params.confer_id);
});

router.get('/conference/:confer_id/review', function (req, res, next) {
  let page = req.query.page || 1;
  res.render('review', {page: page});
});

router.get('/conference/:confer_id/review/:paper_id', function (req, res, next) {
  if(req.params.paper_id.length !== 24){
    res.send('参数错误');
    return;
  }
  mongodb.selectPaper(req.params.paper_id, (result) => {
    if (result === null){
      res.send('论文不存在');
      return;
    }
    /*
    TODO: 检查论文是否在会议内
     */
    res.render('review_detail', {paper:result, cid:req.params.confer_id});
  });
});

router.get('/conference/:confer_id/review/:paper_id/download', function (req, res, next){
  res.send('download');
});

router.get('/signup', function (req, res, next) {
    res.render('signup');
});

router.get('/unituserRegister', function (req, res, next) {
    res.render('unituserRegister');
});


module.exports = router;