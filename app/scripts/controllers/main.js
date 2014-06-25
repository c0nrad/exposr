'use strict';

angular.module('exposrApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings;
    });

    $scope.host = 'localhost';
    $scope.ports = '1-1000,27017-27030,28017';
    $scope.scan = ""
    $scope.isExposed = 0;

    $scope.probe = function(host, ports) {
        $scope.scanning = true
        $http({method: 'post', url: 'probe', data: {host: host, ports: ports}}).success(function(data) { 
            $scope.scan = data.nmap[0][0];
            $scope.scanning = false
            $scope.isExposed = 1;
        }).error(function(data) { 
            $scope.error = data
            $scope.isExposed = 2;
            $scope.scanning = false

        });
    };
});
