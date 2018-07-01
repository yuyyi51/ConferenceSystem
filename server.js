var debug = require('debug')('conferencesystem:server');
var http = require('http');
var config = require("./lib/config");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser')(config.session.secret);
var logger = require('morgan');
var session = require('express-session');
var sharedsession = require('express-socket.io-session');
var mongostore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var logoutRouter = require('./routes/logout');
var loginRouter = require('./routes/login');

var mongodb = require('./lib/mongo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser);
let sessionmiddleware = session({
  secret: config.session.secret,
  key: config.session.name,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 15},
  resave: true,
  saveUninitialized: true,
  store: new mongostore({
    url: config.mongodb.getMongoUrl(),
    ttl: 14 * 24 * 60 * 60
  })
});
app.use(sessionmiddleware);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/logout', logoutRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



//////////////////////////////////////////////////////////////////////////////
//                            服务器监听
//////////////////////////////////////////////////////////////////////////////
// region
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || config.http.port);
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require('socket.io')(server);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('Listening on ' + bind);
}
// endregion
//////////////////////////////////////////////////////////////////////////////
//                          服务器监听结束
//////////////////////////////////////////////////////////////////////////////



/**
 * WebSocket事件
 */
io.use(sharedsession(sessionmiddleware), cookieParser, {autoSave:true});

io.on('connection', (socket) => {
  console.log('visitor connected.');
  socket.on('disconnect', (reason) => {
    console.log('visitor disconnected cause : ' + reason);
  });
  ///////////////////////////////////////////////////////////////////////
  //以下是socket响应
  ///////////////////////////////////////////////////////////////////////

  socket.on('user:login', (data) => {
    /*
    data = {
      username: str,
      password: str
    }
    */
    mongodb.login(data.username, data.password, (res) => {
      if (res){
        socket.handshake.session.user = {username: data.username};
        socket.handshake.session.save();
      }

      socket.emit('user:login', res);
    });
  })


});


