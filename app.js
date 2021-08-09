var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var compression = require('compression');
var helmet = require('helmet');
var session = require('express-session');
var fileStore = require('session-file-store')(session);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(session({
    httpOnly: true, // 웹 브라우저와 웹 서버가 통신할 때만 쿠키 전송
    secret: 'qwertyasdfg', // essential option
    resave: false, // false default, 세션 데이터가 바뀌기 전에는 값을 저장소에 저장하지 않는다
    saveUninitialized: true, // true default, 세션이 필요하기 전까지는 세션을 구동하지 않는다
    store: new fileStore()
}))

var passport = require('./public/javascripts/passport')(app);

var indexRouter = require('./routes/index');
var boardRouter = require('./routes/board');
var userRouter = require('./routes/user')(passport);

app.use('/', indexRouter);
app.use('/board', boardRouter);
app.use('/user', userRouter);

module.exports = app;
