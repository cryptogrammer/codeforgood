/**
 * Created by sam on 01/09/2014.
 */

var compression = require('compression');
var morgan = require('morgan');
var bodyParser = require('body-parser');
//var busboy = require('connect-busboy');
//CORS Stuff
var allowCrossDomain = function(req, res, next) {
    //TODO: CHANGE * TO STH ELSE
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

module.exports = function (app) {
    //use CORS
    app.use(allowCrossDomain);
    // Compression
    app.use(compression());
    // Morgan to log out every request - using dev format
    app.use(morgan('dev'));
    // urlencoded and json
    app.use(bodyParser.urlencoded({extended: false, limit: '5mb'}));
    app.use(bodyParser.json({limit: '5mb'}));
//    app.use(busboy({immediate: true }));
}