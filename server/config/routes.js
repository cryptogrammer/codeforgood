/**
 * Created by sam on 01/09/2014.
 */
// Load routes
//var objects = require('../routes/objects');
var imentor = require('../routes/imentor');

module.exports = function (app) {
    app.post('/upload/audio', imentor.getBlob);
    app.post('/upload/picture', imentor.getPicture);
    app.post('/upload/wish', imentor.getWish);
}