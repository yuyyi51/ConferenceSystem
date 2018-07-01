let config = require("./config");

let db = require("mongojs")(config.mongodb.host + ":" + config.mongodb.port + "/" + config.mongodb.database,
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
    db.user.findOne({username: username, password: password}, (err, res) => {
      if (!res) {
        fn(false);
        return;
      }
      fn(true);
    });
  }
};

