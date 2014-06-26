'use strict';

angular.module('exposrApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/',
    }, {
      'title': 'Probe',
      'link': '/#/probe'
    }];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
