'use strict'

var flipListServices = angular.module('flipListServices', []);

flipListServices.factory('List', ['$resource', function($resource) {
  return $resource('api/lists/:listId', {listId: '@id'}, {
      update: {method: 'PUT'}
    });
}]);

flipListServices.factory('Item', ['$resource', function($resource) {
  return $resource('api/lists/:listId/items/:itemId', {listId: '@list_id', itemId: '@id'}, {
      update: {method: 'PUT'}
    });
}]);