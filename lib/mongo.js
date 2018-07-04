let config = require("./config");
let mongojs = require("mongojs")

let db = mongojs(config.mongodb.host + ":" + config.mongodb.port + "/" + config.mongodb.database,
  config.mongodb.collection);
db.on("error", (err) => {
  console.log('database error - ', err);
});
module.exports = class Mongo {

  static register(username, password, fn) {
    this.findUser(username, (res) => {
      if (res) {
        fn(false);
        return;
      }
      db.user.insert({username: username, password: password}, (err, res) => {
        if (!res) {
          fn(false);
          return;
        }
        fn(true);
      });
    });
  }

  static findUser(username, fn) {
    db.user.findOne({username: username}, (err, res) => {
      if (!res) {
        fn(false);
        return;
      }
      fn(true);
    });
  }

  static login(username, password, fn) {
    console.log(username,password);
    db.user.findOne({username: username, password: password}, (err, res) => {
      console.log(res);
      fn(res);
    });
  }

  static addConference(data, fn){
    db.conference.insert(data, (err,res) => {
      if (!res){
        fn(false);
        return;
      }
      fn(true);
    });
  }
  static addContribution(data, fn){
      db.paper.insert(data, (err,res) => {
          if (!res){
              fn(false);
              return;
          }
          fn(true);
      });
  };

  static getConference(id, fn){
    db.conference.findOne({_id: mongojs.ObjectId(id)}, (err,res) => {
      fn(res);
    })
  }

  static lastestConference(skip, count, fn){
    db.conference.find({}).sort({update_time: -1}).skip(skip).limit(count).toArray((err, res) => {
      fn(res);
    });
  }

  static searchConference(keywords, start, end, skip, count, fn){
    let arr = [];
    keywords.forEach((item, index) => {
      arr.push({title:eval('/'+item+'/')});
    });
    db.conference.find({$or:arr, "important_dates.conference_date": {
      $gte: start,
      $lt: end
      }},{
      title:1,
      description:1,
      important_dates:1,
      org:1
    }).skip(skip).limit(count).toArray((err, res) => {
        fn(res);
    });
  }
};

