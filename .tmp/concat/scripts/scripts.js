'use strict';
angular.module('exposrApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]).config([
  '$routeProvider',
  '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/main',
      controller: 'MainCtrl'
    }).when('/probe', {
      templateUrl: 'views/probe.html',
      controller: 'ProbeCtrl'
    }).otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode(true);
  }
]);
'use strict';
angular.module('exposrApp').controller('MainCtrl', [
  '$scope',
  '$http',
  function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function (awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    $scope.host = 'localhost';
    $scope.ports = '1-1000,27017-27030,28017';
    $scope.scan = '';
    $scope.isExposed = 0;
    $scope.probe = function (host, ports) {
      $scope.scanning = true;
      $http({
        method: 'post',
        url: 'probe',
        data: {
          host: host,
          ports: ports
        }
      }).success(function (data) {
        $scope.scan = data.nmap[0][0];
        $scope.scanning = false;
        $scope.isExposed = 1;
      }).error(function (data) {
        $scope.error = data;
        $scope.isExposed = 2;
        $scope.scanning = false;
      });
    };
  }
]);
'use strict';
angular.module('exposrApp').controller('NavbarCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    $scope.menu = [{
        'title': 'Home',
        'link': '/'
      }];
    $scope.isActive = function (route) {
      return route === $location.path();
    };
  }
]);