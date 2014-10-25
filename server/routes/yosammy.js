/**
 * Created by sam on 30/09/2014.
 */

/**
 * Created by sam on 07/09/2014.
 */

var BlobAPI = require('Blob');
var Promise = require('promise');
// Load configured mongoose
var db = require('../config/mongoose');
// Mongoose model
var Happies = db.getModel('happies');
var Wish = db.getModel('wish');
//var Blob = db.getModel('blob');

var Busboy = require('busboy');
var Wav = require('wav');
var os = require('os');
var path = require('path');

var fs = require('fs');
module.exports = {
    save: function (req, res) {
        var id = req.params.pdb;
        var geometry = req.params.geometry;

        var pdbGeometry = new PdbGeometry({
            _id: id,
            boundingSphere: geometry.boundingSphere,
            faces: geometry.faces,
            vertices: geometry.vertices,
            faceVertexUvs: geometry.faceVertexUvs
        });

        pdbGeometry.save(function (err, geometry) {
            if (err)
                res.status(500).send('Error');
            console.log('pdb geometry', id, 'saved');
            res.status(200).send('Saved');
        })
    },
    getHappies: function (id) {
        Happies.findById('happies', function (err, result) {
            if (err)
                return {status: 500, message: 'Something went wrong'};
            return {status: 200, message: 'happies retrived', data: result}
        })
    },
    saveHappies: function () {
        var happies = new Happies({_id:'happies', happies:0});
        happies.save(function (err, happies) {
            if(err)
                console.log('ERRORRR');
        })
    },
    incrementHappies: function () {
        console.log('Incrementing happies');
        return new Promise(function (resolve, reject) {
            Happies.findById('happies', function (err, result) {
                if (err)
                    reject({status: 500, message: 'Something went wrong'});
                else {
                    console.log(result);
                    if(result === null)
                        reject({status: 404, message: 'No such happies'});
                    else {
                        result.happies++;
                        console.log('RIGHT HERE');
                        resolve(new Promise(function (resolve, reject) {
                            result.save(function (err) {
                                if(err)
                                    reject({status: 500, message: 'Something went wrong when saving'});
                                resolve({status: 200, message: 'Happies incremented', data: result});
                            })
                        }));
                    }
                }
            })
        })
    },
    getBlob: function (req, res) {
        console.log('getBlob:');
        var busboy = new Busboy({ headers: req.headers });
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            var path = 'tmp/audio/' + (new Date()).getTime() + '.wav';
            file.pipe(fs.createWriteStream(path));
        });
        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
            console.log('Field [' + fieldname + ']: value: ' + val);
        });
        busboy.on('finish', function() {
            console.log('Done parsing form!');
//            res.writeHead(303, { Connection: 'close', Location: '/' });
            res.end();
        });
        req.pipe(busboy);
    },
    getPicture: function (req, res) {
        console.log('getPicture:');
        var busboy = new Busboy({ headers: req.headers });
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            console.log(filename);
            var path = 'tmp/pics/' + filename;
            file.pipe(fs.createWriteStream(path));
        });
        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
            console.log('Field [' + fieldname + ']: value: ' + val);
        });
        busboy.on('finish', function() {
            console.log('Done parsing form!');
//            res.writeHead(303, { Connection: 'close', Location: '/' });
            res.status(200).send('Done');
        });
        req.pipe(busboy);
    },
    getWish: function (req, res) {
        console.log('getWish:');
        var wish = new Wish({name:req.body.nickname, wish:req.body.wish});
        wish.save(function (err, happies) {
            if(err) {
                console.log('ERRORRR', err);
                req.status(500).send('Something went wrong');
            }
            res.status(200).send('Done');
        })
    }
}