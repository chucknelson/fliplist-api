/* App Module */

var flipListApp = angular.module('flipListApp', [
  'ngRoute',
  'ngResource'
]);

/* Services */

flipListApp.factory('ListFactory', ['$resource', function($resource) {
  return $resource('api/lists', {}, {
    query: {method:'GET', isArray:true}
  });
}]);

/* Controllers */

flipListApp.controller('FlipListController', ['$scope', 'ListFactory', function($scope, ListFactory) {
  $scope.working = 'Yes!';

  $scope.lists = ListFactory.query();
}]);

/* App Config */

flipListApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true); //can be used to force removal of the URL hash for html5 broswers

  $routeProvider.
    when('/', {
      templateUrl: 'partials/lists.html',
      controller: 'FlipListController'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);

