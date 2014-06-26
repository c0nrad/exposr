'use strict';

angular.module('exposrApp')
  .controller('InspectCtrl', function ($scope, $http, $routeParams) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.host = $routeParams.host;
    $scope.port = $routeParams.port;
    console.log($routeParams);

    $http.post('/inspect', $routeParams).success(function(data) {
      $scope.data = data
    });
  });
