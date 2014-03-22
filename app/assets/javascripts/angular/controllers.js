'use strict'

var flipListControllers = angular.module('flipListControllers', []);

flipListControllers.controller('FlipListController', ['$scope', 'List', function($scope, List) {
  $scope.lists = List.query();

  $scope.createList = function(listName) {
    var newList = new List({title: listName});
    $scope.lists.push(newList);
    newList.$save();
    $scope.newListTitle = '';
  }

  $scope.deleteList = function(listIndex) {
    $scope.list = $scope.lists[listIndex];
    $scope.lists.splice(listIndex,1);
    $scope.list.$remove();
  };

}]);

flipListControllers.controller('FlipListDetailController', ['$scope', '$routeParams', 'List', function($scope, $routeParams, List) {
  $scope.list = List.get({listId: $routeParams.listId});

  $scope.saveList = function() {
    $scope.list.$update();
  };
}]);

flipListControllers.controller('FlipListItemsController', ['$scope', '$routeParams', 'Item', function($scope, $routeParams, Item) {
  $scope.items = Item.query({listId: $routeParams.listId});
  $scope.item = {};

  $scope.createItem = function(itemName) {
    var newItem = new Item({name: itemName, list_id: $routeParams.listId});
    $scope.items.push(newItem);
    newItem.$save();
    $scope.newItemName = ''
  }

  $scope.saveItem = function(itemIndex) {
    $scope.item = $scope.items[itemIndex];
    $scope.item.$update();
  };

  $scope.deleteItem = function(itemIndex) {
    $scope.item = $scope.items[itemIndex];
    $scope.items.splice(itemIndex,1);
    $scope.item.$remove();
  };

}]);