var express = require('express');
var router = express.Router();
var mongodb = require('../lib/mongo');
var moment = require('moment');

function auth_person(req, res) {
  if (!req.session.user) {
    res.setHeader('refresh', "1;/signin");
    res.send('请先登录，将于1秒后跳转至登录页面');
    res.end();
    return false;
  }
  return true;
}

function auth_unit(req, res) {
  if (!auth_person(req, res))
    return false;
  if (req.session.user.type !== 'unit') {
    res.setHeader('refresh', "1;/meetinfo");
    res.send('没有访问权限，将于1秒后跳转至主页');
    res.end();
    return false;
  }
  return true;
}

router.get('/', function (req, res, next) {
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
  if (auth_unit(req, res))
  {
    var username;
    var usertype;
    var userid;
    username = req.session.user.username;
    usertype = req.session.user.type;
    res.render('post',{username: username, usertype: usertype});
  }

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

  let skip = 0;
  if (page !== undefined) {
    skip = (page - 1) * 5;
  }
  mongodb.searchConference(keywords, startdate, enddate, skip, 5, order, (result) => {
    //console.log(result);
    result.forEach((item, index) => {
      item.important_dates.conference_start = moment(item.important_dates.conference_start).format('YYYY年MM月DD日');
      item.important_dates.conference_end = moment(item.important_dates.conference_end).format('YYYY年MM月DD日');
    });
    var username;
    var usertype;
    if (req.session.user){
      username = req.session.user.username;
      usertype = req.session.user.type;
    }
    else{
      username = 'defaultname';
      usertype = 'undefined';
    }
      res.render('meetinfo', {confer: result, page: (parseInt(page) || 1),username: username, usertype: usertype});
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
    res.setHeader('refresh', "1;/meetinfo");
    res.send('登出成功，将于1秒后跳转至主页');
    res.end();
  });
});

router.get('/signin', function (req, res, next) {
  res.render('signin');
});
router.get('/updateinfo', function (req, res, next) {
  if (auth_unit(req, res))
    res.render('updateinfo');
});
router.get('/uploadcontribution/:confer_id', function (req, res, next) {
  if (auth_person(req, res)){
    var username;
    var usertype;
    if (req.session.user){
      username = req.session.user.username;
      usertype = req.session.user.type;
    }
    else{
      username = 'defaultname';
      usertype = 'undefined';
    }
    res.render('uploadcontribution',{username: username, usertype: usertype,confer_id:req.params.confer_id});
  }

});
router.get('/mymeetings', function (req, res, next) {
  if (auth_person(req, res))
    res.render('mymeetings')
});

router.get('/conference/:confer_id', function (req, res, next) {
  //res.send(req.param('confer_id'));
  if (auth_person(req, res)){
    var username;
    var usertype;
    username = req.session.user.username;
    usertype = req.session.user.type;
    mongodb.selectConference(req.params.confer_id,(result)=>{
      result.important_dates.conference_start = moment(result.important_dates.conference_start).format('YYYY年MM月DD日');
      result.important_dates.conference_end = moment(result.important_dates.conference_end).format('YYYY年MM月DD日');
      res.render('conferencedetail',{username: username, usertype:usertype, confer: result, cid: req.params.confer_id});
    })
  }

});

router.get('/conference/:confer_id/review', function (req, res, next) {
  if (auth_unit(req, res)){
    let cid = req.params.confer_id;
    let page = req.query.page || 1;
    let skip = 0;
    if (page !== undefined) {
      skip = (page - 1) * 5;
    }
    mongodb.selectPapers(cid, skip, 5, (result) => {
      res.render('review', {page: parseInt(page), papers: result, cid: cid});
    });
  }
});

router.get('/conference/:confer_id/review/:paper_id', function (req, res, next) {
  if (auth_unit(req, res))
    res.send(req.params.confer_id + ' ' + req.params.paper_id);
});


router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.get('/unituserRegister',function (req, res, next){
    var username;
    var usertype;
    if (req.session.user){
        username = req.session.user.username;
        usertype = req.session.user.type;
    }
    else{
        username = 'defaultname';
        usertype = 'undefined';
    }
    res.render('unituserRegister',{username:username,usertype:usertype});
});

module.exports = router;