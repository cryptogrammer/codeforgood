/**
 * Created by sam on 31/08/2014.
 */

//Load yosammy db file
var yosammy = require('../routes/yosammy');

var numUsers = 0;
var roomName = 'sammy';
// Config Socket.io
module.exports = function(io){
    io.on('connection', function(socket) {
        // join a room
        socket.join(roomName, function (err) {
            if(err)
                console.log(err);
            console.log('A user connected to room', roomName);
        })

        socket.emit('message', {message: 'Hi there! ' + socket.id, num: numUsers,
            cookie: socket.request.headers.cookie,
            headers: socket.request.headers
        });

        socket.on('disconnect', function () {
            console.log('A user disconnected');
        });

        socket.on('incrementHappies', function (data) {
            console.log('A user updates yosammy with data', data.id);
            // Go to MongoDB to get update happies
            yosammy.incrementHappies().then(function (data) {
                console.log(data);
//                data.then(function (happies) {
//                    console.log('HAPPIES');
//                    console.log(happies);
//              Emit result to user
                io.emit('incrementDone', data);
//                });
            }, function (err) {
                console.log(err);
            });
//            console.log('PROMISE');
//            console.log(promise);
//            promise.then(function (result) {
//
//            }, function (err) {
//                console.log(err);
//            })
        });

        socket.on('saveHappies', function (data) {
            console.log('A user updates yosammy with data', data.id);
            // Go to MongoDB to get update happies
            var result = yosammy.saveHappies();
            // Emit result to user
//            socket.emit('incrementDone', result);
        });

        socket.on('savePdb', function (data) {
            console.log('A user saves pdb geometry');
            var result = pdbGeometry.save(data.id, data.geometry);
            console.log(result);
            // Emit result to user
            socket.emit('savePdb', result);
        })
    });
}