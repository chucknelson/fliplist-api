'use strict'

var flipListServices = angular.module('flipListServices', []);

flipListServices.factory('List', ['$resource', function($resource) {
  return $resource('api/lists/:listId', {listId: '@id'}, {
      update: {method:'PUT'}
    });
}]);