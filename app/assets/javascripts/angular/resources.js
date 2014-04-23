'use strict'

var flipListServices = angular.module('flipListServices', []);

flipListServices.factory('User', ['$resource', function($resource) {
  return $resource('api/users/:userId', {userId: '@id'}, {
      update: {method: 'PUT'}
    });
}]);

flipListServices.factory('List', ['$resource', function($resource) {
  return $resource('api/users/:userId/lists/:listId', {userId: '@user_id', listId: '@id'}, {
      update: {method: 'PUT'},
      sort: {method: 'PATCH', url: 'api/users/:userId/lists/:listId/sort'}
    });
}]);

flipListServices.factory('Item', ['$resource', function($resource) {
  return $resource('api/users/:userId/lists/:listId/items/:itemId', {listId: '@list_id', itemId: '@id'}, {
      update: {method: 'PUT'}
    });
}]);