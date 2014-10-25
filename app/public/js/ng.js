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
});
