var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var logger = require('./common/logger');

var app = express();

var index = require('./routes/index');
var users = require('./routes/users');
var door = require('./routes/door');
var movement = require('./routes/movement');
var messaging = require('./routes/messaging');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    logger.debug(req.connection.remoteAddress, req.url);
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/door', door);
app.use('/movement', movement);
app.use('/messaging', messaging);

function getRoutes() {
    var route, routes = [];

    app._router.stack.forEach(function (middleware) {
        if (middleware.route) { // routes registered directly on the app
            routes.push(middleware.route);
        } else if (middleware.name === 'router') { // router middleware
            middleware.handle.stack.forEach(function (handler) {
                route = handler.route;
                route && routes.push(route);
            });
        }
    });
    return routes;
}

// app.get('/routes', (res, req)=>{
//     req.json(getRoutes());
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

