'use strict';

/**
 * @ngdoc function
 * @name exposrApp.controller:ProbeCtrl
 * @description
 * # ProbeCtrl
 * Controller of the exposrApp
 */
angular.module('exposrApp')
  .controller('ProbeCtrl', function ($scope, $http, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.host = 'localhost';
    $scope.ports = '1-1000,27017-27030,28017';
    $scope.scan = '';
    $scope.scanning = false;

    $scope.probe = function(host, ports) {
        $scope.scanning = true;
        $http({method: 'post', url: 'probe', data: {host: host, ports: ports}}).success(function(data) {
            $scope.scan = data.nmap[0][0];
            $scope.scanning = false;
        }).error(function(data) {
            $scope.error = data;
            $scope.scanning = false;
        });
    };

    $scope.portClick = function(port) {
      $location.url('/inspect/' + $scope.host + '/' + port);
    };

  });
