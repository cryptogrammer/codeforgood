var fs = require('fs');
var exec = require('child_process').exec;
function main (){
    var files = fs.readdir('./tmp', function (err, data) {
        data.sort(function (a, b) {
            return a - b;
        })
        console.log(data);
        concaqt(data);
    })
}

function concat(clips) {
    var sox = 'sox ';
    var output = 'out.wav';
    for(var i = 0; i < clips.length; i ++) {
        sox += './tmp/' + clips[i] + ' ';
        //TODO: add a pause file between clips
    }
    sox += './tmp/' + output;
    console.log(sox);
    exec(sox, function (err, stdout, stderr) {
        if(err)
            console.log(err);
        else {
            console.log('Done Soxing!');
        }
    })
}

module.exports = {
    concat: main
};