/**
 *
 * Created by sam on 31/08/2014.
 */

'use strict';
angular.module('app.controllers', ['ui.bootstrap'])
    .controller('mainCtrl', function ($rootScope, $scope, $http, $modal) {
        console.log('HERE: mainCtrl');
        $scope.reverse = false;
        $scope.sortBy = "-avg";
        $scope.toggleReverse = function (id) {
            $scope.sortBy = id;
            $scope.$apply(function () {
                $scope.reverse = !$scope.reverse;
            })
        }
        $scope.mentees = $rootScope.mentees;
        $scope.avgCurriculums = $rootScope.avgCurriculums;
    })
    .controller('menteesCtrl', function ($rootScope, $scope) {
        $scope.reverse = false;
        $scope.sortBy = "avgScore";
        $scope.toggleReverse = function (id) {
            $scope.sortBy = id;
            $scope.$apply(function () {
                $scope.reverse = !$scope.reverse;
            })
        }
        $scope.mentees = $rootScope.mentees;
    })
    .controller('menteeCtrl', function($rootScope, $scope, id, Chart) {
        console.log('HERE: menteeCtrl');
        $scope.id = id;
        console.log(id);
        console.log($rootScope.mentees);
        var currentMentee= _.where($rootScope.mentees, {'id': id})[0];
        $scope.currentMentee = currentMentee;
        console.log($scope.currentMentee);
        $scope.name = currentMentee.name;
        var data = [];
        currentMentee.scores.forEach(function (score, index) {
            data.push({
                Score: index + 1,
                Unit: score.score
            })
        })
        console.log(Chart);
        Chart.makeLineChart('line-chart', data);
    })
    .controller('topCtrl', function ($scope) {
        
    })
    .controller('schoolsCtrl', function ($rootScope, $scope) {
        $scope.reverse = false;
        $scope.sortBy = "-avg";
        $scope.toggleReverse = function (id) {
            $scope.sortBy = id;
            $scope.$apply(function () {
                $scope.reverse = !$scope.reverse;
            })
        }
        $scope.schools = $rootScope.avgSchools;
        $scope.schoolList = $rootScope.schools;
        console.log($scope.schoolList);
    })
    .controller('schoolCtrl', function($rootScope, $scope, id, Chart) {
        $scope.$on('hoverChart', function (e, data) {
            $scope.$apply(function () {
                $scope.currentScore = data.Unit;
            })
        })
        console.log('HERE: schoolCtrl');
        var currentSchool = _.where($rootScope.avgSchools, {'id': id})[0];
        $scope.currentSchool = currentSchool;
        var data = [];
        $rootScope.schools[id].forEach(function (score, index) {
            data.push({
                Score: index + 1,
                Unit: score.score
            })
        })
        Chart.makeLineChart('line-chart', data);
    })
    .controller('currsCtrl', function ($rootScope, $scope) {
        $scope.reverse = false;
        $scope.sortBy = "-avg";
        $scope.toggleReverse = function (id) {
            $scope.sortBy = id;
            $scope.$apply(function () {
                $scope.reverse = !$scope.reverse;
            })
        }
        console.log($rootScope.curriculums);
        console.log($rootScope.avgCurriculums);
        $scope.currs = $rootScope.avgCurriculums;
//        $scope.schools = $rootScope.avgSchools;
//        $scope.schoolList = $rootScope.schools;
//        console.log($scope.schoolList);
    })
    .controller('currCtrl', function($rootScope, $scope, id, Chart) {
        $scope.$on('hoverChart', function (e, data) {
            $scope.$apply(function () {
                $scope.currentScore = data.Unit;
            })
        })

        console.log('HERE: currCtrl');
        var currentCurr = _.where($rootScope.avgCurriculums, {'id': id})[0];
        $scope.currentCurr = currentCurr;
        var data = [];
        console.log($rootScope.curriculums);

        var rawData = {};
        for(var i = 1; i <=5; i++) {
            rawData[i] = 0;
        }
        $rootScope.curriculums[id].forEach(function (score, index) {
            rawData[score.score]++;
        });
        var data = [];
        for(var i = 1; i <=5; i++) {
            var current = {};
            current.label = i;
            current.value = rawData[i];
            data.push(current);
        };
        console.log(data);
//        Chart.makeLineChart('line-chart', data);
        Chart.makeDonutChart('donut-chart', data);
//        Chart.makeDonutChart('donut-chart', )
    })

//    .controller('modalCtrl', function ($rootScope, $scope, $modalInstance, $upload, $http, counter, $timeout) {
//        var serverURL = $rootScope.serverURL;
//        $scope.counter = counter;
//        $scope.input = {};
//        var currentFiles = null;
//        $scope.fieldDone = false;
//        $scope.picDone = false;
//        $scope.btnClass = 'primary';
//        $scope.btnMessage = 'Submit!';
//
//        $scope.submit = function () {
//            console.log('Submitting...');
//            if(!$scope.input.nickname || $scope.input.nickname === '') {
//                $scope.nameErr = 'has-error';
//                $scope.nameFeedback = 'has-feedback';
//                console.log('Please input your name');
//            } else {
//                $scope.nameErr = 'has-success';
//                $scope.nameFeedback = '';
//                $scope.submitting = true;
//                var wish = $scope.checkWish();
//                var pic = $scope.checkPic();
//                if(wish && pic) { // wish and pic
//                    $scope.submitFields($scope.submitFiles, currentFiles);
//                } else if(wish) { // only wish
//                    $scope.submitFields();
//                } else if(pic) { // only pic
//                    $scope.submitFiles(currentFiles);
//                } else { // no pic or wish
//                    $scope.wishErr = 'has-error';
//                    $scope.wishFeedback = 'has-feedback';
//                    $scope.picErr = 'has-error';
//                    $scope.picFeedback = 'has-feedback';
//                    $scope.submitting = false;
//                }
//            };
//            // Close modal
////            $scope.ok();
//        };
//        $scope.checkWish = function () {
//            return !(!$scope.input.wish || $scope.input.wish === '');
//        };
//        $scope.checkPic = function () {
//            return (currentFiles);
//        }
//        /* Upload service */
//        $scope.onFileSelect = function($files) {
//            currentFiles = $files;
//        }; // remember current files
//        $scope.submitFields = function (callback, arg) {
//            if(!$scope.input.wish || $scope.input.wish === '') {
//                $scope.wishErr = 'has-error';
//                $scope.wishFeedback = 'has-feedback';
//                console.log('No wish');
//                $scope.submitting = false;
//            } else {
//                $scope.wishErr = 'has-success';
//                $scope.wishFeedback = '';
//                console.log('Sending wish to server');
//                $http.post(serverURL + 'upload/wish', $scope.input) //upload fields to server
//                    .success(function (data) {
//                        console.log('DONE');
//                        if(callback) callback(arg);
//                        else {
//                            $scope.btnClass = 'success';
//                            $scope.btnMessage = 'Done!';
//                            console.log('Upload fields successfully!');
//                            // file is uploaded successfully
//                            $timeout(function () {
//                                $scope.submitting = false;
//                                // change btn
//                                $scope.ok();
//                            }, 1000)
//                        }
//                    })
//                    .error(function (err) {
//                        console.log(err);
//                    })
//            }
//        };
//
//        $scope.submitFiles = function($files) {
//            if(!$files) {
//                $scope.picErr = 'has-error';
//                $scope.picFeedback = 'has-feedback';
//                console.log('No pictures');
//                $scope.submitting = false;
//            } else {
//                $scope.picErr = 'has-success';
//                $scope.picFeedback = '';
//                console.log('Sending pictures to server');
//                console.log($files);
//                //$files: an array of files selected, each file has name, size, and type.
//                for (var i = 0; i < $files.length; i++) {
//                    var currentIndex = i;
//                    var file = $files[i];
//                    var type = file.name.split('.')[1];
//                    var name = $scope.input.nickname.replace(' ', '---').replace(' ', '---') + '----' + (new Date().getTime( )) + '.' + type;
//                    $scope.upload = $upload.upload({
//                        url: serverURL + 'upload/picture', //upload.php script, node.js route, or servlet url
//                        method: 'POST',
//                        //headers: {'header-key': 'header-value'},
//                        //withCredentials: true,
//                        data: {nickname: $scope.input.nickname},
//                        file: file,
//                        fileName: name
//                    }).progress(function (evt) {
//                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
//                    }).success(function (data, status, headers, config) {
//
//                        $scope.btnClass = 'success';
//                        $scope.btnMessage = 'Done!';
//
//                        console.log('Upload files successfully!');
//                        // file is uploaded successfully
//                        $timeout(function () {
//                            $scope.submitting = false;
//                            // change btn
//                            $scope.ok();
//                        }, 1000)
//
//
//                    }).error(function (err) {
//                        console.log(err); //TODO: handle errors
//                    })
//                    // access or attach event listeners to the underlying XMLHttpRequest.
//                    //.xhr(function(xhr){xhr.upload.addEventListener(...)})
//                };
//            }
//        };
//
//        // Modal functions
//        $scope.ok = function () {
//            $modalInstance.close();
//        };
//        $scope.cancel = function () {
//            $modalInstance.dismiss('cancel');
//        }
//    });