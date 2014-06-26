'use strict';

angular.module('exposrApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/probe', {
        templateUrl: 'partials/probe.html',
        controller: 'ProbeCtrl'
      })
      .when('/inspect/:host/:port', {
        templateUrl: 'partials/inspect',
        controller: 'InspectCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    //$locationProvider.html5Mode(true);
  });