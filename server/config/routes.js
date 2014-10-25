/**
 * Created by sam on 01/09/2014.
 */
// Load routes
//var objects = require('../routes/objects');
var routes = require('../routes/yosammy');

module.exports = function (app) {
    app.post('/upload/audio', routes.getBlob);
    app.post('/upload/picture', routes.getPicture);
    app.post('/upload/wish', routes.getWish);
}