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
      if (!res) {
        fn(false);
        return;
      }
      fn(true);
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

  static getConference(id, fn){
    db.conference.findOne({_id: mongojs.ObjectId(id)}, (err,res) => {
      fn(res);
    })
  }
};

