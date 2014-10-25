'use strict';
var app = angular.module('app', ['ui.router', 'app.controllers', 'app.directives', 'app.services', 'ui.bootstrap']);

app.config(['$locationProvider', '$stateProvider', function ($locationProvider, $stateProvider) {
//    delete $httpProvider.defaults.headers.common['X-Requested-With'];
//    html5 mode for location
//    $locationProvider.html5Mode(true).hashPrefix('!');
    $stateProvider
        .state('main', {
            url: '',
            templateUrl: 'templates/main.html',
            resolve: {
                currentUser: function($rootScope){
                    return $rootScope.currentUser;
                }
            },
            controller: 'mainCtrl'
        })
        .state('dashboard', {
            url: '/mentees',
            templateUrl: 'templates/mentees.html',
            resolve: {
                currentUser: function($rootScope){
                    return $rootScope.currentUser;
                }
            },
            controller: 'menteesCtrl'
        })
        .state('mentee', {
            url: '/mentees/:id',
            templateUrl: 'templates/mentee.html',
            resolve: {
                id: function($stateParams){
                    return $stateParams.id;
                }
            },
            controller: 'menteeCtrl'
//            onEnter: function ($state, currentUser) {
//                console.log('Enter Welcome');
//                if(!currentUser) {
//                    console.log('No current user');
//                    $state.go('login');
//                }
//            }
        })
        .state('schools', {
            url: '/schools',
            templateUrl: 'templates/schools.html',
            controller: 'schoolsCtrl'
        })
        .state('school', {
            url: '/schools/:id',
            templateUrl: 'templates/school.html',
            controller: 'schoolCtrl',
            resolve: {
                id: function($stateParams){
                    return $stateParams.id;
                }
            }
        })
        .state('currs', {
            url: '/curriculums',
            templateUrl: 'templates/currs.html',
            controller: 'currsCtrl'
        })
        .state('curr', {
            url: '/curriculums/:id',
            templateUrl: 'templates/curr.html',
            controller: 'currCtrl',
            resolve: {
                id: function($stateParams){
                    return $stateParams.id;
                }
            }
        })
        .state('emails', {
            url: '/emails',
            templateUrl: 'templates/emails.html',
            controller: 'emailsCtrl'
        })
        .state('email', {
            url: '/emails/:id',
            templateUrl: 'templates/email.html',
            controller: 'emailCtrl',
            resolve: {
                id: function($stateParams) {
                    return $stateParams.id;
                }
            }
        })
//    $routeProvider
//        .when('/:id', {
//            controller: 'modalCtrl as Modal',
//            templateUrl: 'templates/modal.html',
//            resolve: {
//                workspace: function ($route, workspace) {
//                    console.log('RESOLVING');
//                    return workspace.getData($route.current.params.id);
//                }
//            }
//        });
//        .otherwise({
//            redirectTo: '/'
//        });

}]);

app.run(function($rootScope) {
//    $rootScope.serverURL = 'http://localhost:8000/';
    $rootScope.serverURL = 'http://104.131.125.9:8000/';

    $rootScope.mentees = window.dummyData;
    /* GET data from server and populate mentees */
    /* process data: calculate avgData */
    /* sortBy Date */
    var curriculums = [];
    var schools = [];
    $rootScope.mentees.forEach(function (mentee) {

        mentee.avgScore = 0;
        mentee.scores.forEach(function (score) {
            score.time = Date.parse(score.date);
            mentee.avgScore += score.score;
            curriculums.push({curriculum: score.curriculum, score: score.score});
        });
        mentee.scores.sort(function (a, b) {
            return a.time - b.time;
        });
        var scoreLength = mentee.scores.length
        var trendScore = mentee.scores[scoreLength-1].score - mentee.scores[scoreLength-2].score;
        if(trendScore > 0) {
            mentee.trendGood = "Up";
            mentee.trendColor = "trendGreen";
        } else if(trendScore < 0) {
            mentee.trendGood = "Down";
            mentee.trendColor = "trendRed";
        } else {
            console.log('SAMEEEEEE');
            console.log(trendScore);
            console.log(mentee.scores[scoreLength-1].score);
            console.log(mentee.scores[4].score);
            console.log(mentee.scores[scoreLength-2].score);
            console.log(mentee.scores[3].score);
            console.log(scoreLength);
            console.log(mentee);
            mentee.trendGood = "Same";
            mentee.trendColor = "trendWhite";
        }
        mentee.avgScore = mentee.avgScore / mentee.scores.length;
        mentee.id = mentee.name.toLowerCase().replace(/ /g, '');
        mentee.schoolId = mentee.school.toLowerCase().replace(/ /g, '');
        schools.push({id: mentee.schoolId, score: mentee.avgScore, name: mentee.school});
    })
    /* Lodash to curriculum group */
    $rootScope.curriculums = _.groupBy(curriculums, function (curr) {
        return curr.curriculum;
    });
    var avgCurriculums = [];
    for(var key in $rootScope.curriculums) {
        var totalScore = 0;
        var length = $rootScope.curriculums[key].length;
        $rootScope.curriculums[key].forEach(function (score) {
            totalScore+= score.score;
        })
        totalScore = Math.round(totalScore / length * 100) / 100;

        var curr = {id: key, avg: totalScore};
        avgCurriculums.push(curr);
    }
    $rootScope.avgCurriculums = avgCurriculums  ;

    /* Lodash to school group */
    $rootScope.schools = _.groupBy(schools, function (school) {
        return school.id;
    });
    var avgSchools = [];
    for(var key in $rootScope.schools) {
        var totalScore = 0;
        var length = $rootScope.schools[key].length;
        var name = $rootScope.schools[key][0].name;
        $rootScope.schools[key].forEach(function (school) {
            totalScore+= school.score;
        })
        totalScore = Math.round(totalScore / length * 100) / 100;

        var school = {id: key, avg: totalScore, name: name};
        avgSchools.push(school);
    }
    $rootScope.avgCurriculums = avgCurriculums  ;
    $rootScope.avgSchools = avgSchools;
});
