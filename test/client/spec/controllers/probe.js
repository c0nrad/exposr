'use strict';

describe('Controller: ProbeCtrl', function () {

  // load the controller's module
  beforeEach(module('exposrApp'));

  var ProbeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProbeCtrl = $controller('ProbeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
