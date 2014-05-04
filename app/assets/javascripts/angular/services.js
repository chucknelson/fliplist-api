'use strict'

var flipListServices = angular.module('flipListServices', []);

flipListServices.service('userLogin', ['$http', '$q', function($http, $q) {
  var currentUser;

  return {
    currentUser: function(val) {
      if(val) {
        currentUser = val;
      }
      return currentUser;
    },
    //login function uses promises to deal with async
    //have to wait for server response before we can proceed
    login: function(email, password) {
      var userLoginService = this; //need this for $http scope
      var deferred = $q.defer();

      $http.post('/api/login', {email: email, password: password})
        .success(function(response, status, headers) {
          userLoginService.currentUser(response);
          deferred.resolve();
        })
        .error(function(response, status) {
          userLoginService.currentUser(null);
          console.log('Invalid Login! => ' + JSON.stringify(response) + ' : ' + status);
          deferred.reject();
        });

        return deferred.promise;
    }
  }
}]);