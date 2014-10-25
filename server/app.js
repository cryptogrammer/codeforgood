var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var shortId = require('shortid');
shortId.seed(6594);
var Promise = require('promise');
var _ = require('lodash');
var Blob = require('Blob');
//var busboy = require('connect-busboy');
var Busboy = require('busboy');
var Wav = require('wav');
var port = Number(process.env.PORT || 8002);

// Init config: CORS, Compression, Morgan, bodyParser
require('./config/init')(app);

// Configure Socket.io
require('./config/socket')(io);

// Config database
var dbConfig = require('./config/database');

// Config mongoose
var db = require('./config/mongoose');
db.init(dbConfig);

// Config Routes
require('./config/routes')(app);

console.log(port);
server.listen(port, function () {
    console.log('Listening on port ', port);
})

