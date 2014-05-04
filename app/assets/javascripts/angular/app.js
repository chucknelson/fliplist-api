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
        factory: checkLogin
      }
    }).
    when('/users/:userId/lists/:listId', {
      templateUrl: 'partials/list-detail.html',
      controller: 'FlipListListDetailController'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);

//TODO - instead of this, just pass in userLogin service above?
var checkLogin = function ($q, $rootScope, $location, userLogin) {
  console.log('app.checkLogin() => userLogin.currentUser => ' + JSON.stringify(userLogin.currentUser()));

  if (userLogin.currentUser()) {
    console.log('app.checkLogin() => Logged In');
    return true;
  } 
  else {
    console.log('app.checkLogin() => Not Logged In, Redirecting to /');
    $location.path("/");
    return false;
  }
};

