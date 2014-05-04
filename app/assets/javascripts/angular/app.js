'use strict'

/* App Module */

var flipListApp = angular.module('flipListApp', [
  'ngRoute',
  'ngResource',
  'flipListControllers',
  'flipListServices',
  'flipListResources',
  'flipListDirectives'
]);

/* App Config */

flipListApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true); //can be used to force removal of the URL hash for html5 broswers

  $routeProvider.
    when('/', {
      templateUrl: 'partials/login.html',
      controller: 'FlipListLoginController'
    }).
    when('/users/:userId/lists', {
      templateUrl: 'partials/lists.html',
      controller: 'FlipListListsController',
      resolve: {
        loggedIn: function(userLogin) {
          return userLogin.checkLogin();
        }
      }
    }).
    when('/users/:userId/lists/:listId', {
      templateUrl: 'partials/list-detail.html',
      controller: 'FlipListListDetailController',
      resolve: {
        loggedIn: function(userLogin) {
          return userLogin.checkLogin();
        }
      }
    }).
    otherwise({
      redirectTo: '/'
    });
}]);

/* Generic App Actions */

flipListApp.run(['$rootScope', '$location', '$route', function($rootScope, $location, $route) {
  $rootScope.$on('$routeChangeStart', function(event) {
    //nothing right now, might be a central place to check login
  });
}]);
