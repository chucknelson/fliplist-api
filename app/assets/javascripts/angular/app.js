/* App Module */

var flipListApp = angular.module('flipListApp', [
  'ngRoute',
  'ngResource'
]);

/* Services */

flipListApp.factory('listProvider', ['$resource', function($resource) {
  return {
    lists: $resource('api/lists', {}, {
      query: {method:'GET', isArray:true}
    }),
    list: $resource('api/lists/:listId', {}, {
      query: {method:'GET'}
    })
  };
}]);

/* Controllers */

flipListApp.controller('FlipListController', ['$scope', 'listProvider', function($scope, listProvider) {
  $scope.lists = listProvider.lists.query();
}]);

flipListApp.controller('FlipListDetailController', ['$scope', '$routeParams', 'listProvider', function($scope, $routeParams, listProvider) {
  $scope.list = listProvider.list.query({listId: $routeParams.listId});
}]);

/* App Config */

flipListApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true); //can be used to force removal of the URL hash for html5 broswers

  $routeProvider.
    when('/', {
      templateUrl: 'partials/lists.html',
      controller: 'FlipListController'
    }).
    when('/lists/:listId', {
      templateUrl: 'partials/list-detail.html',
      controller: 'FlipListDetailController'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);

