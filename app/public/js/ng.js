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
            controller: 'mainCtrl'
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
//    $rootScope.serverURL = 'http://localhost:8002/';
    $rootScope.serverURL = 'http://104.131.125.9:8002/';

    $rootScope.mentees = window.dummyData;
    /* GET data from server and populate mentees */
    /* process data: calculate avgData */
    /* sortBy Date */
    var curriculums = [];
    $rootScope.mentees.forEach(function (mentee) {

        mentee.avgScore = 0;
        mentee.scores.forEach(function (score) {
            score.time = Date.parse(score.date);
            mentee.avgScore += score.score;
            curriculums.push({curriculum: score.curriculum, score: score.score});
        })
        mentee.scores.sort(function (a, b) {
            return a.time - b.time;
        });
        mentee.avgScore = mentee.avgScore / mentee.scores.length;
        mentee.id = mentee.name.toLowerCase().replace(" ", "").replace(" ", '');
    })
    /* Lodash to group */
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
});
