// Load things needed
var shortId = require('shortid');
var mongoose = require('mongoose');

var schemas = {
    happies : mongoose.Schema({
        _id: String,
        happies: Number
    }),
    blob : mongoose.Schema({
        blob: {}
    }),
    wish : mongoose.Schema({
        name: String,
        wish: String
    })

};

var models = {
    happies: mongoose.model('Happies', schemas['happies']),
    blob: mongoose.model('Blob', schemas['blob']),
    wish: mongoose.model('Wish', schemas['wish'])
}

var config = function (dbConfig) {
    // Configure mongoose
    var db_server  = process.env.DB_ENV || 'primary';

    var checkConnection = function (mongoose) {
        mongoose.connect(dbConfig.getDBURL(db_server));
        var db = mongoose.connection;
        db.on('error', function (err) {
            // TODO: error on db connection?
            console.log(err);
            db.close(function () {
                console.log('Mongoose closed');
            });
            setTimeout(function () {
                checkConnection(mongoose);
            }, 500);
        })
        db.on('open', function () {
            console.log('DB connected!');
            process.env.dbConnected = true;
        });
    };
    checkConnection(mongoose);
}

module.exports = {
    init: config,
    getModel: function (modelName) {
        return models[modelName];
    }
}