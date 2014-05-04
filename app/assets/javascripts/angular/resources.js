'use strict'

var flipListResources = angular.module('flipListResources', []);

flipListResources.factory('User', ['$resource', function($resource) {
  return $resource('api/users/:userId', {userId: '@id'}, {
      update: {method: 'PUT'}
    });
}]);

flipListResources.factory('List', ['$resource', function($resource) {
  return $resource('api/users/:userId/lists/:listId', {userId: '@user_id', listId: '@id'}, {
      update: {method: 'PUT'},
      sort: {method: 'PATCH', url: 'api/users/:userId/lists/:listId/sort'}
    });
}]);

flipListResources.factory('Item', ['$resource', function($resource) {
  return $resource('api/users/:userId/lists/:listId/items/:itemId', {listId: '@list_id', itemId: '@id'}, {
      update: {method: 'PUT'}
    });
}]);