/**
 * Created by sam on 01/09/2014.
 */
// Load routes
//var objects = require('../routes/objects');
var imentor = require('../routes/imentor');

module.exports = function (app) {
    app.get('/getEmail', imentor.getEmail);
    app.get('/addEmail', imentor.addEmail);
    app.post('/rateEmail', imentor.rateEmail);

}