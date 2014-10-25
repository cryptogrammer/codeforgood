/**
 * Created by sam on 30/09/2014.
 */

/**
 * Created by sam on 07/09/2014.
 */

var Promise = require('promise');
// Load configured mongoose
var db = require('../config/mongoose');

// Mongoose model
var Email = db.getModel('email');
//var Wish = db.getModel('wish');

//var Blob = db.getModel('blob');

var Busboy = require('busboy');
var os = require('os');
var path = require('path');

var fs = require('fs');
var exec = require('child_process').exec;

module.exports = {
    rateEmail: function (req, res) {
        var email = req.body.email;
        var curriculum = req.body.curriculum;

        console.log(email);
        console.log(curriculum);
        fs.writeFile('email.txt', email, 'utf-8', function (err) {
            if(err) throw err;
            else {
                fs.writeFile('curriculum.txt', curriculum, 'utf-8', function (err) {
                    if(err) throw err;
                    else {
                        var script = '../algorithm/tfidf.py' + ' ' + 'data/email.txt data/curriculum.txt data/tags.txt';
                        var python = 'python ' + script;
                        console.log(python);
                        exec(python, function (err, stdout, stderr) {
                            if(err) {
                                console.log(err);
                                res.status(500).send('There was something wrong!');
                            }
                            else {
                                console.log('Done pythoning!');
                                /* PROCESS STDOUT BEFORE */
                                res.status(200).send({output: stdout});
                            }
                        })
                    }
                })
            }
        })
    },
    getEmail: function (req, res) {
        Email.find({}, function (err, docs) {
            if(err) throw err;
            console.log(docs);
            res.status(200).send({data: docs});
        })
    }
//    save: function (req, res) {
//        var id = req.params.pdb;
//        var geometry = req.params.geometry;
//
//        var pdbGeometry = new PdbGeometry({
//            _id: id,
//            boundingSphere: geometry.boundingSphere,
//            faces: geometry.faces,
//            vertices: geometry.vertices,
//            faceVertexUvs: geometry.faceVertexUvs
//        });
//
//        pdbGeometry.save(function (err, geometry) {
//            if (err)
//                res.status(500).send('Error');
//            console.log('pdb geometry', id, 'saved');
//            res.status(200).send('Saved');
//        })
//    },
//    getHappies: function (id) {
//        Happies.findById('happies', function (err, result) {
//            if (err)
//                return {status: 500, message: 'Something went wrong'};
//            return {status: 200, message: 'happies retrived', data: result}
//        })
//    },
//    saveHappies: function () {
//        var happies = new Happies({_id:'happies', happies:0});
//        happies.save(function (err, happies) {
//            if(err)
//                console.log('ERRORRR');
//        })
//    },
//    incrementHappies: function () {
//        console.log('Incrementing happies');
//        return new Promise(function (resolve, reject) {
//            Happies.findById('happies', function (err, result) {
//                if (err)
//                    reject({status: 500, message: 'Something went wrong'});
//                else {
//                    console.log(result);
//                    if(result === null)
//                        reject({status: 404, message: 'No such happies'});
//                    else {
//                        result.happies++;
//                        console.log('RIGHT HERE');
//                        resolve(new Promise(function (resolve, reject) {
//                            result.save(function (err) {
//                                if(err)
//                                    reject({status: 500, message: 'Something went wrong when saving'});
//                                resolve({status: 200, message: 'Happies incremented', data: result});
//                            })
//                        }));
//                    }
//                }
//            })
//        })
//    },
//    getBlob: function (req, res) {
//        console.log('getBlob:');
//        var busboy = new Busboy({ headers: req.headers });
//        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
//            var path = 'tmp/audio/' + (new Date()).getTime() + '.wav';
//            file.pipe(fs.createWriteStream(path));
//        });
//        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
//            console.log('Field [' + fieldname + ']: value: ' + val);
//        });
//        busboy.on('finish', function() {
//            console.log('Done parsing form!');
////            res.writeHead(303, { Connection: 'close', Location: '/' });
//            res.end();
//        });
//        req.pipe(busboy);
//    },
//    getPicture: function (req, res) {
//        console.log('getPicture:');
//        var busboy = new Busboy({ headers: req.headers });
//        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
//            console.log(filename);
//            var path = 'tmp/pics/' + filename;
//            file.pipe(fs.createWriteStream(path));
//        });
//        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
//            console.log('Field [' + fieldname + ']: value: ' + val);
//        });
//        busboy.on('finish', function() {
//            console.log('Done parsing form!');
////            res.writeHead(303, { Connection: 'close', Location: '/' });
//            res.status(200).send('Done');
//        });
//        req.pipe(busboy);
//    },
//    getWish: function (req, res) {
//        console.log('getWish:');
//        var wish = new Wish({name:req.body.nickname, wish:req.body.wish});
//        wish.save(function (err, happies) {
//            if(err) {
//                console.log('ERRORRR', err);
//                req.status(500).send('Something went wrong');
//            }
//            res.status(200).send('Done');
//        })
//    }
}