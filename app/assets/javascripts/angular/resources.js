'use strict'

var flipListServices = angular.module('flipListServices', []);

flipListServices.factory('List', ['$resource', function($resource) {
  return $resource('api/lists/:listId', {listId: '@id'}, {
      update: {method: 'PUT'},
      sort: {method: 'PATCH', url: 'api/lists/:listId/sort'}
    });
}]);

flipListServices.factory('Item', ['$resource', function($resource) {
  return $resource('api/lists/:listId/items/:itemId', {listId: '@list_id', itemId: '@id'}, {
      update: {method: 'PUT'}
    });
}]);