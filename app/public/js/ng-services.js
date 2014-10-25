/**
 * Created by sam on 31/08/2014.
 */

// Angular services and factories
angular.module('app.services', [])

    .factory('parserworker', function () {
        return function () {
            console.log('CREATING NEW PARSER WORKER');
    //        var worker = new Worker('js/parserWorker.js');
            worker.onmessage = function (e) {
            };

            return worker;
        }
    })
    .factory('Recorder2', function ($rootScope, $http) {
        var serverURL = $rootScope.serverURL;
        var recorderFactory = {};

        // Check for compatability issues
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

        if('AudioContext' in window) {
            window.AudioContext = window.AudioContext
        } else if('webkitAudioContext' in window) {
            window.AudioContext = window.webkitAudioContext;
        } else {
            console.log('AudioContext is not supported!');
        }

        var audioContext = new AudioContext();
        var mediaStream;
        var rec;
        var currentBlob;

        // Audio element for playback
        var audio = document.createElement('audio');
        audio.addEventListener('loadeddata', function(e) {
            console.log('loaddeddata');
            console.log(audio);
//            audio.load();
            audio.play();
        }, false);
        audio.addEventListener('error', function(e) {
            console.log('error!', e);
            console.log(currentBlob);
        }, false);
        audio.addEventListener('stalled', function () {
            console.log('onstalled');
            var audio = this;
            audio.load();
            audio.play();
            audio.pause();
        }, false);

        audio.addEventListener('ended', function () {
            $rootScope.$broadcast('audioended');
            console.log('Audio ended');
        });

        var getAudioEl = function () {
            return audio;
        };

        var sendBlob =  function () {
            console.log('Sending blob: NOT YET IMPLEMENTED!');
            var fd = new FormData();
            fd.append('fname', 'SAM');
            fd.append('data', currentBlob, 'audio.wav');

            $.ajax({
                type: 'POST',
                url: serverURL + 'upload/audio',
                data: fd,
                processData: false,
                contentType: false
            }).success(function (data) {
                $rootScope.$broadcast('recorder2.sendBlob.done');
            }).error(function (err) {
                console.log(err);
            })
        };

        var stopStream = function () {
            console.log('Stopping stream...');
            // stop the stream
            mediaStream.stop();

            // stop Recorder.js
            rec.stop();

            // export it to WAV
            rec.exportWAV(function (e) {
                currentBlob = e;
                console.log(currentBlob);
                var url = (window.URL || window.webkitURL || window.mozURL).createObjectURL(currentBlob);
                $rootScope.$broadcast('gotWav', url)
                rec.clear();
            });
        };

        var playAudio = function () {
            var url = (window.URL || window.webkitURL || window.mozURL).createObjectURL(currentBlob);
//                var audio = new Audio(pre_url);
//                audio.play();
            audio.src = url;
        }
        var getAudioURL = function () {
            var url = (window.URL || window.webkitURL || window.mozURL).createObjectURL(currentBlob);
            return url;
        }
        var gotStream =  function (stream) {
            mediaStream = stream;

            var mediaStreamSrouce = audioContext.createMediaStreamSource(stream);
            // new instance of Recorder.js
            rec = new Recorder(mediaStreamSrouce, {
                workerPath: 'js/recorderWorker.js'
            });

            // start recording
            rec.record();
        }

        var initAudio = function () {
            navigator.getUserMedia(
                {
                    "audio": {
                        "mandatory": {
                            "googEchoCancellation": "true",
                            "googAutoGainControl": "true",
                            "googNoiseSuppression": "true",
                            "googHighpassFilter": "false"
                        },
                        "optional": []
                    }
                }, gotStream, function(e) {
                    alert('Error getting audi   o');
                    console.log(e);
                });
        }

        recorderFactory.initAudio = initAudio;
        recorderFactory.stopAudio = stopStream;
        recorderFactory.playAudio = playAudio;
        recorderFactory.saveAudio = sendBlob;
        recorderFactory.getAudioURL = getAudioURL;
//        recorderFactory.setOnEnded = setOnEnded;
        recorderFactory.getAudioEl = getAudioEl;
        return recorderFactory;
    })
    .factory('ubaPlayer', function () {
        var ubaPlayerFactory = {};
        ubaPlayerFactory.init = function () {
            $(function(){
                $("#ubaPlayer").ubaPlayer({
                    codecs: [{name:"WAV", codec: 'audio/wav'}, {name:"OGG", codec: 'audio/ogg; codecs="vorbis"'}]
                });
            });
        };
        return ubaPlayerFactory;
    })
    // Get unique color in steps
    .factory('Rainbow', function () {
        var rainbow = function (numOfSteps, step) {
            var r, g, b;
            var h = step / numOfSteps;
            var i = ~~(h * 6);
            var f = h * 6 - i;
            var q = 1 - f;
            switch (i % 6) {
                case 0:
                    r = 1, g = f, b = 0;
                    break;
                case 1:
                    r = q, g = 1, b = 0;
                    break;
                case 2:
                    r = 0, g = 1, b = f;
                    break;
                case 3:
                    r = 0, g = q, b = 1;
                    break;
                case 4:
                    r = f, g = 0, b = 1;
                    break;
                case 5:
                    r = 1, g = 0, b = q;
                    break;
            }
            var c = "#" + ("00" + (~~(r * 255)).toString(16)).slice(-2) + ("00" + (~~(g * 255)).toString(16)).slice(-2) + ("00" + (~~(b * 255)).toString(16)).slice(-2);
            return (c);
        }
        return rainbow;
    })
    .factory('clog', function () {
        function log(msg, color){
            color = color || "black";
            bgc = "White";
            switch (color) {
                case "success":  color = "Green";      bgc = "LimeGreen";       break;
                case "info":     color = "DodgerBlue"; bgc = "Turquoise";       break;
                case "error":    color = "Red";        bgc = "Black";           break;
                case "start":    color = "OliveDrab";  bgc = "PaleGreen";       break;
                case "warning":  color = "Tomato";     bgc = "Black";           break;
                case "end":      color = "Orchid";     bgc = "MediumVioletRed"; break;
                default: color = color;
            }
            if (typeof msg == "object"){
                console.log(msg);
            } else if (typeof color == "object"){
                console.log("%c" + msg, "color: PowderBlue;font-weight:bold; background-color: RoyalBlue;");
                console.log(color);
            } else {
                console.log("%c" + msg, "color:" + color + ";font-weight:bold; background-color: " + bgc + ";");
            }
        }
        return log;
    })