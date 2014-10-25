var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var morgan = require('morgan');

// Router
var router = express.Router();

router.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

router.use('/js', express.static(__dirname + '/public' + '/js'));
router.use('/templates', express.static(__dirname + '/public' + '/templates'));
router.use('/css', express.static(__dirname + '/public' + '/css'));
router.use('/assets', express.static(__dirname + '/public' + '/assets'));
router.use('/fonts', express.static(__dirname + '/public' + '/fonts'));
router.use('/font-awesome-4.1.0', express.static(__dirname + '/public' + '/font-awesome-4.1.0'));

router.all('/', function (req, res) {
    res.sendfile('index.html', { root: __dirname + '/public' });
})

router.all('*', function (req, res) {
    res.send(404);
})
app.use(router);

app.use(morgan('dev')); // log every request to the console

app.listen(port, function() {
    console.log('Listening on port ' + port);
})