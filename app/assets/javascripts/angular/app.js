'use strict'

/* App Module */

var flipListApp = angular.module('flipListApp', [
  'ngRoute',
  'ngResource',
  'flipListControllers',
  'flipListServices',
  'flipListDirectives'
]);

/* App Config */

flipListApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true); //can be used to force removal of the URL hash for html5 broswers

  $routeProvider.
    when('/', {
      templateUrl: 'partials/users.html',
      controller: 'FlipListHomeController'
    }).
    when('/users/:userId/lists', {
      templateUrl: 'partials/lists.html',
      controller: 'FlipListListsController'
    }).
    when('/users/:userId/lists/:listId', {
      templateUrl: 'partials/list-detail.html',
      controller: 'FlipListListDetailController'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);

