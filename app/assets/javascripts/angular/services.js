'use strict'

var flipListServices = angular.module('flipListServices', []);

flipListServices.service('userLogin', ['$http', '$location', '$route', function($http, $location, $route) {
  var currentUser;

  return {
    currentUser: function(user) {
      if(user) {
        currentUser = user;
      }
      return currentUser;
    },
    checkLogin: function() {
      var routeUserId = $route.current.params.userId;
      if(this.currentUser() && this.currentUser().id == routeUserId) {
        console.log('userLogin.checkLogin() => Logged In: ' + this.currentUser().id);
        return true;
      } 
      else if(this.currentUser()) {
        console.log('userLogin.checkLogin() => Error: Current User ID is ' + this.currentUser().id + ', Requested User ID of ' + routeUserId + ' Not Logged In');
        $location.path("/");
        return false;
      }
      else {
        console.log('userLogin.checkLogin() => Error: No User Logged In');
        $location.path("/");
        return false;
      }
    },
    //login function uses promises to deal with async
    //have to wait for server response before we can proceed
    login: function(email, password) {
      var userLoginService = this; //need this for $http scope

      //$http methods return a promise, so we'll return its return value
      //caller can use .then() and use success or error callbacks normally
      return $http.post('api/login', {email: email, password: password})
          .success(function(response, status, headers) {
            userLoginService.currentUser(response);
            console.log('userLogin.login() => Success')
            //success callback / resolved promise
          })
          .error(function(response, status) {
            userLoginService.currentUser(null);
            console.log('userLogin.login() => Error: ' + JSON.stringify(response) + ' : ' + status);
            //error callback / rejected promise
          });
    }
  }
}]);